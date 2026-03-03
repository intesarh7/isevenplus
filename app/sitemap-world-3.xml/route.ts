import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

// ✅ Safe slug generator
function formatSlug(text: any) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")          // handle &
    .replace(/[^a-z0-9\s-]/g, "")  // remove special chars
    .trim()
    .replace(/\s+/g, "-")          // spaces → dash
    .replace(/-+/g, "-");          // remove duplicate dash
}

// ✅ XML escape protection
function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    // ✅ Remove trailing slash safely
    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://www.isevenplus.com";

    const baseUrl = rawBaseUrl.replace(/\/+$/, "");

    const limit = 50000;
    const offset = 100000;

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT postal_code, country_code, admin1, place_name 
       FROM worldwide_postal_codes
       LIMIT ${limit} OFFSET ${offset}`
    );

    const urls = rows
      .map((row: any) => {
        const country = formatSlug(row.country_code);
        const state = formatSlug(row.admin1);
        const city = formatSlug(row.place_name);
        const postal = row.postal_code?.toString().trim();

        if (!postal) return "";

        const parts: string[] = ["postalcode"];

        if (country) parts.push(country);
        if (state) parts.push(state);
        if (city) parts.push(city);

        parts.push(postal);

        const loc = `${baseUrl}/${parts.join("/")}`;

        return `
  <url>
    <loc>${escapeXml(loc)}</loc>
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
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (error) {
    console.error("Worldwide Sitemap (Offset 100000) Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}