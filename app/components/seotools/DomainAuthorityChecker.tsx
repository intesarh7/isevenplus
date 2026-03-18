"use client";

import { useState } from "react";
import {
    Globe,
    Search,
    RefreshCcw,
    BarChart3,
    ShieldAlert,
    Scale,
} from "lucide-react";

export default function DomainAuthorityChecker() {
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [data, setData] = useState<any>(null);

    const [competitor, setCompetitor] = useState("");
    const [competitorData, setCompetitorData] = useState<any>(null);

    // ✅ VALIDATION
    const isValidDomain = (value: string) => {
        return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    };

    const normalize = (value: string) => {
        return value
            .replace(/^https?:\/\//, "")
            .replace("www.", "")
            .split("/")[0];
    };

    // ✅ MAIN CHECK
    const checkDA = async () => {
        if (!domain) {
            setError("Enter a domain");
            return;
        }

        if (!isValidDomain(domain)) {
            setError("Enter valid domain (example.com)");
            return;
        }

        setError("");
        setLoading(true);
        setData(null);
        setCompetitorData(null);

        try {
            const clean = normalize(domain);

            const res = await fetch(
                `/api/seotools/domain-authority?domain=${clean}`
            );
            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setData(result);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        }

        setLoading(false);
    };

    // ✅ COMPARE
    const handleCompare = async () => {
        if (!competitor) return;

        const clean = normalize(competitor);

        const res = await fetch(
            `/api/seotools/domain-authority?domain=${clean}`
        );
        const result = await res.json();

        setCompetitorData(result);
    };

    // ✅ RESET
    const reset = () => {
        setDomain("");
        setData(null);
        setCompetitor("");
        setCompetitorData(null);
        setError("");
    };

    return (
        <div className="p-4 md:p-6 space-y-8">

            {/* HEADER */}
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="text-indigo-600" />
                Domain Authority Checker (PRO)
            </h1>

            {/* INPUT */}
            <div className="bg-white p-5 rounded-xl shadow space-y-4">

                <input
                    type="text"
                    placeholder="Enter domain (example.com)"
                    value={domain}
                    onChange={(e) => setDomain(normalize(e.target.value))}
                    className={`border p-3 rounded w-full ${error ? "border-red-500" : ""
                        }`}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={checkDA}
                        disabled={loading}
                        className={`w-full sm:flex-1 py-3 rounded text-white ${loading
                                ? "bg-gray-400"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Checking..." : "Check Authority"}
                    </button>

                    <button
                        onClick={reset}
                        className="w-full sm:flex-1 bg-gray-500 text-white py-3 rounded"
                    >
                        <RefreshCcw size={16} className="inline mr-1" />
                        Reset
                    </button>

                </div>
            </div>

            {/* RESULT */}
            {data && (
                <div className="space-y-6">

                    {/* DA */}
                    <div className="bg-purple-100 p-5 rounded-xl">
                        <p className="text-gray-700">Domain Authority</p>
                        <h2 className="text-3xl font-bold">{data.da}/100</h2>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                        <Stat title="Page Authority" value={data.pa} color="bg-indigo-100" />
                        <Stat title="Backlinks" value={data.backlinks} color="bg-green-100" />
                        <Stat title="Ref Domains" value={data.domains} color="bg-blue-100" />
                        <Stat title="Spam Score" value={`${data.spam}%`} color="bg-red-100" />
                        <Stat title="Domain Age" value={data.age} color="bg-yellow-100" />

                    </div>

                    {/* COMPARE */}
                    <div className="bg-gray-50 p-4 rounded-xl border space-y-3">

                        <h3 className="font-semibold flex items-center gap-2">
                            <Scale size={16} /> Compare with Competitor
                        </h3>

                        <input
                            type="text"
                            placeholder="Enter competitor domain"
                            value={competitor}
                            onChange={(e) => setCompetitor(e.target.value)}
                            className="border p-2 rounded w-full"
                        />

                        <button
                            onClick={handleCompare}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Compare
                        </button>

                        {competitorData && (
                            <div className="grid grid-cols-2 gap-4 text-sm mt-3">

                                <div className="bg-indigo-50 p-3 rounded">
                                    <p className="font-semibold">Your Site</p>
                                    <p>DA: {data.da}</p>
                                    <p>PA: {data.pa}</p>
                                </div>

                                <div className="bg-blue-50 p-3 rounded">
                                    <p className="font-semibold">Competitor</p>
                                    <p>DA: {competitorData.da}</p>
                                    <p>PA: {competitorData.pa}</p>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            )}

            {/* SEO CONTENT */}
            <div className="space-y-6 pt-6 border-t">

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 size={18} /> About Domain Authority Checker
                </h2>

                <p className="text-gray-700 leading-7">
                    The <strong>Domain Authority Checker</strong> is a powerful SEO tool designed to analyze the strength and ranking potential of any website. It helps users evaluate important SEO metrics like <strong>Domain Authority (DA)</strong>, <strong>Page Authority (PA)</strong>, <strong>backlinks</strong>, <strong>referring domains</strong>, and <strong>spam score</strong>. This tool is useful for bloggers, SEO professionals, marketers, and website owners who want to improve their website performance in search engines.
                </p>

                <p className="text-gray-700 leading-7">
                    By using real-time API data, this tool provides fast and accurate insights into your website’s SEO health. It allows you to understand how strong your domain is compared to competitors and what improvements are needed to rank higher on Google.
                </p>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ShieldAlert size={18} /> Why Domain Authority Matters
                </h2>

                <p className="text-gray-700 leading-7">
                    Domain Authority is a key metric that predicts how well a website can rank on search engine result pages. A higher DA score means better chances of ranking higher in Google. It is calculated based on multiple factors such as backlink quality, number of referring domains, and overall website trust.
                </p>

                <p className="text-gray-700 leading-7">
                    Websites with strong domain authority generally get more organic traffic and visibility. Tracking your DA regularly helps you measure SEO growth and improve your link-building strategies effectively.
                </p>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Search size={18} /> Key Features of This Tool
                </h2>

                <ul className="list-disc pl-6 text-gray-700 leading-7 space-y-2">
                    <li><strong>Real-Time Data:</strong> Get instant and accurate SEO metrics.</li>
                    <li><strong>Backlink Analysis:</strong> Check total backlinks and referring domains.</li>
                    <li><strong>Spam Score Checker:</strong> Identify harmful links affecting SEO.</li>
                    <li><strong>Domain Age:</strong> Know how old your domain is.</li>
                    <li><strong>Competitor Comparison:</strong> Compare with other domains.</li>
                </ul>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Scale size={18} /> How Domain Authority is Calculated
                </h2>

                <p className="text-gray-700 leading-7">
                    Domain Authority is calculated using various SEO factors, mainly backlinks and referring domains. High-quality backlinks from trusted websites increase your authority score, while spammy links can reduce it. Search engines treat backlinks as votes of trust.
                </p>

                <p className="text-gray-700 leading-7">
                    This tool analyzes all these factors to give you a reliable DA score so you can improve your SEO strategy.
                </p>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Globe size={18} /> Benefits of Using Domain Authority Checker
                </h2>

                <ul className="list-disc pl-6 text-gray-700 leading-7 space-y-2">
                    <li>Improve search engine rankings</li>
                    <li>Track SEO performance</li>
                    <li>Analyze competitors</li>
                    <li>Build strong backlink strategy</li>
                    <li>Increase organic traffic</li>
                </ul>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <RefreshCcw size={18} /> How to Use This Tool
                </h2>

                <p className="text-gray-700 leading-7">
                    Enter your domain name in the input box and click on "Check Authority". Within seconds, you will get complete SEO data including DA, PA, backlinks, spam score, and domain age. The tool is simple, fast, and beginner-friendly.
                </p>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 size={18} /> SEO Keywords Included
                </h2>

                <p className="text-gray-700 leading-7">
                    Domain Authority Checker, DA PA Checker, Website Authority Checker, Backlink Checker, Free SEO Tools, Page Authority Checker, Spam Score Checker, Website SEO Analysis, Domain Ranking Tool.
                </p>

                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ShieldAlert size={18} /> Final Thoughts
                </h2>

                <p className="text-gray-700 leading-7">
                    This Domain Authority Checker is an essential SEO tool for improving website performance. It helps you understand your website’s strength and provides actionable insights to boost rankings and traffic.
                </p>

            </div>

        </div>
    );
}

function Stat({ title, value, color }: any) {
    return (
        <div className={`p-4 rounded-xl ${color}`}>
            <p className="text-sm text-gray-600">{title}</p>
            <h2 className="text-xl font-bold">{value}</h2>
        </div>
    );
}