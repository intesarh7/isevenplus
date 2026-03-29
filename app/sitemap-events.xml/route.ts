import { NextResponse } from "next/server";
import db from "@/app/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // ✅ Fetch all slugs
    const [rows]: any = await db.query(
      `SELECT slug, updated_at 
       FROM event_wishes 
       WHERE is_deleted = 0 AND slug IS NOT NULL`
    );

    // ✅ XML generate
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
      },
    });

  } catch (error) {
    console.error("Sitemap Error:", error);

    return new NextResponse("Error generating sitemap", {
      status: 500,
    });
  }
}
