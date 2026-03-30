import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 safe fetch
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

// 🔥 XML escape (IMPORTANT)
function escapeXML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function POST(req: NextRequest) {
  try {
    let { url } = await req.json();

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

    if (!html) {
      return NextResponse.json({
        videos: [],
        xml: "",
        message: "Unable to fetch page.",
      });
    }

    // ❗ FIX: dynamic import
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const videos: any[] = [];

    $("video source, iframe").each((_, el) => {
      const src = $(el).attr("src");

      if (!src) return;

      try {
        const absolute = new URL(src, url).href;

        videos.push({
          url: absolute,
          title: "Video Content",
          date: new Date().toISOString(),
        });
      } catch {}
    });

    const list = videos.slice(0, 50);

    if (list.length === 0) {
      return NextResponse.json({
        videos: [],
        xml: "",
        message: "No video content found on this page.",
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${list
  .map(
    (v) => `
<url>
  <loc>${escapeXML(url)}</loc>
  <video:video>
    <video:title>${escapeXML(v.title)}</video:title>
    <video:content_loc>${escapeXML(v.url)}</video:content_loc>
    <video:publication_date>${v.date}</video:publication_date>
  </video:video>
</url>`
  )
  .join("")}
</urlset>`;

    return NextResponse.json({
      videos: list,
      xml,
      message: "Video sitemap generated successfully.",
    });
  } catch {
    return NextResponse.json({
      videos: [],
      xml: "",
      message: "Unable to scan this page.",
    });
  }
}