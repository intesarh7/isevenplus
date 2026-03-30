import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 fetch with timeout
async function fetchWithTimeout(url: string, options: any = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    let { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    // ✅ normalize
    url = url.trim();
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const baseUrl = new URL(url);
    const baseHost = baseUrl.hostname;

    // 🔥 fetch main page
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch website" },
        { status: 500 }
      );
    }

    const html = await response.text();

    // ❗ FIX: dynamic import
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const anchors = $("a");

    const MAX_LINKS = 120;
    const linkMap = new Map<string, { url: string; type: string }>();

    anchors.each((i, el) => {
      if (i >= MAX_LINKS) return false;

      let href = $(el).attr("href");
      if (!href) return;

      href = href.trim();

      if (
        href.startsWith("#") ||
        href.startsWith("javascript") ||
        href.startsWith("mailto")
      ) {
        return;
      }

      try {
        const full = href.startsWith("http")
          ? href
          : new URL(href, url).href;

        const type = full.includes(baseHost) ? "internal" : "external";

        if (!linkMap.has(full)) {
          linkMap.set(full, { url: full, type });
        }
      } catch {}
    });

    const links = Array.from(linkMap.values());

    // 🔥 controlled batching (IMPORTANT)
    const finalLinks: any[] = [];
    const BATCH = 10;

    for (let i = 0; i < links.length; i += BATCH) {
      const batch = links.slice(i, i + BATCH);

      const results = await Promise.allSettled(
        batch.map(async (link) => {
          try {
            const res = await fetchWithTimeout(link.url, {
              method: "GET",
            });

            let status = res.status;

            if (status === 500 || status === 0) {
              status = 200;
            }

            return { ...link, status };
          } catch {
            return { ...link, status: 500 };
          }
        })
      );

      results.forEach((r) => {
        if (r.status === "fulfilled") {
          finalLinks.push(r.value);
        }
      });
    }

    // 🔥 stats
    let internal = 0;
    let external = 0;
    let broken = 0;
    let healthy = 0;

    finalLinks.forEach((l) => {
      if (l.type === "internal") internal++;
      else external++;

      if (l.status >= 400) broken++;
      else healthy++;
    });

    const total = internal + external;

    const brokenRatio = total
      ? Math.round((broken / total) * 100)
      : 0;

    const healthyRatio = 100 - brokenRatio;

    let densityScore = 0;

    if (total <= 30) densityScore = 25;
    else if (total <= 80) densityScore = 60;
    else if (total <= 150) densityScore = 85;
    else densityScore = 100;

    return NextResponse.json({
      total,
      internal,
      external,
      unique: links.length,
      broken,
      healthy,
      brokenRatio,
      healthyRatio,
      densityScore,
      links: finalLinks,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}