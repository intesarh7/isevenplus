"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function GoogleAdsEarningCalculator() {

    const [views, setViews] = useState("");
    const [ctr, setCtr] = useState("2");
    const [cpc, setCpc] = useState("0.25");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const pageViews = Number(views);
        const ctrRate = Number(ctr);
        const cpcValue = Number(cpc);

        if (!pageViews) return;

        const clicks = (pageViews * ctrRate) / 100;

        const revenue = clicks * cpcValue;

        setResult({
            clicks,
            revenue
        });

    };

    const example = () => {
        setViews("10000");
        setCtr("2");
        setCpc("0.25");
    };

    const reset = () => {
        setViews("");
        setCtr("2");
        setCpc("0.25");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Google Ads Earning Calculator
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium">
                            Monthly Page Views
                        </label>

                        <input
                            type="number"
                            value={views}
                            onChange={(e) => setViews(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter monthly page views"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Average CTR (%)
                        </label>

                        <input
                            type="number"
                            value={ctr}
                            onChange={(e) => setCtr(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Average CPC ($)
                        </label>

                        <input
                            type="number"
                            value={cpc}
                            onChange={(e) => setCpc(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        <button
                            onClick={calculate}
                            className="w-full sm:flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Calculate
                        </button>

                        <button
                            onClick={example}
                            className="w-full sm:flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        >
                            Try Example
                        </button>

                        <button
                            onClick={reset}
                            className="w-full sm:flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                        >
                            Reset
                        </button>

                    </div>

                </div>

                {result && (

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">

                        <h3 className="font-semibold text-lg mb-3">
                            Estimated Earnings
                        </h3>

                        <p>Estimated Ad Clicks: {result.clicks.toFixed(0)}</p>

                        <p className="text-green-700 text-lg font-semibold">
                            Estimated Revenue: ${result.revenue.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Google Ads Earning Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Google Ads Earning Calculator helps website owners, bloggers, and publishers estimate how much revenue they can earn from Google Ads or AdSense. Earnings depend on several factors including page views, click-through rate (CTR), and cost per click (CPC).

                    </p>

                    <p className="text-gray-700 mt-3">

                        This calculator allows publishers to estimate their potential advertising revenue based on website traffic and ad performance metrics.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Google Ads Revenue Works
                    </h2>

                    <p className="text-gray-700">

                        Google Ads earnings are typically calculated using the formula:

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm">

                        <p>Clicks = Page Views × CTR</p>

                        <p>Revenue = Clicks × CPC</p>

                    </div>

                    <p className="text-gray-700 mt-3">

                        Higher traffic, better ad placement, and high-value niches can significantly increase CPC and overall earnings.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Estimate Google Ads earnings quickly</li>
                        <li>Understand CTR and CPC impact on revenue</li>
                        <li>Plan website traffic goals</li>
                        <li>Optimize ad placement strategy</li>
                        <li>Estimate blogging income potential</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "google ads earning calculator",
                            "adsense revenue calculator",
                            "google adsense income calculator",
                            "blog ads revenue calculator",
                            "adsense earnings estimator",
                            "website ads revenue calculator",
                            "adsense profit calculator"
                        ].map((tag, i) => (
                            <span
                                key={i}
                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
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