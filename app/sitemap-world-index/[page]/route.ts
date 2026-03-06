import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const pageParam = params.page;

  // extract number from sitemap-world-1.xml
  const page = parseInt(pageParam.replace("sitemap-world-", "").replace(".xml", ""));

  if (!page || page < 1) {
    return new NextResponse("Invalid sitemap page", { status: 404 });
  }

  const limit = 50000;
  const offset = (page - 1) * limit;

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT postal_code, country_code 
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
      const slug = `${row.country_code}-${row.postal_code}`
        .toLowerCase()
        .replace(/\s+/g, "-");

      return `
<url>
<loc>${baseUrl}/postal-code/${slug}</loc>
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