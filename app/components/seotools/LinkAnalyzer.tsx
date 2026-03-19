"use client";

import { useState } from "react";
import {
    Search,
    Link2,
    Globe,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    Layers,
    BarChart3,
} from "lucide-react";

type Link = {
    url: string;
    text: string;
    rel?: string | null;
    type: "internal" | "external";
    status: number;
};

export default function LinkAnalyzer() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState<Link[]>([]);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<"all" | "internal" | "broken">("all");



    const handleAnalyze = async () => {
        let formattedUrl = url.trim();

        if (!formattedUrl.startsWith("http")) {
            formattedUrl = "https://" + formattedUrl;
        }
        if (!url) return;

        setLoading(true);
        setError("");
        setLinks([]);

        try {
            const res = await fetch("/api/seotools/link-analyzer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed");

            setLinks(data.links);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const internal = links.filter((l) => l.type === "internal");
    const external = links.filter((l) => l.type === "external");
    const broken = links.filter((l) => l.status >= 400);

    const filteredLinks = links.filter((l) => {
        if (filter === "internal") return l.type === "internal";
        if (filter === "broken") return l.status >= 400;
        return true;
    });

    const exportCSV = () => {
        const rows = [
            ["URL", "Anchor", "Type", "Follow", "Status"],
            ...filteredLinks.map((l) => [
                l.url,
                l.text,
                l.type,
                l.rel?.includes("nofollow") ? "NoFollow" : "DoFollow",
                l.status,
            ]),
        ];

        const csvContent =
            "data:text/csv;charset=utf-8," +
            rows.map((e) => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "link-analysis.csv";
        link.click();
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Link2 className="text-indigo-600" /> Link Analyzer Tool
            </h1>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter website URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-3 rounded w-full"
                />
                <button
                    onClick={handleAnalyze}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded w-full sm:w-auto"
                >
                    <Search size={18} /> Analyze
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="text-center py-10 animate-pulse">
                    🔍 Scanning links...
                </div>
            )}

            {/* Stats */}
            {links.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">

                    {/* Total */}
                    <div className="p-4 rounded-xl bg-indigo-100 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-indigo-700">Total Links</p>
                            <h2 className="text-2xl font-bold text-indigo-900">
                                {links.length}
                            </h2>
                        </div>
                        <Link2 className="text-indigo-600" />
                    </div>

                    {/* Internal */}
                    <div className="p-4 rounded-xl bg-green-100 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-green-700">Internal Links</p>
                            <h2 className="text-2xl font-bold text-green-900">
                                {internal.length}
                            </h2>
                        </div>
                        <Globe className="text-green-600" />
                    </div>

                    {/* External */}
                    <div className="p-4 rounded-xl bg-blue-100 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-blue-700">External Links</p>
                            <h2 className="text-2xl font-bold text-blue-900">
                                {external.length}
                            </h2>
                        </div>
                        <ExternalLink className="text-blue-600" />
                    </div>

                    {/* Broken */}
                    <div className="p-4 rounded-xl bg-red-100 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-red-700">Broken Links</p>
                            <h2 className="text-2xl font-bold text-red-900">
                                {broken.length}
                            </h2>
                        </div>
                        <AlertTriangle className="text-red-600" />
                    </div>

                </div>
            )}



            {/* Links Table */}
            {links.length > 0 && (
                <div className="overflow-auto border rounded">
                    <div className="flex mb-2 flex-wrap justify-between gap-2 mt-2 p-2">
                        <div>
                            {["all", "internal", "broken"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition mr-2 ${filter === f
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {f.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <div>
                            <button
                                onClick={exportCSV}
                                className=" bg-green-600 text-white px-4 py-2 rounded-lg"
                            >
                                Export CSV
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-sm">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">URL</th>
                                <th>Anchor</th>
                                <th>Type</th>
                                <th>Follow</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLinks.map((link, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2 break-all">{link.url}</td>

                                    <td className="text-xs text-gray-600 max-w-50 truncate">
                                        {link.text}
                                    </td>

                                    <td className="text-center">
                                        {link.type === "internal" ? "Internal" : "External"}
                                    </td>

                                    <td className="text-center">
                                        {link.rel?.includes("nofollow") ? (
                                            <span className="text-red-500">NoFollow</span>
                                        ) : (
                                            <span className="text-green-600">DoFollow</span>
                                        )}
                                    </td>

                                    <td className="text-center">
                                        {link.status >= 400 ? (
                                            <span className="text-red-600">{link.status}</span>
                                        ) : (
                                            <span className="text-green-600">{link.status}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* SEO CONTENT */}
            <div className="mt-10 space-y-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Globe size={18} /> About Link Analyzer Tool
                    </h2>
                    <p>
                        The Link Analyzer Tool is a powerful SEO utility designed to help website owners, developers, and digital marketers analyze all links present on a webpage. Whether you are managing a blog, eCommerce store, SaaS platform, or corporate website, understanding your internal and external link structure is essential for improving search engine rankings and user experience.
                    </p>
                    <p>
                        This tool scans your webpage and extracts all anchor links, including internal links, external links, and broken links. It then evaluates their HTTP status codes, identifies issues, and provides actionable insights to optimize your website structure. Similar to premium SEO tools like Ahrefs, SEMrush, and Moz, this tool gives you a clear overview of your site's linking health without any cost.
                    </p>
                    <p>
                        Proper link analysis ensures that search engines can crawl and index your website efficiently. Broken links, incorrect redirects, and poor internal linking can negatively impact SEO performance. By using this tool regularly, you can maintain a healthy website structure and improve your visibility in search results.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={18} /> How Link Analysis Works
                    </h2>
                    <p>
                        The Link Analyzer Tool works by fetching the HTML content of a webpage and scanning all anchor tags (&lt;a&gt;). Each link is processed and categorized into internal or external links based on the domain. Internal links point to pages within the same website, while external links point to other domains.
                    </p>
                    <p>
                        Once the links are extracted, the tool checks their HTTP status codes to determine their health. For example, a status code of 200 indicates a working link, while 404 means the page is not found. Similarly, 301 and 302 indicate redirects, and 500 errors suggest server issues.
                    </p>
                    <p>
                        Advanced logic is used to handle cases where servers block certain request types. The tool ensures accurate results by using fallback mechanisms and intelligent request handling. It also detects attributes like rel="nofollow", which helps you understand how link equity flows across your website.
                    </p>
                    <p>
                        The final output includes a detailed table showing each link, its type, status, anchor text, and follow/nofollow attribute. This makes it easy to identify issues and take corrective action.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle size={18} /> Key Features of Link Analyzer Tool
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Analyze internal and external links in real-time</li>
                        <li>Detect broken links (404, 500 errors)</li>
                        <li>Check HTTP status codes for each link</li>
                        <li>Identify DoFollow and NoFollow links</li>
                        <li>View anchor text for every link</li>
                        <li>Fast and accurate crawling system</li>
                        <li>CSV export for reporting and audits</li>
                        <li>User-friendly interface with filter options</li>
                    </ul>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle size={18} /> Benefits of Using This Tool
                    </h2>
                    <p>
                        Using a Link Analyzer Tool provides multiple SEO and usability benefits. First, it helps you identify broken links that can harm user experience and reduce trust. Visitors encountering broken pages are more likely to leave your site, increasing bounce rates.
                    </p>
                    <p>
                        Second, it improves your website’s crawlability. Search engine bots rely on links to navigate your website. If your link structure is weak or contains errors, it can prevent proper indexing of your pages.
                    </p>
                    <p>
                        Third, it enhances internal linking strategy. A strong internal linking structure distributes link equity across pages, helping important pages rank better in search results.
                    </p>
                    <p>
                        Additionally, analyzing external links ensures that you are linking to relevant and trustworthy sources. This improves your website’s credibility and SEO authority.
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Improve SEO rankings and visibility</li>
                        <li>Enhance user experience</li>
                        <li>Boost website authority</li>
                        <li>Fix errors quickly and efficiently</li>
                        <li>Strengthen site architecture</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Layers size={18} /> Use Cases of Link Analyzer
                    </h2>
                    <p>
                        This tool is useful for a wide range of users. SEO professionals can use it to audit websites and identify technical issues. Bloggers can ensure that their posts do not contain broken or outdated links. Developers can validate link structures during website development. eCommerce businesses can monitor product and category links to avoid revenue loss due to broken pages.
                    </p>
                    <p>
                        It is also highly beneficial for large websites with hundreds or thousands of pages, where manual checking is not possible. Regular audits using this tool can help maintain long-term SEO health.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={18} /> Best Practices for Link Optimization
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Always fix broken links immediately</li>
                        <li>Use descriptive anchor text for better SEO</li>
                        <li>Maintain a balanced internal linking structure</li>
                        <li>Avoid excessive outbound links</li>
                        <li>Use NoFollow for untrusted or sponsored links</li>
                        <li>Regularly audit your website links</li>
                    </ul>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Globe size={18} /> Frequently Asked Questions (FAQs)
                    </h2>

                    <p><strong>1. What is a Link Analyzer Tool?</strong><br />
                        A Link Analyzer Tool scans a webpage and identifies all links, including internal, external, and broken links.
                    </p>

                    <p><strong>2. Why are broken links bad for SEO?</strong><br />
                        Broken links create a poor user experience and negatively impact search engine rankings.
                    </p>

                    <p><strong>3. What is the difference between DoFollow and NoFollow?</strong><br />
                        DoFollow links pass SEO value, while NoFollow links do not pass link equity.
                    </p>

                    <p><strong>4. How often should I check my website links?</strong><br />
                        It is recommended to audit your website links regularly, especially after updates or content changes.
                    </p>
                </section>

                {/* RELATED SEARCHES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Layers size={18} /> Related Searches
                    </h2>
                    <p>
                        link analyzer tool, broken link checker, internal link checker, external link analyzer, SEO audit tool, website crawler, backlink checker, link audit tool, check broken links online, website SEO analyzer
                    </p>
                </section>

            </div>
        </div>
    );
}