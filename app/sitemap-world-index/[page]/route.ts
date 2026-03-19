import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

const LIMIT = 5000;

/* =========================
   ADVANCED SLUGIFY
========================= */
function slugify(text: string) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // remove accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/["'`´]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function safeSlug(val?: string) {
  if (!val) return "";
  return slugify(val);
}

/* =========================
   XML ESCAPE
========================= */
function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* =========================
   BUILD CLEAN URL (FIXED)
========================= */
function buildPostalUrl(data: any) {
  const country = safeSlug(data.country_code) || "unknown";

  let state =
    safeSlug(data.admin1) ||
    safeSlug(data.place_name) ||
    "na";

  let city =
    safeSlug(data.place_name) ||
    safeSlug(data.admin1) ||
    "na";

  // ✅ FIX: duplicate avoid
  if (state === city) {
    city = `${city}-area`;
  }

  const postal =
    data.postal_code
      ?.toString()
      .replace(/\s+/g, "-")
      .replace(/[^0-9a-zA-Z-]/g, "") ||
    "000000";

  return `/postalcode/${country}/${state}/${city}/${postal}`;
}

/* =========================
   API
========================= */
export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
      "https://www.isevenplus.com";

    const page = parseInt(params.page || "1");

    if (isNaN(page) || page < 1) {
      return new NextResponse("Invalid page", { status: 400 });
    }

    const offset = (page - 1) * LIMIT;

    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT postal_code,
              country_code,
              admin1,
              place_name
       FROM worldwide_postal_codes
       ORDER BY id ASC
       LIMIT ? OFFSET ?`,
      [LIMIT, offset]
    );

    if (!rows || rows.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const now = new Date().toISOString();

    const urls = rows
      .map((row) => {
        const path = buildPostalUrl(row);
        if (!path) return "";

        return `
<url>
<loc>${escapeXml(baseUrl + path)}</loc>
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;
      })
      .filter(Boolean)
      .join("");

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
    console.error("World Sitemap Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}