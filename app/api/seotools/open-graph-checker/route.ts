import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {

    const { url } = await req.json();

    try {

        const res = await fetch(url);
        const html = await res.text();

        const $ = cheerio.load(html);

        const data = {

            title: $('meta[property="og:title"]').attr("content"),
            description: $('meta[property="og:description"]').attr("content"),
            image: $('meta[property="og:image"]').attr("content"),
            url: $('meta[property="og:url"]').attr("content"),
            type: $('meta[property="og:type"]').attr("content"),
            twitterCard: $('meta[name="twitter:card"]').attr("content")

        };

        return NextResponse.json(data);

    } catch {

        return NextResponse.json({});

    }

}