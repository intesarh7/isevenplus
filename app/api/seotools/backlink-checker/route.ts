import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "URL required" }, { status: 400 });
  }

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept: "text/html",
      },
      maxRedirects: 5,
      validateStatus: () => true,
    });

    const html = response.data;

    if (!html || typeof html !== "string" || html.length < 1000) {
      return NextResponse.json({
        links: [],
        stats: { total: 0, dofollow: 0, nofollow: 0, domains: 0 },
        blocked: true,
      });
    }

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

    // 🚀 Remove duplicates (IMPORTANT)
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

  } catch (err: any) {
    return NextResponse.json({
      links: [],
      stats: { total: 0, dofollow: 0, nofollow: 0, domains: 0 },
      blocked: true,
      message: "Website blocked or failed to fetch",
    });
  }
}