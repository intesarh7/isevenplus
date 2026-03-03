import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const now = new Date().toISOString();

  const sitemaps = [
    "sitemap-world-1.xml",
    "sitemap-world-2.xml",
    "sitemap-world-3.xml",
    "sitemap-world-4.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `
  <sitemap>
    <loc>${new URL(`/${s}`, baseUrl).toString()}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Robots-Tag": "noindex"
    },
  });
}