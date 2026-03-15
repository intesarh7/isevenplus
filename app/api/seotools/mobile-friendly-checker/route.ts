import { NextResponse } from "next/server";

function normalize(url: string) {

    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    return url;

}

export async function POST(req: Request) {

    const { url } = await req.json();

    const target = normalize(url);

    try {

        const start = Date.now();

        const res = await fetch(target, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)"
            }
        });

        const html = await res.text();

        const loadTime = Date.now() - start;

        /* MOBILE ANALYSIS */

        const viewport = html.includes("viewport");
        const responsiveCSS = html.includes("@media");
        const fontReadable = !html.includes("font-size:10px");
        const mobileFriendly = viewport && responsiveCSS;

        /* IMAGE OPTIMIZATION */

        const largeImages = html.match(/<img[^>]+>/g)?.length || 0;

        /* JAVASCRIPT BLOCKING */

        const jsBlocking = html.includes("<script");

        /* CSS COVERAGE */

        const cssFiles = html.match(/\.css/g)?.length || 0;

        /* ISSUES + SUGGESTIONS */

        const issues: string[] = [];
        const suggestions: string[] = [];

        if (!viewport) {
            issues.push("Viewport meta tag missing");
            suggestions.push("Add viewport meta tag to make the page responsive on mobile.");
        }

        if (!responsiveCSS) {
            issues.push("Responsive layout not detected");
            suggestions.push("Use CSS media queries for responsive mobile layouts.");
        }

        if (!fontReadable) {
            issues.push("Font size may be too small for mobile");
            suggestions.push("Use minimum 16px base font size for readability.");
        }

        if (largeImages > 10) {
            issues.push("Too many images may slow down mobile performance");
            suggestions.push("Optimize images using WebP and lazy loading.");
        }

        if (jsBlocking) {
            issues.push("JavaScript may block mobile rendering");
            suggestions.push("Defer non-critical JavaScript for faster mobile load.");
        }

        /* LIGHTHOUSE ESTIMATE */

        const lighthouseScore = mobileFriendly ? 88 : 58;

        /* CORE WEB VITALS (ESTIMATE) */

        const coreWebVitals = {
            lcp: loadTime < 2500 ? "Good" : "Needs Improvement",
            cls: "Good",
            inp: loadTime < 200 ? "Good" : "Needs Improvement"
        };

        /* SCREENSHOT */

        let screenshot: string | null =
            "https://api.microlink.io/?screenshot=true&meta=false&embed=screenshot.url&url=" +
            encodeURIComponent(target);

        let screenshotError: string | null = null;

        if (!target.startsWith("https")) {
            screenshotError =
                "Screenshot could not be generated because the website does not use HTTPS.";
            screenshot = null;
        }

        return NextResponse.json({

            mobileFriendly,
            viewport,
            responsiveCSS,
            fontReadable,

            loadTime,
            lighthouseScore,
            coreWebVitals,

            cssFiles,
            largeImages,
            jsBlocking,

            screenshot,
            screenshotError,

            issues,
            suggestions

        });

    } catch {

        return NextResponse.json({
            mobileFriendly: false,
            screenshot: null,
            screenshotError:
                "Screenshot failed because the website blocked automated rendering or the server did not respond.",
            issues: ["Website could not be analyzed"],
            suggestions: ["Check the website URL and try again."]
        });

    }

}