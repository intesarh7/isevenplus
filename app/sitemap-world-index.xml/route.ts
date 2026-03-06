import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const now = new Date().toISOString();

  const limit = 50000;

  // total rows
  const [[{ total }]]: any = await db.query(
    `SELECT COUNT(*) as total FROM worldwide_postal_codes`
  );

  const totalPages = Math.ceil(total / limit);

  const sitemaps: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    sitemaps.push(`sitemap-world-${i}.xml`);
  }

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
    },
  });
}