"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Globe,
    AlertTriangle,
    CheckCircle,
    Link
} from "lucide-react";

type CanonicalData = {
    canonical?: string;
    pageUrl?: string;
    status?: string;
};

export default function CanonicalTagChecker() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CanonicalData | null>(null);

    const checkCanonical = async () => {

        if (!url) return;

        setLoading(true);
        setData(null);

        try {

            const res = await fetch("/api/seotools/canonical-tag-checker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const result = await res.json();

            setData(result);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setData(null);
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Link className="text-indigo-600" />
                    Canonical Tag Checker
                </h1>

                <p className="text-gray-600">
                    Analyze canonical tags on any webpage and verify whether the canonical URL is correctly implemented for SEO.
                </p>

                <input
                    type="url"
                    placeholder="Enter webpage URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={checkCanonical}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Scanning
                            </>
                            :
                            <>
                                <Search size={18} />
                                Check Canonical Tag
                            </>
                        }

                    </button>

                    <button
                        onClick={tryExample}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        Try Example
                    </button>

                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-gray-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        <RefreshCcw size={18} />
                        Reset
                    </button>

                </div>

            </div>

            {/* RESULT */}

            {data && (

                <div className="bg-white border rounded-xl p-6 space-y-6">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        Canonical Tag Result
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <p className="text-sm text-gray-500">Page URL</p>
                            <p className="break-all text-gray-800">{data.pageUrl}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Canonical URL</p>
                            <p className="break-all text-gray-800">
                                {data.canonical || "No canonical tag found"}
                            </p>
                        </div>

                        <div>

                            <p className="text-sm text-gray-500">Status</p>

                            {data.status === "valid" && (
                                <span className="flex items-center gap-2 text-green-600">
                                    <CheckCircle size={16} />
                                    Canonical tag correctly implemented
                                </span>
                            )}

                            {data.status === "missing" && (
                                <span className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle size={16} />
                                    Canonical tag missing
                                </span>
                            )}

                            {data.status === "different" && (
                                <span className="flex items-center gap-2 text-yellow-600">
                                    <AlertTriangle size={16} />
                                    Canonical URL differs from page URL
                                </span>
                            )}

                        </div>

                    </div>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Canonical Tag Checker
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A canonical tag is an HTML element that helps search engines understand which version of a webpage should be treated as the primary or preferred version. When websites have duplicate or similar content across multiple URLs, search engines may struggle to determine which page should rank in search results. The canonical tag solves this problem by specifying the original or preferred page.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The Canonical Tag Checker tool analyzes a webpage and detects whether a canonical tag is present. It extracts the canonical URL defined in the HTML head section and compares it with the actual page URL. This allows website owners, SEO professionals and developers to verify that canonical tags are correctly implemented and pointing to the right URL.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Canonical Tag Checking Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When you enter a webpage URL, the tool fetches the HTML of that page and scans the head section for a link element containing rel="canonical". If the canonical tag exists, the tool extracts its href value and compares it with the page URL. Based on this comparison, the system determines whether the canonical tag is valid, missing, or pointing to a different URL.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Detect missing canonical tags</li>
                        <li>Prevent duplicate content issues</li>
                        <li>Ensure correct canonical implementation</li>
                        <li>Improve search engine indexing</li>
                        <li>Strengthen technical SEO health</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "canonical tag checker",
                            "seo canonical url checker",
                            "canonical meta tag analyzer",
                            "duplicate content checker canonical",
                            "rel canonical checker",
                            "seo canonical analysis tool"
                        ].map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}

                    </div>

                </section>

            </div>

        </div>

    );

}