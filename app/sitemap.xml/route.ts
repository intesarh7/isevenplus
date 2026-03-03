import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const sitemaps = [
    "sitemap-tools.xml",
    "sitemap-india-pincodes.xml",
    "sitemap-states.xml",
    "sitemap-cities.xml",
    // "sitemap-world-index.xml",
    // "sitemap-blog.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `
  <sitemap>
    <loc>${new URL(`/${s}`, baseUrl).toString()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
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