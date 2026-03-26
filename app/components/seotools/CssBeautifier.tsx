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

export default function CssBeautifier() {
    const [css, setCss] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBeautify = async () => {
        if (!css.trim()) {
            setError("Please enter CSS code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await fetch("/api/seotools/css-beautifier", {
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
                setResult(data.formatted);
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
        a.download = "beautified.css";
        a.click();
    };

    const handleReset = () => {
        setCss("");
        setResult("");
        setError("");
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
                    placeholder="body{color:red;margin:0;}"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleBeautify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Beautify CSS"}
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
                    <label className="font-semibold mb-2 block">Formatted Output</label>
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
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Info size={20} /> About CSS Beautifier Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS Beautifier Tool is a powerful online utility designed to format messy, compressed, or minified CSS code into a clean, readable, and properly structured format. In modern web development, writing well-organized CSS is essential for maintaining scalable, efficient, and easy-to-manage stylesheets. This tool helps developers instantly transform unstructured CSS into a well-indented format that improves readability and productivity.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are working with minified CSS files, third-party stylesheets, or large design systems, this CSS beautifier ensures that your code becomes easy to understand and edit. Clean CSS is not only beneficial for developers but also plays a role in debugging and performance optimization workflows.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This CSS formatter works directly in your browser and provides instant results without requiring installation. It is fast, secure, and completely free, making it an essential tool for frontend developers, UI designers, and SEO professionals.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How CSS Beautification Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS beautification is the process of restructuring CSS code by adding proper indentation, spacing, and line breaks while preserving its original functionality. This tool parses your CSS rules and organizes them into a hierarchical structure where selectors, properties, and values are clearly defined.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        When you input your CSS code, the tool analyzes each rule and applies formatting techniques such as indentation levels, consistent spacing, and logical grouping of properties. This makes it easier to identify relationships between selectors and improves code readability.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Advanced formatting ensures that complex CSS structures, including media queries, nested rules, and animations, are handled properly without breaking styles. The result is a clean and professional stylesheet ready for development or debugging.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Improves CSS readability and structure</li>
                        <li>Helps developers debug styles quickly</li>
                        <li>Makes collaboration easier in teams</li>
                        <li>Organizes minified or messy CSS instantly</li>
                        <li>Enhances maintainability of stylesheets</li>
                        <li>Reduces chances of coding errors</li>
                        <li>Supports better performance optimization workflows</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Clean and structured CSS allows developers to work more efficiently and reduces development time. By using this CSS Beautifier Tool, you can focus on design and functionality instead of struggling with unformatted code.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Code2 size={20} /> Key Features of CSS Beautifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Instant CSS formatting with one click</li>
                        <li>Proper indentation and spacing for readability</li>
                        <li>Supports complex CSS including media queries</li>
                        <li>Maintains original styling and functionality</li>
                        <li>Handles large CSS files efficiently</li>
                        <li>Copy and download formatted CSS output</li>
                        <li>Free and unlimited usage</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of CSS Beautifier
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        CSS Beautifier is widely used by frontend developers, UI designers, and web developers who need to work with structured stylesheets. It is especially useful when dealing with minified CSS files or debugging layout issues.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        SEO professionals also use this tool to analyze page styles and improve website performance. Clean CSS makes it easier to identify unnecessary rules and optimize styles for faster loading.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why CSS Formatting is Important for SEO & Performance
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        While CSS beautification itself does not directly affect search engine rankings, it plays an important role in technical SEO and development workflows. Clean and structured CSS helps developers identify performance issues, remove unused styles, and optimize rendering speed.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Optimized CSS contributes to better page speed, improved user experience, and enhanced Core Web Vitals scores. This indirectly helps websites rank higher in search engine results.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for Clean CSS Code
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Use consistent indentation and formatting</li>
                        <li>Group related styles logically</li>
                        <li>Avoid duplicate or unused CSS rules</li>
                        <li>Use meaningful class names</li>
                        <li>Optimize CSS regularly for performance</li>
                    </ul>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "css beautifier online",
                            "format css code",
                            "pretty css formatter",
                            "css cleaner tool",
                            "beautify css online",
                            "css formatter free",
                            "clean css code online",
                            "css indentation tool",
                            "best css beautifier",
                            "format css online free",
                            "css prettify tool",
                            "css structure formatter",
                            "optimize css readability",
                            "css code formatter online",
                            "seo css formatter tool"
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