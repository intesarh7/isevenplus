"use client";

import { useState } from "react";
import {
    Globe,
    Search,
    Loader2,
    RefreshCcw,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    BarChart3
} from "lucide-react";

type LinkItem = {
    href: string;
    anchor: string;
    rel: string | null;
    broken: boolean;
};

export default function ExternalLinksChecker() {

    const [url, setUrl] = useState("");
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidUrl = (value: string) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    };

    const checkLinks = async () => {

        if (!url) {
            setError("Please enter a URL");
            return;
        }

        if (!isValidUrl(url)) {
            setError("Please enter a valid URL (include https://)");
            return;
        }

        // reset error if valid
        setError("");

        setLoading(true);
        setLinks([]);

        try {

            const res = await fetch("/api/seotools/external-links-checker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            setLinks(data.links || []);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);

    };

    const reset = () => {
        setUrl("");
        setLinks([]);
        setError("");
    };

    const tryExample = () => {
        setUrl("https://example.com");
        setError("");
    };



    const broken = links.filter(l => l.broken);

    const nofollow = links.filter(l => l.rel?.includes("nofollow"));

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ExternalLink className="text-indigo-600" />
                    External Links Checker
                </h1>

                <p className="text-gray-600">
                    Analyze all external links on a webpage including anchor text,
                    nofollow attributes and broken link detection.
                </p>

                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter webpage URL"
                    className={`border rounded-lg px-4 py-3 mb-3 w-full 
                        ${error ? "border-red-500" : ""}`}
                />
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={checkLinks}
                        disabled={loading}
                        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg w-full sm:flex-1 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white"}`}
                    >

                        {loading ?
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Scanning
                            </>
                            :
                            <>
                                <Search size={18} />
                                Check External Links
                            </>
                        }

                    </button>

                    <button
                        onClick={tryExample}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        Try Example
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

            {links.length > 0 && (

                <div className="bg-white border rounded-xl p-6 space-y-8 max-h-162.5 overflow-y-auto">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe size={20} />
                        External Link Summary
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">External Links</p>
                            <p className="text-2xl font-bold">{links.length}</p>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">NoFollow Links</p>
                            <p className="text-2xl font-bold">{nofollow.length}</p>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Broken Links</p>
                            <p className="text-2xl font-bold">{broken.length}</p>
                        </div>

                    </div>

                    {/* TABLE */}

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="border-b">
                                    <th className="text-left py-2">URL</th>
                                    <th className="text-left py-2">Anchor</th>
                                    <th className="text-left py-2">Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                {links.map((l, i) => (

                                    <tr key={i} className="border-b">

                                        <td className="py-2 text-indigo-600 break-all">
                                            {l.href}
                                        </td>

                                        <td className="py-2">
                                            {l.anchor || "-"}
                                        </td>

                                        <td className="py-2">

                                            {l.broken ?
                                                <span className="flex items-center gap-1 text-red-600">
                                                    <AlertTriangle size={14} />
                                                    Broken
                                                </span>
                                                :
                                                <span className="flex items-center gap-1 text-green-600">
                                                    <CheckCircle size={14} />
                                                    OK
                                                </span>
                                            }

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}
            {!loading && links.length === 0 && url && !error && (
                <div className="bg-yellow-50 border p-4 rounded text-yellow-700">
                    No external links found or website blocked the request.
                </div>
            )}

            {/* SEO CONTENT */}
            <div className="space-y-10">

                {/* ABOUT */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> About External Links Checker
                    </h2>
                    <p className="text-gray-700 mt-2 leading-7">
                        External Links Checker is a powerful SEO tool designed to analyze all outbound links on a webpage.
                        In search engine optimization (SEO), external links play a critical role in defining how your website
                        connects with other websites across the internet. These links help search engines like Google understand
                        your website’s relevance, authority, and trustworthiness.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        An external link, also known as an outbound link, is any hyperlink that points from your website to a
                        different domain. These links can either be dofollow or nofollow, and both types have different impacts
                        on SEO. This tool helps you identify all such links and provides detailed insights into their structure,
                        behavior, and health.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        Whether you are a blogger, website owner, SEO expert, or digital marketer, this tool enables you to
                        monitor and manage your external linking strategy effectively. It acts as a lightweight alternative to
                        premium SEO tools like Ahrefs, SEMrush, and Moz, providing essential data without any cost.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Search size={20} /> How External Link Checking Works
                    </h2>
                    <p className="text-gray-700 mt-2 leading-7">
                        The External Links Checker tool works by scanning the HTML source code of a webpage and extracting all
                        anchor tags (&lt;a&gt;) that contain hyperlinks. Each link is then analyzed to determine whether it is
                        internal or external based on the domain comparison.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        If the link points to a different domain, it is classified as an external link. The tool also checks
                        additional attributes such as rel="nofollow", which tells search engines not to pass SEO value (link juice)
                        to the linked page. This is important for controlling how authority flows from your website.
                    </p>
                    <p className="text-gray-700 mt-2 leading-7">
                        In addition, the tool performs a basic status check to identify broken links. Broken links are hyperlinks
                        that lead to non-existent or inaccessible pages (e.g., 404 errors). These can negatively impact user
                        experience and SEO performance if not fixed.
                    </p>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <CheckCircle size={20} /> Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2 leading-7">
                        <li>Identify all outbound (external) links on any webpage instantly</li>
                        <li>Detect broken links that harm SEO and user experience</li>
                        <li>Analyze nofollow and dofollow attributes</li>
                        <li>Improve your website’s SEO health and link structure</li>
                        <li>Ensure your website links only to trusted sources</li>
                        <li>Enhance credibility and authority in search engines</li>
                        <li>Optimize your external linking strategy</li>
                    </ul>

                    <p className="text-gray-700 mt-3 leading-7">
                        Regularly checking external links helps maintain a clean and professional website. It ensures that users
                        are not redirected to broken or spammy pages, which can damage your website’s reputation.
                    </p>
                </section>

                {/* WHY IMPORTANT */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <ExternalLink size={20} /> Why External Links Matter in SEO
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        External links are a fundamental part of SEO. They signal to search engines that your content is connected
                        to relevant resources on the web. When used correctly, external links can improve your content’s credibility
                        and provide additional value to users.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        Linking to authoritative websites helps build trust and relevance. However, linking to low-quality or
                        spammy websites can negatively affect your rankings. That’s why auditing your external links is essential.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        Search engines also consider how you use nofollow and dofollow attributes. Proper balance ensures that you
                        are not passing unnecessary authority while still maintaining natural linking behavior.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> Key Features of External Links Checker
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2 leading-7">
                        <li>Real-time external link extraction</li>
                        <li>Broken link detection system</li>
                        <li>Nofollow attribute identification</li>
                        <li>Clean and easy-to-use interface</li>
                        <li>Fast performance with accurate results</li>
                        <li>Works on most websites</li>
                        <li>Free and accessible for all users</li>
                    </ul>
                </section>

                {/* USE CASE */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <BarChart3 size={20} /> Who Should Use This Tool?
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        This tool is ideal for bloggers, SEO professionals, digital marketers, affiliate marketers, and website
                        owners who want to optimize their external linking strategy. Whether you are running a personal blog or
                        managing a business website, external link analysis is crucial for maintaining SEO performance.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        Agencies can use this tool to audit client websites and ensure that all outbound links are working properly
                        and pointing to high-quality resources.
                    </p>
                </section>

                {/* LIMITATIONS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <AlertTriangle size={20} /> Limitations of External Link Checkers
                    </h2>

                    <p className="text-gray-700 mt-2 leading-7">
                        While this tool provides valuable insights, it relies on real-time webpage scanning. Some websites may block
                        automated requests or use JavaScript-based rendering, which can limit the tool’s ability to extract links.
                    </p>

                    <p className="text-gray-700 mt-2 leading-7">
                        Despite these limitations, the tool works effectively for most websites and provides accurate results for
                        standard HTML pages.
                    </p>
                </section>

                {/* RELATED TAGS */}
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe size={20} /> Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "external links checker",
                            "seo external links audit",
                            "outbound link checker",
                            "nofollow link checker",
                            "external link analyzer",
                            "seo link audit tool",
                            "broken link checker",
                            "website link audit",
                            "seo tools free",
                            "link checker online"
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