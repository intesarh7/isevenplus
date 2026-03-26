"use client";

import { useState } from "react";
import {
    Search,
    RotateCcw,
    AlertTriangle,
    Info, Settings, Sparkles, Hash, Globe, Zap, TrendingUp
} from "lucide-react";

export default function DnsLookup() {
    const [domain, setDomain] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ NEW: Filter state
    const [filter, setFilter] = useState("ALL");

    // ✅ Clean domain function
    const cleanDomain = (input: string) => {
        try {
            return new URL(input).hostname;
        } catch {
            return input
                .replace(/^https?:\/\//, "")
                .replace(/\/.*$/, "")
                .trim();
        }
    };

    // ✅ Cleaned domain (LIVE)
    const cleaned = cleanDomain(domain);

    const handleSearch = async () => {
        if (!cleaned) {
            setError("Please enter valid domain");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/seotools/dns-lookup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ domain: cleaned }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to fetch DNS");
            } else {
                setResult(data);
            }
        } catch {
            setError("Server error. Try again.");
        }

        setLoading(false);
    };

    const handleReset = () => {
        setDomain("");
        setResult(null);
        setError("");
        setFilter("ALL"); // reset filter also
    };

    return (
        <div className="space-y-6 w-full">

            {/* INPUT */}
            <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                    <Globe size={18} /> Enter Domain
                </label>

                <input
                    className="w-full border rounded-xl p-3"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com or https://example.com"
                />

                {/* ✅ Show cleaned domain */}
                {domain && (
                    <p className="text-sm text-blue-600 mt-1">
                        Using domain: <b>{cleaned}</b>
                    </p>
                )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Search size={16} />
                    {loading ? "Checking..." : "Check DNS"}
                </button>

                <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                    <RotateCcw size={16} /> Reset
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-xl flex gap-2 items-center">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            {/* RESULT */}
            {result && (
                <div className="space-y-4 text-sm">

                    {/* ✅ FILTER UI */}
                    <div className="flex gap-2 flex-wrap mb-3">
                        {["ALL", "A", "AAAA", "MX", "NS", "TXT", "CNAME"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-3 py-1 rounded-full text-sm ${filter === type
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* ✅ FILTERED RESULT */}
                    {Object.entries(result)
                        .filter(([type]) => filter === "ALL" || type === filter)
                        .map(([type, records]: any) => (
                            <div key={type} className="border rounded-xl p-3">
                                <h3 className="font-bold mb-2">{type} Records</h3>

                                {records && records.length ? (
                                    records.map((r: any, i: number) => {
                                        const value =
                                            typeof r === "object"
                                                ? JSON.stringify(r)
                                                : r;

                                        return (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center gap-2 mb-1"
                                            >
                                                <span className="text-gray-700 break-all">
                                                    {value}
                                                </span>

                                                {/* ✅ COPY BUTTON */}
                                                <button
                                                    onClick={() =>
                                                        navigator.clipboard.writeText(value)
                                                    }
                                                    className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-400">No records found</p>
                                )}
                            </div>
                        ))}
                </div>
            )}
            <div className="space-y-8 pt-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Info size={20} /> About DNS Lookup Tool
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        DNS Lookup Tool is a powerful online utility that allows users to check and analyze domain DNS records such as A, AAAA, MX, NS, TXT, and CNAME records. DNS (Domain Name System) is the backbone of the internet that translates human-readable domain names into IP addresses. This tool helps developers, system administrators, and SEO professionals quickly inspect domain configurations and troubleshoot issues.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Whether you are managing a website, setting up email servers, or debugging DNS issues, a reliable DNS checker is essential. This DNS lookup tool provides real-time results using fast and accurate DNS resolution methods, ensuring that you get the correct information instantly.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        It is a completely browser-based tool that requires no installation and offers unlimited usage. With a clean interface and instant results, it is ideal for both beginners and advanced users who want to analyze DNS records efficiently.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> How DNS Lookup Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        DNS lookup works by querying DNS servers to retrieve information associated with a domain name. When you enter a domain into this tool, it sends requests to DNS servers and fetches different types of records such as A (IPv4), AAAA (IPv6), MX (mail servers), NS (name servers), TXT (verification records), and CNAME (alias records).
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        The tool uses advanced DNS resolution techniques to ensure accurate and up-to-date results. It processes each record type separately and displays them in a structured format so that users can easily understand the domain configuration.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        By analyzing these DNS records, users can identify misconfigurations, verify domain settings, and ensure that their website and services are properly connected to hosting and email systems.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} /> Benefits of Using DNS Lookup Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Check domain DNS configuration instantly</li>
                        <li>Debug DNS propagation and resolution issues</li>
                        <li>Verify email server (MX) records</li>
                        <li>Analyze website hosting and IP addresses</li>
                        <li>Improve website performance troubleshooting</li>
                        <li>Ensure proper domain setup for SEO</li>
                        <li>Monitor DNS records for security and verification</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        DNS issues can cause website downtime, email failures, and poor performance. Using a DNS checker tool helps you quickly identify and fix these issues, ensuring a smooth and reliable online presence.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Globe size={20} /> Key Features of DNS Lookup Tool
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Supports A, AAAA, MX, NS, TXT, and CNAME records</li>
                        <li>Fast and accurate DNS resolution</li>
                        <li>Clean and easy-to-read output</li>
                        <li>Real-time results without delay</li>
                        <li>No API required – fully independent tool</li>
                        <li>Free and unlimited usage</li>
                        <li>Secure and privacy-friendly</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Zap size={20} /> Use Cases of DNS Lookup
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        DNS Lookup tools are widely used by developers, system administrators, and SEO experts. Developers use it to debug website connectivity issues, while system administrators rely on it to verify server configurations.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        SEO professionals use DNS lookup tools to analyze domain infrastructure and ensure proper indexing and performance. It is also useful for checking domain ownership verification via TXT records and email configuration via MX records.
                    </p>
                </section>

                {/* SEO IMPORTANCE */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} /> Why DNS Lookup is Important for SEO
                    </h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                        DNS plays a crucial role in website accessibility and performance, which directly impacts SEO rankings. Incorrect DNS configurations can lead to downtime, slow loading speeds, and indexing issues. By using a DNS lookup tool, you can ensure that your domain is correctly configured and accessible to search engines.
                    </p>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Proper DNS setup helps improve page speed, reduce server errors, and enhance user experience. These factors contribute to better search engine rankings and increased organic traffic.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Settings size={20} /> Best Practices for DNS Management
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                        <li>Use reliable DNS providers for better uptime</li>
                        <li>Keep DNS records updated and accurate</li>
                        <li>Monitor DNS propagation after changes</li>
                        <li>Verify email and domain records regularly</li>
                        <li>Secure DNS settings to prevent attacks</li>
                    </ul>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash size={20} /> Related Search Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "dns lookup",
                            "dns checker",
                            "domain dns tool",
                            "check dns records",
                            "dns propagation checker",
                            "online dns lookup tool",
                            "a record lookup",
                            "mx record checker",
                            "dns resolver tool",
                            "dns analysis tool",
                            "check cname records",
                            "dns troubleshooting tool",
                            "free dns checker",
                            "advanced dns lookup",
                            "seo dns analysis tool"
                        ].map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
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