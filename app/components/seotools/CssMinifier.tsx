"use client";

import { useState } from "react";
import {
    Wand2,
    RotateCcw,
    Copy,
    Download,
    AlertTriangle,
    Code2,
    Info,
    Settings,
    Sparkles,
    Hash,
    TrendingUp,
    Zap
} from "lucide-react";

export default function CssMinifier() {
    const [css, setCss] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stats, setStats] = useState<any>(null);

    const handleMinify = async () => {
        if (!css.trim()) {
            setError("Please enter CSS code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");
        setStats(null);

        try {
            const res = await fetch("/api/seotools/css-minifier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ css }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setResult(data.minified);
                setStats(data.stats);
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
        const blob = new Blob([result], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "minified.css";
        a.click();
    };

    const handleReset = () => {
        setCss("");
        setResult("");
        setError("");
        setStats(null);
    };

    return (
        <div className="space-y-6 w-full">

            {/* INPUT */}
            <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                    <Code2 size={18} /> Enter CSS Code
                </label>
                <textarea
                    className="w-full border rounded-xl p-3 h-40"
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    placeholder="body { color: red; margin: 0; }"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleMinify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Minify CSS"}
                </button>

                <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
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

                    {/* STATS */}
                    {stats && (
                        <div className="bg-gray-100 p-3 rounded-xl mt-3 text-sm">
                            <p>Original Size: {stats.original} bytes</p>
                            <p>Minified Size: {stats.minified} bytes</p>
                            <p>Saved: {stats.saved} bytes ({stats.percent}%)</p>
                        </div>
                    )}

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
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Info size={20} /> About CSS Minifier Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS Minifier Tool is a powerful online utility designed to compress CSS code by removing unnecessary whitespace, comments, line breaks, and redundant characters without affecting functionality. In modern web development, optimizing CSS is essential for improving website performance, reducing load time, and enhancing user experience. This tool helps developers and website owners create lightweight and optimized stylesheets that load faster across all devices.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are working on a simple website or a complex web application, using a CSS minifier online ensures that your stylesheets are production-ready. By reducing CSS file size, websites consume less bandwidth and deliver faster performance, which is critical for SEO and user engagement.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This tool is completely browser-based, secure, and free to use. It provides instant results, making it an essential utility for frontend developers, designers, and SEO professionals looking to optimize their websites efficiently.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How CSS Minification Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS minification is the process of removing unnecessary characters from CSS code without changing its functionality. These characters include spaces, comments, line breaks, and redundant syntax elements that are useful for readability but not required for execution.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        When you input your CSS into this tool, it processes each rule and applies advanced optimization techniques. It removes comments, compresses whitespace, shortens property values where possible, and restructures the code into a compact format. The result is a smaller and faster-loading CSS file.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Advanced CSS minifiers also optimize shorthand properties, merge duplicate rules, and eliminate unnecessary characters. This ensures maximum performance without affecting the visual appearance of your website.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Reduces CSS file size significantly</li>
                        <li>Improves website loading speed</li>
                        <li>Enhances SEO rankings and performance</li>
                        <li>Reduces bandwidth usage and server load</li>
                        <li>Optimizes CSS for production deployment</li>
                        <li>Improves user experience across devices</li>
                        <li>Helps achieve better Core Web Vitals scores</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Faster websites lead to better engagement, lower bounce rates, and higher conversion rates. By using this CSS Minifier Tool, you can ensure that your website performs efficiently even under heavy traffic conditions.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Code2 size={20} /> Key Features of CSS Minifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Instant CSS compression with one click</li>
                        <li>Removes whitespace, comments, and unnecessary characters</li>
                        <li>Maintains original styling and layout</li>
                        <li>Supports large CSS files</li>
                        <li>Copy and download options available</li>
                        <li>Secure browser-based processing</li>
                        <li>Free and unlimited usage</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of CSS Minifier
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS minification is widely used in web development workflows. Developers use it before deploying websites to production environments to ensure faster load times and optimized performance. It is also commonly used in frontend optimization pipelines alongside JavaScript and HTML minification.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        SEO professionals use CSS minifiers to improve page speed and performance metrics, while designers use them to optimize stylesheets for faster rendering. It is especially useful for large websites, e-commerce platforms, and web applications where performance is critical.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why CSS Minification is Important for SEO
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        Page speed is a major ranking factor in search engines like Google. CSS minification helps reduce page size, which directly improves loading speed and performance. Faster pages provide a better user experience and are more likely to rank higher in search engine results.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        By using a CSS minifier online, you can improve important performance metrics such as First Contentful Paint (FCP) and Largest Contentful Paint (LCP). This leads to better Core Web Vitals scores and increased visibility in search engines.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for CSS Optimization
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Always minify CSS before production deployment</li>
                        <li>Combine multiple CSS files to reduce HTTP requests</li>
                        <li>Remove unused or redundant styles</li>
                        <li>Use shorthand properties where possible</li>
                        <li>Regularly test performance using speed tools</li>
                    </ul>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "css minifier online",
                            "compress css",
                            "minify css free",
                            "css optimizer tool",
                            "reduce css file size",
                            "css compressor online",
                            "best css minifier",
                            "optimize css for seo",
                            "css file reducer",
                            "free css compression tool",
                            "css minification online",
                            "reduce css size",
                            "css code cleaner",
                            "seo css optimizer",
                            "fast css minify tool"
                        ].map(tag => (
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