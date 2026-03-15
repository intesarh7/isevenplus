import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {

  try {

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ links: [], pagesScanned: 0, seoScore: 0 });
    }

    let target = url;

    if (!target.startsWith("http")) {
      target = "https://" + target;
    }

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://google.com",

      },
      redirect: "follow",
      cache: "no-store",
    });

    const html = await response.text();

    if (!html) {
      return NextResponse.json({
        links: [],
        pagesScanned: 0,
        seoScore: 0,
      });
    }

    const $ = cheerio.load(html);

    const baseDomain = new URL(target).hostname;

    const links: any[] = [];

    $("a[href]").each((_, el) => {

      const rawHref = $(el).attr("href");
      const anchor = $(el).text().trim();

      if (!rawHref) return;

      try {

        const absolute = new URL(rawHref, target).href;
        const domain = new URL(absolute).hostname;

        const type = domain === baseDomain ? "internal" : "external";

        links.push({
          href: absolute,
          anchor,
          type,
        });

      } catch {}

    });

    const internal = links.filter((l) => l.type === "internal");

    let score = 40;

    score += Math.min(internal.length, 40);
    score += Math.min(links.length / 5, 20);

    score = Math.min(Math.round(score), 100);

    return NextResponse.json({
      links,
      pagesScanned: 1,
      seoScore: score,
    });

  } catch (error) {

    console.error("CRAWLER ERROR:", error);

    return NextResponse.json({
      links: [],
      pagesScanned: 0,
      seoScore: 0,
    });

  }

}