import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import axios from "axios";
import * as cheerio from "cheerio";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { domain, keywords, forceRefresh, country = "IN", device = "desktop" } = await req.json();

    const keywordList = keywords.split(",").map((k: string) => k.trim());


    // TTL fetch
    const [ttlRow]: any = await db.query(
      "SELECT setting_value FROM seo_settings WHERE setting_key='rank_cache_ttl_hours'"
    );
    const TTL = parseInt(ttlRow[0]?.setting_value || "6");

    const results: any[] = [];

    for (const keyword of keywordList) {
      // 1. Check Cache
      const [rows]: any = await db.query(
        `SELECT * FROM keyword_rank_cache 
   WHERE domain=? AND keyword=? LIMIT 1`,
        [domain, keyword]
      );

      let useCache = false;

      if (rows.length && !forceRefresh) {
        const updatedAt = new Date(rows[0].updatedAt);
        const diffHours =
          (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60);

        if (diffHours < TTL) {
          useCache = true;
        }
      }

      // 2. Use Cache
      if (useCache) {
        results.push({
          keyword,
          position: rows[0].position,
          url: rows[0].url,
          cached: true,
          updatedAt: rows[0].updatedAt,
        });

        // 🔥 Background refresh (non-blocking)
        refreshInBackground(domain, keyword);

        continue;
      }

      // 3. Fetch fresh
      const fresh = await fetchRank(domain, keyword);

      // 4. Save DB
      await db.query(
        `INSERT INTO keyword_rank_cache 
   (domain, keyword, position, url, country, device, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, NOW())
   ON DUPLICATE KEY UPDATE
   position=VALUES(position),
   url=VALUES(url),
   updatedAt=NOW()`,
        [domain, keyword, fresh.position, fresh.url, country, device]
      );

      results.push({
        keyword,
        position: fresh.position,
        url: fresh.url,
        cached: false,
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ results });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔥 Fetch Rank Function
async function fetchRank(domain: string, keyword: string) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    keyword
  )}&num=50`;

  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const $ = cheerio.load(data);

  let position: number | null = null;
  let foundUrl: string | null = null;

  $("div.g").each((i, el) => {
    const link = $(el).find("a").attr("href");
    if (link && link.includes(domain) && position === null) {
      position = i + 1;
      foundUrl = link;
    }
  });

  return { position, url: foundUrl };
}

// 🔥 Background Refresh
async function refreshInBackground(domain: string, keyword: string) {
  setTimeout(async () => {
    try {
      const fresh = await fetchRank(domain, keyword);

      await db.query(
        `UPDATE keyword_rank_cache 
         SET position=?, url=?, updatedAt=NOW()
         WHERE domain=? AND keyword=?`,
        [fresh.position, fresh.url, domain, keyword]
      );
    } catch (err) {
      console.error("BG refresh error:", err);
    }
  }, 100);
}