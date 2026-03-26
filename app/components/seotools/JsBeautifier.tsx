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
    Zap,
    TrendingUp
} from "lucide-react";

export default function JsBeautifier() {
    const [js, setJs] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBeautify = async () => {
        if (!js.trim()) {
            setError("Please enter JavaScript code");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await fetch("/api/seotools/js-beautifier", {
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
        const blob = new Blob([result], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "beautified.js";
        a.click();
    };

    const handleReset = () => {
        setJs("");
        setResult("");
        setError("");
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
                    placeholder="function test(){console.log('Hello');}"
                />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleBeautify}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <Wand2 size={16} /> {loading ? "Processing..." : "Beautify JS"}
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
                            className="flex-1 bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Copy size={16} /> Copy
                        </button>

                        <button
                            onClick={handleDownload}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Download size={16} /> Download
                        </button>
                    </div>
                </div>
            )}

            {/* SEO CONTENT (Short version, agar chaho full 1500 words bhi bana dunga) */}
            <div className="space-y-8 pt-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Info size={20} /> About JS Beautifier Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JS Beautifier Tool is a powerful online utility that converts messy, compressed, or minified JavaScript code into a clean, readable, and properly formatted structure. In modern web development, writing clean and maintainable code is essential for scalability, debugging, and collaboration. This JavaScript beautifier helps developers instantly organize unstructured code into a well-indented and human-readable format.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are working with minified JavaScript, third-party scripts, or copied code from production environments, this tool makes it easier to understand and edit your code. It is especially useful for developers, students, and SEO professionals who need to analyze script behavior and structure.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        This JS beautifier online works directly in your browser and provides instant results without requiring installation. It is fast, secure, and designed for modern web workflows, making it an essential tool for frontend development and debugging.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How JavaScript Beautification Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JavaScript beautification is the process of restructuring code by adding indentation, spacing, and line breaks while preserving its original functionality. This tool parses your JavaScript code and organizes it into a structured format where functions, loops, and conditions are clearly visible.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        When you paste your JavaScript code into the tool, it analyzes the syntax and applies formatting rules such as indentation levels, spacing between elements, and proper line breaks. This helps in identifying nested structures and understanding code flow more easily.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Advanced formatting ensures that even complex JavaScript logic remains intact while improving readability. This makes the tool suitable for both simple scripts and large-scale applications.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using This Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Improves code readability and structure</li>
                        <li>Makes debugging faster and easier</li>
                        <li>Helps developers understand complex scripts</li>
                        <li>Enhances collaboration in teams</li>
                        <li>Organizes minified or messy JavaScript instantly</li>
                        <li>Reduces development errors</li>
                        <li>Improves code maintainability</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Clean code is essential for efficient development. By using this JavaScript beautifier, developers can focus more on logic and functionality rather than struggling with unreadable code.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Code2 size={20} /> Key Features of JS Beautifier
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Instant JavaScript formatting with one click</li>
                        <li>Proper indentation and structured output</li>
                        <li>Supports complex JavaScript code</li>
                        <li>Maintains original functionality</li>
                        <li>Handles large files efficiently</li>
                        <li>Copy and download formatted output</li>
                        <li>Free and unlimited usage</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of JavaScript Beautifier
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        JavaScript Beautifier is widely used by developers who need to analyze or debug minified code. It is especially helpful when working with production scripts or third-party libraries where code readability is limited.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        SEO experts use this tool to inspect scripts embedded in web pages and optimize performance. It is also useful for students and beginners who want to understand JavaScript structure and syntax more clearly.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why JS Formatting is Important for SEO & Development
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        While JavaScript beautification does not directly impact search engine rankings, it plays a crucial role in technical SEO and development workflows. Clean and structured code helps identify performance issues, optimize scripts, and improve overall website efficiency.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Properly formatted JavaScript allows developers to remove unnecessary code, optimize execution, and improve loading performance. This indirectly contributes to better user experience and improved Core Web Vitals scores.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for Clean JavaScript Code
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Use consistent indentation and formatting</li>
                        <li>Avoid unnecessary global variables</li>
                        <li>Write modular and reusable code</li>
                        <li>Remove unused or redundant scripts</li>
                        <li>Test and debug code regularly</li>
                    </ul>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "js beautifier online",
                            "format javascript code",
                            "pretty js formatter",
                            "javascript formatter online",
                            "beautify js free",
                            "js code cleaner tool",
                            "format js code online free",
                            "javascript indent tool",
                            "best js beautifier",
                            "clean javascript code online",
                            "online js formatter tool",
                            "beautify minified javascript",
                            "js prettify tool",
                            "javascript code formatter",
                            "seo javascript formatter"
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