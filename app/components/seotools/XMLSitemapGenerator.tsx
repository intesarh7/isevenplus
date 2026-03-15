"use client";

import { useState } from "react";
import {
    Globe,
    Search,
    Loader2,
    RefreshCcw,
    Download,
    FileText
} from "lucide-react";

export default function XMLSitemapGenerator() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<string[]>([]);
    const [xml, setXml] = useState("");

    const generateSitemap = async () => {

        if (!url) return;

        setLoading(true);
        setUrls([]);
        setXml("");

        try {

            const res = await fetch("/api/seotools/xml-sitemap-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            setUrls(data.urls || []);
            setXml(data.xml || "");

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setUrls([]);
        setXml("");
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    const downloadXML = () => {

        const blob = new Blob([xml], { type: "application/xml" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "sitemap.xml";

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
                    XML Sitemap Generator
                </h1>

                <p className="text-gray-600">
                    Generate an XML sitemap for your website to help search engines crawl and index your pages efficiently.
                </p>

                <input
                    type="url"
                    placeholder="Enter website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={generateSitemap}
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
                                Generate Sitemap
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

            {urls.length > 0 && (

                <div className="bg-white border rounded-xl p-6 space-y-8 max-h-162.5 overflow-y-auto">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        Generated URLs ({urls.length})
                    </h2>
                    {xml && (

                        <div className="space-y-3">

                            <button
                                onClick={downloadXML}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg"
                            >
                                <Download size={16} />
                                Download sitemap.xml
                            </button>

                        </div>

                    )}

                    <div className="space-y-2 text-sm">

                        {urls.map((u, i) => (
                            <div
                                key={i}
                                className="border rounded-lg px-3 py-2 bg-gray-50 break-all"
                            >
                                {u}
                            </div>
                        ))}

                    </div>

                    

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About XML Sitemap Generator
                    </h2>

                    <p className="text-gray-700 mt-2">
                        An XML sitemap is a structured file that lists all important URLs of a website to help search engines discover and index pages efficiently. Search engines like Google, Bing, and Yahoo use sitemaps to understand the structure of a website and identify which pages should be crawled. Without a sitemap, search engines may miss some pages, especially on large websites.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The XML Sitemap Generator tool automatically scans a webpage and extracts internal links to build a sitemap file. The generated sitemap follows the official XML sitemap protocol and can be submitted directly to search engines through tools like Google Search Console or Bing Webmaster Tools.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How XML Sitemap Generation Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When you enter a website URL, the tool fetches the HTML content of that page and scans it for internal links. Each discovered link is then added to a sitemap structure. The system generates an XML formatted document that contains all detected URLs, making it easier for search engines to crawl the website.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The generated sitemap can then be downloaded and uploaded to the root directory of your website. Once uploaded, you can submit the sitemap to search engines to improve indexing efficiency and visibility in search results.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Generate XML sitemap instantly</li>
                        <li>Help search engines crawl your website</li>
                        <li>Improve website indexing</li>
                        <li>Organize website structure</li>
                        <li>Boost technical SEO performance</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "xml sitemap generator",
                            "seo sitemap generator",
                            "generate sitemap online",
                            "website sitemap builder",
                            "xml sitemap creator",
                            "seo sitemap tool"
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