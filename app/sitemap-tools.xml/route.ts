import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
export const dynamic = "force-dynamic";
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [tools] = await db.query<RowDataPacket[]>(
    "SELECT slug, updatedAt FROM tools WHERE isActive=1"
  );

  const urls = tools
    .map(
      (tool) => `
  <url>
    <loc>${new URL(`/tools/${tool.slug}`, baseUrl).toString()}</loc>
    <lastmod>${tool.updatedAt?.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}