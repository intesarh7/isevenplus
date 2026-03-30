import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe fetch HTML
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
      redirect: "follow",
    });

    return await res.text();
  } catch {
    return "";
  }
}

// 🔥 Fetch Rank (FIXED)
async function fetchRank(domain: string, keyword: string) {
  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      keyword
    )}&num=50`;

    const html = await fetchHTML(url);

    if (!html) {
      return { position: null, url: null };
    }

    // ❗ dynamic import
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

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
  } catch {
    return { position: null, url: null };
  }
}

// 🔥 Background refresh
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      domain,
      keywords,
      forceRefresh,
      country = "IN",
      device = "desktop",
    } = body;

    if (!domain || !keywords) {
      return NextResponse.json(
        { error: "Domain & keywords required" },
        { status: 400 }
      );
    }

    const keywordList = keywords
      .split(",")
      .map((k: string) => k.trim())
      .filter(Boolean);

    // 🔥 TTL fetch
    const [ttlRow]: any = await db.query(
      "SELECT setting_value FROM seo_settings WHERE setting_key='rank_cache_ttl_hours'"
    );

    const TTL = parseInt(ttlRow?.[0]?.setting_value || "6");

    const results: any[] = [];

    for (const keyword of keywordList) {
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

      // ✅ Use cache
      if (useCache) {
        results.push({
          keyword,
          position: rows[0].position,
          url: rows[0].url,
          cached: true,
          updatedAt: rows[0].updatedAt,
        });

        refreshInBackground(domain, keyword);
        continue;
      }

      // 🔥 Fetch fresh
      const fresh = await fetchRank(domain, keyword);

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
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}