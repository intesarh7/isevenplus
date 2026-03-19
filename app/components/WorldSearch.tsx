"use client";

import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

/* ================================
   SLUGIFY
================================ */
function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/["'`´]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

/* ================================
   SAFE SLUG
================================ */
function safeSlug(val?: string) {
    if (!val) return "";
    return slugify(val);
}

type Result = {
    country_code: string;
    admin1: string;
    place_name: string;
    postal_code: string;
};

export default function WorldSearch() {

    const router = useRouter();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);

    /* ================================
       SEARCH API
    ================================= */
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const res = await fetch(`/api/world-search?q=${query}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    /* ================================
       CLICK NAVIGATION
    ================================= */
    function handleClick(item: Result) {

        const country = safeSlug(item.country_code) || "unknown";

        let state =
            safeSlug(item.admin1) ||
            safeSlug(item.place_name) ||
            "na";

        let city =
            safeSlug(item.place_name) ||
            safeSlug(item.admin1) ||
            "na";

        // ✅ FIX: duplicate avoid
        if (state === city) {
            city = `${city}-area`;
        }

        const postal =
            item.postal_code
                ?.toString()
                .replace(/\s+/g, "-")
                .replace(/[^0-9a-zA-Z-]/g, "") ||
            "000000";

        const url = `/postalcode/${country}/${state}/${city}/${postal}`;

        router.push(url);
    }

    return (
        <div className="relative w-full">

            <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search country, state, city, or postal code..."
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            {query && (
                <div className="absolute z-50 w-full bg-white border rounded-xl mt-2 shadow-lg max-h-80 overflow-y-auto">

                    {loading && (
                        <div className="p-4 text-center text-gray-500">
                            Searching...
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No results found
                        </div>
                    )}

                    {results.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleClick(item)}
                            className="p-3 cursor-pointer hover:bg-indigo-50 border-b last:border-0"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={14} className="text-indigo-500" />

                                <span className="font-semibold">
                                    {item.place_name}
                                </span>

                                <span className="text-gray-500">
                                    {item.admin1}, {item.country_code}
                                </span>
                            </div>

                            <div className="text-xs text-gray-400">
                                Postal Code: {item.postal_code}
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}