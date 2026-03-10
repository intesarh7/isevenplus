"use client";

import { useState } from "react";

export default function AdsenseRPMCalculator() {

    const [revenue, setRevenue] = useState("");
    const [pageviews, setPageviews] = useState("");
    const [rpm, setRpm] = useState<number | null>(null);

    const calculate = () => {

        const rev = Number(revenue);
        const views = Number(pageviews);

        if (!rev || !views) {
            setRpm(null);
            return;
        }

        const result = (rev / views) * 1000;

        setRpm(Number(result.toFixed(2)));
    };

    const reset = () => {
        setRevenue("");
        setPageviews("");
        setRpm(null);
    };

    const example = () => {
        setRevenue("120");
        setPageviews("30000");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense RPM Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Total Revenue ($)
                    </label>
                    <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        placeholder="e.g. 120"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Total Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        placeholder="e.g. 30000"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                    onClick={calculate}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Calculate
                </button>

                <button
                    onClick={example}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Try Example
                </button>

                <button
                    onClick={reset}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
                >
                    Reset
                </button>

            </div>

            {rpm !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Page RPM
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${rpm}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense RPM Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense RPM Calculator is an online tool that helps website owners,
                    bloggers, and publishers calculate their estimated revenue per 1000 page
                    impressions. RPM stands for “Revenue Per Mille,” where mille means one
                    thousand. In simple terms, RPM shows how much money a website earns for
                    every 1000 pageviews generated from advertising.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense publishers often use RPM to measure the performance of
                    their website monetization strategy. Instead of looking only at total
                    earnings, RPM provides a more accurate insight into how effectively
                    advertisements are generating income relative to traffic.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense RPM is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The RPM calculation is straightforward. It divides the total revenue by
                    the total pageviews and then multiplies the result by 1000. This provides
                    the estimated revenue generated per 1000 impressions.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Basic RPM Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        RPM = (Revenue / Pageviews) × 1000
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website earns $120 from 30,000 pageviews, the RPM
                    would be calculated as follows: (120 / 30000) × 1000 = $4 RPM. This means
                    your website generates approximately $4 for every 1000 visitors.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why RPM is Important for Publishers
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    RPM is one of the most important metrics used by bloggers and website
                    owners to analyze advertising performance. By monitoring RPM, publishers
                    can understand whether their traffic is being monetized efficiently.
                    A higher RPM usually means better ad placement, higher CPC keywords,
                    and more engaged visitors.
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Ad Placement Optimization:</strong> Better placement can increase clicks and revenue.</li>
                    <li><strong>High CPC Keywords:</strong> Some niches pay higher advertising rates.</li>
                    <li><strong>Audience Location:</strong> Traffic from premium countries usually generates higher RPM.</li>
                    <li><strong>Website Niche:</strong> Finance, technology, and insurance niches tend to have higher RPM.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How to Increase Adsense RPM
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Increasing your RPM can significantly improve your website revenue
                    without necessarily increasing traffic. You can improve RPM by focusing
                    on high-quality content, targeting high-paying keywords, improving ad
                    placement, and attracting visitors from high-value countries.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense RPM Calculator provided by
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps publishers instantly estimate their revenue per 1000 pageviews
                    and understand how their website traffic translates into advertising
                    income.
                </p>

            </div>
        </div>
    );
}