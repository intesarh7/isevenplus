import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ❗ IMPORTANT: axios remove (SSR issue avoid)
async function fetchHTML(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    },
    redirect: "follow",
    cache: "no-store",
  });

  return await res.text();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let url = searchParams.get("url");

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

    // ❗ Safety check
    if (!html || html.length < 100) {
      return NextResponse.json({
        links: [],
        stats: { total: 0, dofollow: 0, nofollow: 0, domains: 0 },
        blocked: true,
      });
    }

    // ❗ dynamic import (IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const links: any[] = [];
    const domains = new Set<string>();

    $("a[href]").each((_, el) => {
      let href = $(el).attr("href");
      const anchor = $(el).text().trim();

      if (!href) return;

      // relative → absolute
      if (href.startsWith("/")) {
        try {
          const base = new URL(url!);
          href = base.origin + href;
        } catch {
          return;
        }
      }

      if (!href.startsWith("http")) return;

      const rel = $(el).attr("rel") || "";
      const type = rel.includes("nofollow") ? "nofollow" : "dofollow";

      links.push({
        source: href,
        anchor: anchor || "N/A",
        type,
      });

      try {
        const domain = new URL(href).hostname;
        domains.add(domain);
      } catch {}
    });

    // remove duplicates
    const uniqueLinks = Array.from(
      new Map(links.map((l) => [l.source, l])).values()
    );

    const stats = {
      total: uniqueLinks.length,
      dofollow: uniqueLinks.filter((l) => l.type === "dofollow").length,
      nofollow: uniqueLinks.filter((l) => l.type === "nofollow").length,
      domains: domains.size,
    };

    return NextResponse.json({
      links: uniqueLinks.slice(0, 200),
      stats,
      blocked: false,
    });
  } catch (error) {
    return NextResponse.json({
      links: [],
      stats: { total: 0, dofollow: 0, nofollow: 0, domains: 0 },
      blocked: true,
      message: "Failed to fetch or parse website",
    });
  }
}