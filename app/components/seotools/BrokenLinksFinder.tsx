"use client";

import { useState } from "react";
import { Search, AlertTriangle, Link2, Hash, Wrench, Layers, Sparkles, Cpu } from "lucide-react";

type LinkData = {
    url: string;
    status: number;
};

export default function BrokenLinksFinder() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState<LinkData[]>([]);
    const [error, setError] = useState("");
    const [data, setData] = useState<any>(null);

    const handleScan = async () => {
        if (!url.startsWith("http")) {
            return setError("Enter valid URL with http/https");
        }

        setLoading(true);
        setError("");
        setLinks([]);

        try {
            const res = await fetch("/api/seotools/broken-links", {
                method: "POST",
                body: JSON.stringify({ url }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setLinks(result.links);
            setData(result)


            setLinks(data.links);
            setData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* Title */}
            <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
                <AlertTriangle className="text-red-500" />
                Broken Links Finder
            </h1>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                <button
                    onClick={handleScan}
                    disabled={loading}
                    className="bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded w-full sm:w-auto flex items-center justify-center gap-2"
                >
                    <Search size={18} />
                    Scan
                </button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="text-center animate-pulse text-gray-500">
                    Scanning links...
                </div>
            )}

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Results */}
            {links.length > 0 && (
                <div className="border rounded-xl p-4 space-y-3">

                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        <Link2 /> Broken Links Found: {links.length}
                    </h2>

                    {data?.totalScanned && (
                        <p className="text-sm text-gray-500">
                            Total Links Scanned: {data.totalScanned}
                        </p>
                    )}

                    {/* ✅ No result case */}
                    {!loading && links.length === 0 && (
                        <p className="text-green-600 text-center flex gap-2 justify-center">
                            <Link2 /> No broken links found
                        </p>
                    )}

                    {/* ✅ List */}
                    <div className="space-y-2 max-h-96 overflow-auto">
                        {links.map((link, i) => (
                            <div
                                key={i}
                                className="flex justify-between border p-2 rounded"
                            >
                                <span className="truncate">{link.url}</span>
                                <span className="text-red-500 font-bold">
                                    {link.status}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            )}


            {/* SEO CONTENT */}
            <div className="space-y-8 pt-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Link2 className="w-6 h-6 text-indigo-600" />
                        About Broken Links Finder Tool
                    </h2>

                    <p className="mt-2 text-gray-700">
                        Broken Links Finder ek advanced SEO tool hai jo aapki website ke broken links, dead links,
                        aur 404 errors ko identify karta hai. Agar aap SEO optimization, website audit ya blogging
                        karte hain, to broken links ko fix karna bahut important hota hai kyunki yeh directly aapki
                        Google ranking aur user experience ko impact karta hai.
                    </p>

                    <p className="mt-2 text-gray-700">
                        Jab kisi webpage par aisa link hota hai jo open nahi hota ya 404 error deta hai, to use
                        broken link kaha jata hai. Yeh links search engines ko signal dete hain ki website properly
                        maintained nahi hai. Isliye "broken link checker", "dead link finder", aur "404 error checker"
                        jaise tools SEO me bahut important hote hain.
                    </p>

                    <p className="mt-2 text-gray-700">
                        Yeh tool real-time me aapki website ke links ko scan karta hai aur turant batata hai ki kaun
                        se links broken hain. Isse aap apni website ko clean aur SEO-friendly bana sakte hain.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-green-600" />
                        How Broken Links Finder Works
                    </h2>

                    <p className="mt-2 text-gray-700">
                        Broken Links Finder ek intelligent crawling system ka use karta hai jo aapke webpage ke
                        saare anchor links (a tags) ko extract karta hai aur unhe individually test karta hai.
                    </p>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Website HTML ko fetch karta hai</li>
                        <li>Sabhi internal aur external links extract karta hai</li>
                        <li>Har link par HTTP request send karta hai</li>
                        <li>Status code (200, 404, 500) check karta hai</li>
                        <li>Broken links ko identify karta hai</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Agar koi link 400 ya usse upar ka error code deta hai, to use broken link mark kiya jata hai.
                        Yeh process fast aur accurate hota hai jo SEO audit ke liye bahut useful hai.
                    </p>
                </section>

                {/* WHY IMPORTANT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        Why Broken Links Matter for SEO
                    </h2>

                    <p className="mt-2 text-gray-700">
                        Broken links SEO ke liye harmful hote hain aur aapki website ki credibility ko kam kar dete hain.
                        Search engines jaise Google jab broken links detect karte hain, to wo website ki ranking ko
                        down kar dete hain.
                    </p>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Google ranking reduce hoti hai</li>
                        <li>User experience kharab hota hai</li>
                        <li>Bounce rate increase hota hai</li>
                        <li>Crawl budget waste hota hai</li>
                        <li>Website trust score girta hai</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Isliye regular website audit aur broken link checking bahut zaroori hai.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        Benefits of Using Broken Links Checker
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Instant broken link detection</li>
                        <li>SEO performance improve karta hai</li>
                        <li>Website health maintain karta hai</li>
                        <li>User experience better banata hai</li>
                        <li>Free aur easy to use tool</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Yeh tool bloggers, SEO experts aur website owners ke liye ek must-have solution hai.
                    </p>
                </section>

                {/* TYPES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Layers className="w-6 h-6 text-blue-600" />
                        Types of Broken Links
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Internal broken links (same website ke andar)</li>
                        <li>External broken links (dusri websites ke links)</li>
                        <li>404 Not Found errors</li>
                        <li>500 Server errors</li>
                        <li>Redirect issues</li>
                    </ul>
                </section>

                {/* FIX */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Wrench className="w-6 h-6 text-yellow-600" />
                        How to Fix Broken Links
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Incorrect URLs ko update karein</li>
                        <li>Redirect (301) setup karein</li>
                        <li>Removed pages ke links delete karein</li>
                        <li>Broken external links replace karein</li>
                        <li>Regular audit perform karein</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Broken links ko fix karna SEO optimization ka important part hai.
                    </p>
                </section>

                {/* KEYWORDS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash className="w-6 h-6 text-gray-700" />
                        Related Search Keywords
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "broken link checker",
                            "dead link finder",
                            "404 error checker",
                            "seo audit tool",
                            "website link checker",
                            "internal link checker",
                            "external link checker",
                            "fix broken links",
                            "website audit tool",
                            "seo checker free"
                        ].map((tag) => (
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