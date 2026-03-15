"use client";

import { useState } from "react";
import {
    Link,
    Loader2,
    Search,
    RefreshCcw,
    Globe,
    AlertTriangle,
    CheckCircle,
    Network,
    Activity,
    BarChart3,
} from "lucide-react";

type LinkItem = {
    href: string;
    anchor: string;
    type: "internal" | "external";
};

export default function InternalLinksChecker() {

    const [url, setUrl] = useState("");
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [seoScore, setSeoScore] = useState<number | null>(null);
    const [pagesScanned, setPagesScanned] = useState(0);

    const checkLinks = async () => {

        if (!url) return;

        setLoading(true);
        setLinks([]);
        setSeoScore(null);

        try {

            const res = await fetch("/api/seotools/internal-links-checker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            console.log("API RESULT:", data);

            if (data.links) {
                setLinks(data.links);
            }

            setPagesScanned(data.pagesScanned || 1);
            setSeoScore(data.seoScore || 0);

        } catch (err) {
            console.error("Scan error:", err);
        }

        setLoading(false);
    };

    const tryExample = () => {
        setUrl("https://example.com");
    };

    const reset = () => {
        setUrl("");
        setLinks([]);
        setSeoScore(null);
    };

    const internalLinks = links.filter(l => l.type === "internal");
    const externalLinks = links.filter(l => l.type === "external");

    const linkMap: Record<string, number> = {};

    internalLinks.forEach(link => {
        linkMap[link.href] = (linkMap[link.href] || 0) + 1;
    });

    return (

        <div className="space-y-10">

            {/* TOOL */}

            <div className="bg-white border rounded-xl p-6 space-y-6">

                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Link className="text-indigo-600" size={22} />
                    Internal Links Checker (SEO Audit)
                </h1>

                <p className="text-gray-600">
                    Scan internal links, crawl pages, analyze SEO link structure and
                    generate an internal linking audit score.
                </p>

                <input
                    type="url"
                    placeholder="Enter website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border rounded-lg px-4 py-3 w-full"
                />

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={checkLinks}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg w-full sm:flex-1"
                    >
                        {loading ?
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Scanning
                            </>
                            :
                            <>
                                <Search size={18} />
                                Scan Website
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

            {/* RESULT PANEL */}

            {links.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                    No links detected on this page.
                    <br />
                    Possible reasons:
                    <ul className="list-disc pl-5 mt-2 text-sm">
                        <li>Website blocks crawlers</li>
                        <li>Links are loaded via JavaScript</li>
                        <li>Website requires cookies or login</li>
                    </ul>
                </div>
            )}

            {(links.length > 0 || pagesScanned > 0) && (

                <div className="bg-white border rounded-xl p-6 space-y-8 max-h-162.5 overflow-y-auto">

                    {/* ================= SUMMARY ================= */}

                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Globe size={20} />
                            Crawl Summary
                        </h2>

                        <div className="grid md:grid-cols-4 gap-4">

                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Pages Scanned</p>
                                <p className="text-2xl font-bold">{pagesScanned}</p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Internal Links</p>
                                <p className="text-2xl font-bold">{internalLinks.length}</p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">External Links</p>
                                <p className="text-2xl font-bold">{externalLinks.length}</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">SEO Score</p>
                                <p className="text-2xl font-bold">
                                    {seoScore !== null ? `${seoScore}/100` : "-"}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ================= LINKS TABLE ================= */}

                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold">Detected Links</h2>

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">URL</th>
                                        <th className="text-left py-2">Anchor</th>
                                        <th className="text-left py-2">Type</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {links.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="py-4 text-center text-gray-500">
                                                No links detected on this page
                                            </td>
                                        </tr>
                                    )}

                                    {links.map((l, i) => (
                                        <tr key={i} className="border-b">

                                            <td className="py-2 text-indigo-600 break-all">
                                                {l.href}
                                            </td>

                                            <td className="py-2">
                                                {l.anchor || "-"}
                                            </td>

                                            <td className="py-2">

                                                {l.type === "internal"
                                                    ?
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle size={14} /> Internal
                                                    </span>
                                                    :
                                                    <span className="flex items-center gap-1 text-yellow-600">
                                                        <AlertTriangle size={14} /> External
                                                    </span>
                                                }

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* ================= HEATMAP ================= */}

                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Activity size={20} />
                            Internal Link Heatmap
                        </h2>

                        {Object.entries(linkMap).map(([url, count]) => (
                            <div key={url} className="space-y-1">

                                <div className="flex justify-between text-sm">
                                    <span className="truncate max-w-[70%]">{url}</span>
                                    <span>{count} links</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div
                                        className="bg-indigo-600 h-3 rounded"
                                        style={{ width: `${Math.min(count * 20, 100)}%` }}
                                    />
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* ================= LINK GRAPH ================= */}

                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Network size={20} />
                            Visual Link Graph
                        </h2>

                        <div className="grid md:grid-cols-2 gap-3">

                            {internalLinks.slice(0, 20).map((l, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-3 text-sm bg-gray-50"
                                >
                                    Homepage → {l.href}
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* ================= ADVANCED SEO ================= */}

                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <BarChart3 size={20} />
                            Advanced SEO Audit
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Broken Link Checker</h3>
                                <p className="text-sm text-gray-600">
                                    Detect links returning 404 errors.
                                </p>
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Crawl Depth</h3>
                                <p className="text-sm text-gray-600">
                                    Analyze how deep pages are from homepage.
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Sitemap Crawl</h3>
                                <p className="text-sm text-gray-600">
                                    Scan sitemap pages for structure issues.
                                </p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Internal Link Graph</h3>
                                <p className="text-sm text-gray-600">
                                    Visualize link relationships between pages.
                                </p>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Orphan Pages</h3>
                                <p className="text-sm text-gray-600">
                                    Detect pages without internal links.
                                </p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold">SEO Audit Score</h3>
                                <p className="text-sm text-gray-600">
                                    Overall internal linking SEO health score.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section>

                    <h2 className="text-xl font-bold">
                        About Internal Links Checker
                    </h2>

                    <p className="text-gray-700 mt-2">
                        An Internal Links Checker is a powerful SEO tool designed to analyze how pages
                        within a website are connected through internal links. Internal linking plays a
                        critical role in helping search engines understand the structure of a website,
                        discover new pages, and distribute ranking authority across different sections
                        of the site. Without a proper internal linking structure, even high-quality
                        content may struggle to rank well in search engines because search crawlers may
                        have difficulty discovering or indexing important pages.
                    </p>

                    <p className="text-gray-700 mt-3">
                        This Internal Links Checker scans a webpage and identifies all links pointing
                        to pages within the same domain. By analyzing these links, website owners,
                        bloggers, developers, and SEO professionals can evaluate whether their internal
                        linking structure is optimized for search engine crawling and user navigation.
                        The tool extracts anchor tags from the HTML of a webpage, categorizes them into
                        internal and external links, and displays useful insights such as anchor text,
                        link destination, and link distribution across pages.
                    </p>

                    <p className="text-gray-700 mt-3">
                        Internal links also help distribute link authority (often called link juice)
                        across a website. When a high-authority page links to another page internally,
                        it passes part of its ranking strength, helping the linked page perform better
                        in search results. Because of this, internal linking is considered one of the
                        most effective on-page SEO techniques for improving organic visibility and
                        website performance.
                    </p>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        How Internal Link Checking Works
                    </h2>

                    <p className="text-gray-700 mt-2">
                        The Internal Link Checker works by scanning the HTML structure of a webpage and
                        extracting all anchor tags that contain hyperlinks. Each link is analyzed to
                        determine whether it points to the same domain (internal link) or to another
                        website (external link). The tool then organizes this information into a
                        detailed report that helps users understand the linking structure of the page.
                    </p>

                    <p className="text-gray-700 mt-3">
                        During the scanning process, the tool performs several important tasks. First,
                        it fetches the webpage content and parses the HTML document. Next, it identifies
                        all hyperlink elements and extracts attributes such as the destination URL and
                        the anchor text used in the link. Finally, the system compares the domain of
                        each link with the source website to classify it correctly.
                    </p>

                    <p className="text-gray-700 mt-3">
                        Advanced internal link analysis tools may also include additional features such
                        as crawl depth analysis, broken link detection, internal link heatmaps, and
                        visual link graphs. These insights help website administrators detect weak
                        areas in their site structure and improve overall SEO performance.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">
                        <li>Scans HTML and extracts anchor tags</li>
                        <li>Identifies internal and external links</li>
                        <li>Displays anchor text for each link</li>
                        <li>Calculates internal link distribution</li>
                        <li>Generates SEO insights for better optimization</li>
                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Benefits of Using This Internal Link Checker
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Using an Internal Link Checker can significantly improve the SEO health of
                        your website. A strong internal linking structure ensures that search engine
                        bots can crawl and index your pages efficiently. It also improves user
                        experience by helping visitors navigate between related content quickly and
                        easily.
                    </p>

                    <p className="text-gray-700 mt-3">
                        When pages are properly connected through internal links, search engines gain a
                        clear understanding of the hierarchy and importance of each page. This helps
                        search algorithms determine which pages deserve higher rankings in search
                        results. Additionally, internal linking can reduce bounce rates by guiding
                        users to other relevant pages within your website.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">

                        <li>
                            <strong>Improve Crawlability:</strong> Internal links help search engine
                            crawlers discover new pages and index them more efficiently.
                        </li>

                        <li>
                            <strong>Boost SEO Rankings:</strong> Proper internal linking distributes
                            authority across pages and improves overall search visibility.
                        </li>

                        <li>
                            <strong>Enhance User Navigation:</strong> Visitors can easily move between
                            related pages and find relevant information faster.
                        </li>

                        <li>
                            <strong>Detect Broken Links:</strong> Identifying broken or outdated internal
                            links helps maintain a healthy website structure.
                        </li>

                        <li>
                            <strong>Strengthen Content Relationships:</strong> Linking related articles
                            helps establish topical relevance and improves SEO signals.
                        </li>

                        <li>
                            <strong>Optimize Website Architecture:</strong> A well-structured internal
                            link network makes it easier for both users and search engines to understand
                            the organization of your website.
                        </li>

                    </ul>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Best Practices for Internal Linking in SEO
                    </h2>

                    <p className="text-gray-700 mt-2">
                        To maximize the benefits of internal linking, website owners should follow
                        several SEO best practices. Internal links should be placed naturally within
                        content and should point to relevant pages that add value to the user’s
                        experience. Overusing internal links or placing them in irrelevant contexts can
                        confuse both users and search engines.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 mt-4 space-y-2">

                        <li>Use descriptive anchor text that clearly explains the destination page.</li>

                        <li>Link to important pages such as cornerstone content or category pages.</li>

                        <li>Maintain a logical site structure with clear navigation paths.</li>

                        <li>Avoid excessive internal links on a single page.</li>

                        <li>Ensure that every important page has at least one internal link pointing to it.</li>

                        <li>Regularly audit internal links to remove broken or outdated links.</li>

                    </ul>

                    <p className="text-gray-700 mt-3">
                        By following these practices and regularly analyzing internal links using tools
                        like this Internal Links Checker, website owners can maintain a strong SEO
                        foundation and improve the overall performance of their website in search
                        engines.
                    </p>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Why Internal Linking is Important for SEO
                    </h2>

                    <p className="text-gray-700 mt-2">
                        Internal linking is a fundamental part of on-page SEO because it helps search
                        engines understand the relationship between different pages of a website. When
                        search crawlers follow internal links, they discover new pages and analyze how
                        content is interconnected. This helps search engines determine which pages are
                        most important and how they should be ranked in search results.
                    </p>

                    <p className="text-gray-700 mt-3">
                        Another important benefit of internal linking is the distribution of page
                        authority. When a popular or high-ranking page links to another page within the
                        same website, it passes part of its authority to that page. This process helps
                        improve the visibility of other pages that might otherwise struggle to rank on
                        their own.
                    </p>

                    <p className="text-gray-700 mt-3">
                        Internal links also improve user engagement. When readers encounter helpful
                        links within content, they are more likely to explore additional pages on the
                        website. This increases page views, session duration, and overall user
                        interaction—signals that can positively influence SEO performance.
                    </p>

                </section>


                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "internal link checker",
                            "seo internal links tool",
                            "internal link analyzer",
                            "website internal link scanner",
                            "internal linking seo tool",
                            "seo audit internal links",
                            "internal links audit tool",
                            "seo site structure checker",
                            "internal link analysis tool",
                            "internal linking strategy seo"
                        ].map((tag) => (

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