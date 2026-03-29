import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// ✅ cache enable (VERY IMPORTANT)
export const revalidate = 3600; // 1 hour cache

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://isevenplus.com";

    // ✅ LIMIT add karo (DB bachao)
    const [rows]: any = await db.query(
      `SELECT slug, updated_at 
       FROM event_wishes 
       WHERE is_deleted = 0 
       AND slug IS NOT NULL
       ORDER BY updated_at DESC
       LIMIT 500`
    );

    const urls = rows
      .map((row: any) => {
        return `
  <url>
    <loc>${baseUrl}/events/wish/${row.slug}</loc>
    <lastmod>${new Date(row.updated_at).toISOString()}</lastmod>
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
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });

  } catch (error) {
    console.error("Sitemap Error:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
    });
  }
}
