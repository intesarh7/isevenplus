import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {

    try {

        let { url } = await req.json();

        if (!url) {
            return NextResponse.json({ urls: [], xml: "" });
        }

        // ensure protocol
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; iSevenPlusBot/1.0; +https://isevenplus.com)"
            },
            redirect: "follow",
            cache: "no-store"
        });

        const html = await response.text();

        if (!html) {
            return NextResponse.json({ urls: [], xml: "" });
        }

        const $ = cheerio.load(html);

        const base = new URL(url).origin;

        const urls = new Set<string>();

        urls.add(url);

        $("a[href]").each((_, el) => {

            let href = $(el).attr("href");

            if (!href) return;

            try {

                const absolute = new URL(href, url).href;

                if (absolute.startsWith(base)) {
                    urls.add(absolute.split("#")[0]);
                }

            } catch { }

        });

        const urlList = Array.from(urls).slice(0, 200);

        const xml =
            `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urlList
                .map(
                    (u) => `
                <url>
                <loc>${u}</loc>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
                </url>`
                )
                .join("")}
                </urlset>`;

        return NextResponse.json({
            urls: urlList,
            xml
        });

    } catch (error) {

        console.error("Sitemap generator error:", error);

        return NextResponse.json({
            urls: [],
            xml: ""
        });

    }

}