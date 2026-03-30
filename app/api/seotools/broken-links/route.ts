import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toAbsoluteUrl(base: string, link: string) {
  try {
    return new URL(link, base).href;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { message: "URL required" },
        { status: 400 }
      );
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const linksSet = new Set<string>();

    $("a").each((_, el) => {
      const href = $(el).attr("href");

      if (!href) return;

      const absolute = toAbsoluteUrl(url, href);

      if (absolute && absolute.startsWith("http")) {
        linksSet.add(absolute);
      }
    });

    const links = Array.from(linksSet);

    const brokenLinks: any[] = [];

    for (let link of links.slice(0, 30)) {
      try {
        // ❗ GET use karo instead of HEAD
        const check = await fetch(link, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });

        if (check.status >= 400) {
          brokenLinks.push({
            url: link,
            status: check.status,
          });
        }
      } catch {
        brokenLinks.push({
          url: link,
          status: 500,
        });
      }
    }

    return NextResponse.json({
      links: brokenLinks,
      totalScanned: links.length,
    });

  } catch (err) {
    return NextResponse.json(
      { message: "Failed to scan links" },
      { status: 500 }
    );
  }
}