import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; iSevenPlusBot/1.0; +https://isevenplus.com)",
      },
      redirect: "follow",
      cache: "no-store",
    });

    return await res.text();
  } catch {
    return "";
  }
}

// 🔥 XML escape (VERY IMPORTANT)
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
      return NextResponse.json({ urls: [], xml: "" });
    }

    // normalize
    url = url.trim();
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const html = await fetchHTML(url);

    if (!html) {
      return NextResponse.json({ urls: [], xml: "" });
    }

    // ❗ FINAL FIX: dynamic import
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const base = new URL(url).origin;

    const urls = new Set<string>();
    urls.add(url);

    $("a[href]").each((_, el) => {
      let href = $(el).attr("href");
      if (!href) return;

      try {
        const absolute = new URL(href, url).href;

        if (absolute.startsWith(base)) {
          urls.add(absolute.split("#")[0]);
        }
      } catch {}
    });

    const urlList = Array.from(urls).slice(0, 200);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (u) => `
<url>
  <loc>${escapeXML(u)}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`
  )
  .join("")}
</urlset>`;

    return NextResponse.json({
      urls: urlList,
      xml,
    });
  } catch (error) {
    console.error("Sitemap generator error:", error);

    return NextResponse.json({
      urls: [],
      xml: "",
    });
  }
}