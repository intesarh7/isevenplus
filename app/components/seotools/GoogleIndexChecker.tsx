"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    Globe,
    Download,
    CheckCircle,
    XCircle,
    BarChart
} from "lucide-react";

export default function GoogleIndexChecker() {

    const [domain, setDomain] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const scan = async () => {

        if (!domain) return;

        setLoading(true);

        try {

            const controller = new AbortController();

            const timeout = setTimeout(() => controller.abort(), 20000);

            const res = await fetch("/api/seotools/google-index-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            const json = await res.json();

            setData(json);

        } catch (e) {

            console.error(e);
            alert("Scan failed or timed out");

        }

        setLoading(false);

    };

    const downloadCSV = () => {

        if (!data) return

        const rows = [
            ["URL", "Indexed"],
            ...data.urls.map((u: any) => [u.url, u.indexed ? "YES" : "NO"])
        ]

        const csv = rows.map(r => r.join(",")).join("\n")

        const blob = new Blob([csv], { type: "text/csv" })

        const link = document.createElement("a")

        link.href = URL.createObjectURL(blob)
        link.download = "index-report.csv"
        link.click()

    }

    return (

        <div className="space-y-10">

            <div className="bg-white border rounded-xl p-6 space-y-5">

                <h1 className="text-2xl font-bold flex gap-2 items-center">
                    <Globe className="text-indigo-600" />
                    Google Index Coverage Checker
                </h1>

                <p className="text-gray-600">
                    Scan your website sitemap and check which pages are indexed by Google.
                </p>

                <input
                    placeholder="example.com"
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="border px-4 py-3 rounded-lg w-full"
                />

                <button
                    onClick={scan}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg w-full"
                >

                    {loading ?
                        <>
                            <Loader2 className="animate-spin" />
                            Scanning Website
                        </>
                        :
                        <>
                            <Search />
                            Scan Index Coverage
                        </>
                    }

                </button>

            </div>

            {data && (

                <div className="space-y-6">

                    {/* COVERAGE REPORT */}

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                            <div className="text-green-600 font-semibold flex gap-2 items-center">
                                <CheckCircle size={18} /> Indexed
                            </div>
                            <div className="text-3xl font-bold">{data.indexed}</div>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
                            <div className="text-red-600 font-semibold flex gap-2 items-center">
                                <XCircle size={18} /> Not Indexed
                            </div>
                            <div className="text-3xl font-bold">{data.notIndexed}</div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                            <div className="text-blue-600 font-semibold flex gap-2 items-center">
                                <BarChart size={18} /> Total URLs
                            </div>
                            <div className="text-3xl font-bold">{data.total}</div>
                        </div>

                    </div>

                    {/* DOWNLOAD */}

                    <button
                        onClick={downloadCSV}
                        className="flex gap-2 items-center bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        <Download size={16} />
                        Download CSV
                    </button>

                    {/* URL TABLE */}

                    <div className="bg-white border rounded-xl overflow-hidden">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50">

                                <tr>
                                    <th className="p-3 text-left">URL</th>
                                    <th className="p-3">Index Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                {data?.urls?.map((u: any, i: number) => (

                                    <tr key={i} className="border-t">

                                        <td className="p-3 break-all text-blue-600">{u.url}</td>

                                        <td className="p-3 text-center">

                                            {u.indexed
                                                ?
                                                <span className="text-green-600 flex items-center justify-center gap-1">
                                                    <CheckCircle size={14} /> Indexed
                                                </span>
                                                :
                                                <span className="text-red-600 flex items-center justify-center gap-1">
                                                    <XCircle size={14} /> Not Indexed
                                                </span>
                                            }

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}
            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        What is a Google Index Checker?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A Google Index Checker is an SEO tool used to determine whether a webpage is included in Google's search index. If a page is indexed, it means Google has crawled and stored it in its database, making it eligible to appear in search results when users search for related keywords.
                    </p>

                    <p className="text-gray-700 mt-2">
                        Website owners and SEO professionals use index checkers to ensure that important pages are visible in search engines. If a page is not indexed, it will not generate organic search traffic.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Google Indexing Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Google indexing happens in several steps. First, Google bots crawl webpages by following links. Then the crawled content is analyzed and stored in Google's massive search index. Finally, when someone searches for a keyword, Google retrieves relevant pages from this index.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Googlebot discovers a page through links or sitemaps</li>
                        <li>The page is crawled and analyzed</li>
                        <li>The content is added to Google's index</li>
                        <li>The page becomes eligible to appear in search results</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Why Pages May Not Be Indexed
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>The page contains a <code>noindex</code> meta tag</li>
                        <li>The page is blocked in robots.txt</li>
                        <li>The page is very new and not crawled yet</li>
                        <li>Low quality or duplicate content</li>
                        <li>The page has no internal links</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How to Fix Indexing Issues
                    </h2>

                    <p className="text-gray-700 mt-2">
                        If your page is not indexed, there are several steps you can take to help Google discover and index it faster.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Submit the page URL in Google Search Console</li>
                        <li>Add internal links pointing to the page</li>
                        <li>Include the page in your XML sitemap</li>
                        <li>Remove accidental noindex tags</li>
                        <li>Improve content quality and uniqueness</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "google index checker",
                            "check if page indexed",
                            "google indexing checker",
                            "seo index checker",
                            "site index checker"
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

    )

}