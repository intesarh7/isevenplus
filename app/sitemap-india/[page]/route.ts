import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

const LIMIT = 5000;

// slug helper
function slugify(text: any) {
  if (!text) return "";

  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

// XML escape
function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {
  try {
    const page = parseInt(params.page) || 1;

    if (isNaN(page) || page < 1) {
      return new NextResponse("Invalid page", { status: 400 });
    }

    const offset = (page - 1) * LIMIT;

    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://www.isevenplus.com";

    const baseUrl = rawBaseUrl.replace(/\/+$/, "");

    // ✅ FIXED QUERY (parameterized + stable order)
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        pincode,
        state,
        district,
        taluk,
        office_name
      FROM indian_pincodes
      ORDER BY id ASC
      LIMIT ? OFFSET ?
      `,
      [LIMIT, offset]
    );

    // 🔥 CRITICAL FIX (empty page ko 404 karo)
    if (!rows || rows.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const now = new Date().toISOString();

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

        const finalUrl = `${baseUrl}/${parts.join("/")}`
          .replace(/\/{2,}/g, "/")
          .replace(":/", "://");

        return `
  <url>
    <loc>${escapeXml(finalUrl)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .filter(Boolean) // 🔥 empty entries remove
      .join("");

    // extra safety
    if (!urls) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}