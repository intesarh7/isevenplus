import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

function formatSlug(text: string) {
  return text
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const limit = 50000;
  const offset = 100000; // pagination ke liye change karte rehna

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT postal_code, country_code, admin1, place_name 
     FROM worldwide_postal_codes
     LIMIT ${limit} OFFSET ${offset}`
  );

  const urls = rows
    .map((row: any) => {
      const country = formatSlug(row.country_code);
      const state = formatSlug(row.admin1 || "");
      const city = formatSlug(row.place_name || "");
      const postal = row.postal_code;
      const parts = ["postalcode", country];
      if (state) parts.push(state);
      if (city) parts.push(city);

      parts.push(postal);
      const loc = `${baseUrl}/${parts.join("/")}`;


      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}