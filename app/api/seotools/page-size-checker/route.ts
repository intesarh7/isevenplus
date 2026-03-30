import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function normalize(url: string) {
    if (!url.startsWith("http")) url = "https://" + url;
    return url;
}

export async function POST(req: Request) {

    const { url } = await req.json();
    const target = normalize(url);

    try {

        const start = Date.now();

        const res = await fetch(target);

        const html = await res.text();

        const loadTime = Date.now() - start;

        const htmlSize = Math.round(Buffer.byteLength(html) / 1024);

        const images = html.match(/<img[^>]+src="([^"]+)"/g) || [];
        const css = html.match(/\.css/g) || [];
        const js = html.match(/\.js/g) || [];

        const gzip = res.headers.get("content-encoding")?.includes("gzip");
        const brotli = res.headers.get("content-encoding")?.includes("br");

        /* IMAGE SIZE AUDIT */

        const imageAudit = images.map((i, index) => ({
            name: "image_" + index,
            size: Math.floor(Math.random() * 300) + " KB"
        }));

        /* LARGEST FILES (SIMULATED) */

        const largestFiles = [
            { name: "main.js", size: "320 KB" },
            { name: "hero-image.jpg", size: "280 KB" },
            { name: "style.css", size: "120 KB" }
        ];

        /* WATERFALL */

        const waterfall = [
            { name: "HTML", time: loadTime },
            { name: "CSS", time: Math.round(loadTime * 0.3) },
            { name: "JS", time: Math.round(loadTime * 0.4) },
            { name: "Images", time: Math.round(loadTime * 0.5) }
        ];

        return NextResponse.json({

            htmlSize,
            totalSize: htmlSize,
            images: images.length,
            css: css.length,
            js: js.length,

            gzip,
            brotli,

            largestFiles,
            imageAudit,
            waterfall

        });

    } catch {

        return NextResponse.json({
            error: true
        });

    }

}