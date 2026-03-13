import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

/* =========================
   HELPER (same as page)
========================= */
function formatSlug(text: string) {
  return text
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* =========================
   BUILD SEO URL
========================= */
function buildPostalUrl(data: any) {

  const country = formatSlug(data.country_code);
  const state = formatSlug(data.admin1 || "");
  const city = formatSlug(data.place_name || "");

  const postal = data.postal_code.split(" ")[0];

  const parts = ["postalcode", country];

  if (state) parts.push(state);
  if (city) parts.push(city);

  parts.push(postal);

  return "/" + parts.join("/");
}

export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const pageParam = params.page;

  const page = parseInt(
    pageParam.replace("sitemap-world-", "").replace(".xml", "")
  );

  if (!page || page < 1) {
    return new NextResponse("Invalid sitemap page", { status: 404 });
  }

  const limit = 50000;
  const offset = (page - 1) * limit;

  /* =========================
     IMPORTANT FIX
     Add state + city columns
  ========================= */

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT postal_code,
            country_code,
            admin1,
            place_name
     FROM worldwide_postal_codes
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  if (!rows.length) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const now = new Date().toISOString();

  const urls = rows
    .map((row) => {

      /* =========================
         USE SAME URL BUILDER
      ========================= */

      const path = buildPostalUrl(row);

      return `
<url>
<loc>${baseUrl}${path}</loc>
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}