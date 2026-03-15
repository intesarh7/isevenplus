"use client";

import { useState } from "react";

export default function HeadingTagChecker() {

    const [url, setUrl] = useState("");
    const [html, setHtml] = useState("");
    const [result, setResult] = useState<any>(null);
    const [score, setScore] = useState<number>(0);
    const [warnings, setWarnings] = useState<string[]>([]);

    async function fetchHTML() {

        if (!url) return;

        try {

            const res = await fetch(`/api/heading-tag-checker?url=${encodeURIComponent(url)}`);
            const data = await res.text();

            setHtml(data);
            analyzeHTML(data);

        } catch (err) {
            alert("Unable to fetch HTML");
        }

    }

    function analyzeHTML(content: string) {

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");

        const headings = {
            h1: Array.from(doc.querySelectorAll("h1")).map(e => e.textContent),
            h2: Array.from(doc.querySelectorAll("h2")).map(e => e.textContent),
            h3: Array.from(doc.querySelectorAll("h3")).map(e => e.textContent),
            h4: Array.from(doc.querySelectorAll("h4")).map(e => e.textContent),
            h5: Array.from(doc.querySelectorAll("h5")).map(e => e.textContent),
            h6: Array.from(doc.querySelectorAll("h6")).map(e => e.textContent)
        };

        setResult(headings);

        let warn: string[] = [];
        let seoScore = 100;

        if (headings.h1.length === 0) {
            warn.push("No H1 tag found");
            seoScore -= 30;
        }

        if (headings.h1.length > 1) {
            warn.push("Multiple H1 tags detected");
            seoScore -= 20;
        }

        if (headings.h2.length === 0) {
            warn.push("No H2 tags found");
            seoScore -= 10;
        }

        const order = ["h1", "h2", "h3", "h4", "h5", "h6"];

        for (let i = 0; i < order.length - 1; i++) {

            if (result && result[order[i + 1]]?.length && !result[order[i]]?.length) {

                warn.push(`Heading hierarchy issue: ${order[i + 1]} used before ${order[i]}`);
                seoScore -= 10;

            }

        }

        setWarnings(warn);
        setScore(Math.max(seoScore, 0));

    }

    function downloadReport() {

        if (!result) return;

        const report = `
        Heading SEO Report

        SEO Score: ${score}

        Warnings:
        ${warnings.join("\n")}

        H1 Tags:
        ${result.h1.join("\n")}

        H2 Tags:
        ${result.h2.join("\n")}

        H3 Tags:
        ${result.h3.join("\n")}
        `;

        const blob = new Blob([report], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "heading-report.txt";
        a.click();

    }

    return (

        <div className=" mx-auto p-6">

            <h1 className="text-3xl font-bold mb-4">
                Heading Tag Checker (H1–H6)
            </h1>

            <p className="text-gray-600 mb-6">
                Analyze heading structure of any webpage and improve your on-page SEO.
            </p>

            <div className="flex gap-3 mb-4">

                <input
                    type="text"
                    placeholder="Enter Website URL"
                    className="border p-3 w-full rounded"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button
                    onClick={fetchHTML}
                    className="bg-indigo-600 text-white px-6 rounded"
                >
                    Fetch
                </button>

            </div>

            <textarea
                placeholder="Or paste HTML here"
                className="w-full border rounded p-3 h-40"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
            />

            <button
                onClick={() => analyzeHTML(html)}
                className="bg-green-600 text-white px-6 py-3 rounded mt-3"
            >
                Analyze
            </button>

            {score !== 0 && (

                <div className="mt-6 p-4 bg-indigo-50 rounded">

                    <h3 className="text-lg font-semibold">
                        SEO Score: {score}/100
                    </h3>

                </div>

            )}

            {warnings.length > 0 && (

                <div className="mt-6 bg-yellow-50 p-4 rounded">

                    <h3 className="font-semibold mb-2">
                        Warnings
                    </h3>

                    <ul className="list-disc ml-6">

                        {warnings.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}

                    </ul>

                </div>

            )}

            {result && (

                <div className="mt-8">

                    {Object.entries(result).map(([tag, items]: any) => (
                        <div key={tag} className="mb-4">

                            <h3 className="font-semibold uppercase">
                                {tag}
                            </h3>

                            <ul className="list-disc ml-6">

                                {items.map((text: string, i: number) => (
                                    <li key={i}>{text}</li>
                                ))}

                            </ul>

                        </div>
                    ))}

                    <button
                        onClick={downloadReport}
                        className="bg-gray-700 text-white px-6 py-3 rounded mt-4"
                    >
                        Download Report
                    </button>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="mt-12 space-y-6">

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        About Heading Tag Checker
                    </h2>

                    <p>
                        Heading Tag Checker helps you analyze H1, H2, H3, H4, H5 and H6 tags
                        from a webpage. Proper heading structure improves readability,
                        SEO ranking, and search engine crawling.
                    </p>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        How Heading Tag Analysis Works
                    </h2>

                    <p>
                        The tool scans HTML content and extracts heading tags used in
                        a webpage. It also checks heading hierarchy and detects SEO issues.
                    </p>

                    <div className="bg-gray-100 p-3 rounded mt-3 text-sm">

                        Heading hierarchy should follow:

                        H1 → H2 → H3 → H4 → H5 → H6

                    </div>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc ml-6">

                        <li>Improve on-page SEO</li>
                        <li>Detect multiple H1 issues</li>
                        <li>Ensure correct heading hierarchy</li>
                        <li>Improve content readability</li>
                        <li>Optimize pages for search engines</li>

                    </ul>

                </div>

                <div className="bg-gray-50 p-5 rounded">

                    <h2 className="font-semibold text-lg mb-2">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 text-sm">

                        <span className="bg-gray-200 px-3 py-1 rounded">heading tag checker</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">h1 h2 checker</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">seo heading analyzer</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">html heading checker</span>
                        <span className="bg-gray-200 px-3 py-1 rounded">on page seo tools</span>

                    </div>

                </div>

            </div>

        </div>

    );

}