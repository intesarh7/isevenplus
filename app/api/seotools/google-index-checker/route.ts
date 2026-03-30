import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 🔥 Normalize domain
function normalizeDomain(input: string) {
  let url = input.trim();
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  return url.replace(/\/$/, "");
}

// 🔥 Safe fetch
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
      redirect: "follow",
    });
    return await res.text();
  } catch {
    return "";
  }
}

// 🔥 Crawl page (FIXED)
async function crawlPage(url: string) {
  try {
    const html = await fetchHTML(url);

    // ❗ dynamic import (VERY IMPORTANT FIX)
    const cheerio = await import("cheerio");
    const $ = cheerio.load(html);

    const links = new Set<string>();

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      try {
        if (href.startsWith("/")) {
          links.add(url + href);
        } else if (href.startsWith("http")) {
          const parsed = new URL(href);
          if (parsed.hostname === new URL(url).hostname) {
            links.add(parsed.href);
          }
        }
      } catch {}
    });

    return [...links];
  } catch {
    return [];
  }
}

// 🔥 Pagination detect
function detectPagination(urls: string[]) {
  return urls.filter((u) => /page\/\d+/.test(u));
}

// 🔥 Blog detect
function detectBlogArchive(urls: string[]) {
  return urls.filter(
    (u) =>
      u.includes("/blog") ||
      u.includes("/category") ||
      u.includes("/tag")
  );
}

// 🔥 Google index check (SAFE + LIMIT)
async function checkIndexed(url: string) {
  try {
    const res = await fetch(
      `https://www.google.com/search?q=site:${encodeURIComponent(url)}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      }
    );

    const html = await res.text();
    return html.includes(url);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json(
        { message: "Domain required" },
        { status: 400 }
      );
    }

    const site = normalizeDomain(domain);

    // STEP 1
    const links = await crawlPage(site);

    // STEP 2
    const pagination = detectPagination(links);

    // STEP 3
    const blog = detectBlogArchive(links);

    const allUrls = [...new Set([...links, ...pagination, ...blog])];

    // 🔥 SAFE LIMIT (VERY IMPORTANT)
    const urls = allUrls.slice(0, 200);

    // STEP 4 (parallel but safe)
    const checks = await Promise.all(
      urls.map(async (u) => ({
        url: u,
        indexed: await checkIndexed(u),
      }))
    );

    const indexed = checks.filter((r) => r.indexed).length;

    return NextResponse.json({
      total: checks.length,
      indexed,
      notIndexed: checks.length - indexed,
      urls: checks,
    });
  } catch (error) {
    return NextResponse.json({
      total: 0,
      indexed: 0,
      notIndexed: 0,
      urls: [],
      error: "Failed to process request",
    });
  }
}