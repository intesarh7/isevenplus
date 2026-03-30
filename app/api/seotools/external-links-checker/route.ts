import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe HTML fetch
async function fetchHTML(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    },
    redirect: "follow",
    cache: "no-store",
  });

  return await res.text();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url } = body;

    if (!url) {
      return NextResponse.json(
        { message: "URL required" },
        { status: 400 }
      );
    }

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    // ❗ dynamic import (IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const base = new URL(url).hostname;

    const links: any[] = [];

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      const anchor = $(el).text().trim();
      const rel = $(el).attr("rel") || "";

      if (!href) return;

      try {
        const absolute = new URL(href, url).href;
        const domain = new URL(absolute).hostname;

        if (domain !== base) {
          links.push({
            href: absolute,
            anchor: anchor || "N/A",
            rel,
            broken: false,
          });
        }
      } catch {}
    });

    return NextResponse.json({ links });
  } catch (error) {
    return NextResponse.json({
      links: [],
      error: "Failed to fetch or parse",
    });
  }
}