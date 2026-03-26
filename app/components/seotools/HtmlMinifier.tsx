"use client";

import { useState } from "react";
import { Copy, Download, Wand2, RotateCcw, AlertTriangle, Info, Settings, Sparkles, Zap, Code2, TrendingUp, Hash } from "lucide-react";

export default function HtmlMinifier() {
    const [html, setHtml] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMinify = async () => {
        if (!html.trim()) {
            setError("Please enter HTML code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await fetch("/api/seotools/html-minifier", {
                method: "POST",
                body: JSON.stringify({ html }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setResult(data.minified);
            }
        } catch (err) {
            setError("Server error. Try again.");
        }

        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
    };

    const handleDownload = () => {
        const blob = new Blob([result], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "minified.html";
        a.click();
    };

    const handleReset = () => {
        setHtml("");
        setResult("");
        setError("");
    };

    return (
        <div className="w-full space-y-6">

            {/* INPUT */}
            <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                    <Code2 size={18} /> Enter HTML Code
                </label>
                <textarea
                    className="w-full border rounded-xl p-3 h-40"
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    placeholder="<html>...</html>"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleMinify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Minify HTML"}
                </button>

                <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <RotateCcw size={16} /> Reset
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-xl flex gap-2 items-center">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            {/* RESULT */}
            {result && (
                <div>
                    <label className="font-semibold mb-2 block">Minified Output</label>
                    <textarea
                        className="w-full border rounded-xl p-3 h-40"
                        value={result}
                        readOnly
                    />

                    <div className="flex gap-3 mt-3">
                        <button
                            onClick={handleCopy}
                            className="flex-1 bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Copy size={16} /> Copy
                        </button>

                        <button
                            onClick={handleDownload}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Download size={16} /> Download
                        </button>
                    </div>
                </div>
            )}

            {/* SEO CONTENT */}

            <div className="space-y-8 pt-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Info size={20} /> About HTML Minifier Tool
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        The HTML Minifier Tool is a powerful online utility designed to compress HTML code by removing unnecessary spaces, line breaks, comments, and redundant characters. In modern web development, optimizing code is essential for improving performance, reducing page size, and enhancing user experience. This tool ensures that your HTML files are lightweight and optimized for faster loading across all devices.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        Whether you are a developer, blogger, SEO expert, or website owner, using an HTML minifier can significantly boost your website’s performance. Search engines like Google prioritize fast-loading websites, making HTML minification an important step in technical SEO optimization. By reducing file size and eliminating unnecessary elements, your website becomes faster, more efficient, and more user-friendly.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        This tool works instantly in your browser and provides real-time results without requiring any installation. It is completely free, secure, and designed for professionals who want clean and optimized code. Simply paste your HTML code, click on the minify button, and get a compressed version within seconds.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Settings size={20} /> How HTML Minification Works
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        HTML minification is the process of removing unnecessary characters from the source code without changing its functionality. This includes eliminating whitespace, comments, redundant attributes, and formatting elements that are useful for readability but not required for execution.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        When you input your HTML code into this tool, it scans the entire structure and applies multiple optimization techniques. It removes HTML comments, trims extra spaces, collapses line breaks, and compresses inline elements. The output is a compact version of your original code that performs exactly the same but loads much faster.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        Advanced minification also ensures that scripts, styles, and embedded elements remain intact while reducing overall file size. This tool follows safe minification practices to avoid breaking your layout or functionality, making it reliable for production use.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Improves website loading speed and performance</li>
                        <li>Reduces HTML file size significantly</li>
                        <li>Enhances SEO rankings on search engines</li>
                        <li>Optimizes bandwidth usage and server load</li>
                        <li>Provides cleaner and production-ready code</li>
                        <li>Works instantly without installation or signup</li>
                        <li>Safe and secure processing directly in your browser</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        Faster websites not only improve user experience but also increase engagement and conversion rates. By using this HTML Minifier Tool, you can ensure that your web pages load quickly even on slow internet connections.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Zap size={20} /> Key Features of HTML Minifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Instant HTML compression with one click</li>
                        <li>Removes comments, whitespace, and line breaks</li>
                        <li>Maintains original functionality and structure</li>
                        <li>Supports large HTML files</li>
                        <li>Copy and download options available</li>
                        <li>Completely free and unlimited usage</li>
                        <li>SEO-friendly output for better rankings</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Code2 size={20} /> Use Cases of HTML Minifier
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        HTML minification is widely used in web development and SEO optimization. Developers use it before deploying websites to production to ensure faster performance. Bloggers and content creators use it to optimize landing pages and reduce load times.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        It is also useful for improving Core Web Vitals scores, which are critical for search engine rankings. By reducing HTML size, you can improve metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
                    </p>
                </section>

                {/* WHY IMPORTANT */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <TrendingUp size={20} /> Why HTML Minification is Important for SEO
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Search engines prioritize websites that load quickly and provide a smooth user experience. HTML minification plays a crucial role in technical SEO by reducing page size and improving load speed. Faster pages lead to lower bounce rates, higher engagement, and better rankings.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-3">
                        Google’s algorithm considers page speed as a ranking factor. By using an HTML Minifier, you can ensure that your website meets performance standards and delivers optimal results across devices and networks.
                    </p>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "html minifier online",
                            "compress html code",
                            "minify html free",
                            "html optimizer tool",
                            "reduce html file size",
                            "remove html whitespace",
                            "html compressor online",
                            "best html minifier",
                            "seo html optimization tool",
                            "html code cleaner",
                            "fast html minify tool",
                            "minify html for seo",
                            "html file compressor",
                            "optimize html performance",
                            "html minification tool free"
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
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