"use client";

import { useState } from "react";

type Img = {
    src: string;
    alt: string | null;
    width?: number;
    height?: number;
    loading?: string | null;
};

export default function ImageAltTagChecker() {

    const [url, setUrl] = useState("");
    const [html, setHtml] = useState("");
    const [images, setImages] = useState<Img[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchHTML() {

        if (!url) {
            setError("Please enter a website URL");
            return;
        }

        setLoading(true);   // START LOADER
        setError("");

        let cleanUrl = url.trim();

        if (!cleanUrl.startsWith("http")) {
            cleanUrl = "https://" + cleanUrl;
        }

        try {

            const res = await fetch(
                `/api/seotools/image-alt-tag-checker?url=${encodeURIComponent(cleanUrl)}`
            );

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Unable to fetch HTML");
                setLoading(false);
                return;
            }

            setHtml(data.html || "");

            const imgs = data.images || [];

            setImages(imgs);

            seoAudit(imgs);

        } catch {

            setError("Failed to fetch website");

        }

        setLoading(false); // STOP LOADER
    }

    function absolute(src: string, base: string) {

        if (src.startsWith("http")) return src;

        return new URL(src, base).href;

    }

    function analyze(content: string, baseUrl?: string) {

        if (!content) {

            setError("Paste HTML or enter URL first.");
            return;

        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");

        const imgTags = Array.from(doc.querySelectorAll("img"));

        if (imgTags.length === 0) {

            setImages([]);
            setScore(0);

            setWarnings([
                "No images found on this page.",
                "For SEO optimization add images with descriptive ALT tags."
            ]);

            return;

        }

        const result: Img[] = imgTags.map((img: any) => {

            let src = img.getAttribute("src") || "";

            if (baseUrl && src) {

                try {

                    src = new URL(src, baseUrl).href;

                } catch { }

            }

            if (baseUrl) src = absolute(src, baseUrl);

            return {

                src,
                alt: img.getAttribute("alt"),
                width: img.width,
                height: img.height,
                loading: img.getAttribute("loading")

            }

        });

        setImages(result);

        seoAudit(result);

    }

    function seoAudit(imgs: Img[]) {

        let warn: string[] = [];
        let s = 100;

        const missingAlt = imgs.filter(i => !i.alt);
        const emptyAlt = imgs.filter(i => i.alt === "");
        const lazyMissing = imgs.filter(i => i.loading !== "lazy");
        const dimensionMissing = imgs.filter(i => !i.width || !i.height);

        if (missingAlt.length) {

            warn.push(`${missingAlt.length} images missing ALT text. Add descriptive ALT for SEO and accessibility.`);
            s -= 20;

        }

        if (emptyAlt.length) {

            warn.push(`${emptyAlt.length} images have empty ALT attributes.`);
            s -= 10;

        }

        if (lazyMissing.length) {

            warn.push(`${lazyMissing.length} images not using lazy loading. Add loading="lazy" to improve page speed.`);
            s -= 10;

        }

        if (dimensionMissing.length) {

            warn.push(`${dimensionMissing.length} images missing width/height attributes which can cause layout shift.`);
            s -= 10;

        }

        setWarnings(warn);
        setScore(Math.max(s, 0));

    }

    function aiSuggestion(src: string) {

        const name = src.split("/").pop()?.split(".")[0];

        return name?.replace(/[-_]/g, " ");

    }

    function download() {

        const csv = images.map(i => `${i.src},${i.alt || ""}`).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "image-seo-report.csv";
        a.click();

    }

    return (

        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-4">
                Image ALT Tag Checker
            </h1>

            <div className="flex gap-3 mb-4">

                <input
                    className="border p-3 w-full rounded"
                    placeholder="Enter Website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button
                    onClick={fetchHTML}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                            Scanning...
                        </>
                    ) : (
                        "Scan"
                    )}
                </button>

            </div>

            <textarea
                className="border w-full p-3 rounded h-40"
                placeholder="Paste HTML code"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
            />

            <button
                onClick={() => analyze(html)}
                className="bg-green-600 text-white px-6 py-3 rounded mt-3"
            >
                Analyze
            </button>

            <p className="text-xs text-gray-500 mt-5">
                Scanned URL: {url}
            </p>
            <p className="text-sm text-gray-500">
                Images Found: {images?.length || 0}
            </p>
            {error && (

                <div className="bg-red-100 p-4 mt-6 rounded">
                    {error}
                </div>

            )}

            {score !== null && (

                <div className="bg-indigo-50 p-4 mt-6 rounded">

                    <h3 className="font-semibold">
                        SEO Score : {score}/100
                    </h3>

                </div>

            )}

            {warnings.length > 0 && (

                <div className="bg-yellow-50 p-4 mt-6 rounded">

                    <h3 className="font-semibold mb-2">
                        SEO Warnings
                    </h3>

                    <ul className="list-disc ml-6">

                        {warnings.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}

                    </ul>

                </div>

            )}

            <div className="mt-8 space-y-4">

                {images.map((img, i) => (

                    <div key={i} className="border p-4 rounded flex gap-4">

                        <img
                            src={img.src}
                            className="w-16 h-16 object-cover"
                        />

                        <div className="flex-1">

                            <p className="text-xs break-all text-gray-500">
                                {img.src}
                            </p>

                            <p className={`${!img.alt ? "text-red-600" : "text-green-600"}`}>
                                ALT: {img.alt || "Missing"}
                            </p>

                            {!img.alt && (

                                <p className="text-sm text-blue-600">
                                    Suggested ALT: {aiSuggestion(img.src)}
                                </p>

                            )}

                            <p className="text-xs text-gray-500">
                                Lazy loading: {img.loading || "Not used"}
                            </p>

                            <p className="text-xs text-gray-500">
                                Dimensions: {img.width || 0} x {img.height || 0}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

            {images.length > 0 && (

                <button
                    onClick={download}
                    className="bg-gray-800 text-white px-6 py-3 rounded mt-6"
                >
                    Download Report
                </button>

            )}

            {/* SEO CONTENT */}

            <div className="mt-12 space-y-6">

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        About Image ALT Tag Checker
                    </h2>

                    <p>
                        Image ALT tags are essential for search engine optimization and accessibility. This tool scans all images on a webpage and detects missing or duplicate ALT attributes that may affect SEO performance.
                    </p>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        How Image ALT Tag Analysis Works
                    </h2>

                    <p>
                        The tool extracts every image element from the webpage and checks whether an ALT attribute exists. It also identifies empty ALT text, duplicates and calculates an SEO score based on best practices.
                    </p>

                    <div className="bg-gray-100 p-3 rounded mt-3 text-sm">

                        Best Practice:
                        Each image should have a unique and descriptive ALT attribute.

                    </div>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc ml-6">

                        <li>Improve image SEO</li>
                        <li>Detect missing ALT tags</li>
                        <li>Enhance accessibility for screen readers</li>
                        <li>Optimize pages for Google Image search</li>
                        <li>Improve website SEO score</li>

                    </ul>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 text-sm">

                        <span className="bg-gray-200 px-3 py-1 rounded">image alt tag checker</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">alt attribute checker</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">seo image analyzer</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">missing alt tag tool</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">image seo checker</span>

                    </div>

                </div>

            </div>

        </div>

    )

}