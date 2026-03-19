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
    Download,
    Percent,
    Shield,
    Link2,
    DollarSign
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
                    Keyword Difficulty Checker FREE
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

                        {/* Difficulty */}
                        <div className="p-4 rounded-xl bg-red-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-red-700">Difficulty</p>
                                <h2 className="text-2xl font-bold text-red-900">
                                    {result?.difficulty ?? 0}
                                </h2>
                            </div>
                            <BarChart3 className="text-red-600" />
                        </div>

                        {/* Search Volume */}
                        <div className="p-4 rounded-xl bg-blue-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-blue-700">Search Volume</p>
                                <h2 className="text-2xl font-bold text-blue-900">
                                    {result?.volume}
                                </h2>
                            </div>
                            <Search className="text-blue-600" />
                        </div>

                        {/* CPC */}
                        <div className="p-4 rounded-xl bg-green-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-green-700">CPC</p>
                                <h2 className="text-2xl font-bold text-green-900">
                                    ${result?.cpc}
                                </h2>
                            </div>
                            <DollarSign className="text-green-600" />
                        </div>

                        {/* Intent */}
                        <div className="p-4 rounded-xl bg-purple-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-purple-700">Intent</p>
                                <h2 className="text-2xl font-bold text-purple-900">
                                    {result?.intent}
                                </h2>
                            </div>
                            <Target className="text-purple-600" />
                        </div>

                        {/* Backlinks */}
                        <div className="p-4 rounded-xl bg-indigo-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-indigo-700">Backlinks</p>
                                <h2 className="text-2xl font-bold text-indigo-900">
                                    {result?.backlinks ?? 0}
                                </h2>
                            </div>
                            <Link2 className="text-indigo-600" />
                        </div>

                        {/* Authority */}
                        <div className="p-4 rounded-xl bg-yellow-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-yellow-700">Authority</p>
                                <h2 className="text-2xl font-bold text-yellow-900">
                                    {result?.authority ?? 0}
                                </h2>
                            </div>
                            <Shield className="text-yellow-600" />
                        </div>

                        {/* Opportunity */}
                        <div className="p-4 rounded-xl bg-emerald-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-emerald-700">Opportunity</p>
                                <h2 className="text-2xl font-bold text-emerald-900">
                                    {result?.opportunityScore}
                                </h2>
                            </div>
                            <TrendingUp className="text-emerald-600" />
                        </div>

                        {/* Rank Probability */}
                        <div className="p-4 rounded-xl bg-pink-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-pink-700">Rank Probability</p>
                                <h2 className="text-2xl font-bold text-pink-900">
                                    {result?.rankingProbability}%
                                </h2>
                            </div>
                            <Percent className="text-pink-600" />
                        </div>

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

            {/* SEO CONTENT */}

            <section className="space-y-6">

                <h2 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" />
                    About Keyword Difficulty Checker
                </h2>

                <p>
                    Keyword Difficulty Checker is an essential SEO tool that helps digital marketers,
                    bloggers, content creators, and website owners evaluate how difficult it will be
                    to rank for a specific keyword in search engines like Google, Bing, and Yahoo.
                    When planning an SEO strategy, choosing the right keywords is one of the most
                    important factors for achieving high search rankings and organic traffic.
                    A keyword difficulty checker analyzes competition levels in search engine
                    results pages (SERPs) and provides an estimated difficulty score that shows
                    how challenging it might be to rank for a particular keyword.
                </p>

                <p>
                    Many beginners make the mistake of targeting highly competitive keywords
                    without analyzing their ranking difficulty. As a result, they struggle to
                    achieve visibility even after publishing quality content. Using a keyword
                    difficulty checker allows you to identify low-competition keywords with
                    strong search potential, making it easier to rank faster and grow organic
                    traffic. This tool evaluates several SEO factors such as backlink profiles,
                    domain authority of ranking pages, SERP competition, and overall keyword
                    competitiveness.
                </p>

                <p>
                    Whether you are building a niche website, managing an eCommerce store,
                    optimizing blog articles, or planning content marketing campaigns, a
                    keyword difficulty checker helps you make data-driven decisions. By
                    understanding keyword competitiveness before creating content, you can
                    target keywords that offer the best balance between search volume and
                    ranking difficulty. This approach improves your chances of appearing
                    on the first page of search results and increases your website’s
                    visibility and authority over time.
                </p>

                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Lightbulb size={20} className="text-indigo-600" />
                    How Keyword Difficulty Works
                </h2>

                <p>
                    Keyword difficulty is a metric used in SEO to estimate how hard it is to
                    rank for a particular search term. Most SEO tools calculate keyword
                    difficulty using different algorithms, but the overall concept is the
                    same: analyzing the strength of the websites that currently rank in
                    the top search results. If the top ranking pages belong to high
                    authority domains with strong backlink profiles, the keyword will
                    typically have a high difficulty score.
                </p>

                <p>
                    Our keyword difficulty checker evaluates multiple SEO signals to
                    estimate competition levels. It looks at backlink strength, page
                    authority, domain authority, SERP features, and overall ranking
                    competition. The final score usually ranges from low difficulty
                    keywords (easy to rank) to high difficulty keywords (very competitive).
                </p>

                <ul className="list-disc pl-6 space-y-2">

                    <li>Analyzes the top ranking pages on Google search results</li>
                    <li>Evaluates backlink strength and link authority</li>
                    <li>Checks domain authority and page authority of competitors</li>
                    <li>Measures overall keyword competition level</li>
                    <li>Examines SERP features like featured snippets and ads</li>
                    <li>Estimates the effort required to achieve top rankings</li>

                </ul>

                <p>
                    For example, if a keyword is dominated by authoritative websites such
                    as major brands, news websites, and well-established blogs, the
                    keyword difficulty will be high. On the other hand, if the search
                    results include smaller websites with weak backlink profiles,
                    the keyword difficulty will be lower and easier to target.
                </p>

                <h2 className="text-xl font-bold flex items-center gap-2">
                    <BarChart3 size={20} className="text-indigo-600" />
                    Benefits of Using Keyword Difficulty Checker
                </h2>

                <p>
                    A keyword difficulty checker provides valuable insights that help
                    marketers and SEO professionals build a more effective content
                    strategy. Instead of guessing which keywords might work, you can
                    rely on data-driven analysis to choose keywords with realistic
                    ranking potential. This improves your chances of gaining visibility
                    in search engines and attracting relevant traffic.
                </p>

                <ul className="list-disc pl-6 space-y-2">

                    <li>Find low competition keywords that are easier to rank</li>
                    <li>Build a smarter SEO and content marketing strategy</li>
                    <li>Identify ranking opportunities in your niche</li>
                    <li>Save time by avoiding overly competitive keywords</li>
                    <li>Improve organic search traffic and website visibility</li>
                    <li>Plan blog content based on SEO difficulty insights</li>
                    <li>Optimize keyword targeting for faster ranking results</li>

                </ul>

                <p>
                    By combining keyword difficulty analysis with search volume
                    research, you can discover hidden opportunities that your
                    competitors may overlook. Many successful SEO strategies focus
                    on targeting long-tail keywords with moderate search volume
                    but lower difficulty scores. These keywords often convert
                    better because they match specific search intent.
                </p>

                <h2 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" />
                    Tips to Choose the Right Keywords
                </h2>

                <p>
                    Selecting the right keywords is essential for achieving SEO
                    success. While high search volume keywords may look attractive,
                    they often come with intense competition. A better strategy is
                    to target keywords with moderate search volume and manageable
                    difficulty levels. This approach allows new websites to build
                    authority gradually while generating steady organic traffic.
                </p>

                <ul className="list-disc pl-6 space-y-2">

                    <li>Target long-tail keywords with lower competition</li>
                    <li>Analyze competitor websites and their ranking keywords</li>
                    <li>Focus on keywords that match search intent</li>
                    <li>Combine keyword difficulty with search volume analysis</li>
                    <li>Create high quality content optimized for selected keywords</li>

                </ul>

                <p>
                    For example, instead of targeting a broad keyword like
                    “SEO tools,” you may achieve better results by targeting
                    long-tail variations such as “best free keyword difficulty
                    checker tool” or “how to check keyword competition for SEO.”
                    These keywords typically have lower competition and higher
                    conversion potential.
                </p>

                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Tag size={20} className="text-indigo-600" />
                    Related Search Tags
                </h2>

                <div className="flex flex-wrap gap-2">

                    <span className="bg-gray-100 px-3 py-1 rounded">keyword difficulty checker</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">seo keyword difficulty</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">keyword competition checker</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">free keyword difficulty tool</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">google keyword difficulty checker</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">ahrefs keyword difficulty</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">keyword ranking difficulty</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">keyword competition analysis</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">seo keyword competition tool</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">check keyword difficulty online</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">keyword seo difficulty score</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">best keyword difficulty checker</span>

                </div>

            </section>

        </div>

    );
}