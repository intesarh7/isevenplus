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
        { error: "URL required" },
        { status: 400 }
      );
    }

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    if (!html) {
      return NextResponse.json({
        articles: [],
        xml: "",
      });
    }

    // ❗ IMPORTANT FIX
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const articles: any[] = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      const title = $(el).text().trim();

      if (!href || title.length < 10) return;

      try {
        const absolute = new URL(href, url).href;

        articles.push({
          url: absolute,
          title,
          date: new Date().toISOString(),
        });
      } catch {}
    });

    const list = articles.slice(0, 50);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${list
  .map(
    (a) => `
<url>
  <loc>${escapeXML(a.url)}</loc>
  <news:news>
    <news:publication>
      <news:name>Website</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${a.date}</news:publication_date>
    <news:title>${escapeXML(a.title)}</news:title>
  </news:news>
</url>`
  )
  .join("")}
</urlset>`;

    return NextResponse.json({
      articles: list,
      xml,
    });
  } catch {
    return NextResponse.json({
      articles: [],
      xml: "",
    });
  }
}