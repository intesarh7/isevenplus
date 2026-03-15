"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    RefreshCcw,
    Download,
    Image,
    Globe
} from "lucide-react";

export default function ImageSitemapGenerator() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [xml, setXml] = useState("");

    const generate = async () => {

        if (!url) return;

        setLoading(true);
        setImages([]);
        setXml("");

        try {

            const res = await fetch("/api/seotools/image-sitemap-generator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            setImages(data.images || []);
            setXml(data.xml || "");

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setImages([]);
        setXml("");
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    const downloadXML = () => {

        const blob = new Blob([xml], { type: "application/xml" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "image-sitemap.xml";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Image className="text-indigo-600" />
                    Image Sitemap Generator
                </h1>

                <p className="text-gray-600">
                    Generate an XML image sitemap for your website to help search engines index your images.
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
                                Generate Image Sitemap
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

            {images.length > 0 && (

                <div className="bg-white border rounded-xl p-6 space-y-6 max-h-162.5 overflow-y-auto">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        Detected Images ({images.length})
                    </h2>

                    {xml && (

                        <button
                            onClick={downloadXML}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg"
                        >
                            <Download size={16} />
                            Download Image Sitemap
                        </button>

                    )}

                    <div className="grid md:grid-cols-2 gap-3">

                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="border rounded-lg p-3 bg-gray-50 break-all text-sm"
                            >
                                {img}
                            </div>
                        ))}

                    </div>

                    

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        About Image Sitemap Generator
                    </h2>

                    <p className="text-gray-700 mt-2">
                        An Image Sitemap is a special XML sitemap that helps search engines discover and index images on your website. While search engines can crawl images through HTML content, an image sitemap provides a more organized way for search engines like Google to locate all images across your website.
                    </p>

                    <p className="text-gray-700 mt-3">
                        The Image Sitemap Generator scans a webpage, detects all images used on that page, and creates a properly formatted XML sitemap that can be submitted to search engines. This improves image indexing and can increase your visibility in Google Images search results.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        How Image Sitemap Generation Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        When you enter a webpage URL, the tool fetches the HTML of that page and scans all image tags within the document. Each detected image source is then converted into an absolute URL and added to an XML sitemap structure following the official image sitemap protocol defined by Google.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Improve image indexing in search engines</li>
                        <li>Increase visibility in Google Image Search</li>
                        <li>Help search engines discover hidden images</li>
                        <li>Improve technical SEO</li>
                        <li>Generate image sitemap instantly</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "image sitemap generator",
                            "xml image sitemap creator",
                            "seo image sitemap tool",
                            "generate image sitemap",
                            "image seo sitemap builder"
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