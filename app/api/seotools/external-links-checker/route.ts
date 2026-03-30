import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {

    const { url } = await req.json();

    try {

        const res = await fetch(url);
        const html = await res.text();

        const $ = cheerio.load(html);

        const base = new URL(url).hostname;

        const links: any[] = [];

        $("a[href]").each((_, el) => {

            const href = $(el).attr("href");
            const anchor = $(el).text().trim();
            const rel = $(el).attr("rel");

            if (!href) return;

            try {

                const absolute = new URL(href, url).href;
                const domain = new URL(absolute).hostname;

                if (domain !== base) {

                    links.push({
                        href: absolute,
                        anchor,
                        rel,
                        broken: false
                    });

                }

            } catch { }

        });

        return NextResponse.json({ links });

    } catch {

        return NextResponse.json({ links: [] });

    }

}