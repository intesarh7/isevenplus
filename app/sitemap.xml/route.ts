import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const LIMIT = 5000;

// ===============================
// MEMORY CACHE (GLOBAL)
// ===============================
let cachedXml: string | null = null;
let lastGenerated = 0;

// ===============================
// SMART PING (1 baar / 24h)
// ===============================
let lastPingTime = 0;

async function pingSearchEngines(sitemapUrl: string) {
  const now = Date.now();

  // 24h throttle
  if (now - lastPingTime < 1000 * 60 * 60 * 24) return;

  lastPingTime = now;

  try {
    fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`).catch(() => {});
    fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`).catch(() => {});
  } catch {}
}

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  try {
    // ===============================
    // CACHE HIT (FAST RETURN)
    // ===============================
    if (cachedXml && Date.now() - lastGenerated < 1000 * 60 * 60) {
      return new NextResponse(cachedXml, {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const now = new Date().toISOString();

    // ===============================
    // INDIA COUNT (FAST)
    // ===============================
    const [[{ total: indiaTotal }]]: any = await db.query(
      `SELECT COUNT(*) as total FROM indian_pincodes`
    );

    const indiaPages = Math.ceil(indiaTotal / LIMIT);

    let indiaSitemaps = "";

    for (let i = 1; i <= indiaPages; i++) {
      indiaSitemaps += `
      <sitemap>
        <loc>${baseUrl}/sitemap-india-${i}.xml</loc>
        <lastmod>${now}</lastmod>
      </sitemap>`;
    }

    // ===============================
    // WORLD COUNT (FAST)
    // ===============================
    const [[{ total: worldTotal }]]: any = await db.query(
      `SELECT COUNT(*) as total FROM worldwide_postal_codes`
    );

    const worldPages = Math.ceil(worldTotal / LIMIT);

    let worldSitemaps = "";

    for (let i = 1; i <= worldPages; i++) {
      worldSitemaps += `
      <sitemap>
        <loc>${baseUrl}/sitemap-world-${i}.xml</loc>
        <lastmod>${now}</lastmod>
      </sitemap>`;
    }

    // ===============================
    // STATIC SITEMAPS
    // ===============================
    const staticSitemaps = [
      "sitemap-tools.xml",
      "sitemap-states.xml",
      "sitemap-cities.xml",
      "blog-sitemap.xml",
      "sitemap-seotools.xml",
    ];

    const staticXml = staticSitemaps
      .map(
        (s) => `
      <sitemap>
        <loc>${new URL(`/${s}`, baseUrl).toString()}</loc>
        <lastmod>${now}</lastmod>
      </sitemap>`
      )
      .join("");

    // ===============================
    // FINAL XML
    // ===============================
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticXml}
${indiaSitemaps}
${worldSitemaps}

</sitemapindex>`;

    // ===============================
    // SAVE CACHE
    // ===============================
    cachedXml = xml;
    lastGenerated = Date.now();

    // ===============================
    // PING SEARCH ENGINES
    // ===============================
    await pingSearchEngines(`${baseUrl}/sitemap.xml`);

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap index error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}