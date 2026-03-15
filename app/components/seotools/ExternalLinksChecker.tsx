"use client";

import { useState } from "react";
import {
    Globe,
    Search,
    Loader2,
    RefreshCcw,
    ExternalLink,
    AlertTriangle,
    CheckCircle
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

    const checkLinks = async () => {

        if (!url) return;

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
    };

    const tryExample = () => {
        setUrl("https://example.com");
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
                    className="border rounded-lg px-4 py-3 w-full"
                />

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

            {/* SEO CONTENT */}

            <div className="space-y-8">

                <section>
                    <h2 className="text-xl font-bold">
                        About External Links Checker
                    </h2>
                    <p className="text-gray-700 mt-2">
                        External links play a crucial role in search engine optimization and website credibility. An external link is any hyperlink that points from your website to another domain. These links help search engines understand how your content connects to the broader web ecosystem. The External Links Checker tool scans a webpage and identifies all outbound links that lead to other websites.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold">
                        How External Link Checking Works
                    </h2>
                    <p className="text-gray-700 mt-2">
                        The tool scans the HTML structure of a webpage and extracts anchor tags that contain hyperlinks. Each link is analyzed to determine whether it points to the same domain or an external domain. If the domain differs, the link is classified as an external link. The tool also checks whether the link includes attributes such as rel="nofollow" and whether the link returns an error response.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold">
                        Benefits of Using This Tool
                    </h2>

                    <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                        <li>Identify all outbound links on a webpage</li>
                        <li>Detect broken external links</li>
                        <li>Analyze nofollow link attributes</li>
                        <li>Improve website SEO health</li>
                        <li>Maintain a clean and trustworthy linking structure</li>
                    </ul>

                </section>

                <section>

                    <h2 className="text-xl font-bold">
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">

                        {[
                            "external links checker",
                            "seo external links audit",
                            "outbound link checker",
                            "nofollow link checker",
                            "external link analyzer",
                            "seo link audit tool"
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