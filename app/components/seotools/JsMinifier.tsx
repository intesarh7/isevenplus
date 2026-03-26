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

export default function JsMinifier() {
    const [js, setJs] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stats, setStats] = useState<any>(null);

    const handleMinify = async () => {
        if (!js.trim()) {
            setError("Please enter JavaScript code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");
        setStats(null);

        try {
            const res = await fetch("/api/seotools/js-minifier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ js }),
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
        const blob = new Blob([result], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "minified.js";
        a.click();
    };

    const handleReset = () => {
        setJs("");
        setResult("");
        setError("");
        setStats(null);
    };

    return (
        <div className="space-y-6 w-full">

            {/* INPUT */}
            <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                    <Code2 size={18} /> Enter JavaScript Code
                </label>
                <textarea
                    className="w-full border rounded-xl p-3 h-40"
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    placeholder="function hello(){ console.log('Hi'); }"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleMinify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Minify JS"}
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
                        <Info size={20} /> About JS Minifier Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JS Minifier Tool is a powerful online utility designed to compress JavaScript code by removing unnecessary characters such as whitespace, comments, and line breaks without affecting functionality. In modern web development, performance optimization is critical, and JavaScript minification plays a key role in improving website speed, reducing file size, and enhancing user experience.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This JavaScript minifier helps developers, SEO experts, and website owners optimize their code for faster loading and better search engine rankings. By minimizing file size, websites consume less bandwidth and load more efficiently across devices, including mobile networks.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are working on a small website or a large web application, using a JS minifier online ensures that your scripts are production-ready. It is especially useful for improving Core Web Vitals and achieving better performance scores in tools like Google PageSpeed Insights.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How JavaScript Minification Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JavaScript minification is the process of removing unnecessary characters from the source code without changing its execution. This includes eliminating whitespace, comments, line breaks, and redundant syntax elements. The goal is to produce a compact version of the code that executes faster in browsers.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This tool uses advanced parsing and formatting techniques to safely compress JavaScript. It first normalizes the structure of the code and then applies optimization rules such as trimming spaces, removing comments, and simplifying expressions. The result is a highly optimized script that maintains full functionality while reducing size.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Unlike basic compressors, this JS minifier ensures that your code remains error-free and compatible with modern browsers. It is designed to handle complex JavaScript structures, making it suitable for both beginners and professional developers.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Reduces JavaScript file size significantly</li>
                        <li>Improves website loading speed and performance</li>
                        <li>Enhances SEO rankings and Core Web Vitals</li>
                        <li>Decreases bandwidth usage and server load</li>
                        <li>Optimizes code for production deployment</li>
                        <li>Improves user experience across all devices</li>
                        <li>Helps in faster script execution in browsers</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Faster loading websites lead to better engagement, lower bounce rates, and higher conversions. By using this JavaScript minifier tool, you can ensure that your web pages perform efficiently even under heavy traffic conditions.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Code2 size={20} /> Key Features of JS Minifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Instant JavaScript compression with one click</li>
                        <li>Removes comments, whitespace, and unnecessary characters</li>
                        <li>Maintains original functionality and logic</li>
                        <li>Supports large JavaScript files</li>
                        <li>Copy and download options available</li>
                        <li>Secure and browser-based processing</li>
                        <li>Free and unlimited usage</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of JavaScript Minifier
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JavaScript minification is widely used in web development workflows. Developers use it before deploying applications to production environments to ensure faster load times. It is also commonly used in frontend optimization pipelines along with CSS and HTML minification.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        SEO professionals use JS minifiers to improve website performance metrics, while bloggers and marketers use them to optimize landing pages. It is also beneficial for reducing script size in web apps, dashboards, and e-commerce platforms.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why JS Minification is Important for SEO
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        Page speed is a critical ranking factor in search engines like Google. JavaScript minification helps reduce page size, which directly improves loading speed and performance. Faster pages provide a better user experience and are more likely to rank higher in search results.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        By using a JavaScript minifier online, you can improve important performance metrics such as First Contentful Paint (FCP) and Largest Contentful Paint (LCP). This leads to better Core Web Vitals scores and increased visibility in search engines.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for JavaScript Optimization
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Always minify JavaScript before production deployment</li>
                        <li>Combine multiple JS files to reduce HTTP requests</li>
                        <li>Use async or defer attributes for script loading</li>
                        <li>Avoid unused or redundant code</li>
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
                            "js minifier online",
                            "compress javascript",
                            "minify js free",
                            "javascript optimizer tool",
                            "reduce js file size",
                            "best js minifier",
                            "online javascript compressor",
                            "minify js code fast",
                            "javascript file reducer",
                            "optimize javascript for seo",
                            "free js compressor tool",
                            "js minification online free",
                            "reduce javascript size",
                            "javascript code cleaner",
                            "seo javascript optimizer"
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