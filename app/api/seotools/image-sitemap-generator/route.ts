import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 SEO Bot",
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
    const body = await req.json();
    let { url } = body;

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

    // ❗ dynamic import (IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const images = new Set<string>();

    $("img").each((_, el) => {
      const src = $(el).attr("src");

      if (!src) return;

      try {
        const absolute = new URL(src, url).href;
        images.add(absolute);
      } catch {}
    });

    const list = Array.from(images).slice(0, 200);

    // 🔥 Safe XML escape
    const escapeXML = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${list
  .map(
    (img) => `
<url>
  <loc>${escapeXML(url)}</loc>
  <image:image>
    <image:loc>${escapeXML(img)}</image:loc>
  </image:image>
</url>`
  )
  .join("")}
</urlset>`;

    return NextResponse.json({
      images: list,
      xml,
    });
  } catch (error) {
    return NextResponse.json({
      images: [],
      xml: "",
      error: "Failed to process request",
    });
  }
}