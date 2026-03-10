"use client";

import { useState } from "react";

export default function AdsenseDailyEarningsCalculator() {

    const [pageviews, setPageviews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [dailyIncome, setDailyIncome] = useState<number | null>(null);

    const calculate = () => {

        const pv = Number(pageviews);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!pv || !clickRate || !costPerClick) {
            setDailyIncome(null);
            return;
        }

        const clicks = (pv * clickRate) / 100;
        const earnings = clicks * costPerClick;

        setDailyIncome(Number(earnings.toFixed(2)));
    };

    const reset = () => {
        setPageviews("");
        setCtr("");
        setCpc("");
        setDailyIncome(null);
    };

    const example = () => {
        setPageviews("2000");
        setCtr("2");
        setCpc("0.30");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Daily Earnings Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Daily Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        placeholder="e.g. 2000"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        CTR (%)
                    </label>
                    <input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(e.target.value)}
                        placeholder="e.g. 2"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        CPC ($)
                    </label>
                    <input
                        type="number"
                        value={cpc}
                        onChange={(e) => setCpc(e.target.value)}
                        placeholder="e.g. 0.30"
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

            {dailyIncome !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Daily Adsense Earnings
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${dailyIncome}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Daily Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Daily Earnings Calculator is a simple online tool that helps
                    bloggers and website owners estimate how much money they can earn from
                    Google AdSense advertisements on a daily basis. By entering key metrics
                    such as daily pageviews, click-through rate (CTR), and cost per click
                    (CPC), publishers can quickly estimate their potential advertising
                    revenue.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense is one of the most popular monetization platforms used by
                    bloggers and content creators worldwide. Publishers place ads on their
                    website and earn revenue whenever visitors click on those ads. However,
                    predicting daily income can be difficult because earnings depend on
                    multiple factors such as traffic, ad performance, user location, and
                    advertiser demand.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Daily Adsense Earnings Are Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The estimated daily AdSense income is calculated using three main
                    metrics: pageviews, CTR, and CPC. First, the calculator estimates how
                    many visitors will click on ads based on the CTR percentage. Then the
                    total clicks are multiplied by the CPC value to calculate the final
                    advertising revenue.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Daily Adsense Earnings Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Daily Earnings = Pageviews × CTR × CPC
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website receives 2,000 daily visitors with a CTR
                    of 2% and a CPC of $0.30, the estimated daily income would be around
                    $12. This estimate helps publishers understand how their website
                    traffic converts into advertising revenue.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Adsense Daily Income
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Website Traffic:</strong> More visitors increase the chances of ad clicks.</li>
                    <li><strong>CTR (Click Through Rate):</strong> Higher CTR leads to more ad clicks.</li>
                    <li><strong>CPC (Cost Per Click):</strong> Higher CPC increases the revenue per click.</li>
                    <li><strong>Website Niche:</strong> Finance and technology niches often generate higher earnings.</li>
                    <li><strong>User Location:</strong> Traffic from countries like the US and UK typically has higher CPC.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use a Daily Adsense Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    This calculator helps bloggers and website owners estimate their
                    expected daily revenue and plan their monetization strategy more
                    effectively. It also helps publishers understand how traffic growth
                    and improved ad performance can significantly increase advertising
                    income.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Daily Earnings Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    allows publishers to instantly estimate their daily income and
                    understand how website traffic translates into real advertising
                    revenue.
                </p>

            </div>
        </div>
    );
}