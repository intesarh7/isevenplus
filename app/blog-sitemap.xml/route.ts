import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {

  const [rows]: any = await db.query(`
    SELECT slug, updatedAt
    FROM blogs
    WHERE status='published'
    AND deletedAt IS NULL
    ORDER BY updatedAt DESC
  `);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  const urls = rows
    .map((blog: any) => {

      const lastmod = blog.updatedAt
        ? new Date(blog.updatedAt).toISOString()
        : new Date().toISOString();

      return `
        <url>
          <loc>${baseUrl}/blog/${blog.slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;

    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>

  <urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  ${urls}

  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}