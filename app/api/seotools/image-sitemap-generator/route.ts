import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
export const dynamic = "force-dynamic";
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

        const images = new Set<string>();

        $("img").each((_, el) => {

            const src = $(el).attr("src");

            if (!src) return;

            try {

                const absolute = new URL(src, url).href;

                images.add(absolute);

            } catch { }

        });

        const list = Array.from(images).slice(0, 200);

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${list.map(img => `
<url>
<loc>${url}</loc>
<image:image>
<image:loc>${img}</image:loc>
</image:image>
</url>`).join("")}
</urlset>`;

        return NextResponse.json({
            images: list,
            xml
        });

    } catch {

        return NextResponse.json({
            images: [],
            xml: ""
        });

    }

}