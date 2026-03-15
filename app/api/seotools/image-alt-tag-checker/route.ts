import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

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

    const response = await axios.get(url, {
      timeout: 20000,
      maxRedirects: 5,
      decompress: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://google.com",

      },
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const images: any[] = [];

    $("img").each((i, el) => {
      let src =
        $(el).attr("src") ||
        $(el).attr("data-src") ||
        $(el).attr("data-lazy") ||
        "";

      // handle srcset
      const srcset = $(el).attr("srcset");
      if (!src && srcset) {
        src = srcset.split(",")[0].trim().split(" ")[0];
      }

      if (!src) return;

      // absolute URL
      if (!src.startsWith("http")) {
        try {
          src = new URL(src, url!).href;
        } catch { }
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
      html: html.slice(0, 5000), // preview only
      images,
    });
  } catch (err: any) {
    console.error("FETCH ERROR:", err.message);

    return NextResponse.json({
      success: false,
      error: "Unable to fetch HTML",
    });
  }
}