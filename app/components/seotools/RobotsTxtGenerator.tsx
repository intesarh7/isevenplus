"use client";

import { useState } from "react";
import {
    FileText,
    RefreshCcw,
    Download,
    Settings
} from "lucide-react";

export default function RobotsTxtGenerator() {

    const [site, setSite] = useState("");
    const [disallow, setDisallow] = useState("/admin\n/login\n/private");
    const [allow, setAllow] = useState("/");
    const [sitemap, setSitemap] = useState("");
    const [result, setResult] = useState("");

    const generate = () => {

        const txt = `User-agent: *
Allow: ${allow}

${disallow.split("\n").map(d => `Disallow: ${d}`).join("\n")}

${sitemap ? `Sitemap: ${sitemap}` : ""}
`;

        setResult(txt);

    };

    const reset = () => {
        setSite("");
        setDisallow("");
        setAllow("/");
        setSitemap("");
        setResult("");
    };

    const download = () => {

        const blob = new Blob([result], { type: "text/plain" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "robots.txt";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="text-indigo-600" />
                    Robots.txt Generator
                </h1>

                <p className="text-gray-600">
                    Generate a robots.txt file to control how search engine crawlers access your website.
                </p>

                <input
                    type="text"
                    placeholder="Website URL (optional)"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div>

                    <label className="text-sm font-medium">
                        Allow Path
                    </label>

                    <input
                        value={allow}
                        onChange={(e) => setAllow(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full mt-1"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Disallow Paths (one per line)
                    </label>

                    <textarea
                        rows={4}
                        value={disallow}
                        onChange={(e) => setDisallow(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full mt-1"
                    />

                </div>

                <div>

                    <label className="text-sm font-medium">
                        Sitemap URL
                    </label>

                    <input
                        placeholder="https://example.com/sitemap.xml"
                        value={sitemap}
                        onChange={(e) => setSitemap(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full mt-1"
                    />

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={generate}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        <Settings size={18} />
                        Generate Robots.txt
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

            {result && (

                <div className="bg-white border rounded-xl p-6 space-y-4">

                    <h2 className="text-xl font-semibold">
                        Generated robots.txt
                    </h2>

                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                        {result}
                    </pre>

                    <button
                        onClick={download}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        <Download size={16} />
                        Download robots.txt
                    </button>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Robots.txt Generator
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A robots.txt file is an important part of technical SEO that tells search engine crawlers which pages or sections of a website they can access and which ones they should avoid. It acts as a set of instructions for search engine bots like Googlebot, Bingbot, and other web crawlers.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The Robots.txt Generator tool allows website owners to quickly create a properly formatted robots.txt file without manually writing code. By defining allow and disallow rules, you can control how search engines crawl your website and ensure that sensitive or irrelevant pages are not indexed.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Robots.txt Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When a search engine crawler visits a website, it first checks the robots.txt file located in the root directory. This file contains instructions that guide the crawler on which pages or directories should be crawled and which ones should be ignored.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Generate robots.txt instantly</li>
                        <li>Control search engine crawling</li>
                        <li>Protect sensitive directories</li>
                        <li>Improve technical SEO</li>
                        <li>Include sitemap references</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "robots.txt generator",
                            "seo robots generator",
                            "create robots.txt online",
                            "robots txt creator",
                            "robots file generator"
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