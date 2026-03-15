import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {

    const { url } = await req.json();

    try {

        const res = await fetch(url);
        const html = await res.text();

        const $ = cheerio.load(html);

        const canonical = $('link[rel="canonical"]').attr("href");

        let status = "missing";

        if (canonical) {

            if (canonical === url) {
                status = "valid";
            } else {
                status = "different";
            }

        }

        return NextResponse.json({
            pageUrl: url,
            canonical,
            status
        });

    } catch {

        return NextResponse.json({
            pageUrl: url,
            canonical: null,
            status: "missing"
        });

    }

}