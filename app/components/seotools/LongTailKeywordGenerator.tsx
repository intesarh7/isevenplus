"use client"

import { useState } from "react"
import {
    Search,
    Copy,
    Download,
    ArrowUpDown,
    BarChart3,
    Tag
} from "lucide-react"

import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip
} from "recharts"

export default function LongTailKeywordGenerator() {

    const [keyword, setKeyword] = useState("")
    const [country, setCountry] = useState("us")
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const [minVolume, setMinVolume] = useState(0)
    const [maxDifficulty, setMaxDifficulty] = useState(100)
    const [intentFilter, setIntentFilter] = useState("all")

    const [sortKey, setSortKey] = useState("volume")
    const [sortDir, setSortDir] = useState("desc")

    async function generate() {

        setLoading(true)

        const res = await fetch("/api/seotools/long-tail-keywords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keyword, country })
        })

        const json = await res.json()

        setData(json)

        setLoading(false)

    }

    function sort(key: string) {

        if (sortKey === key) {

            setSortDir(sortDir === "asc" ? "desc" : "asc")

        } else {

            setSortKey(key)
            setSortDir("desc")

        }

    }

    let rows = data?.keywords || []
    const totalKeywords = data?.keywords?.length || 0

    rows = rows.filter((k: any) => {

        if (k.keyword.split(" ").length < 3) return false

        if (k.volume < minVolume) return false
        if (k.difficulty > maxDifficulty) return false

        if (intentFilter !== "all" && k.intent !== intentFilter)
            return false

        return true

    })

    rows = [...rows].sort((a, b) => {

        const v1 = a[sortKey]
        const v2 = b[sortKey]

        if (v1 < v2) return sortDir === "asc" ? -1 : 1
        if (v1 > v2) return sortDir === "asc" ? 1 : -1

        return 0

    })

    function download(blob: any, name: string) {

        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = name
        a.click()

    }

    function exportFile(type: string) {

        if (!rows.length) return

        if (type === "json") {

            download(new Blob([JSON.stringify(rows, null, 2)]), "keywords.json")

        }

        if (type === "txt") {

            const text = rows.map((k: any) => k.keyword).join("\n")
            download(new Blob([text]), "keywords.txt")

        }

        if (type === "csv") {

            const csv = "keyword,volume,cpc,difficulty,intent\n" +
                rows.map((k: any) => `${k.keyword},${k.volume},${k.cpc},${k.difficulty},${k.intent}`).join("\n")

            download(new Blob([csv]), "keywords.csv")

        }

    }

    function intentIcon(i: string) {

        if (i === "Transactional") return "💰"
        if (i === "Commercial") return "🛒"
        if (i === "Informational") return "📘"

        return "🔍"

    }

    function difficultyColor(d: number) {

        if (d < 30) return "bg-green-500"
        if (d < 60) return "bg-yellow-500"

        return "bg-red-500"

    }

    function trendBadge(t: string) {

        if (t === "Rising") return "bg-green-100 text-green-700"
        if (t === "Declining") return "bg-red-100 text-red-700"

        return "bg-gray-100 text-gray-700"

    }

    return (

        <div className="max-w-7xl mx-auto p-6 space-y-10">

            <h1 className="text-3xl font-bold">
                Long Tail Keyword Generator
            </h1>

            <div className="flex gap-3">

                <input
                    className="border p-3 rounded w-full"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                />

                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border p-3 rounded"
                >

                    <option value="us">USA</option>
                    <option value="in">India</option>
                    <option value="uk">UK</option>

                </select>

                <button
                    onClick={generate}
                    className="bg-indigo-600 text-white px-6 rounded flex items-center gap-2"
                >

                    <Search size={18} />
                    Generate

                </button>

            </div>

            {/* Filters */}

            <div className="flex flex-wrap gap-4">

                <input
                    type="number"
                    placeholder="Min Volume"
                    value={minVolume === 0 ? "" : minVolume}
                    className="border p-2 rounded"
                    onChange={(e) => {

                        const v = e.target.value

                        if (v === "") {
                            setMinVolume(0)
                            return
                        }

                        setMinVolume(Number(v))

                    }}
                />

                <input
                    type="number"
                    placeholder="Max Difficulty"
                    value={maxDifficulty === 100 ? "" : maxDifficulty}
                    className="border p-2 rounded"
                    onChange={(e) => {

                        const v = e.target.value

                        if (v === "") {
                            setMaxDifficulty(100)
                            return
                        }

                        setMaxDifficulty(Number(v))

                    }}
                />

                <select
                    className="border p-2 rounded"
                    onChange={(e) => setIntentFilter(e.target.value)}
                >

                    <option value="all">All Intent</option>
                    <option value="Informational">Informational</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>

                </select>

                <button
                    onClick={() => {
                        setMinVolume(0)
                        setMaxDifficulty(100)
                        setIntentFilter("all")
                    }}
                    className="border px-3 py-2 rounded text-sm"
                >
                    Reset Filters
                </button>

            </div>

            {loading && <div>Loading keywords...</div>}

            {data && (

                <div className="text-sm text-gray-600">

                    Showing <b>{rows.length}</b> of <b>{totalKeywords}</b> keywords

                </div>

            )}
            {rows.length > 0 ? (

                <>

                    <div className="flex gap-3">

                        <button
                            onClick={() => exportFile("csv")}
                            className="bg-gray-700 text-white px-3 py-2 rounded"
                        >
                            CSV
                        </button>

                        <button
                            onClick={() => exportFile("json")}
                            className="bg-gray-700 text-white px-3 py-2 rounded"
                        >
                            JSON
                        </button>

                        <button
                            onClick={() => exportFile("txt")}
                            className="bg-gray-700 text-white px-3 py-2 rounded"
                        >
                            TXT
                        </button>

                    </div>

                    <div className="overflow-auto border rounded-lg max-h-125">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-100 sticky top-0">

                                <tr>

                                    <th onClick={() => sort("keyword")} className="p-3 cursor-pointer">
                                        Keyword <ArrowUpDown size={14} className="inline" />
                                    </th>

                                    <th onClick={() => sort("volume")} className="p-3 text-center cursor-pointer">
                                        Volume
                                    </th>

                                    <th onClick={() => sort("cpc")} className="p-3 text-center cursor-pointer">
                                        CPC
                                    </th>

                                    <th onClick={() => sort("difficulty")} className="p-3 text-center cursor-pointer">
                                        Difficulty
                                    </th>

                                    <th className="p-3 text-center">
                                        Intent
                                    </th>

                                    <th className="p-3 text-center">
                                        Trend
                                    </th>

                                    <th className="p-3 text-center">
                                        Words
                                    </th>

                                    <th className="p-3 text-center">
                                        Opportunity
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {rows.map((k: any, i: number) => (

                                    <tr key={i} className="border-t hover:bg-gray-50">

                                        <td className="p-3 flex justify-between">

                                            {k.keyword}

                                            <button
                                                onClick={() => navigator.clipboard.writeText(k.keyword)}
                                                className="text-gray-400"
                                            >

                                                <Copy size={14} />

                                            </button>

                                        </td>

                                        <td className="text-center">

                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">

                                                {k.volume.toLocaleString()}

                                            </span>

                                        </td>

                                        <td className="text-center">

                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">

                                                ${k.cpc}

                                            </span>

                                        </td>

                                        <td className="p-3">

                                            <div
                                                title="Keyword Difficulty: Higher score = harder to rank"
                                                className="flex items-center gap-2"
                                            >

                                                <div className="w-full bg-gray-200 rounded h-2">

                                                    <div
                                                        className={`h-2 rounded ${difficultyColor(k.difficulty)}`}
                                                        style={{ width: `${k.difficulty}%` }}
                                                    />

                                                </div>

                                                <span className="text-xs w-6">
                                                    {k.difficulty}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="text-center">
                                            {intentIcon(k.intent)} {k.intent}
                                        </td>

                                        <td className="text-center">

                                            <span className={`px-2 py-1 rounded text-xs ${trendBadge(k.trend)}`}>
                                                {k.trend}
                                            </span>

                                        </td>

                                        <td className="text-center">
                                            {k.words}
                                        </td>

                                        <td className="text-center">

                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">

                                                ⭐ {k.opportunity}

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* Volume vs Difficulty Chart */}

                    <div>

                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">

                            <BarChart3 size={18} />
                            Volume vs Difficulty

                        </h2>

                        <div style={{ width: "100%", height: 300 }}>

                            <ResponsiveContainer>

                                <ScatterChart>

                                    <XAxis dataKey="difficulty" name="Difficulty" />
                                    <YAxis dataKey="volume" name="Volume" />

                                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />

                                    <Scatter data={data.chartData} fill="#6366f1" />

                                </ScatterChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* SERP preview */}

                    <div>

                        <h2 className="text-xl font-semibold flex gap-2 items-center">
                            Top SERP Results
                        </h2>

                        {data?.serp && data.serp.length > 0 ? (

                            <ul className="list-disc pl-5 space-y-1 mt-3">

                                {data.serp.map((s: string, i: number) => (
                                    <li key={i}>{s}</li>
                                ))}

                            </ul>

                        ) : (

                            <div className="text-gray-500 text-sm">
                                No SERP results found.
                            </div>

                        )}

                    </div>

                    {/* Keyword Clusters */}

                    <div>

                        <h2 className="text-xl font-semibold">

                            Keyword Clusters

                        </h2>

                        {Object.keys(data?.clusters || {}).slice(0, 5).map((c) => (
                            <div key={c} className="border p-3 rounded mb-2">

                                <div className="font-semibold mb-1">{c}</div>

                                <div className="flex flex-wrap gap-2">

                                    {data.clusters[c].slice(0, 6).map((k: string) => (
                                        <span key={k} className="bg-gray-100 px-2 py-1 text-xs rounded">
                                            {k}
                                        </span>
                                    ))}

                                </div>

                            </div>
                        ))}

                    </div>

                </>

            ) : data?.keywords?.length ? (

                <div className="text-center py-10 text-red-500">

                    No keywords match your filters.

                    Try lowering Min Volume or increasing Max Difficulty.

                </div>

            ) : null}

            {/* SEO Content */}

            <div className="space-y-6 pt-10">

                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 size={22} />
                    About Loan Keyword Generator
                </h2>

                <p>
                    A Loan Keyword Generator is an advanced SEO tool designed to help marketers, bloggers, and financial websites discover high-value keywords related to loans. Loan keywords are among the most competitive search queries on the internet because the finance industry has some of the highest advertising budgets and CPC rates.
                </p>

                <p>
                    This tool analyzes search patterns and generates hundreds of long-tail keywords related to personal loans, home loans, car loans, education loans, and other financial topics. Instead of targeting highly competitive keywords such as “loan” or “personal loan,” this generator helps you find long-tail search queries that have lower competition but high intent.
                </p>

                <p>
                    By using a Loan Keyword Generator, you can discover keywords that real users search on Google, Bing, and other search engines. These keywords can be used to improve SEO rankings, create blog content, optimize landing pages, and build effective PPC advertising campaigns.
                </p>


                <h2 className="text-2xl font-bold">
                    How the Loan Keyword Generator Works
                </h2>

                <p>
                    The Loan Keyword Generator works by collecting keyword suggestions from multiple sources including search engine autocomplete, related searches, and real SERP results. When you enter a seed keyword such as “home loan” or “personal loan,” the tool expands it into hundreds of related keyword variations.
                </p>

                <p>
                    It then evaluates important SEO metrics such as estimated search volume, keyword difficulty, cost-per-click (CPC), and search intent. These metrics help you understand which keywords are worth targeting and which ones may be too competitive.
                </p>

                <p>
                    The system also generates question-based keywords like “how to get a personal loan,” “which bank offers the lowest home loan interest,” and “best loan options for students.” These question queries are extremely valuable for blog content and featured snippet optimization.
                </p>

                <p>
                    In addition, the tool clusters related keywords together so you can easily identify keyword groups for building topic clusters and SEO content strategies. This helps search engines understand your website structure and improves your chances of ranking for multiple loan-related keywords.
                </p>


                <h2 className="text-2xl font-bold">
                    Why Loan Keywords Are Important for SEO
                </h2>

                <p>
                    Loan keywords are considered high-value keywords in digital marketing because financial products generate significant revenue for banks, fintech companies, and loan providers. As a result, advertisers are willing to pay a high CPC to appear in search results.
                </p>

                <p>
                    If your website ranks for loan-related keywords, it can generate high-quality traffic with strong commercial intent. Visitors searching for loan information are often looking to compare lenders, calculate interest rates, or apply for loans online.
                </p>

                <p>
                    By targeting the right loan keywords, you can attract users who are actively researching financial solutions. This makes loan keyword research an essential part of SEO strategies for finance blogs, loan comparison websites, and financial service platforms.
                </p>


                <h2 className="text-2xl font-bold">
                    Types of Loan Keywords You Can Discover
                </h2>

                <p>
                    This keyword generator can help you discover a wide range of loan-related search queries including informational, commercial, and transactional keywords. Informational keywords usually involve questions about loans, interest rates, and eligibility requirements.
                </p>

                <p>
                    Commercial keywords are used when users compare loan providers, interest rates, and repayment options. These keywords often include terms such as “best,” “top,” or “compare.”
                </p>

                <p>
                    Transactional keywords indicate strong purchase intent. Users searching for these queries are often ready to apply for a loan or contact lenders. Examples include “apply for personal loan online” or “instant loan approval.”
                </p>

                <p>
                    By targeting different types of loan keywords, you can capture traffic from multiple stages of the user journey—from research to application.
                </p>


                <h2 className="text-2xl font-bold">
                    Benefits of Using a Loan Keyword Generator
                </h2>

                <ul className="list-disc pl-6 space-y-2">

                    <li>Discover high-value long-tail loan keywords</li>

                    <li>Identify low competition keywords for SEO</li>

                    <li>Generate blog topic ideas related to finance and loans</li>

                    <li>Find keywords with strong commercial search intent</li>

                    <li>Improve Google rankings with targeted keyword research</li>

                    <li>Optimize Google Ads campaigns using high CPC keywords</li>

                    <li>Understand keyword difficulty and search volume</li>

                    <li>Create content clusters for finance websites</li>

                </ul>


                <h2 className="text-2xl font-bold">
                    Who Should Use This Tool
                </h2>

                <p>
                    A Loan Keyword Generator is useful for a wide range of professionals working in digital marketing, finance, and content creation. Bloggers who write about personal finance can use this tool to generate article ideas that attract search traffic.
                </p>

                <p>
                    SEO specialists can use the keyword data to identify ranking opportunities and optimize landing pages. Financial institutions and loan providers can also use the tool to discover keywords for PPC advertising campaigns.
                </p>

                <p>
                    Affiliate marketers who promote loan products can benefit from finding high-intent keywords that convert well. Even startups and fintech companies can use keyword research insights to build targeted marketing strategies.
                </p>


                <h2 className="text-2xl font-bold">
                    Tips for Ranking for Loan Keywords
                </h2>

                <p>
                    Ranking for loan keywords can be challenging because the finance industry is highly competitive. However, targeting long-tail keywords and creating helpful content can significantly improve your chances of ranking.
                </p>

                <p>
                    Focus on answering real user questions related to loans, interest rates, eligibility criteria, and repayment options. Creating in-depth guides, comparison articles, and financial calculators can help attract organic traffic.
                </p>

                <p>
                    Another effective strategy is building topical authority. Instead of targeting a single keyword, create multiple pieces of content around a central topic such as personal loans or home loans. This signals to search engines that your website is an authority in the finance niche.
                </p>

                <p>
                    Finally, ensure that your content is well-structured with clear headings, optimized meta tags, and relevant internal links. This improves both user experience and search engine visibility.
                </p>


                <h2 className="text-2xl font-bold">
                    Why Long Tail Loan Keywords Convert Better
                </h2>

                <p>
                    Long-tail loan keywords typically have lower search volume compared to short keywords, but they often generate higher conversion rates. This is because users searching for long-tail queries usually have a clear intent and know exactly what they are looking for.
                </p>

                <p>
                    For example, a keyword like “personal loan” is very broad and competitive. However, a long-tail keyword such as “best personal loan for low credit score” targets a specific audience with a clear need.
                </p>

                <p>
                    By targeting these specific search queries, you can attract more qualified visitors who are more likely to take action—whether that means applying for a loan, signing up for a financial service, or clicking affiliate links.
                </p>


                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Tag size={20} />
                    Related Search Tags
                </h2>

                <div className="flex flex-wrap gap-2">

                    {[
                        "loan keyword generator",
                        "personal loan keywords",
                        "home loan keyword ideas",
                        "loan SEO keywords",
                        "finance keyword generator",
                        "high CPC loan keywords",
                        "loan blog topic ideas",
                        "loan keyword research tool",
                        "long tail loan keywords",
                        "loan marketing keywords",
                        "bank loan SEO keywords",
                        "best loan keywords for SEO"
                    ].map(tag => (

                        <span
                            key={tag}
                            className="bg-gray-100 px-3 py-1 rounded text-sm"
                        >
                            {tag}
                        </span>

                    ))}

                </div>

            </div>
        </div>

    )

}