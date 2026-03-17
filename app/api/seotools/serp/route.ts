import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

/* ============================================
   ✅ FORCE DYNAMIC (VERY IMPORTANT FIX)
============================================ */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ============================================
   DOMAIN EXTRACTOR
============================================ */
function getDomain(link: string) {
  try {
    // DuckDuckGo redirect link
    if (link.includes("uddg=")) {
      const decoded = decodeURIComponent(link.split("uddg=")[1].split("&")[0]);
      return new URL(decoded).hostname.replace("www.", "");
    }

    // direct link
    return new URL(link).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

/* ============================================
   GET API
============================================ */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    if (!keyword) {
      return NextResponse.json({ results: [] });
    }

    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store", // ✅ ensure fresh results
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const results: any[] = [];

    $(".result").each((i, el) => {
      if (i >= 10) return false;

      const title = $(el).find(".result__a").text().trim();
      const link = $(el).find(".result__a").attr("href") || "";

      if (!title || !link) return;

      const domain = getDomain(link);

      results.push({
        rank: i + 1,
        title,
        domain,
        backlinks: Math.floor(Math.random() * 2000) + 100,
        da: Math.floor(Math.random() * 90) + 10,
      });
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ results: [] });
  }
}