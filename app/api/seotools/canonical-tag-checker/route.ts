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

    // ❗ dynamic import (VERY IMPORTANT)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const canonical = $('link[rel="canonical"]').attr("href") || null;

    let status = "missing";

    if (canonical) {
      if (canonical === url) {
        status = "valid";
      } else {
        status = "different";
      }
    }

    return NextResponse.json({
      pageUrl: url,
      canonical,
      status,
    });
  } catch (error) {
    return NextResponse.json({
      pageUrl: null,
      canonical: null,
      status: "missing",
      error: "Failed to fetch or parse",
    });
  }
}