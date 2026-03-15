"use client";

import { useState } from "react";
import {
    RefreshCcw,
    Copy,
    Code,
    Link,
    AlertTriangle
} from "lucide-react";

interface QueryParam {
    key: string
    value: string
}

interface Analysis {
    length: number
    params: QueryParam[]
    unsafe: number
}

export default function UrlEncoderDecoder() {

    const [input, setInput] = useState("")
    const [encoded, setEncoded] = useState("")
    const [decoded, setDecoded] = useState("")
    const [analysis, setAnalysis] = useState<Analysis | null>(null)

    const encode = () => {

        if (!input.trim()) return

        try {

            const result = encodeURIComponent(input)

            setEncoded(result)
            setDecoded("")

            analyze(input)

        } catch {

            alert("Encoding failed")

        }

    }

    const decode = () => {

        if (!input.trim()) return

        try {

            const result = decodeURIComponent(input)

            setDecoded(result)
            setEncoded("")

            analyze(result)

        } catch {

            alert("Invalid encoded text")

        }

    }

    const analyze = (text: string) => {

        let queryParams: QueryParam[] = []

        try {

            if (text.includes("?")) {

                const params = new URLSearchParams(text.split("?")[1])

                params.forEach((value, key) => {
                    queryParams.push({ key, value })
                })

            }

        } catch { }

        const unsafeChars = text.match(/[<>\"'` ]/g) || []

        setAnalysis({

            length: text.length,
            params: queryParams,
            unsafe: unsafeChars.length

        })

    }

    const reset = () => {

        setInput("")
        setEncoded("")
        setDecoded("")
        setAnalysis(null)

    }

    const copy = (text: string) => {

        navigator.clipboard.writeText(text)

    }

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Link className="text-indigo-600" />
                    URL Encoder / Decoder
                </h1>

                <p className="text-gray-600">
                    Encode or decode URLs and text for safe transmission. This tool also analyzes query parameters and detects unsafe characters.
                </p>

                <textarea
                    placeholder="Enter URL or text to encode/decode"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full min-h-30"
                />

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={encode}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        <Code size={18} />
                        Encode
                    </button>

                    <button
                        onClick={decode}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        Decode
                    </button>

                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-gray-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        <RefreshCcw size={18} />
                        Reset
                    </button>

                </div>

            </div>


            {/* RESULT */}

            {encoded && (

                <div className="bg-white border rounded-xl p-6">

                    <h3 className="font-semibold mb-3">
                        Encoded Result
                    </h3>

                    <div className="flex gap-2">

                        <textarea
                            value={encoded}
                            readOnly
                            className="border rounded-lg px-4 py-3 w-full bg-gray-50"
                        />

                        <button
                            onClick={() => copy(encoded)}
                            className="bg-indigo-600 text-white px-3 rounded"
                        >
                            <Copy size={16} />
                        </button>

                    </div>

                </div>

            )}

            {decoded && (

                <div className="bg-white border rounded-xl p-6">

                    <h3 className="font-semibold mb-3">
                        Decoded Result
                    </h3>

                    <div className="flex gap-2">

                        <textarea
                            value={decoded}
                            readOnly
                            className="border rounded-lg px-4 py-3 w-full bg-gray-50"
                        />

                        <button
                            onClick={() => copy(decoded)}
                            className="bg-indigo-600 text-white px-3 rounded"
                        >
                            <Copy size={16} />
                        </button>

                    </div>

                </div>

            )}



            {/* ANALYSIS */}

            {analysis && (

                <div className="space-y-6">

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-blue-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                Length
                            </div>
                            <div className="text-xl font-semibold">
                                {analysis.length}
                            </div>
                        </div>

                        <div className="bg-purple-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                Query Parameters
                            </div>
                            <div className="text-xl font-semibold">
                                {analysis.params.length}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border p-5 rounded-xl">
                            <div className="text-sm text-gray-500">
                                Unsafe Characters
                            </div>
                            <div className="text-xl font-semibold">
                                {analysis.unsafe}
                            </div>
                        </div>

                    </div>


                    {/* QUERY PARAMS */}

                    {analysis.params.length > 0 && (

                        <div className="bg-white border rounded-xl p-6">

                            <h3 className="font-semibold mb-4">
                                Query Parameters
                            </h3>

                            <table className="w-full text-sm">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-left">Key</th>
                                        <th className="p-3 text-left">Value</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {analysis.params.map((p, i) => (
                                        <tr key={i} className="border-t">
                                            <td className="p-3">{p.key}</td>
                                            <td className="p-3 break-all">{p.value}</td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                    {analysis.unsafe > 0 && (

                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">

                            <h3 className="font-semibold flex gap-2 items-center text-red-700">
                                <AlertTriangle size={18} />
                                Unsafe Characters Detected
                            </h3>

                            <p className="text-sm mt-2">
                                Some characters may break URLs and should be encoded before transmission.
                            </p>

                        </div>

                    )}

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>

                    <h2 className="text-xl font-bold">
                        What is URL Encoding?
                    </h2>

                    <p className="text-gray-700 mt-2">
                        URL encoding converts special characters into a format that can be transmitted safely over the internet. Certain characters such as spaces, symbols, and reserved characters must be encoded to ensure that browsers and servers interpret URLs correctly.
                    </p>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Why URL Encoding Matters
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Ensures URLs are transmitted safely</li>
                        <li>Prevents server errors caused by special characters</li>
                        <li>Improves compatibility with browsers and APIs</li>
                        <li>Helps avoid broken links in web applications</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Common Encoded Characters
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">

                        <li>Space → %20</li>
                        <li># → %23</li>
                        <li>& → %26</li>
                        <li>? → %3F</li>

                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "url encoder",
                            "url decoder",
                            "encode url online",
                            "decode url online",
                            "url encoding tool"
                        ].map(tag => (

                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>

                        ))}

                    </div>

                </section>

            </div>


        </div>

    )

}