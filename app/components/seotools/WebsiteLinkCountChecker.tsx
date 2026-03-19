"use client";

import { useState } from "react";
import { Search, Link2, Globe, ExternalLink, BarChart3, Layers, CheckCircle } from "lucide-react";

export default function WebsiteLinkCountChecker() {

    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        if (!url) return;

        let formatted = url.trim();
        if (!formatted.startsWith("http")) {
            formatted = "https://" + formatted;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch("/api/seotools/link-count", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: formatted }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error);

            setData(result);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Link2 className="text-indigo-600" /> Website Link Count Checker
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
                    onClick={handleCheck}
                    className="bg-indigo-600 text-white px-4 py-3 rounded flex items-center justify-center gap-2"
                >
                    <Search size={18} /> Check
                </button>
            </div>

            {loading && (
                <div className="text-center py-10 animate-pulse">Analyzing...</div>
            )}

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
            )}

            {/* RESULT */}
            {data && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">

                        {/* Healthy */}
                        <div className="p-4 rounded-xl bg-green-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-green-700">Healthy Links</p>
                                <h2 className="text-2xl font-bold text-green-900">
                                    {data?.healthy} ({data?.healthyRatio}%)
                                </h2>
                            </div>
                        </div>

                        {/* Broken */}
                        <div className="p-4 rounded-xl bg-red-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-red-700">Broken Links</p>
                                <h2 className="text-2xl font-bold text-red-900">
                                    {data?.broken} ({data?.brokenRatio}%)
                                </h2>
                            </div>
                        </div>

                        {/* Density */}
                        <div className="p-4 rounded-xl bg-indigo-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-indigo-700">Link Density Score</p>
                                <h2 className="text-2xl font-bold text-indigo-900">
                                    {data?.densityScore}/100
                                </h2>
                            </div>
                        </div>

                    </div>

                    <div className="mb-6">
                        <p className="text-sm mb-2 font-medium">Link Health Ratio</p>
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
                            <div
                                className="bg-green-500"
                                style={{ width: `${data?.healthyRatio}%` }}
                            />
                            <div
                                className="bg-red-500"
                                style={{ width: `${data?.brokenRatio}%` }}
                            />
                        </div>
                    </div>
                </>
            )}


            {/* SEO CONTENT */}

            <div className="mt-10 space-y-8">

                {/* ABOUT */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Globe size={18} /> About Website Link Count Checker
                    </h2>
                    <p>
                        The Website Link Count Checker is an advanced SEO tool designed to analyze the total number of links present on any webpage. Whether you are an SEO expert, blogger, developer, or digital marketer, understanding your website’s link structure is essential for improving search engine rankings and user experience.
                    </p>
                    <p>
                        This tool scans your webpage and extracts all anchor tags (&lt;a&gt;), categorizing them into internal and external links. Internal links connect pages within the same domain, while external links point to other websites. By analyzing these links, you can identify how well your website is structured and how effectively link equity flows across your pages.
                    </p>
                    <p>
                        A well-optimized link structure helps search engines crawl your website more efficiently. If your site has too many broken links or an imbalance between internal and external links, it can negatively impact your SEO performance. This tool provides a quick and accurate way to audit your link profile and make improvements.
                    </p>
                    <p>
                        Unlike manual checking, which is time-consuming and error-prone, the Website Link Count Checker automates the entire process. It provides instant insights into total links, unique links, internal links, and external links, making it a must-have tool for SEO audits and website optimization.
                    </p>
                </section>

                {/* HOW IT WORKS */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={18} /> How Website Link Count Works
                    </h2>
                    <p>
                        The tool works by fetching the HTML content of a webpage and analyzing all anchor tags present in the code. Each link is extracted and processed to determine whether it is internal or external based on the domain.
                    </p>
                    <p>
                        Once the links are identified, the tool counts the total number of links and also calculates unique links to avoid duplication. This helps in understanding how many distinct URLs are being referenced on a page.
                    </p>
                    <p>
                        Internal links are identified when the URL belongs to the same domain as the input website. External links are identified when the URL points to a different domain. This classification helps you evaluate your internal linking strategy and outbound linking practices.
                    </p>
                    <p>
                        Advanced logic ensures that relative URLs are converted into absolute URLs, making the analysis more accurate. The tool also ignores irrelevant links such as JavaScript links, anchor fragments, and mailto links.
                    </p>
                    <p>
                        By combining these techniques, the Website Link Count Checker delivers fast, accurate, and reliable results that can be used for SEO audits, content optimization, and technical analysis.
                    </p>
                </section>

                {/* FEATURES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle size={18} /> Key Features of Website Link Count Checker
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Count total links on any webpage instantly</li>
                        <li>Separate internal and external links</li>
                        <li>Detect unique links to avoid duplication</li>
                        <li>Fast and accurate link extraction</li>
                        <li>Works with all types of websites</li>
                        <li>No login or installation required</li>
                        <li>Simple and user-friendly interface</li>
                        <li>Useful for SEO audits and analysis</li>
                    </ul>
                </section>

                {/* BENEFITS */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle size={18} /> Benefits of Using This Tool
                    </h2>
                    <p>
                        Using a Website Link Count Checker provides several important advantages for website optimization. First, it helps you understand how your website is structured in terms of linking. A strong internal linking structure ensures that users and search engines can easily navigate your website.
                    </p>
                    <p>
                        Second, it helps you identify excessive outbound links. Too many external links can dilute your SEO value and reduce the authority of your pages. By analyzing your external links, you can ensure that you are linking only to relevant and high-quality sources.
                    </p>
                    <p>
                        Third, it improves crawlability. Search engine bots rely on links to discover new pages. If your link structure is weak or inconsistent, some pages may not get indexed properly.
                    </p>
                    <p>
                        Additionally, this tool helps in optimizing content strategy. By analyzing link distribution, you can ensure that important pages receive more internal links, boosting their ranking potential.
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Improve SEO performance and rankings</li>
                        <li>Enhance website navigation</li>
                        <li>Optimize internal linking strategy</li>
                        <li>Reduce unnecessary outbound links</li>
                        <li>Increase crawl efficiency</li>
                    </ul>
                </section>

                {/* USE CASES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Layers size={18} /> Use Cases of Website Link Count Checker
                    </h2>
                    <p>
                        The Website Link Count Checker is useful for various types of users. SEO professionals can use it to perform detailed website audits and identify linking issues. Bloggers can use it to ensure that their posts have proper internal linking and do not contain excessive outbound links.
                    </p>
                    <p>
                        Developers can use this tool during website development to validate link structures and ensure proper navigation. eCommerce businesses can analyze product and category pages to maintain a balanced linking structure.
                    </p>
                    <p>
                        It is also beneficial for large websites where manual link checking is not feasible. By regularly using this tool, you can maintain a healthy link profile and improve long-term SEO performance.
                    </p>
                </section>

                {/* BEST PRACTICES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={18} /> Best Practices for Link Optimization
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Maintain a balanced ratio of internal and external links</li>
                        <li>Use descriptive anchor text for better SEO</li>
                        <li>Avoid excessive linking on a single page</li>
                        <li>Ensure all important pages are internally linked</li>
                        <li>Link only to high-quality and relevant external sources</li>
                        <li>Regularly audit your website links</li>
                    </ul>
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Globe size={18} /> Frequently Asked Questions (FAQs)
                    </h2>

                    <p><strong>1. What is a Website Link Count Checker?</strong><br />
                        It is a tool that counts total, internal, and external links on a webpage for SEO analysis.
                    </p>

                    <p><strong>2. Why is link count important for SEO?</strong><br />
                        Link count helps search engines understand your website structure and improves crawlability.
                    </p>

                    <p><strong>3. What is the ideal number of links on a page?</strong><br />
                        There is no fixed number, but maintaining a balanced and relevant link structure is recommended.
                    </p>

                    <p><strong>4. Does this tool detect duplicate links?</strong><br />
                        Yes, it also calculates unique links to avoid duplication.
                    </p>
                </section>

                {/* RELATED SEARCHES */}
                <section>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Layers size={18} /> Related Search Tags
                    </h2>
                    <p>
                        website link count checker, link analyzer tool, internal link checker, external link counter, seo audit tool, website crawler, link structure analyzer, count links on webpage, seo link checker online
                    </p>
                </section>

            </div>

        </div>
    );
}