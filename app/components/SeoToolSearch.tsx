"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SeoToolSearch() {

    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const delay = setTimeout(() => {

            if (!query) {

                setResults([])
                return

            }

            searchTools()

        }, 400)

        return () => clearTimeout(delay)

    }, [query])


    async function searchTools() {

        setLoading(true)

        const res = await fetch(`/api/seotools/search?q=${query}`)

        const data = await res.json()

        setResults(data)

        setLoading(false)

    }


    return (

        <div className="mb-10 relative">

            <input
                type="text"
                placeholder="Search SEO tools..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border w-full p-4 rounded-xl"
            />

            {query && (

                <div className="absolute left-0 right-0 bg-white border rounded-xl shadow-lg mt-2 max-h-96 overflow-y-auto z-20">

                    {loading && (
                        <div className="p-4 text-sm text-gray-500">
                            Searching...
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="p-4 text-sm text-gray-500">
                            No tools found
                        </div>
                    )}

                    {results.map(tool => (
                        <Link
                            key={tool.id}
                            href={`/seotools/${tool.slug}`}
                            className="block px-4 py-3 hover:bg-gray-100 border-b"
                        >

                            <div className="font-medium">
                                {tool.name}
                            </div>

                            {/* <div className="text-xs text-gray-500 line-clamp-1">
                                {tool.description}
                            </div> */}

                        </Link>
                    ))}

                </div>

            )}

        </div>

    )

}