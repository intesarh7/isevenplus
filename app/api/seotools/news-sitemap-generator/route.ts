import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {

    try {

        let { url } = await req.json();

        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 SEO Bot"
            }
        });

        const html = await res.text();

        const $ = cheerio.load(html);

        const articles: any[] = [];

        $("a").each((_, el) => {

            const href = $(el).attr("href");
            const title = $(el).text().trim();

            if (!href || title.length < 10) return;

            try {

                const absolute = new URL(href, url).href;

                articles.push({
                    url: absolute,
                    title,
                    date: new Date().toISOString()
                });

            } catch { }

        });

        const list = articles.slice(0, 50);

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${list.map(a => `
<url>
<loc>${a.url}</loc>
<news:news>
<news:publication>
<news:name>Website</news:name>
<news:language>en</news:language>
</news:publication>
<news:publication_date>${a.date}</news:publication_date>
<news:title>${a.title}</news:title>
</news:news>
</url>`).join("")}
</urlset>`;

        return NextResponse.json({
            articles: list,
            xml
        });

    } catch {

        return NextResponse.json({
            articles: [],
            xml: ""
        });

    }

}