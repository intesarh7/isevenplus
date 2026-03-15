"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Download,
    Video,
    Globe
} from "lucide-react";

export default function VideoSitemapGenerator() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const [xml, setXml] = useState("");
    const [message, setMessage] = useState("");

    const generate = async () => {

        if (!url) return;

        setLoading(true);
        setVideos([]);
        setXml("");

        try {

            const res = await fetch("/api/seotools/video-sitemap-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            setVideos(data.videos || []);
            setXml(data.xml || "");
            setMessage(data.message || "");

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setVideos([]);
        setXml("");
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    const downloadXML = () => {

        const blob = new Blob([xml], { type: "application/xml" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "video-sitemap.xml";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Video className="text-indigo-600" />
                    Video Sitemap Generator
                </h1>

                <p className="text-gray-600">
                    Generate a Google Video XML sitemap including video title, thumbnail and publication date.
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
                        onClick={generate}
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
                                Generate Video Sitemap
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

            {(videos.length > 0 || message) && (

                <div className="bg-white border rounded-xl p-6 space-y-6 `max-h-162.5 overflow-y-auto">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        Detected Videos ({videos.length})
                    </h2>

                    {videos.length === 0 && message && (

                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
                            {message}
                        </div>

                    )}

                    <div className="space-y-3 text-sm">

                        {videos.map((v, i) => (
                            <div key={i} className="border rounded-lg p-3 bg-gray-50">

                                <div className="font-medium">{v.title}</div>

                                <div className="text-gray-600 break-all">{v.url}</div>

                                <div className="text-xs text-gray-500">
                                    Published: {v.date}
                                </div>

                            </div>
                        ))}

                    </div>

                    {xml && (

                        <button
                            onClick={downloadXML}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg"
                        >
                            <Download size={16} />
                            Download video-sitemap.xml
                        </button>

                    )}

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Video Sitemap Generator
                    </h2>

                    <p className="text-gray-700 mt-2">
                        A Video Sitemap is a special XML sitemap that helps search engines discover video content on your website. Search engines like Google use video sitemaps to understand video metadata such as title, thumbnail, description and publication date. This information helps videos appear in Google Video Search results.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The Video Sitemap Generator scans a webpage and detects video elements such as HTML video tags or embedded video iframes. It then converts this information into a properly structured XML sitemap that follows the official Google Video Sitemap protocol.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Video Sitemap Generation Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When a URL is entered, the tool fetches the HTML of the page and scans it for video sources including video tags and embedded players such as YouTube or Vimeo. Each detected video is then added to an XML sitemap structure with important metadata including video title, thumbnail and publication date.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Help search engines index your videos</li>
                        <li>Improve video visibility in Google search</li>
                        <li>Generate video sitemap instantly</li>
                        <li>Improve video SEO performance</li>
                        <li>Increase organic traffic from video results</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "video sitemap generator",
                            "google video sitemap tool",
                            "xml video sitemap creator",
                            "seo video sitemap generator",
                            "generate video sitemap"
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