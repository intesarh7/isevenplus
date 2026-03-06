import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

// ✅ Clean slug generator (safe for URLs)
function slugify(text: any) {
  if (!text) return "";

  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")          // handle &
    .replace(/\s+/g, "-")          // spaces → dash
    .replace(/[^\w-]/g, "")        // remove special chars
    .replace(/-+/g, "-");          // remove duplicate dashes
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
    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://www.isevenplus.com";

    const baseUrl = rawBaseUrl.replace(/\/+$/, "");

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
        pincode,
        state,
        district,
        taluk,
        office_name
      FROM indian_pincodes`
    );

    const urls = rows
      .map((item) => {
        const state = slugify(item.state);
        const district = slugify(item.district);
        const taluk = slugify(item.taluk);
        const office = slugify(item.office_name);
        const pincode = item.pincode?.toString().trim();

        if (!pincode) return "";

        const parts: string[] = ["pincode"];

        if (state) parts.push(state);
        if (district) parts.push(district);
        if (taluk) parts.push(taluk);
        if (office) parts.push(office);

        parts.push(pincode);

        const finalUrl = `${baseUrl}/${parts.join("/")}`;

        return `
  <url>
    <loc>${escapeXml(finalUrl)}</loc>
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
      },
    });
  } catch (error) {
    console.error("Sitemap Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}