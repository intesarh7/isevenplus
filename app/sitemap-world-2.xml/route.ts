import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const limit = 50000;
  const offset = 50000;

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT postal_code 
     FROM worldwide_postal_codes 
     LIMIT ${limit} OFFSET ${offset}`
  );

  const urls = rows
    .map(
      (row: any) => `
  <url>
    <loc>${new URL(`/world/${row.postal_code}`, baseUrl).toString()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}