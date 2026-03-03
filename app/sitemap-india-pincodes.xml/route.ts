import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT DISTINCT pincode, district, state FROM indian_pincodes"
  );

  const urls = rows
    .map((row) => {
      // Safely build URL parts
      const parts = [
        row.pincode,
        row.city,
        row.district,
        row.state,
      ]
        .filter(Boolean) // remove null/undefined/empty
        .map((part: string) =>
          part
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
        );

      const fullUrl = `${baseUrl}/pincode/${parts.join("/")}`;

      return `
  <url>
    <loc>${fullUrl}</loc>
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
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Robots-Tag": "noindex",
    },
  });
}