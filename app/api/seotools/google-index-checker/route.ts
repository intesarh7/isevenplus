import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function normalizeDomain(input: string) {

    let url = input.trim();

    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    return url.replace(/\/$/, "");

}

/* GET INTERNAL LINKS */

async function crawlPage(url: string) {

    try {

        const res = await fetch(url, { cache: "no-store" });

        const html = await res.text();

        const $ = cheerio.load(html);

        const links = new Set<string>();

        $("a").each((_, el) => {

            const href = $(el).attr("href");

            if (!href) return;

            if (href.startsWith("/")) {
                links.add(url + href);
            }

            if (href.startsWith(url)) {
                links.add(href);
            }

        });

        return [...links];

    } catch {

        return [];

    }

}

/* PAGINATION DETECT */

function detectPagination(urls: string[]) {

    const pages: string[] = [];

    urls.forEach(u => {

        if (/page\/\d+/.test(u)) pages.push(u);

    });

    return pages;

}

/* BLOG ARCHIVE DETECT */

function detectBlogArchive(urls: string[]) {

    return urls.filter(u =>
        u.includes("/blog") ||
        u.includes("/category") ||
        u.includes("/tag")
    );

}

/* GOOGLE INDEX CHECK */

async function checkIndexed(url: string) {

    try {

        const res = await fetch(
            `https://www.google.com/search?q=site:${encodeURIComponent(url)}`,
            {
                headers: { "User-Agent": "Mozilla/5.0" }
            }
        );

        const html = await res.text();

        return html.includes(url);

    } catch {

        return false;

    }

}

export async function POST(req: Request) {

    const { domain } = await req.json();

    const site = normalizeDomain(domain);

    /* STEP 1 — CRAWL HOME */

    const links = await crawlPage(site);

    /* STEP 2 — PAGINATION */

    const pagination = detectPagination(links);

    /* STEP 3 — BLOG ARCHIVE */

    const blog = detectBlogArchive(links);

    const allUrls = [...new Set([...links, ...pagination, ...blog])];

    /* LIMIT */

    const urls = allUrls.slice(0, 5000);

    /* STEP 4 — FAST INDEX CHECK */

    const checks = await Promise.all(
        urls.map(async (u) => ({
            url: u,
            indexed: await checkIndexed(u)
        }))
    );

    const indexed = checks.filter(r => r.indexed).length;

    return NextResponse.json({

        total: checks.length,
        indexed,
        notIndexed: checks.length - indexed,
        urls: checks

    });

}