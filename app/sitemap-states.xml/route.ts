import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
export const dynamic = "force-dynamic";
function slugify(text: string) {
  return text
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [states] = await db.query<RowDataPacket[]>(
    "SELECT DISTINCT state FROM indian_pincodes WHERE state IS NOT NULL AND state != ''"
  );

  const uniqueStates = [...new Set(states.map((row) => row.state))];

  const urls = uniqueStates
    .map((state) => {
      const slug = slugify(state);
      return `
  <url>
    <loc>${new URL(`/state/${slug}`, baseUrl).toString()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
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
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}