import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 safe fetch
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

export async function POST(req: NextRequest) {
  try {
    let { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      );
    }

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    if (!html) {
      return NextResponse.json({});
    }

    // ❗ FIX: dynamic import
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const data = {
      title:
        $('meta[property="og:title"]').attr("content") || null,
      description:
        $('meta[property="og:description"]').attr("content") || null,
      image:
        $('meta[property="og:image"]').attr("content") || null,
      url:
        $('meta[property="og:url"]').attr("content") || null,
      type:
        $('meta[property="og:type"]').attr("content") || null,
      twitterCard:
        $('meta[name="twitter:card"]').attr("content") || null,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}