import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe HTML fetch
async function fetchHTML(url: string) {
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
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({
        success: false,
        error: "URL missing",
      });
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    // ❗ dynamic import (IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const images: any[] = [];

    $("img").each((_, el) => {
      let src =
        $(el).attr("src") ||
        $(el).attr("data-src") ||
        $(el).attr("data-lazy") ||
        "";

      // srcset handle
      const srcset = $(el).attr("srcset");
      if (!src && srcset) {
        src = srcset.split(",")[0].trim().split(" ")[0];
      }

      if (!src) return;

      // absolute URL
      if (!src.startsWith("http")) {
        try {
          src = new URL(src, url!).href;
        } catch {}
      }

      images.push({
        src,
        alt: $(el).attr("alt") || null,
        width: $(el).attr("width") || null,
        height: $(el).attr("height") || null,
        loading: $(el).attr("loading") || null,
      });
    });

    return NextResponse.json({
      success: true,
      html: html.slice(0, 5000),
      images,
    });
  } catch (err: any) {
    console.error("FETCH ERROR:", err?.message);

    return NextResponse.json({
      success: false,
      error: "Unable to fetch HTML",
    });
  }
}