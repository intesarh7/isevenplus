import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
      redirect: "follow",
    });

    return await res.text();
  } catch {
    return "";
  }
}

// 🔥 Absolute URL helper
function toAbsoluteUrl(base: string, link: string) {
  try {
    return new URL(link, base).href;
  } catch {
    return null;
  }
}

// 🔥 Timeout fetch (important)
async function fetchWithTimeout(url: string, timeout = 7000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    clearTimeout(id);
    return res;
  } catch {
    clearTimeout(id);
    throw new Error("timeout");
  }
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
        links: [],
        totalScanned: 0,
      });
    }

    // ❗ FIX: dynamic import
    const cheerio = await import("cheerio");
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

    // 🔥 batching (VERY IMPORTANT)
    const BATCH = 5;

    for (let i = 0; i < links.length; i += BATCH) {
      const batch = links.slice(i, i + BATCH);

      const results = await Promise.allSettled(
        batch.map(async (link) => {
          try {
            const res = await fetchWithTimeout(link);

            if (res.status >= 400) {
              return { url: link, status: res.status };
            }

            return null;
          } catch {
            return { url: link, status: 500 };
          }
        })
      );

      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value) {
          brokenLinks.push(r.value);
        }
      });
    }

    return NextResponse.json({
      links: brokenLinks,
      totalScanned: links.length,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to scan links" },
      { status: 500 }
    );
  }
}