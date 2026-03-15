"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    Smartphone,
    CheckCircle,
    AlertTriangle,
    RefreshCcw,
    MonitorSmartphone
} from "lucide-react";

export default function MobileFriendlyChecker() {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const check = async () => {

        if (!url) return

        setLoading(true)
        setData(null)

        try {

            const res = await fetch("/api/seotools/mobile-friendly-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            })

            const json = await res.json()

            setData(json)

        } catch (e) {

            alert("Check failed")

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
                    <Smartphone className="text-indigo-600" />
                    Mobile Friendly Checker
                </h1>

                <p className="text-gray-600">
                    Analyze whether your webpage is optimized for mobile devices including viewport configuration, font readability, touch elements, and responsive design.
                </p>

                <input
                    placeholder="Enter website URL (example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
                                Test Mobile Friendliness
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
                                <CheckCircle size={16} /> Mobile Friendly
                            </div>
                            <div className="text-xl font-bold text-green-600">
                                {data.mobileFriendly ? "Yes" : "No"}
                            </div>
                        </div>

                        <div className="bg-blue-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">Viewport</div>
                            <div className="text-lg font-semibold">
                                {data.viewport ? "Detected" : "Missing"}
                            </div>
                        </div>

                        <div className="bg-purple-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">Font Size</div>
                            <div className="text-lg font-semibold">
                                {data.fontReadable ? "Readable" : "Too Small"}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">Touch Elements</div>
                            <div className="text-lg font-semibold">
                                {data.touchFriendly ? "Good" : "Too Close"}
                            </div>
                        </div>

                    </div>

                    {/* LIGHTHOUSE SCORE */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Google Lighthouse Mobile Score
                        </h3>

                        <div className="flex items-center gap-4">

                            <div className="text-4xl font-bold text-indigo-600">
                                {data.lighthouseScore}
                            </div>

                            <div className="text-sm text-gray-600">
                                Estimated mobile performance score based on page responsiveness and load time.
                            </div>

                        </div>

                    </div>

                    {/* CORE WEB VITALS */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Mobile Core Web Vitals
                        </h3>

                        <div className="grid md:grid-cols-3 gap-4">

                            <div className="bg-green-50 border p-4 rounded-lg">
                                <div className="text-sm text-gray-500">
                                    LCP (Largest Contentful Paint)
                                </div>
                                <div className="font-semibold">
                                    {data.coreWebVitals.lcp}
                                </div>
                            </div>

                            <div className="bg-blue-50 border p-4 rounded-lg">
                                <div className="text-sm text-gray-500">
                                    CLS (Cumulative Layout Shift)
                                </div>
                                <div className="font-semibold">
                                    {data.coreWebVitals.cls}
                                </div>
                            </div>

                            <div className="bg-purple-50 border p-4 rounded-lg">
                                <div className="text-sm text-gray-500">
                                    INP (Interaction to Next Paint)
                                </div>
                                <div className="font-semibold">
                                    {data.coreWebVitals.inp}
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* PAGE SPEED */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Mobile Page Speed
                        </h3>

                        <div className="text-lg font-semibold">
                            {data.loadTime} ms
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                            Page load speed affects mobile usability and search rankings.
                        </p>

                    </div>

                    {/* MOBILE SCREENSHOT */}

                    {/* MOBILE SCREENSHOT */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Mobile Screenshot Preview
                        </h3>

                        {data.screenshot ? (

                            <img
                                src={data.screenshot}
                                className="rounded-lg border"
                            />

                        ) : (

                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">

                                <strong>Screenshot not available</strong>

                                <p className="mt-2">
                                    {data.screenshotError}
                                </p>

                                <ul className="list-disc pl-6 mt-2 space-y-1">

                                    <li>The website may block automated screenshot tools.</li>
                                    <li>The page may require authentication.</li>
                                    <li>The website may block bots or API requests.</li>
                                    <li>The page may not allow iframe or external rendering.</li>

                                </ul>

                            </div>

                        )}

                    </div>

                    {/* MOBILE ISSUES */}

                    {data.issues?.length > 0 && (

                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl space-y-4">

                            <h3 className="font-semibold text-red-700">
                                Mobile Usability Issues
                            </h3>

                            <ul className="list-disc pl-6 text-sm space-y-1">

                                {data.issues.map((issue: string, i: number) => (
                                    <li key={i}>{issue}</li>
                                ))}

                            </ul>

                            <h4 className="font-semibold text-gray-700">
                                How to Fix
                            </h4>

                            <ul className="list-disc pl-6 text-sm space-y-1">

                                {data.suggestions.map((s: string, i: number) => (
                                    <li key={i}>{s}</li>
                                ))}

                            </ul>

                        </div>

                    )}

                    <div className="bg-blue-50 border p-5 rounded-xl">
                        <div className="text-sm text-gray-500">
                            Responsive Layout
                        </div>
                        <div className="font-semibold">
                            {data.responsiveCSS ? "Detected" : "Not Detected"}
                        </div>
                    </div>

                    <div className="bg-purple-50 border p-5 rounded-xl">
                        <div className="text-sm text-gray-500">
                            CSS Files Detected
                        </div>
                        <div className="font-semibold">
                            {data.cssFiles}
                        </div>
                    </div>

                    <div className="bg-green-50 border p-5 rounded-xl">
                        <div className="text-sm text-gray-500">
                            Images Detected
                        </div>
                        <div className="font-semibold">
                            {data.largeImages}
                        </div>
                    </div>

                    <div className="bg-yellow-50 border p-5 rounded-xl">
                        <div className="text-sm text-gray-500">
                            JavaScript Rendering
                        </div>
                        <div className="font-semibold">
                            {data.jsBlocking ? "Detected" : "Minimal"}
                        </div>
                    </div>

                    {/* PAGE PREVIEW */}

                    {data?.screenshot && (

                        <div className="bg-white border rounded-xl p-6">

                            <h3 className="font-semibold mb-4 flex gap-2 items-center">
                                <MonitorSmartphone size={18} />
                                Mobile Preview
                            </h3>

                            <img
                                src={data.screenshot}
                                className="border rounded-lg"
                            />

                        </div>

                    )}

                    {/* ISSUES */}

                    {data.issues?.length > 0 && (

                        <div className="bg-white border rounded-xl p-6">

                            <h3 className="font-semibold mb-4 flex gap-2 items-center">
                                <AlertTriangle size={18} />
                                Mobile Usability Issues
                            </h3>

                            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">

                                {data.issues.map((i: string, index: number) => (
                                    <li key={index}>{i}</li>
                                ))}

                            </ul>

                        </div>

                    )}

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        What is a Mobile Friendly Checker?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A Mobile Friendly Checker is an SEO tool that analyzes whether a webpage is optimized for mobile devices such as smartphones and tablets. With the majority of global web traffic coming from mobile devices, search engines like Google prioritize mobile-friendly websites in search rankings.
                    </p>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Why Mobile Friendliness Matters for SEO
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Google uses mobile-first indexing</li>
                        <li>Improves user experience on smartphones</li>
                        <li>Reduces bounce rate</li>
                        <li>Improves page speed performance</li>
                        <li>Helps search engines crawl your site efficiently</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        What This Tool Analyzes
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Viewport meta tag configuration</li>
                        <li>Responsive design compatibility</li>
                        <li>Font size readability</li>
                        <li>Touch element spacing</li>
                        <li>Mobile layout compatibility</li>
                        <li>Mobile usability issues</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Best Practices for Mobile Optimization
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Use responsive web design</li>
                        <li>Ensure fonts are readable on small screens</li>
                        <li>Avoid horizontal scrolling</li>
                        <li>Optimize images and scripts</li>
                        <li>Improve page load speed</li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "mobile friendly checker",
                            "mobile usability test",
                            "check mobile friendly website",
                            "responsive design test",
                            "seo mobile test",
                            "google mobile friendly test"
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