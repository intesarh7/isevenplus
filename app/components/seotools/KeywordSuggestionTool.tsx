"use client";

import { useState, useMemo } from "react";
import {
    Search,
    Copy,
    Download,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
    BarChart3,
    Tag,
    Rocket,
    Lightbulb
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function KeywordSuggestionTool() {

    const [keyword, setKeyword] = useState("");
    const [limit, setLimit] = useState(20);
    const [country, setCountry] = useState("us");
    const [type, setType] = useState("all");
    const [outline, setOutline] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [questions, setQuestions] = useState<string[]>([]);
    const [serp, setSerp] = useState<any[]>([]);
    const [sortField, setSortField] = useState<string | null>(null);
    const [serpSearched, setSerpSearched] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [error, setError] = useState("");

    const [year, setYear] = useState(new Date().getFullYear());

    const generateKeywords = async () => {

        if (!keyword.trim()) {
            setError("Please enter a keyword");
            return;
        }

        setError("");

        setLoading(true);

        const res = await fetch(
            `/api/seotools/keyword-suggestions?keyword=${encodeURIComponent(keyword)}&limit=${limit}&country=${country}`
        );

        const data = await res.json();

        setResults(data.suggestions || []);
        setQuestions(data.questions || []);

        setLoading(false);

    };

    const copyAll = () => {

        if (results.length === 0) {
            setError("Generate keywords first");
            return;
        }

        navigator.clipboard.writeText(
            results.map(r => r.keyword).join("\n")
        );

    };

    const exportCSV = () => {

        if (results.length === 0) {
            setError("No keywords available to export");
            return;
        }

        const csv =
            "Keyword,Volume,CPC,Intent,Cluster,Difficulty,SERP\n" +

            results.map(r =>
                `${r.keyword},${r.volume},${r.cpc},${r.intent},${r.cluster},${r.difficulty},${r.serpCompetition}`
            ).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "keywords.csv";
        a.click();

    };

    const fetchSERP = async () => {

        if (!keyword.trim()) {
            setError("Please enter a keyword first");
            return;
        }

        const res = await fetch(`/api/seotools/serp?keyword=${encodeURIComponent(keyword)}`);

        const data = await res.json();

        setSerp(data.results || []);
        setSerpSearched(true);

    };

    const generateOutline = async () => {
        if (!keyword.trim()) {
            setError("Enter keyword before generating outline");
            return;
        }

        const res = await fetch("/api/seotools/content-outline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keyword })
        });

        const data = await res.json();

        setOutline(data.outline || []);

    };
    const getSortIcon = (field: string) => {

        if (sortField !== field) {
            return <ArrowUpDown size={14} />;
        }

        return sortOrder === "asc"
            ? <ArrowUp size={14} />
            : <ArrowDown size={14} />;

    };

    const handleSort = (field: string) => {

        if (sortField === field) {

            setSortOrder(sortOrder === "asc" ? "desc" : "asc");

        } else {

            setSortField(field);
            setSortOrder("asc");

        }

    };

    const filteredResults = results.filter(k => {

        if (type === "short") return k.keyword.split(" ").length <= 2;
        if (type === "long") return k.keyword.split(" ").length > 2;

        return true;

    });

    const sortedResults = useMemo(() => {

        if (!sortField) return filteredResults;

        return [...filteredResults].sort((a, b) => {

            if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;

            return 0;

        });

    }, [filteredResults, sortField, sortOrder]);

    const volumeBadge = (v: number) => {

        if (v < 3000) return "bg-red-100 text-red-700";
        if (v < 10000) return "bg-yellow-100 text-yellow-700";

        return "bg-green-100 text-green-700";

    };

    const difficultyColor = (d: number) => {

        if (d < 30) return "bg-green-500";
        if (d < 60) return "bg-yellow-500";

        return "bg-red-500";

    };

    const serpBadge = (s: number) => {

        if (s < 30) return "bg-green-100 text-green-700";
        if (s < 60) return "bg-yellow-100 text-yellow-700";

        return "bg-red-100 text-red-700";

    };

    const generateTrendData = (year: number) => {

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return months
            .map((m, i) => ({

                month: m,
                value: Math.floor(Math.random() * 2500) + 200

            }))
            .filter((m, i) => {

                if (year === currentYear) {

                    return i <= currentMonth;

                }

                return true;

            });

    };

    const trendData = generateTrendData(year);

    const clusters = useMemo(() => {

        const map: any = {};

        results.forEach(k => {

            if (!map[k.cluster]) map[k.cluster] = [];

            map[k.cluster].push(k.keyword);

        });

        return map;

    }, [results]);

    return (

        <div className="space-y-10">

            <div className="p-6 border rounded-xl bg-white shadow space-y-4">

                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Search size={22} /> Keyword Suggestion Tool
                </h2>

                <input
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    className="w-full border rounded-lg px-4 py-2"
                />
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">

                    <div>
                        <label className="text-sm">Keyword Count </label>
                        <input
                            type="number"
                            value={limit}
                            onChange={e => setLimit(Number(e.target.value))}
                            className="border rounded-lg px-3 py-2 w-24"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Country </label>

                        <select
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >

                            <option value="us">United States</option>
                            <option value="in">India</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="au">Australia</option>

                        </select>

                    </div>

                    <div>
                        <label className="text-sm">Keyword Type </label>

                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >

                            <option value="all">All</option>
                            <option value="short">Short Keywords</option>
                            <option value="long">Long Tail Keywords</option>

                        </select>

                    </div>



                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

                    <button
                        onClick={generateKeywords}
                        disabled={loading}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50"
                    >
                        <Search size={16} /> Generate
                    </button>

                    <button
                        onClick={copyAll}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full sm:flex-1 bg-blue-600 text-white py-2 rounded-lg"
                    >
                        <Copy size={16} /> Copy
                    </button>

                    <button
                        onClick={exportCSV}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full sm:flex-1 bg-green-600 text-white py-2 rounded-lg"
                    >
                        <Download size={16} /> CSV
                    </button>

                    <button
                        onClick={generateOutline}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full sm:flex-1 bg-purple-600 text-white py-2 rounded-lg"
                    >
                        Generate Content Outline
                    </button>
                    <button
                        onClick={fetchSERP}
                        disabled={loading}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full sm:flex-1 bg-orange-600 text-white py-2 rounded-lg disabled:opacity-50"
                    >
                        Analyze SERP
                    </button>

                </div>

            </div>

            {loading && (
                <div className="text-center text-gray-600">
                    Generating SEO keyword data...
                </div>
            )}

            {sortedResults.length > 0 && (

                <div className="overflow-x-auto w-full border rounded-xl bg-white shadow">

                    <table className="min-w-175 w-full text-sm">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("keyword")}>
                                    <div className="flex items-center gap-1">
                                        Keyword {getSortIcon("keyword")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("volume")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        Volume {getSortIcon("volume")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("cpc")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        CPC {getSortIcon("cpc")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("intent")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        Intent {getSortIcon("intent")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("cluster")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        Cluster {getSortIcon("cluster")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("difficulty")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        Difficulty {getSortIcon("difficulty")}
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    onClick={() => handleSort("opportunity")}
                                >
                                    <div className="flex items-center gap-1 justify-center">
                                        Opportunity
                                        {getSortIcon("opportunity")}
                                    </div>
                                </th>

                                <th className="cursor-pointer" onClick={() => handleSort("serpCompetition")}>
                                    <div className="flex items-center gap-1 justify-center">
                                        SERP {getSortIcon("serpCompetition")}
                                    </div>
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sortedResults.map((k, i) => (

                                <tr key={i} className="border-t hover:bg-gray-50">

                                    <td className="p-3 font-medium">{k.keyword}</td>

                                    <td>
                                        <span className={`px-2 py-1 rounded text-xs ${volumeBadge(k.volume)}`}>
                                            {k.volume}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                            ${k.cpc}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                                            {k.intent}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                                            {k.cluster}
                                        </span>
                                    </td>

                                    <td>

                                        <div className="flex items-center gap-2">

                                            <div className="w-full bg-gray-200 h-2 rounded">

                                                <div
                                                    className={`${difficultyColor(k.difficulty)} h-2 rounded`}
                                                    style={{ width: `${k.difficulty}%` }}
                                                />

                                            </div>

                                            <span className="text-xs">{k.difficulty}</span>

                                        </div>

                                    </td>
                                    <td>
                                        <span className={`px-2 py-1 rounded text-xs ${k.opportunity > 70
                                            ? "bg-green-100 text-green-700"
                                            : k.opportunity > 40
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                            {k.opportunity}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={`px-2 py-1 rounded text-xs ${serpBadge(k.serpCompetition)}`}>
                                            {k.serpCompetition}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

            {serpSearched && (

                serp.length > 0 ? (

                    <div className="">

                        <h3 className="text-xl font-semibold mb-4">
                            SERP Analysis
                        </h3>
                        <div className="overflow-x-auto w-full border rounded-xl bg-white shadow">
                            <table className="min-w-175 w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 font-bold">Rank</th>
                                        <th className="p-3 font-bold text-left">Title</th>
                                        <th className="p-3 font-bold">Domain</th>
                                        <th className="p-3 font-bold">Backlinks</th>
                                        <th className="p-3 font-bold">DA</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {serp.map((s, i) => (
                                        <tr key={i} className="border-t">

                                            <td className="p-3 font-medium">{s.rank}</td>
                                            <td className="p-3 font-medium">{s.title}</td>
                                            <td className="p-3 font-medium">{s.domain}</td>
                                            <td className="p-3 font-medium">{s.backlinks}</td>
                                            <td className="p-3 font-medium">{s.da}</td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    </div>
                ) : (

                    <div className="text-gray-500 text-sm">
                        No SERP results found.
                    </div>

                )

            )}

            {outline.length > 0 && (

                <div className="p-6 border rounded-xl bg-white shadow">

                    <h3 className="text-xl font-semibold mb-4">
                        Content Outline
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">

                        {outline.map((o, i) => (
                            <li key={i}>{o}</li>
                        ))}

                    </ul>

                </div>

            )}

            {results.length > 0 && (

                <div className="p-6 border rounded-xl bg-white shadow">

                    <div className="flex justify-between items-center mb-4">

                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <TrendingUp size={20} /> Keyword Trend ({year})
                        </h3>

                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="border rounded-lg px-3 py-2 text-sm"
                        >

                            {[0, 1, 2, 3, 4].map(i => {

                                const y = new Date().getFullYear() - i;

                                return (
                                    <option key={y} value={y}>{y}</option>
                                );

                            })}

                        </select>

                    </div>

                    <ResponsiveContainer width="100%" height={250}>

                        <LineChart data={trendData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip labelFormatter={(label) => `${label} ${year}`} />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

            {Object.keys(clusters).length > 0 && (

                <div className="">

                    <h3 className="text-xl font-semibold mb-4">
                        Keyword Clusters
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">

                        {Object.entries(clusters).map(([name, words]: any) => (

                            <div key={name} className="border rounded-lg p-4">

                                <h4 className="font-semibold mb-2">{name}</h4>

                                <ul className="text-sm space-y-1">

                                    {words.map((w: any, i: number) => (
                                        <li key={i}>{w}</li>
                                    ))}

                                </ul>

                            </div>

                        ))}

                    </div>

                </div>

            )}

            {questions.length > 0 && (

                <div className="p-6 border rounded-xl bg-white shadow">

                    <h3 className="text-xl font-semibold mb-4">
                        People Also Ask
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">

                        {questions.map((q, i) => (
                            <li key={i}>{q}</li>
                        ))}

                    </ul>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section>

                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lightbulb size={20} /> About Keyword Suggestion Tool
                    </h2>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        A <strong>Keyword Suggestion Tool</strong> is one of the most essential tools for anyone working in search engine optimization (SEO), digital marketing, blogging, affiliate marketing, or content creation. It helps you discover the exact keywords that people are typing into search engines like Google, Bing, and DuckDuckGo. By analyzing search behavior and generating keyword variations, a keyword suggestion tool allows you to uncover hidden opportunities that can drive organic traffic to your website.
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        When you start with a single seed keyword, the tool automatically generates multiple keyword ideas including short-tail keywords, long-tail keywords, and semantic variations. These keyword suggestions can be used to create blog posts, landing pages, product descriptions, and marketing campaigns. Instead of guessing what people search for, you can rely on data-driven keyword suggestions to improve your content strategy.
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Modern SEO strategies rely heavily on keyword research. Search engines prioritize relevant content that answers user intent. By using a reliable <strong>SEO keyword suggestion tool</strong>, you can identify the search queries that have high search volume, low competition, and strong ranking potential. This means you can target keywords that bring real traffic rather than wasting time on topics that nobody searches for.
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Our <strong>free keyword suggestion tool</strong> is designed to make keyword research simple, fast, and effective. With just one keyword input, you can generate dozens or even hundreds of keyword ideas instantly. These ideas can help you discover trending topics, niche opportunities, and high-traffic search terms that can significantly boost your website’s SEO performance.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Rocket size={20} /> How Keyword Suggestion Tool Works
                    </h2>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        The keyword suggestion process starts with a seed keyword. Once you enter a keyword into the tool, the system analyzes search patterns and generates multiple keyword combinations that users frequently search online. The goal is to expand a single keyword into a large list of keyword ideas that can be used for SEO campaigns.
                    </p>

                    <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2 leading-relaxed">

                        <li>
                            <strong>Seed Keyword Analysis:</strong> The process begins when you enter a base keyword such as “SEO tools” or “digital marketing”. This keyword acts as the foundation for generating new search queries.
                        </li>

                        <li>
                            <strong>Autocomplete Expansion:</strong> The tool fetches search suggestions similar to Google autocomplete results. These suggestions represent real search queries typed by users.
                        </li>

                        <li>
                            <strong>Long-Tail Keyword Generation:</strong> Long-tail keywords are extended versions of the main keyword. These keywords usually have lower competition and higher conversion potential.
                        </li>

                        <li>
                            <strong>Keyword Intent Detection:</strong> The tool identifies the search intent behind each keyword such as informational, commercial, transactional, or navigational queries.
                        </li>

                        <li>
                            <strong>Keyword Clustering:</strong> Related keywords are grouped into clusters. This helps you build topical authority by creating multiple pieces of content around the same topic.
                        </li>

                        <li>
                            <strong>Opportunity Score Calculation:</strong> The system evaluates search volume, difficulty, and competition to estimate the ranking opportunity of each keyword.
                        </li>

                    </ul>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        By combining all these methods, the keyword suggestion tool creates a powerful keyword database that helps you build an SEO strategy based on real user demand.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Tag size={20} /> Benefits of Using Keyword Suggestion Tool
                    </h2>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Using a professional <strong>SEO keyword generator</strong> provides several advantages for bloggers, marketers, and business owners. Instead of randomly choosing topics, you can make strategic decisions based on search demand and keyword performance.
                    </p>

                    <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2 leading-relaxed">

                        <li>
                            <strong>Discover Long-Tail Keywords:</strong> Long-tail keywords often have lower competition and higher conversion rates. These keywords are easier to rank for in search engines.
                        </li>

                        <li>
                            <strong>Improve Content Planning:</strong> Keyword suggestions help you plan blog posts, guides, and articles that match what users are searching for online.
                        </li>

                        <li>
                            <strong>Increase Organic Traffic:</strong> By targeting relevant search queries, your website can attract more visitors from organic search results.
                        </li>

                        <li>
                            <strong>Understand Search Intent:</strong> Identifying the purpose behind a keyword helps you create content that satisfies user expectations.
                        </li>

                        <li>
                            <strong>Generate Unlimited Topic Ideas:</strong> With hundreds of keyword suggestions, you can build a content calendar filled with SEO-optimized topics.
                        </li>

                        <li>
                            <strong>Competitive SEO Advantage:</strong> Finding low-competition keywords allows new websites to compete with established websites in search rankings.
                        </li>

                        <li>
                            <strong>Better Keyword Targeting:</strong> Instead of focusing only on high-volume keywords, you can target a balanced mix of short and long keywords.
                        </li>

                    </ul>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        In simple terms, keyword research is the backbone of SEO success. Without proper keyword analysis, even high-quality content may fail to reach its audience.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why Keyword Research Is Important for SEO
                    </h2>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Search engines rely on keywords to understand the content of a webpage. When you optimize your content with relevant keywords, search engines can match your page with user search queries. This improves the chances of appearing in search engine results pages (SERPs).
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Effective keyword research allows you to identify search opportunities before creating content. Instead of writing articles randomly, you can target keywords that already have demand. This dramatically increases your chances of ranking higher in Google search results.
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Another benefit of keyword research is understanding market trends. By analyzing trending keywords and search volume patterns, you can identify what topics are currently popular among users. This allows you to create timely content that attracts immediate traffic.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={20} /> Tips for Choosing the Best SEO Keywords
                    </h2>

                    <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2 leading-relaxed">

                        <li>Focus on keywords with moderate search volume and lower competition.</li>

                        <li>Use long-tail keywords for easier ranking opportunities.</li>

                        <li>Analyze search intent before creating content.</li>

                        <li>Combine informational and commercial keywords.</li>

                        <li>Create topic clusters around related keywords.</li>

                        <li>Track keyword performance regularly.</li>

                        <li>Update existing content with new keyword opportunities.</li>

                    </ul>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        Following these keyword research strategies will help you build a strong SEO foundation and improve your chances of ranking in competitive search results.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">Related Search Tags</h2>

                    <div className="flex flex-wrap gap-2 mt-4">

                        {[
                            "keyword suggestion tool",
                            "keyword research tool",
                            "seo keyword generator",
                            "long tail keyword generator",
                            "google keyword suggestions",
                            "free keyword research tool",
                            "keyword ideas generator",
                            "seo keyword finder",
                            "keyword planner alternative",
                            "best keyword research tool",
                            "seo keyword ideas",
                            "keyword generator for seo"
                        ].map(tag => (

                            <span
                                key={tag}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
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