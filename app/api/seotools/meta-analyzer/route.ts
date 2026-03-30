import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
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
      return NextResponse.json({
        error: "Failed to fetch URL",
      });
    }

    // ❗ IMPORTANT FIX
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const title = $("title").text() || null;
    const description =
      $('meta[name="description"]').attr("content") || null;

    const canonical =
      $('link[rel="canonical"]').attr("href") || null;

    const robots =
      $('meta[name="robots"]').attr("content") || null;

    const viewport =
      $('meta[name="viewport"]').attr("content") || null;

    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      null;

    const h1 = $("h1").length;
    const h2 = $("h2").length;
    const h3 = $("h3").length;
    const h4 = $("h4").length;
    const h5 = $("h5").length;
    const h6 = $("h6").length;

    const totalImages = $("img").length;
    const missingAlt = $("img:not([alt])").length;

    let internalLinks = 0;
    let externalLinks = 0;

    const baseHost = new URL(url).hostname;

    $("a").each((_, el) => {
      const href = $(el).attr("href") || "";

      try {
        if (
          href.startsWith("/") ||
          href.includes(baseHost)
        ) {
          internalLinks++;
        } else if (href.startsWith("http")) {
          externalLinks++;
        }
      } catch {}
    });

    const schemaTypes: any[] = [];

    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() || "");

        if (json["@type"]) {
          schemaTypes.push(json["@type"]);
        }
      } catch {}
    });

    // 🔥 score calculation
    let score = 0;

    if (title) score += 20;
    if (description) score += 20;
    if (h1 > 0) score += 20;
    if (missingAlt === 0) score += 10;
    if (canonical) score += 10;
    if (viewport) score += 10;
    if (schemaTypes.length) score += 10;

    score = Math.min(score, 100);

    return NextResponse.json({
      title,
      description,
      canonical,
      robots,
      viewport,
      favicon,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      internalLinks,
      externalLinks,
      totalImages,
      missingAlt,
      schemaTypes,
      score,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch URL",
    });
  }
}