"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Globe,
    Image,
    FileText,
    AlertTriangle,
    CheckCircle
} from "lucide-react";

type OGData = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    twitterCard?: string;
};

export default function OpenGraphTagChecker() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<OGData | null>(null);

    const checkTags = async () => {

        if (!url) return;

        setLoading(true);
        setData(null);

        try {

            const res = await fetch("/api/seotools/open-graph-checker", {
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
                    <Globe className="text-indigo-600" />
                    Open Graph Tag Checker
                </h1>

                <p className="text-gray-600">
                    Analyze Open Graph meta tags and preview how your webpage will appear when shared on social media platforms like Facebook, LinkedIn and Twitter.
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
                        onClick={checkTags}
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
                                Check Open Graph Tags
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

                <div className="bg-white border rounded-xl p-6 space-y-8">

                    <h2 className="text-xl font-semibold">
                        Open Graph Tag Results
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="space-y-3">

                            <div className="flex items-center gap-2">
                                <FileText size={18} />
                                <strong>OG Title:</strong>
                            </div>
                            <p className="text-gray-700">
                                {data.title || "Missing"}
                            </p>

                            <div className="flex items-center gap-2">
                                <FileText size={18} />
                                <strong>OG Description:</strong>
                            </div>
                            <p className="text-gray-700">
                                {data.description || "Missing"}
                            </p>

                            <div className="flex items-center gap-2">
                                <Globe size={18} />
                                <strong>OG URL:</strong>
                            </div>
                            <p className="text-gray-700 break-all">
                                {data.url || "Missing"}
                            </p>

                            <div className="flex items-center gap-2">
                                <Globe size={18} />
                                <strong>OG Type:</strong>
                            </div>
                            <p className="text-gray-700">
                                {data.type || "Missing"}
                            </p>

                            <div className="flex items-center gap-2">
                                <Globe size={18} />
                                <strong>Twitter Card:</strong>
                            </div>
                            <p className="text-gray-700">
                                {data.twitterCard || "Missing"}
                            </p>

                        </div>

                        <div>

                            <div className="flex items-center gap-2 mb-2">
                                <Image size={18} />
                                <strong>OG Image</strong>
                            </div>

                            {data.image ?

                                <img
                                    src={data.image}
                                    alt="Open Graph Preview"
                                    className="rounded-lg border"
                                />

                                :

                                <div className="text-red-600 flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    OG Image Missing
                                </div>

                            }

                        </div>

                    </div>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Open Graph Tag Checker
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Open Graph tags are meta tags that control how a webpage appears when shared on social media platforms such as Facebook, LinkedIn, WhatsApp and Twitter. These tags allow website owners to define the title, description and image that should be displayed when someone shares a link. Without proper Open Graph tags, social media platforms may display incomplete or incorrect previews of your content.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The Open Graph Tag Checker helps analyze whether a webpage contains the required Open Graph meta tags. It extracts important tags like og:title, og:description, og:image and og:url from the page and displays them in a structured report. This makes it easier for developers and SEO professionals to ensure their pages are optimized for social media sharing.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Open Graph Tag Checking Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When you enter a webpage URL, the tool fetches the HTML of that page and scans it for Open Graph meta tags. These tags usually appear in the head section of the HTML document. The tool then extracts each Open Graph property and displays it in an organized format so that users can quickly verify whether the tags are present and correctly configured.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Preview how your content appears on social media</li>
                        <li>Identify missing Open Graph tags</li>
                        <li>Improve social media click-through rate</li>
                        <li>Optimize link previews for Facebook and LinkedIn</li>
                        <li>Ensure proper meta tag implementation</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "open graph tag checker",
                            "og tag analyzer",
                            "social media meta tag checker",
                            "facebook open graph checker",
                            "meta tag preview tool",
                            "og image preview checker"
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