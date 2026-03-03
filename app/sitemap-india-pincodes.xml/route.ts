import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

// ✅ XML escape function
function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT DISTINCT pincode, city, district, state FROM indian_pincodes"
  );

  const urls = rows
    .map((row) => {
      const parts = [
        row.pincode,
        row.city,
        row.district,
        row.state,
      ]
        .filter(Boolean)
        .map((part: string) => slugify(part));

      const fullUrl = `${baseUrl}/pincode/${parts.join("/")}`;

      return `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
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
}