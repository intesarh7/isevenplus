"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Download,
    Globe,
    FileText
} from "lucide-react";

export default function NewsSitemapGenerator() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<any[]>([]);
    const [xml, setXml] = useState("");

    const generate = async () => {

        if (!url) return;

        setLoading(true);
        setArticles([]);
        setXml("");

        try {

            const res = await fetch("/api/seotools/news-sitemap-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            setArticles(data.articles || []);
            setXml(data.xml || "");

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setArticles([]);
        setXml("");
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    const downloadXML = () => {

        const blob = new Blob([xml], { type: "application/xml" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "news-sitemap.xml";

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
                    News Sitemap Generator
                </h1>

                <p className="text-gray-600">
                    Generate a Google News compliant XML sitemap including article title and publication date.
                </p>

                <input
                    type="url"
                    placeholder="Enter news website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={generate}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Generating
                            </>
                            :
                            <>
                                <Search size={18} />
                                Generate News Sitemap
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

            {articles.length > 0 && (

                <div className="bg-white border rounded-xl p-6 space-y-6 max-h-162.5 overflow-y-auto">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        Detected Articles ({articles.length})
                    </h2>
                    {xml && (

                        <button
                            onClick={downloadXML}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg"
                        >
                            <Download size={16} />
                            Download news-sitemap.xml
                        </button>

                    )}
                    <div className="space-y-3 text-sm">

                        {articles.map((a, i) => (
                            <div key={i} className="border rounded-lg p-3 bg-gray-50">

                                <div className="font-medium">{a.title}</div>

                                <div className="text-gray-600 break-all">{a.url}</div>

                                <div className="text-gray-500 text-xs">
                                    Published: {a.date}
                                </div>

                            </div>
                        ))}

                    </div>



                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About News Sitemap Generator
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A News Sitemap is a special XML sitemap designed specifically for news websites that publish articles frequently. Google News requires publishers to provide structured information about their latest articles including title, publication name and publication date. A properly configured news sitemap helps search engines discover news content faster and display it in Google News and Top Stories sections.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How News Sitemap Generation Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        The News Sitemap Generator scans a webpage and extracts article URLs, titles and publication dates. It then converts the data into a valid XML sitemap format using the Google News sitemap schema. This allows news publishers to submit the sitemap to search engines and ensure that newly published articles are indexed quickly.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Generate Google News compatible sitemap</li>
                        <li>Improve indexing speed for news articles</li>
                        <li>Help articles appear in Google News</li>
                        <li>Organize news content efficiently</li>
                        <li>Improve technical SEO for publishers</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "news sitemap generator",
                            "google news sitemap creator",
                            "news xml sitemap tool",
                            "generate news sitemap",
                            "seo news sitemap builder"
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