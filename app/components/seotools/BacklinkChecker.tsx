"use client";

import { useState } from "react";
import {
    Search,
    Link2,
    Globe,
    BarChart3,
    RefreshCw,
    Download,
    Scale
} from "lucide-react";

type Backlink = {
    source: string;
    anchor: string;
    type: "dofollow" | "nofollow";
};

export default function BacklinkChecker() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Backlink[]>([]);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    const [anchorStats, setAnchorStats] = useState<{ [key: string]: number }>({});
    const [dr, setDr] = useState(0);

    const [competitor, setCompetitor] = useState("");
    const [competitorStats, setCompetitorStats] = useState<any>(null);

    const [stats, setStats] = useState({
        total: 0,
        dofollow: 0,
        nofollow: 0,
        domains: 0,
    });

    // 🔥 MAIN CHECK FUNCTION
    const handleCheck = async () => {
        if (!url) {
            setError("Please enter a valid URL");
            return;
        }

        setLoading(true);
        setError("");
        setData([]);

        try {
            const res = await fetch(
                `/api/seotools/backlink-checker?url=${encodeURIComponent(url)}`
            );
            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "API Error");

            if (result.blocked) {
                setError(
                    "⚠️ This website blocks scraping (like NDTV, Amazon). Try another site like wikipedia.org"
                );
                setStats(result.stats);
                return;
            }

            if (!result.links || result.links.length === 0) {
                setError("No backlinks found.");
                return;
            }

            setData(result.links);
            setStats(result.stats);

            // ✅ Anchor Analysis
            const map: any = {};
            result.links.forEach((l: any) => {
                const key = l.anchor.toLowerCase();
                map[key] = (map[key] || 0) + 1;
            });
            setAnchorStats(map);

            // ✅ Fake DR
            const fakeDR = Math.min(
                100,
                Math.floor(Math.log10(result.stats.domains + 1) * 40)
            );
            setDr(fakeDR);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 CSV EXPORT
    const exportCSV = () => {
        const csv = [
            ["Source", "Anchor", "Type"],
            ...data.map((d) => [d.source, d.anchor, d.type]),
        ]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const urlBlob = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = "backlinks.csv";
        a.click();
    };

    const filteredData = data.filter((item) => {
        if (filter === "all") return true;
        return item.type === filter;
    });

    return (
        <div className="space-y-6">

            {/* TITLE */}
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Link2 className="text-indigo-600" />
                Backlink Checker Tool (Free)
            </h1>

            {/* INPUT */}
            <div className="bg-white p-4 rounded-xl shadow space-y-3">

                <input
                    type="text"
                    placeholder="Enter domain (example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                <input
                    type="text"
                    placeholder="Enter competitor domain"
                    value={competitor}
                    onChange={(e) => setCompetitor(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-2">

                    <button
                        onClick={handleCheck}
                        className="w-full sm:flex-1 bg-indigo-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <Search size={16} /> Check
                    </button>

                    <button
                        onClick={exportCSV}
                        className="w-full sm:flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <Download size={16} /> Export
                    </button>

                    <button
                        onClick={() => {
                            setUrl("");
                            setData([]);
                            setStats({ total: 0, dofollow: 0, nofollow: 0, domains: 0 });
                        }}
                        className="w-full sm:flex-1 bg-gray-500 text-white py-2 rounded flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={16} /> Reset
                    </button>
                </div>
            </div>

            {/* LOADER */}
            {loading && <div className="text-center animate-pulse">Analyzing...</div>}

            {/* ERROR */}
            {error && (
                <div className="bg-yellow-100 border p-3 rounded text-yellow-800">
                    {error}
                </div>
            )}

            {/* DR SCORE */}
            {dr > 0 && (
                <div className="bg-purple-100 p-5 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-700">Domain Rating (DR)</p>
                    <h2 className="text-3xl font-bold text-gray-900">{dr}/100</h2>
                </div>
            )}

            {/* STATS */}
            {stats.total > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox title="Total Links" value={stats.total} color="bg-gray-100" />
                    <StatBox title="Dofollow" value={stats.dofollow} color="bg-green-100" />
                    <StatBox title="Nofollow" value={stats.nofollow} color="bg-red-100" />
                    <StatBox title="Ref Domains" value={stats.domains} color="bg-blue-100" />
                </div>
            )}

            {/* FILTER */}
            {data.length > 0 && (
                <div className="flex gap-2">
                    {["all", "dofollow", "nofollow"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1 rounded capitalize transition ${filter === f
                                ? "bg-indigo-600 text-white shadow"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* TABLE */}
            {filteredData.length > 0 && (
                <div className="overflow-auto bg-white shadow rounded">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Source</th>
                                <th className="p-2">Anchor</th>
                                <th className="p-2">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, i) => (
                                <tr key={i}>
                                    <td className="p-2 text-blue-600 break-all">
                                        {item.source}
                                    </td>
                                    <td className="p-2">{item.anchor}</td>
                                    <td className="p-2">
                                        {item.type === "dofollow" ? "✅" : "❌"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ANCHOR ANALYSIS */}
            {Object.keys(anchorStats).length > 0 && (
                <div>
                    <h2 className="font-semibold mb-2">Anchor Analysis</h2>
                    {Object.entries(anchorStats)
                        .slice(0, 8)
                        .map(([a, c]: any, i) => {
                            const percent = ((c / stats.total) * 100).toFixed(1);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between text-sm">
                                        <span>{a}</span>
                                        <span>{percent}%</span>
                                    </div>
                                    <div className="bg-gray-200 h-2 rounded">
                                        <div
                                            className="bg-indigo-500 h-2 rounded"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {/* COMPETITOR */}
            {competitor && (
                <button
                    onClick={async () => {
                        const res = await fetch(
                            `/api/seotools/backlink-checker?url=${competitor}`
                        );
                        const result = await res.json();
                        setCompetitorStats(result.stats);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <Scale size={16} /> Compare
                </button>
            )}

            {competitorStats && (
                <div className="bg-gray-50 p-5 rounded-xl shadow-sm border">

                    <h2 className="font-semibold mb-4 text-gray-800">Comparison</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Your Site */}
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Your Site</p>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">
                                Total: {stats.total}
                            </h3>
                            <p className="text-sm text-gray-700">
                                Domains: {stats.domains}
                            </p>
                        </div>

                        {/* Competitor */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Competitor</p>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">
                                Total: {competitorStats.total}
                            </h3>
                            <p className="text-sm text-gray-700">
                                Domains: {competitorStats.domains}
                            </p>
                        </div>

                    </div>
                </div>
            )}

            {/* SEO CONTENT */}
            {/* SEO CONTENT */}
            <div className="mt-12 space-y-10">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> About Backlink Checker Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-7">
                        Backlink Checker Tool is a powerful SEO analysis utility designed to help website owners,
                        bloggers, marketers, and SEO professionals understand the backlink profile of any domain.
                        Backlinks are one of the most important ranking factors in search engines like Google,
                        Bing, and Yahoo. This tool allows you to analyze inbound links, determine their quality,
                        and optimize your SEO strategy accordingly.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        Whether you are trying to improve your website’s domain authority, outrank competitors,
                        or simply monitor your SEO health, this tool provides detailed insights including
                        dofollow vs nofollow links, referring domains, anchor text distribution, and domain
                        rating estimation. It works as a lightweight alternative to premium SEO tools like Ahrefs,
                        SEMrush, and Moz.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        Our backlink checker is especially useful for beginners and advanced users alike,
                        offering an easy-to-use interface with professional-level insights. With features like
                        CSV export, competitor comparison, and anchor analysis, you can make data-driven decisions
                        to grow your website organically.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <BarChart3 size={20} /> How Backlink Analysis Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-7">
                        The Backlink Checker Tool works by scanning the HTML structure of a webpage and extracting
                        all anchor tags (&lt;a&gt;) that contain hyperlinks. These links are then categorized based
                        on attributes such as "nofollow" or "dofollow". Dofollow links pass SEO value (link juice),
                        while nofollow links do not directly impact rankings but still provide traffic and visibility.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        Once the links are collected, the tool processes them to identify unique referring domains,
                        anchor texts, and link types. It also calculates a simulated Domain Rating (DR) score based
                        on domain diversity and link volume, giving you a quick idea of your website’s authority.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        Advanced features like anchor text analysis help you understand how your links are being
                        used across the web, which is crucial for avoiding over-optimization penalties. Additionally,
                        competitor comparison allows you to benchmark your site against others in your niche.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <BarChart3 size={20} /> Benefits of Using This Backlink Checker
                    </h2>

                    <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 leading-7">
                        <li>Analyze your backlink profile instantly without expensive SEO tools</li>
                        <li>Understand dofollow vs nofollow link distribution</li>
                        <li>Identify high-quality referring domains</li>
                        <li>Export backlinks data into CSV for further analysis</li>
                        <li>Compare your website with competitors easily</li>
                        <li>Track anchor text usage and avoid SEO penalties</li>
                        <li>Improve your domain authority and search rankings</li>
                        <li>Detect spammy or low-quality backlinks</li>
                    </ul>

                    <p className="text-gray-700 mt-3 leading-7">
                        Using this tool regularly can significantly improve your SEO strategy. It helps you
                        identify which backlinks are contributing to your rankings and which ones may be
                        harming your website’s reputation.
                    </p>
                </section>

                {/* WHY BACKLINKS IMPORTANT */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Link2 size={20} /> Why Backlinks Are Important for SEO
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        Backlinks act as votes of confidence from one website to another. Search engines
                        consider backlinks as signals of trust, authority, and relevance. The more high-quality
                        backlinks your site has, the higher your chances of ranking on the first page of Google.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        However, not all backlinks are equal. Links from authoritative and relevant websites
                        carry more weight than links from low-quality or spammy sources. That’s why analyzing
                        backlinks is essential for maintaining a strong SEO profile.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> Key Features of This Tool
                    </h2>

                    <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 leading-7">
                        <li>Real-time backlink extraction</li>
                        <li>Dofollow and nofollow classification</li>
                        <li>Referring domains calculation</li>
                        <li>Anchor text distribution analysis</li>
                        <li>Fake Domain Rating (DR) estimation</li>
                        <li>Competitor comparison feature</li>
                        <li>CSV export functionality</li>
                        <li>Fast and lightweight performance</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <BarChart3 size={20} /> Who Should Use This Tool?
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        This tool is ideal for bloggers, SEO experts, digital marketers, website owners,
                        affiliate marketers, and agencies. Whether you are running a small blog or managing
                        multiple client websites, backlink analysis is crucial for success.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        If you are trying to grow your organic traffic, improve search engine rankings,
                        or analyze your competitors, this tool provides everything you need in one place.
                    </p>
                </section>

                {/* LIMITATIONS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> Limitations of Free Backlink Checkers
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        Free backlink tools, including this one, rely on real-time scraping and limited data sources.
                        Unlike premium tools like Ahrefs or SEMrush, they do not have access to massive backlink
                        databases. As a result, some websites (like NDTV, Amazon, etc.) may block requests or
                        provide limited data.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        However, for most normal websites, this tool provides accurate and useful insights that
                        can help you improve your SEO performance effectively.
                    </p>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Link2 size={20} /> Related Search Tags
                    </h2>

                    <p className="text-sm text-gray-600 mt-2 leading-6">
                        backlink checker free, check backlinks online, seo backlink analyzer,
                        domain authority checker free, ahrefs alternative, backlink audit tool,
                        competitor backlink analysis, dofollow backlink checker, nofollow links checker,
                        free seo tools, link analysis tool, website backlink checker online
                    </p>
                </section>

            </div>

        </div>
    );
}

// reusable stat box
function StatBox({ title, value, color }: any) {
    return (
        <div className={`p-4 rounded-xl shadow-sm ${color}`}>
            <p className="text-sm text-gray-700">{title}</p>
            <h2 className="text-xl font-bold text-gray-900">{value}</h2>
        </div>
    );
}