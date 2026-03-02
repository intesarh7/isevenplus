import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const sitemaps = [
    "sitemap-tools.xml",
    "sitemap-india-pincodes.xml",
    "sitemap-world-postal.xml",
    "sitemap-states.xml",
    "sitemap-cities.xml",
    "sitemap-blog.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `
  <sitemap>
    <loc>${baseUrl}/${s}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}