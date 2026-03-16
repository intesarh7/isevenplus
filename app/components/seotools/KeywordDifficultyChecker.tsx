"use client";

import { useState } from "react";
import {
    Search,
    BarChart3,
    TrendingUp,
    Globe,
    Link,
    Lightbulb,
    Target,
    Tag,
    Copy,
    Download
} from "lucide-react";

export default function KeywordDifficultyChecker() {

    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function analyze() {

        if (!keyword.trim()) return;

        setLoading(true);

        const res = await fetch("/api/seotools/keyword-difficulty-checker", {
            method: "POST",
            body: JSON.stringify({ keyword })
        });

        const data = await res.json();

        setResult(data);

        setLoading(false);
    }

    function copyKeywords() {

        if (!result?.suggestions) return;

        navigator.clipboard.writeText(result.suggestions.join("\n"));
    }

    function exportCSV() {

        if (!result?.suggestions) return;

        const rows = result.suggestions.map((k: string) => `${k}`).join("\n");

        const blob = new Blob([rows], { type: "text/csv" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "keywords.csv";

        a.click();
    }

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="border rounded-2xl p-6 space-y-6 bg-white">

                <h1 className="text-2xl font-bold flex gap-2 items-center">
                    <BarChart3 className="text-indigo-600" />
                    Keyword Difficulty Checker PRO
                </h1>

                <input
                    type="text"
                    placeholder="Enter keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border p-3 rounded-lg w-full"
                />

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={analyze}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg"
                    >
                        <Search size={18} />
                        Analyze Keyword
                    </button>

                    <button
                        onClick={copyKeywords}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg"
                    >
                        <Copy size={18} />
                        Copy Keywords
                    </button>

                    <button
                        onClick={exportCSV}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-3 rounded-lg"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>

                </div>

            </div>

            {/* LOADER */}

            {loading && (

                <div className="flex gap-2 items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full" />
                    Analyzing SERP & Competitors...
                </div>

            )}

            {result && (

                <div className="space-y-8">

                    {/* MAIN METRICS */}

                    <div className="grid md:grid-cols-4 gap-4">

                        <Metric title="Difficulty" value={result?.difficulty ?? 0} />

                        <Metric title="Search Volume" value={result.volume} />

                        <Metric title="CPC" value={`$${result.cpc}`} />

                        <Metric title="Intent" value={result.intent} />

                        <Metric title="Backlinks" value={result?.backlinks ?? 0} />

                        <Metric title="Authority" value={result?.authority ?? 0} />

                        <Metric title="Opportunity" value={result.opportunityScore} />

                        <Metric title="Rank Probability" value={`${result.rankingProbability}%`} />

                    </div>

                    {/* SEO SCORE */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Target className="text-indigo-600" />
                            SEO Difficulty Meter
                        </h2>

                        <div className="flex justify-between mb-2 text-sm text-gray-600">
                            <span>0</span>
                            <span className="font-bold text-indigo-600">
                                {result?.difficulty || 0}
                            </span>
                            <span>100</span>
                        </div>

                        <div className="relative w-full bg-gray-200 h-6 rounded">

                            <div
                                className={`h-6 rounded flex items-center justify-center text-white text-xs font-bold ${result?.difficulty < 30
                                        ? "bg-green-500"
                                        : result?.difficulty < 60
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                style={{ width: `${result?.difficulty || 0}%` }}
                            >
                                {result?.difficulty || 0}
                            </div>

                        </div>

                    </div>

                    {/* TREND GRAPH */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-indigo-600" />
                            Difficulty Trend
                        </h2>

                        <div className="flex gap-3 items-end h-10">

                            {(result?.difficultyTrend || []).map((v: number, i: number) => (

                                <div key={i} className="flex flex-col items-center w-full">

                                    <div
                                        className="w-full rounded-lg bg-linear-to-t from-indigo-600 to-indigo-400 flex items-end justify-center text-white text-xs font-semibold pb-1 transition-all duration-700"
                                        style={{ height: `${Math.max(v, 5)}%` }}
                                    >
                                        {v}
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* SERP COMPETITORS */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex gap-2 items-center">
                            <Globe className="text-indigo-600" />
                            Top SERP Competitors ({result?.competitors?.length || 0})
                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="border-b">
                                        <th className="p-2 text-left">#</th>
                                        <th className="p-2 text-left">Domain</th>
                                        <th className="p-2 text-left">DA</th>
                                        <th className="p-2 text-left">Backlinks</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {(result?.competitors || []).length > 0 ? (

                                        result.competitors.map((c: any) => (

                                            <tr key={c.position} className="border-b">

                                                <td className="p-2">{c.position}</td>

                                                <td className="p-2">

                                                    <td className="p-2">
                                                        <a
                                                            href={`https://${c.domain}`}
                                                            target="_blank"
                                                            className="text-indigo-600 hover:underline"
                                                        >
                                                            {c.domain}
                                                        </a>
                                                    </td>

                                                </td>

                                                <td className="p-2">{c.domainAuthority}</td>

                                                <td className="p-2">
                                                    {c.backlinks?.toLocaleString()}
                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-gray-500">
                                                Loading competitors...
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* KEYWORD SUGGESTIONS */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Lightbulb className="text-indigo-600" />
                            Keyword Suggestions
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {(result?.suggestions || []).map((s: string) => (

                                <span
                                    key={s}
                                    className="bg-gray-100 px-3 py-1 rounded text-sm"
                                >
                                    {s}
                                </span>

                            ))}

                        </div>

                    </div>

                    {/* KEYWORD CLUSTERS */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Tag className="text-indigo-600" />
                            Keyword Clusters
                        </h2>

                        {Object.keys(result.clusters).map(cluster => (

                            <div key={cluster} className="mb-4">

                                <p className="font-semibold mb-2">{cluster}</p>

                                <div className="flex flex-wrap gap-2">

                                    {result.clusters[cluster].map((k: string) => (

                                        <span
                                            key={k}
                                            className="bg-indigo-50 px-3 py-1 rounded"
                                        >
                                            {k}
                                        </span>

                                    ))}

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* KEYWORD GAP */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <Link className="text-indigo-600" />
                            Keyword Gap Opportunities
                        </h2>

                        <ul className="list-disc pl-6">

                            {(result?.keywordGap || []).map((k: string) => (

                                <li key={k}>{k}</li>

                            ))}

                        </ul>

                    </div>

                    {/* CONTENT DIFFICULTY */}

                    <div className="border rounded-xl p-6">

                        <h2 className="font-semibold mb-4 flex items-center gap-2">
                            <BarChart3 className="text-indigo-600" />
                            Content Difficulty Score
                        </h2>

                        <p className="text-3xl font-bold text-indigo-600">
                            {result.contentDifficulty}/100
                        </p>

                    </div>

                </div>

            )}

        </div>

    );
}

function Metric({ title, value }: any) {

    return (

        <div className="border p-4 rounded-lg bg-white">

            <p className="text-gray-500 text-sm">{title}</p>

            <p className="text-2xl font-bold">{value}</p>

        </div>

    );
}