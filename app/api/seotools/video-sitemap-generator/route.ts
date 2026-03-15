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

        const videos: any[] = [];

        $("video source, iframe").each((_, el) => {

            const src = $(el).attr("src");

            if (!src) return;

            try {

                const absolute = new URL(src, url).href;

                videos.push({
                    url: absolute,
                    title: "Video Content",
                    date: new Date().toISOString()
                });

            } catch { }

        });

        const list = videos.slice(0, 50);

        if (list.length === 0) {

            return NextResponse.json({
                videos: [],
                xml: "",
                message: "No video content found on this page."
            });

        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${list.map(v => `
<url>
<loc>${url}</loc>
<video:video>
<video:title>${v.title}</video:title>
<video:content_loc>${v.url}</video:content_loc>
<video:publication_date>${v.date}</video:publication_date>
</video:video>
</url>`).join("")}
</urlset>`;

        return NextResponse.json({
            videos: list,
            xml,
            message: "Video sitemap generated successfully."
        });

    } catch {

        return NextResponse.json({
            videos: [],
            xml: "",
            message: "Unable to scan this page."
        });

    }

}