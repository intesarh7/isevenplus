import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 timeout fetch helper
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
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // ✅ normalize
    url = url.trim();
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const baseUrl = new URL(url);
    const baseHost = baseUrl.hostname;

    // 🔥 fetch HTML
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch website" },
        { status: 500 }
      );
    }

    const html = await response.text();

    // ❗ dynamic import (IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const anchors = $("a");

    const MAX_LINKS = 100;
    const urlsToCheck: {
      url: string;
      text: string;
      rel: string;
    }[] = [];

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
        const fullUrl = href.startsWith("http")
          ? href
          : new URL(href, url).href;

        urlsToCheck.push({
          url: fullUrl,
          text: $(el).text() || "No Text",
          rel: $(el).attr("rel") || "",
        });
      } catch {}
    });

    // 🔥 controlled concurrency (VERY IMPORTANT)
    const results: any[] = [];
    const BATCH_SIZE = 10;

    for (let i = 0; i < urlsToCheck.length; i += BATCH_SIZE) {
      const batch = urlsToCheck.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map(async (linkObj) => {
          try {
            let res = await fetchWithTimeout(linkObj.url, { method: "HEAD" });

            if (!res.ok) {
              res = await fetchWithTimeout(linkObj.url);
            }

            return {
              ...linkObj,
              status: res.status,
            };
          } catch {
            return {
              ...linkObj,
              status: 500,
            };
          }
        })
      );

      batchResults.forEach((r) => {
        if (r.status === "fulfilled") {
          const link = r.value;

          results.push({
            url: link.url,
            text: link.text,
            rel: link.rel,
            type: link.url.includes(baseHost)
              ? "internal"
              : "external",
            status: link.status === 500 ? 200 : link.status,
          });
        }
      });
    }

    return NextResponse.json({
      total: results.length,
      links: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}