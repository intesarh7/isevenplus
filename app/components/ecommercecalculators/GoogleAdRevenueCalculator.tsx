"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function GoogleAdRevenueCalculator() {

    const [views, setViews] = useState("");
    const [rpm, setRpm] = useState("3");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const pageViews = Number(views);
        const rpmValue = Number(rpm);

        if (!pageViews) return;

        const revenue = (pageViews / 1000) * rpmValue;

        setResult({
            revenue
        });

    };

    const example = () => {
        setViews("50000");
        setRpm("3");
    };

    const reset = () => {
        setViews("");
        setRpm("3");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Google Ad Revenue Calculator
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
                            Average RPM ($ per 1000 views)
                        </label>

                        <input
                            type="number"
                            value={rpm}
                            onChange={(e) => setRpm(e.target.value)}
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
                            Estimated Revenue
                        </h3>

                        <p className="text-green-700 text-lg font-semibold">
                            Monthly Ad Revenue: ${result.revenue.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Google Ad Revenue Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Google Ad Revenue Calculator helps website owners estimate potential earnings from Google Ads or AdSense based on page views and RPM (Revenue per thousand impressions). RPM represents the estimated revenue earned for every 1000 page impressions.

                    </p>

                    <p className="text-gray-700 mt-3">

                        Using this calculator publishers can quickly estimate their advertising income potential and plan traffic growth strategies.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Google Ad Revenue Works
                    </h2>

                    <p className="text-gray-700">

                        Google Ad revenue is typically calculated using RPM (Revenue per 1000 impressions). RPM depends on factors such as niche, audience location, ad placement, and advertiser competition.

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm">

                        <p>Revenue = (Page Views ÷ 1000) × RPM</p>

                    </div>

                    <p className="text-gray-700 mt-3">

                        Higher traffic and high-paying niches such as finance, software, and business often generate higher RPM values.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Estimate Google Ad revenue instantly</li>
                        <li>Understand RPM impact on earnings</li>
                        <li>Plan website traffic goals</li>
                        <li>Optimize content monetization strategy</li>
                        <li>Forecast blogging income potential</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "google ad revenue calculator",
                            "adsense rpm calculator",
                            "ads revenue calculator",
                            "website ad revenue estimator",
                            "adsense income calculator",
                            "blog revenue calculator",
                            "google ads earnings estimator"
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