"use client";

import { useState } from "react";
import { Globe, BarChart3, Link2, GaugeCircle, Hash, Lightbulb, Target, Sparkles, TrendingUp, Cpu, Info } from "lucide-react";

export default function PageAuthorityChecker() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        if (!url) {
            setError("Please enter a URL");
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch("/api/seotools/page-authority", {
                method: "POST",
                body: JSON.stringify({ url }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setData(result);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-6">

            {/* Title */}
            <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <GaugeCircle className="w-6 h-6 text-indigo-600" />
                Page Authority Checker
            </h1>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Enter URL (https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                <button
                    onClick={handleCheck}
                    className="bg-indigo-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                    Check
                </button>
            </div>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Loader */}
            {loading && (
                <div className="text-center animate-pulse text-gray-500">
                    Analyzing Page Authority...
                </div>
            )}

            {/* Result */}
            {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {/* Page Authority */}
                    <div className="p-5 rounded-2xl bg-indigo-100">
                        <p className="text-sm text-gray-600 font-medium">Page Authority</p>
                        <p className="text-2xl font-bold text-indigo-700">
                            {data.pageAuthority}
                        </p>
                    </div>

                    {/* Backlinks */}
                    <div className="p-5 rounded-2xl bg-green-100">
                        <p className="text-sm text-gray-600 font-medium">Backlinks</p>
                        <p className="text-2xl font-bold text-green-700">
                            {data.backlinks}
                        </p>
                    </div>

                    {/* Ref Domains */}
                    <div className="p-5 rounded-2xl bg-blue-100">
                        <p className="text-sm text-gray-600 font-medium">Ref Domains</p>
                        <p className="text-2xl font-bold text-blue-700">
                            {Math.floor(data.backlinks / 5) || 0}
                        </p>
                    </div>

                    {/* Spam Score */}
                    <div className="p-5 rounded-2xl bg-red-100">
                        <p className="text-sm text-gray-600 font-medium">Spam Score</p>
                        <p className="text-2xl font-bold text-red-600">
                            {data.spamScore}%
                        </p>
                    </div>

                    {/* Domain Age */}
                    <div className="p-5 rounded-2xl bg-yellow-100">
                        <p className="text-sm text-gray-600 font-medium">Domain Age</p>
                        <p className="text-2xl font-bold text-yellow-700">
                            {data.domainAge !== null ? `${data.domainAge} Years` : "N/A"}
                        </p>
                    </div>

                    {/* Domain Authority */}
                    <div className="p-5 rounded-2xl bg-purple-100">
                        <p className="text-sm text-gray-600 font-medium">Domain Authority</p>
                        <p className="text-2xl font-bold text-purple-700">
                            {data.domainAuthority}
                        </p>
                    </div>

                </div>
            )}

            {/* SEO CONTENT */}
            <div className="space-y-8 pt-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Info className="w-6 h-6 text-indigo-600" />
                        About Page Authority Checker
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Page Authority Checker ek advanced SEO tool hai jo kisi specific webpage ki ranking ability ko measure karta hai.
                        Agar aap SEO, blogging ya digital marketing karte hain, to Page Authority (PA) ek bahut important metric hai
                        jo batata hai ki aapka page Google jaise search engines me kitna strong hai.
                    </p>

                    <p className="mt-2 text-gray-700">
                        Yeh tool Moz-based algorithm aur real SEO signals ka use karta hai jaise backlinks, domain authority,
                        spam score aur link quality. Iska purpose hai aapko ek clear insight dena taaki aap apni SEO strategy
                        ko improve kar sakein.
                    </p>

                    <p className="mt-2 text-gray-700">
                        Agar aap "free page authority checker", "check PA score", ya "SEO authority tool" search kar rahe hain,
                        to yeh tool aapke liye perfect solution hai.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-green-600" />
                        How Page Authority Calculation Works
                    </h2>

                    <p className="mt-2 text-gray-700">
                        Page Authority calculation multiple SEO factors par depend karta hai. Yeh koi simple number nahi hai,
                        balki ek complex algorithm ka result hai jo different ranking signals ko combine karta hai.
                    </p>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li><strong>Backlinks:</strong> Kitne external websites aapke page ko link kar rahe hain.</li>
                        <li><strong>Domain Authority:</strong> Pure domain ki overall strength.</li>
                        <li><strong>Spam Score:</strong> Website ki trustworthiness.</li>
                        <li><strong>Link Quality:</strong> High-quality vs low-quality backlinks.</li>
                        <li><strong>Referring Domains:</strong> Unique domains jo link kar rahe hain.</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Yeh sab factors milkar ek final Page Authority score generate karte hain jo 1 se 100 ke scale par hota hai.
                        Higher score ka matlab better ranking potential.
                    </p>
                </section>

                {/* WHY IMPORTANT */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        Why Page Authority Matters in SEO
                    </h2>

                    <p className="mt-2 text-gray-700">
                        Agar aap SEO me serious hain, to Page Authority ko ignore nahi kar sakte. Yeh directly aapke ranking
                        aur traffic ko impact karta hai.
                    </p>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Google ranking improve karne me help karta hai</li>
                        <li>Competitor analysis ke liye use hota hai</li>
                        <li>Link building strategy optimize karta hai</li>
                        <li>Content performance evaluate karta hai</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Agar aapka PA high hai, to chances hain ki aapka page search results me top par aayega.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        Benefits of Using Page Authority Checker
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Instant SEO analysis</li>
                        <li>Free PA & DA checker</li>
                        <li>Backlink insights</li>
                        <li>Spam detection</li>
                        <li>Competitor comparison</li>
                    </ul>

                    <p className="mt-2 text-gray-700">
                        Yeh tool beginners aur professionals dono ke liye useful hai.
                    </p>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-500" />
                        Use Cases of Page Authority Checker
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>Blog SEO analysis</li>
                        <li>Affiliate website optimization</li>
                        <li>Client SEO audit</li>
                        <li>Backlink strategy planning</li>
                    </ul>
                </section>

                {/* TIPS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                        Tips to Improve Page Authority
                    </h2>

                    <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
                        <li>High-quality backlinks build karein</li>
                        <li>On-page SEO optimize karein</li>
                        <li>Internal linking strong karein</li>
                        <li>Spammy links avoid karein</li>
                        <li>Regular content updates karein</li>
                    </ul>
                </section>

                {/* KEYWORDS */}
                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Hash className="w-6 h-6 text-gray-700" />
                        Related Search Keywords
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {[
                            "page authority checker",
                            "check pa da",
                            "domain authority checker",
                            "seo authority tool",
                            "ahrefs pa checker",
                            "moz pa checker",
                            "backlink checker tool",
                            "website authority checker",
                            "free seo tools",
                            "google ranking checker"
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