"use client";

import { useState } from "react";
import {
    Camera,
    Loader2,
    RefreshCcw,
    Download,
    Monitor,
    Smartphone,
    Tablet
} from "lucide-react";

export default function WebsiteScreenshotGenerator() {

    const [url, setUrl] = useState("")
    const [device, setDevice] = useState("desktop")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null)

    const generate = async () => {

        if (!url) return

        setLoading(true)
        setData(null)

        try {

            const res = await fetch("/api/seotools/website-screenshot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, device })
            })

            const json = await res.json()

            setData(json)

        } catch {

            alert("Unable to generate screenshot")

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
                    <Camera className="text-indigo-600" />
                    Website Screenshot Generator
                </h1>

                <p className="text-gray-600">
                    Capture high-quality screenshots of any website. Choose device type, preview responsive layouts, and download screenshots instantly.
                </p>

                <input
                    placeholder="Enter website URL (example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                {/* DEVICE SELECTOR */}

                <div className="flex gap-3">

                    <button
                        onClick={() => setDevice("desktop")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${device === "desktop" ? "bg-indigo-600 text-white" : "bg-white"
                            }`}
                    >
                        <Monitor size={16} />
                        Desktop
                    </button>

                    <button
                        onClick={() => setDevice("tablet")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${device === "tablet" ? "bg-indigo-600 text-white" : "bg-white"
                            }`}
                    >
                        <Tablet size={16} />
                        Tablet
                    </button>

                    <button
                        onClick={() => setDevice("mobile")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${device === "mobile" ? "bg-indigo-600 text-white" : "bg-white"
                            }`}
                    >
                        <Smartphone size={16} />
                        Mobile
                    </button>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={generate}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" />
                                Generating
                            </>
                            :
                            <>
                                <Camera />
                                Generate Screenshot
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

                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Website Preview
                        </h3>

                        {data?.screenshot ? (

                            <img
                                src={data.screenshot}
                                className="border rounded-lg w-full max-h-225 object-contain"
                                loading="lazy"
                            />

                        ) : (

                            <div className="text-gray-500">
                                Preview unavailable
                            </div>

                        )}

                    </div>

                    {/* PAGE INFO */}

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-blue-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                HTTP Status
                            </div>
                            <div className="text-xl font-semibold">
                                {data.status}
                            </div>
                        </div>

                        <div className="bg-green-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                SSL
                            </div>
                            <div className="text-xl font-semibold">
                                {data.ssl ? "Secure" : "Not Secure"}
                            </div>
                        </div>

                        <div className="bg-purple-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                Load Time
                            </div>
                            <div className="text-xl font-semibold">
                                {data.loadTime} ms
                            </div>
                        </div>

                    </div>

                    {/* DOWNLOAD */}

                    <a
                        href={data.screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        <Download size={16} />
                        Download Screenshot
                    </a>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        What is a Website Screenshot Generator?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A website screenshot generator captures a visual snapshot of a webpage exactly as it appears in a browser. It is commonly used for website previews, SEO analysis, design reviews, and documentation.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Why Use a Website Screenshot Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Preview websites without opening them</li>
                        <li>Analyze responsive design</li>
                        <li>Create thumbnails for directories</li>
                        <li>Monitor competitor website layouts</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "website screenshot generator",
                            "capture website screenshot",
                            "website preview generator",
                            "webpage screenshot tool",
                            "website snapshot tool"
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