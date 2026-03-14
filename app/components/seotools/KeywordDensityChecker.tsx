"use client"

import { useState } from "react"
import { Sparkles, Search, BarChart3, Copy, Loader2, Check, Download, TrendingUp } from "lucide-react"

export default function KeywordDensityChecker() {

    const [text, setText] = useState("")
    const [keywords, setKeywords] = useState<any[]>([])
    const [aiKeywords, setAiKeywords] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    function calculateDensity() {

        if (!text) return

        const words = text.toLowerCase().match(/\b\w+\b/g) || []
        const totalWords = words.length

        const frequency: any = {}

        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1
        })

        const density = Object.entries(frequency)
            .map(([word, count]: any) => ({

                word,
                count,
                density: ((count / totalWords) * 100).toFixed(2)

            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20)

        setKeywords(density)

    }

    async function generateKeywords() {

        if (!text) return

        setLoading(true)

        const res = await fetch("/api/seotools/ai-keywords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        })

        const data = await res.json()

        setAiKeywords(data.keywords || [])

        setLoading(false)

    }

    function copyKeywords() {

        if (!aiKeywords.length) return

        const text = aiKeywords
            .map((k: any) => k.keyword)
            .join(", ")

        navigator.clipboard.writeText(text)

        setCopied(true)

        setTimeout(() => setCopied(false), 2000)

    }

    function downloadCSV() {

        if (!aiKeywords.length) return

        const headers = ["Keyword", "Search Volume", "Difficulty", "Long Tail"]

        const rows = aiKeywords.map((k: any) => [
            k.keyword,
            k.searchVolume,
            k.difficulty,
            k.longTailKeyword
        ])

        let csv = [headers, ...rows]
            .map(row => row.join(","))
            .join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "seo-keywords.csv"
        a.click()

    }

    return (

        <div className="mx-auto">

            {/* INPUT */}

            <div className="mb-8">

                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Search size={20} /> Analyze Text
                </h2>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your content here..."
                    className="w-full border rounded-lg p-3 min-h-37.5"
                />

                <div className="flex gap-3 mt-4">

                    <button
                        onClick={calculateDensity}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <BarChart3 size={18} /> Calculate Density
                    </button>

                    <button
                        onClick={generateKeywords}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >

                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                AI Keyword Ideas
                            </>
                        )}

                    </button>

                </div>

            </div>

            {/* RESULTS */}

            {keywords.length > 0 && (

                <div className="mb-10">

                    <h3 className="text-lg font-semibold mb-4">
                        Keyword Density Results
                    </h3>

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Keyword</th>
                                <th>Count</th>
                                <th>Density</th>
                            </tr>
                        </thead>

                        <tbody>

                            {keywords.map((k, i) => (
                                <tr key={i} className="border-b">

                                    <td className="py-2">{k.word}</td>
                                    <td className="text-center">{k.count}</td>
                                    <td className="text-center">{k.density}%</td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            )}

            {/* AI KEYWORDS */}

            {aiKeywords.length > 0 && (

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="flex justify-between items-center mb-4">

                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Sparkles size={18} /> AI Suggested Keywords
                        </h3>

                        <button
                            onClick={copyKeywords}
                            className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1 rounded"
                        >

                            {copied ? (
                                <>
                                    <Check size={16} /> Copied
                                </>
                            ) : (
                                <>
                                    <span className="cursor-pointer flex gap-1 align-middle"> <Copy size={16} /> Copy</span>
                                </>
                            )}

                        </button>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                            <Download size={16} /> Export CSV
                        </button>


                    </div>
                    {loading && (
                        <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                            <Loader2 className="animate-spin" size={16} />
                            AI is analyzing your content and generating keyword insights...
                        </div>
                    )}

                    {aiKeywords.length > 0 && (
                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-gray-50 border-b">

                                    <tr>

                                        <th className="text-left p-2">Keyword</th>
                                        <th className="text-center">Search Volume</th>
                                        <th className="text-center">Difficulty</th>
                                        <th className="text-left">Long-Tail Keyword</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {aiKeywords.map((k: any, i) => {

                                        let difficultyColor = "bg-green-100 text-green-700"

                                        if (k.difficulty > 40) difficultyColor = "bg-yellow-100 text-yellow-700"
                                        if (k.difficulty > 70) difficultyColor = "bg-red-100 text-red-700"

                                        return (

                                            <tr key={i} className="border-b">

                                                <td className="p-2 font-medium">{k.keyword}</td>

                                                <td className="text-center">{k.searchVolume}</td>

                                                <td className="text-center">

                                                    <span className={`px-2 py-1 rounded text-xs ${difficultyColor}`}>
                                                        {k.difficulty}
                                                    </span>

                                                </td>

                                                <td>{k.longTailKeyword}</td>

                                            </tr>

                                        )

                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            )}

        </div>

    )

}