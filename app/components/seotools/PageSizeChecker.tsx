"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Globe,
    File,
    Image,
    Code,
    Zap,
    AlertTriangle
} from "lucide-react";

export default function PageSizeChecker() {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const check = async () => {

        if (!url) return

        setLoading(true)
        setData(null)

        try {

            const res = await fetch("/api/seotools/page-size-checker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            })

            const json = await res.json()

            setData(json)

        } catch {

            alert("Unable to analyze page")

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
                    Page Size Checker
                </h1>

                <p className="text-gray-600">
                    Analyze the total size of a webpage including HTML, images, CSS, and JavaScript resources. Large pages can slow down loading speed and negatively impact SEO.
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
                                Analyzing
                            </>
                            :
                            <>
                                <Search />
                                Check Page Size
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

                        <div className="bg-blue-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <File size={16} /> Total Page Size
                            </div>
                            <div className="text-2xl font-bold">
                                {data.totalSize} KB
                            </div>
                        </div>

                        <div className="bg-green-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Image size={16} /> Images
                            </div>
                            <div className="text-xl font-semibold">
                                {data.images} files
                            </div>
                        </div>

                        <div className="bg-purple-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Code size={16} /> CSS Files
                            </div>
                            <div className="text-xl font-semibold">
                                {data.css}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500 flex gap-1 items-center">
                                <Zap size={16} /> JavaScript
                            </div>
                            <div className="text-xl font-semibold">
                                {data.js}
                            </div>
                        </div>

                    </div>

                    {/* PERFORMANCE MESSAGE */}

                    <div className="bg-white border rounded-xl p-6">

                        {data.totalSize > 1500 && (

                            <div className="flex gap-2 text-red-600 items-center">
                                <AlertTriangle size={18} />
                                Page size is large and may slow down loading speed.
                            </div>

                        )}

                        {data.totalSize <= 1500 && (

                            <div className="text-green-600 font-medium">
                                Page size is within recommended performance limits.
                            </div>

                        )}

                    </div>

                    {/* RESOURCE BREAKDOWN */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Resource Breakdown
                        </h3>

                        <div className="space-y-2 text-sm">

                            <div className="flex justify-between">
                                <span>HTML Size</span>
                                <span>{data.htmlSize} KB</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Images</span>
                                <span>{data.images} files</span>
                            </div>

                            <div className="flex justify-between">
                                <span>CSS Files</span>
                                <span>{data.css}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>JavaScript Files</span>
                                <span>{data.js}</span>
                            </div>

                        </div>

                    </div>

                    {/* RESOURCE WATERFALL */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Resource Waterfall Chart
                        </h3>

                        <div className="space-y-2">

                            {data.waterfall.map((w: any, i: number) => (
                                <div key={i}>

                                    <div className="flex justify-between text-sm">
                                        <span>{w.name}</span>
                                        <span>{w.time} ms</span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full"
                                            style={{ width: `${Math.min(w.time / 10, 100)}%` }}
                                        ></div>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* LARGEST FILES */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Largest Page Resources
                        </h3>

                        <ul className="space-y-2 text-sm">

                            {data.largestFiles.map((f: any, i: number) => (
                                <li key={i} className="flex justify-between border-b pb-1">
                                    <span>{f.name}</span>
                                    <span>{f.size}</span>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* COMPRESSION */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Compression Status
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="bg-green-50 border p-4 rounded-lg">
                                <div className="text-sm text-gray-500">GZIP Compression</div>
                                <div className="font-semibold">
                                    {data.gzip ? "Enabled" : "Not Detected"}
                                </div>
                            </div>

                            <div className="bg-blue-50 border p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Brotli Compression</div>
                                <div className="font-semibold">
                                    {data.brotli ? "Enabled" : "Not Detected"}
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* IMAGE AUDIT */}

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Image Size Audit
                        </h3>

                        <ul className="space-y-2 text-sm">

                            {data.imageAudit.map((img: any, i: number) => (
                                <li key={i} className="flex justify-between border-b pb-1">
                                    <span>{img.name}</span>
                                    <span>{img.size}</span>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* UNUSED RESOURCES */}

                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">

                        <h3 className="font-semibold mb-3">
                            Unused CSS / JS Detection
                        </h3>

                        <ul className="list-disc pl-6 text-sm space-y-1">

                            <li>Some CSS files may contain unused styles that increase page size.</li>
                            <li>Large JavaScript bundles may slow down rendering.</li>
                            <li>Consider splitting JavaScript bundles and removing unused CSS.</li>

                        </ul>

                    </div>

                    {/* OPTIMIZATION TIPS */}

                    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">

                        <h3 className="font-semibold mb-3">
                            Optimization Suggestions
                        </h3>

                        <ul className="list-disc pl-6 text-sm space-y-1">

                            <li>Compress images using WebP format</li>
                            <li>Minify CSS and JavaScript files</li>
                            <li>Enable GZIP or Brotli compression</li>
                            <li>Use lazy loading for images</li>
                            <li>Reduce unused JavaScript</li>

                        </ul>

                    </div>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        What is a Page Size Checker?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A Page Size Checker is an SEO and performance analysis tool that measures the total size of a webpage including HTML content, images, CSS files, and JavaScript resources. Larger pages require more time to download, which can negatively impact user experience and search engine rankings.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Why Page Size Matters for SEO
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Large pages increase loading time</li>
                        <li>Slow websites reduce user engagement</li>
                        <li>Search engines prefer fast-loading pages</li>
                        <li>Improved page speed boosts rankings</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Best Practices to Reduce Page Size
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Optimize images and media</li>
                        <li>Remove unused CSS and JavaScript</li>
                        <li>Enable server compression</li>
                        <li>Use modern image formats like WebP</li>
                        <li>Implement lazy loading</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "page size checker",
                            "website size checker",
                            "check page weight",
                            "seo page size analyzer",
                            "webpage size test"
                        ].map(tag => (

                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>

                        ))}

                    </div>

                </section>

            </div>

        </div>

    )

}