import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {

  const { url } = await req.json();

  try {

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      }
    });

    const html = await response.text();

    const $ = cheerio.load(html);

    const title = $("title").text();

    const description = $('meta[name="description"]').attr("content");

    const canonical = $('link[rel="canonical"]').attr("href");

    const robots = $('meta[name="robots"]').attr("content");

    const viewport = $('meta[name="viewport"]').attr("content");

    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");

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

    $("a").each((i, el) => {

      const href = $(el).attr("href") || "";

      if (href.startsWith("/") || href.includes(new URL(url).hostname)) {
        internalLinks++;
      } else if (href.startsWith("http")) {
        externalLinks++;
      }

    });

    const schemaTypes: any[] = [];

    $('script[type="application/ld+json"]').each((i, el) => {

      try {

        const json = JSON.parse($(el).html() || "");

        if (json["@type"]) {
          schemaTypes.push(json["@type"]);
        }

      } catch {}

    });

    let score = 0;

    if (title) score += 20;
    if (description) score += 20;
    if (h1 > 0) score += 20;
    if (missingAlt === 0) score += 10;
    if (canonical) score += 10;
    if (viewport) score += 10;
    if (schemaTypes.length) score += 10;

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
      score
    });

  } catch (error) {

    return NextResponse.json({
      error: "Failed to fetch URL"
    });

  }

}