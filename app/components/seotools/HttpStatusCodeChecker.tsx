"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Globe,
    CheckCircle,
    AlertTriangle,
    Shield,
    Server,
    Clock,
    Link
} from "lucide-react";

export default function HttpStatusCodeChecker() {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const check = async () => {

        if (!url) return

        setLoading(true)
        setData(null)

        try {

            const res = await fetch("/api/seotools/http-status-code-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            })

            const json = await res.json()

            setData(json)

        } catch (e) {

            alert("Request failed")

        }

        setLoading(false)

    }

    const reset = () => {
        setUrl("")
        setData(null)
    }

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex gap-2 items-center">
                    <Globe className="text-indigo-600" />
                    HTTP Status Code Checker
                </h1>

                <p className="text-gray-600">
                    Analyze HTTP response, redirects, headers, SSL, and server details for any webpage.
                </p>

                <input
                    placeholder="example.com"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={check}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" />
                                Checking
                            </>
                            :
                            <>
                                <Search />
                                Check Status
                            </>
                        }

                    </button>

                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-gray-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        <RefreshCcw />
                        Reset
                    </button>

                </div>

            </div>

            {/* RESULT */}

            {data && (

                <div className="space-y-6">

                    {/* SUMMARY */}

                    <div className="grid md:grid-cols-4 gap-4">

                        <div className="bg-green-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <CheckCircle size={16} /> Status
                            </div>
                            <div className="text-3xl font-bold text-green-600">
                                {data.status}
                            </div>
                        </div>

                        <div className="bg-blue-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Clock size={16} /> Response Time
                            </div>
                            <div className="text-xl font-semibold">
                                {data.responseTime} ms
                            </div>
                        </div>

                        <div className="bg-purple-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Server size={16} /> Server
                            </div>
                            <div className="text-lg font-semibold">
                                {data.server}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Shield size={16} /> SSL
                            </div>
                            <div className="text-lg font-semibold">
                                {data.ssl ? "Secure (HTTPS)" : "Not Secure"}
                            </div>
                        </div>

                    </div>

                    {/* REDIRECT CHAIN */}

                    {data.redirects?.length > 1 && (

                        <div className="bg-white border rounded-xl p-6">

                            <h3 className="font-semibold mb-4 flex gap-2 items-center">
                                <Link size={18} />
                                Redirect Chain
                            </h3>

                            <ul className="space-y-2 text-sm">

                                {data.redirects.map((r: any, i: number) => (
                                    <li key={i} className="flex justify-between border-b pb-2">
                                        <span className="break-all">{r.url}</span>
                                        <span className="font-medium">{r.status}</span>
                                    </li>
                                ))}

                            </ul>

                        </div>

                    )}

                    {/* HEADERS */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Response Headers
                        </h3>

                        <div className="max-h-64 overflow-y-auto text-sm">

                            {Object.entries(data.headers || {}).map(([k, v]: any) => (
                                <div key={k} className="flex justify-between border-b py-1">
                                    <span className="font-medium">{k}</span>
                                    <span className="text-gray-600 break-all">{v}</span>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section>

                    <h2 className="text-xl font-bold">
                        What is an HTTP Status Code Checker?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        An HTTP Status Code Checker is a technical SEO tool that analyzes how a web server responds to a request for a webpage. When a browser, search engine bot, or user visits a URL, the server returns an HTTP response code that indicates whether the request was successful, redirected, or failed.
                    </p>

                    <p className="text-gray-700 mt-2">
                        This tool helps website owners, developers, and SEO professionals understand server responses, identify redirect chains, detect server configuration issues, and ensure that pages are accessible to both users and search engines.
                    </p>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        How the HTTP Status Code Checker Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        The tool sends a request to the provided URL and inspects the server response headers. It then analyzes the HTTP response code, redirect chain, server information, caching configuration, SSL status, and response time.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">

                        <li>Checks the HTTP response status (200, 301, 404, etc.)</li>
                        <li>Detects redirect chains and final destination URL</li>
                        <li>Measures page response time</li>
                        <li>Inspects HTTP response headers</li>
                        <li>Detects server software and infrastructure</li>
                        <li>Checks SSL security and HTTPS configuration</li>
                        <li>Identifies caching headers and performance hints</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Common HTTP Status Codes Explained
                    </h2>

                    <p className="text-gray-700 mt-2">
                        HTTP status codes are grouped into categories depending on the result of the request. Understanding these codes helps diagnose technical SEO and server issues.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">

                        <li><strong>200 OK</strong> – The request was successful and the page loaded correctly.</li>

                        <li><strong>301 Moved Permanently</strong> – The page has permanently moved to a new URL and search engines should update their index.</li>

                        <li><strong>302 Found</strong> – A temporary redirect where the original URL may return later.</li>

                        <li><strong>403 Forbidden</strong> – The server understood the request but refuses access.</li>

                        <li><strong>404 Not Found</strong> – The requested page does not exist on the server.</li>

                        <li><strong>410 Gone</strong> – The page has been permanently removed.</li>

                        <li><strong>500 Internal Server Error</strong> – A server-side problem preventing the page from loading.</li>

                        <li><strong>503 Service Unavailable</strong> – The server is temporarily overloaded or under maintenance.</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Why HTTP Status Codes Matter for SEO
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Search engines rely heavily on HTTP status codes when crawling websites. If a page returns an incorrect status code, it may affect how search engines index and rank the page.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">

                        <li>404 and 410 errors may remove pages from search results</li>
                        <li>Incorrect redirects can cause SEO ranking loss</li>
                        <li>Redirect chains waste crawl budget</li>
                        <li>Server errors can block search engine crawlers</li>
                        <li>Slow response times can negatively affect rankings</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Advanced Insights Provided by This Tool
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Our HTTP Status Code Checker provides deeper diagnostics beyond basic status codes to help identify technical SEO problems.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">

                        <li>Redirect chain detection to identify multiple redirects</li>

                        <li>HTTP header inspection for server and caching information</li>

                        <li>Server technology detection (Apache, Nginx, Cloudflare, etc.)</li>

                        <li>Cache header analysis for performance optimization</li>

                        <li>SSL security check to verify HTTPS protection</li>

                        <li>Final destination URL detection after redirects</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Best Practices for Healthy HTTP Status Codes
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">

                        <li>Ensure all important pages return a <strong>200 OK</strong> response</li>

                        <li>Use <strong>301 redirects</strong> when permanently moving pages</li>

                        <li>Avoid long redirect chains</li>

                        <li>Fix broken links that return <strong>404 errors</strong></li>

                        <li>Monitor server performance and response times</li>

                        <li>Enable HTTPS and proper caching headers</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "http status code checker",
                            "http response code checker",
                            "check website status code",
                            "server response checker",
                            "http redirect checker",
                            "seo http status checker",
                            "check 301 redirect",
                            "website http header checker"
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