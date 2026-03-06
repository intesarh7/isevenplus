import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const LIMIT = 50000;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // ===============================
    // INDIA PINCODE SITEMAP
    // ===============================
    const [[{ total }]]: any = await db.query(
      `SELECT COUNT(*) as total FROM indian_pincodes`
    );

    const totalPages = Math.ceil(total / LIMIT);

    let indiaSitemaps = "";

    for (let i = 1; i <= totalPages; i++) {
      indiaSitemaps += `
      <sitemap>
        <loc>${baseUrl}/sitemap-india-${i}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>`;
    }

    // ===============================
    // WORLD POSTAL CODE SITEMAP
    // ===============================
    const [[{ total: worldTotal }]]: any = await db.query(
      `SELECT COUNT(*) as total FROM worldwide_postal_codes`
    );

    const worldPages = Math.ceil(worldTotal / LIMIT);

    let worldSitemaps = "";

    for (let i = 1; i <= worldPages; i++) {
      worldSitemaps += `
      <sitemap>
        <loc>${baseUrl}/sitemap-world-${i}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>`;
    }

    // ===============================
    // STATIC SITEMAPS
    // ===============================
    const staticSitemaps = [
      "sitemap-tools.xml",
      "sitemap-states.xml",
      "sitemap-cities.xml",
    ];

    const staticXml = staticSitemaps
      .map(
        (s) => `
      <sitemap>
        <loc>${new URL(`/${s}`, baseUrl).toString()}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>`
      )
      .join("");

    // ===============================
    // FINAL XML
    // ===============================
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticXml}

${indiaSitemaps}

${worldSitemaps}

</sitemapindex>`;

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
    console.error("Sitemap index error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}