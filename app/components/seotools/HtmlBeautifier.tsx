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
    Zap, TrendingUp
} from "lucide-react";

export default function HtmlBeautifier() {
    const [html, setHtml] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBeautify = async () => {
        if (!html.trim()) {
            setError("Please enter HTML code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await fetch("/api/seotools/html-beautifier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ html }),
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
        const blob = new Blob([result], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "beautified.html";
        a.click();
    };

    const handleReset = () => {
        setHtml("");
        setResult("");
        setError("");
    };

    return (
        <div className="space-y-6 w-full">

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
                    onClick={handleBeautify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Beautify HTML"}
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
                        <Info size={20} /> About HTML Beautifier Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        HTML Beautifier Tool is a powerful online utility designed to format messy, unstructured, and minified HTML code into a clean, readable, and properly indented format. In modern web development, maintaining clean code is essential for better readability, debugging, and collaboration. This tool helps developers, designers, and SEO professionals transform compressed or cluttered HTML into well-structured code instantly.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are working with minified HTML, copied source code, or auto-generated markup, this HTML formatter ensures that your code becomes easy to understand and edit. Proper indentation and spacing improve productivity and reduce the chances of errors during development.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This tool works directly in your browser and provides instant results without requiring any installation. It is fast, secure, and completely free, making it ideal for developers who want a quick and reliable way to beautify HTML code online.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How HTML Beautification Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        HTML beautification is the process of organizing code by adding proper indentation, spacing, and line breaks while preserving the original functionality. This tool parses your HTML structure and restructures it into a hierarchical format where nested elements are clearly visible.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        When you input your HTML code, the tool analyzes each tag and determines its position in the DOM structure. It then applies indentation rules to ensure that child elements are properly nested under parent elements. This makes the code easier to read and maintain.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Advanced formatting techniques ensure that scripts, styles, and inline elements are handled safely without breaking the layout. The result is a clean and visually structured version of your original HTML code.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Improves code readability and structure</li>
                        <li>Helps developers debug HTML faster</li>
                        <li>Makes collaboration easier in teams</li>
                        <li>Organizes messy or minified HTML instantly</li>
                        <li>Enhances code maintainability</li>
                        <li>Reduces development errors</li>
                        <li>Supports better code review and optimization</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Clean and formatted code is easier to manage, especially in large projects. By using this HTML Beautifier, you can streamline your workflow and focus more on development rather than fixing formatting issues.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Code2 size={20} /> Key Features of HTML Beautifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Instant HTML formatting with one click</li>
                        <li>Proper indentation and spacing</li>
                        <li>Supports complex nested HTML structures</li>
                        <li>Maintains original functionality</li>
                        <li>Handles large HTML files efficiently</li>
                        <li>Copy and download formatted output</li>
                        <li>Free and unlimited usage</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of HTML Beautifier
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        HTML Beautifier is widely used by frontend developers, backend developers, and designers who need to work with structured markup. It is especially useful when dealing with minified HTML files, debugging issues, or reviewing code written by others.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        It is also beneficial for SEO professionals who analyze webpage structures to optimize content and improve search engine rankings. Clean HTML makes it easier to identify tags, headings, and important elements for SEO.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why HTML Formatting is Important for SEO
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        While HTML beautification does not directly affect search rankings, it plays a crucial role in technical SEO. Clean and well-structured code helps developers identify SEO issues, optimize meta tags, and improve overall website performance.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Properly formatted HTML also makes it easier to audit your website, fix errors, and implement SEO best practices. This leads to better indexing, improved crawlability, and enhanced user experience.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for Clean HTML Code
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Use proper indentation and nesting</li>
                        <li>Avoid unnecessary inline styles</li>
                        <li>Keep code modular and reusable</li>
                        <li>Validate HTML regularly</li>
                        <li>Follow semantic HTML structure</li>
                    </ul>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "html beautifier online",
                            "format html code",
                            "pretty html formatter",
                            "html code cleaner",
                            "html formatter free",
                            "beautify html online",
                            "html formatter tool free",
                            "clean html code online",
                            "html indentation tool",
                            "best html beautifier",
                            "format html code online free",
                            "html structure formatter",
                            "online html cleaner",
                            "html prettify tool",
                            "seo html formatter"
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