"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    CheckCircle,
    AlertTriangle,
    FileText
} from "lucide-react";

export default function RobotsTxtTester() {

    const [site, setSite] = useState("");
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const test = async () => {

        if (!site) return;

        setLoading(true);
        setResult(null);
        setErrors([]);

        try {

            const res = await fetch("/api/seotools/robots-txt-tester", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ site, path })
            });

            const data = await res.json();

            setContent(data.content || "");
            setResult(data.result || null);
            setErrors(data.errors || []);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setSite("");
        setPath("");
        setContent("");
        setResult(null);
        setErrors([]);
    };

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="text-indigo-600" />
                    Robots.txt Tester & Validator
                </h1>

                <p className="text-gray-600">
                    Test and validate robots.txt rules to check whether a URL is allowed or blocked for search engine crawlers.
                </p>

                <input
                    placeholder="Website URL (example.com)"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <input
                    placeholder="Path to test (example: /admin)"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={test}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Testing
                            </>
                            :
                            <>
                                <Search size={18} />
                                Test Robots.txt
                            </>
                        }

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

            {content && (

                <div className="bg-white border rounded-xl p-6 space-y-6">

                    <h2 className="text-xl font-semibold">
                        Robots.txt Content
                    </h2>

                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                        {content}
                    </pre>

                    {result && (

                        <div className="flex items-center gap-2">

                            {result === "allowed"
                                ?
                                <span className="flex items-center gap-2 text-green-600">
                                    <CheckCircle size={16} />
                                    URL Allowed for Crawling
                                </span>
                                :
                                <span className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle size={16} />
                                    URL Blocked by Robots.txt
                                </span>
                            }

                        </div>

                    )}

                    {errors.length > 0 && (

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg space-y-3">

                            <h3 className="font-semibold text-yellow-800">
                                Validation Warnings
                            </h3>

                            <ul className="list-disc pl-5 text-sm text-yellow-700">
                                {errors.map((e, i) => (
                                    <li key={i}>{e}</li>
                                ))}
                            </ul>

                            <div className="bg-white border rounded p-3 text-sm">

                                <strong>How to Fix:</strong>

                                <ul className="list-disc pl-5 mt-2 space-y-1">

                                    <li>
                                        Lines starting with <code>#</code> are comments and safe to keep.
                                    </li>

                                    <li>
                                        Ensure directives follow correct syntax like:
                                    </li>

                                </ul>

                                <pre className="bg-gray-100 p-3 rounded mt-2 text-xs">
                                    User-agent: *
                                    Allow: /
                                    Disallow: /admin
                                    Sitemap: https://example.com/sitemap.xml
                                </pre>

                                <p className="mt-2 text-gray-600">
                                    If the warning is caused by comments, you can safely ignore it.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Robots.txt Tester
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A robots.txt tester allows website owners and SEO professionals to verify how search engine crawlers interpret their robots.txt file. This file controls which parts of a website search engine bots are allowed to crawl and index. By testing robots.txt rules, you can ensure that important pages are accessible to search engines while private or unnecessary pages remain blocked.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Robots.txt Validation Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        The Robots.txt Tester fetches the robots.txt file from a website and analyzes its rules. It checks for syntax errors, invalid directives, and conflicting rules that could affect how search engine bots interpret the file. The tool also allows you to test specific URLs to determine whether they are allowed or blocked according to the robots.txt rules.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Verify robots.txt rules instantly</li>
                        <li>Detect robots.txt syntax errors</li>
                        <li>Test whether URLs are crawlable</li>
                        <li>Prevent accidental blocking of pages</li>
                        <li>Improve technical SEO configuration</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "robots txt tester",
                            "robots.txt validator",
                            "seo robots tester",
                            "robots file validator",
                            "robots crawler tester"
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