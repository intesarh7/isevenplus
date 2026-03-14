import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

export async function GET() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {

        /* ===============================
           SEO TOOLS
        ================================= */

        const [tools] = await db.query<RowDataPacket[]>(`
      SELECT slug, updatedAt
      FROM seo_tools
      WHERE isDeleted=0 AND isActive=1
    `);

        const toolUrls = tools
            .map(
                (tool) => `
  <url>
    <loc>${new URL(`/seotools/${tool.slug}`, baseUrl).toString()}</loc>
    <lastmod>${tool.updatedAt?.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
            )
            .join("");



        /* ===============================
           SEO TOOL CATEGORIES
        ================================= */

        const [categories] = await db.query<RowDataPacket[]>(`
      SELECT slug, updatedAt
      FROM seo_tools_categories
      WHERE isDeleted=0 AND isActive=1
    `);

        const categoryUrls = categories
            .map(
                (cat) => `
  <url>
    <loc>${new URL(`/seotools/category/${cat.slug}`, baseUrl).toString()}</loc>
    <lastmod>${cat.updatedAt?.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
            )
            .join("");



        /* ===============================
           MAIN SEO TOOLS PAGE
        ================================= */

        const mainPage = `
  <url>
    <loc>${new URL(`/seotools`, baseUrl).toString()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;


        /* ===============================
           FINAL XML
        ================================= */

        const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${mainPage}

${categoryUrls}

${toolUrls}

</urlset>`;


        return new NextResponse(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control":
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });

    } catch (error) {

        console.error("SEO tools sitemap error:", error);

        return new NextResponse("Internal Server Error", { status: 500 });

    }
}