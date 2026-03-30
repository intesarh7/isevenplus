import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://google.com",
      },
      redirect: "follow",
      cache: "no-store",
    });

    return await res.text();
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url } = body;

    if (!url) {
      return NextResponse.json({
        links: [],
        pagesScanned: 0,
        seoScore: 0,
      });
    }

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    if (!html) {
      return NextResponse.json({
        links: [],
        pagesScanned: 0,
        seoScore: 0,
      });
    }

    // ❗ dynamic import (VERY IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const baseDomain = new URL(url).hostname;

    const links: any[] = [];

    $("a[href]").each((_, el) => {
      const rawHref = $(el).attr("href");
      const anchor = $(el).text().trim();

      if (!rawHref) return;

      try {
        const absolute = new URL(rawHref, url).href;
        const domain = new URL(absolute).hostname;

        const type =
          domain === baseDomain ? "internal" : "external";

        links.push({
          href: absolute,
          anchor: anchor || "N/A",
          type,
        });
      } catch {}
    });

    const internal = links.filter((l) => l.type === "internal");

    let score = 40;
    score += Math.min(internal.length, 40);
    score += Math.min(links.length / 5, 20);
    score = Math.min(Math.round(score), 100);

    return NextResponse.json({
      links,
      pagesScanned: 1,
      seoScore: score,
    });
  } catch (error) {
    console.error("CRAWLER ERROR:", error);

    return NextResponse.json({
      links: [],
      pagesScanned: 0,
      seoScore: 0,
    });
  }
}