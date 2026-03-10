"use client";

import { useState } from "react";

export default function AdsenseMonthlyIncomeCalculator() {

    const [pageviews, setPageviews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [income, setIncome] = useState<number | null>(null);

    const calculate = () => {

        const pv = Number(pageviews);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!pv || !clickRate || !costPerClick) {
            setIncome(null);
            return;
        }

        const clicks = (pv * clickRate) / 100;
        const earnings = clicks * costPerClick;

        setIncome(Number(earnings.toFixed(2)));
    };

    const reset = () => {
        setPageviews("");
        setCtr("");
        setCpc("");
        setIncome(null);
    };

    const example = () => {
        setPageviews("60000");
        setCtr("2");
        setCpc("0.35");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Monthly Income Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Monthly Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        placeholder="e.g. 60000"
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
                        placeholder="e.g. 0.35"
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

            {income !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Monthly Adsense Income
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${income}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Monthly Income Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Monthly Income Calculator is an online tool designed to help
                    bloggers and website owners estimate their monthly earnings from Google
                    AdSense advertising. By entering basic metrics such as monthly pageviews,
                    click-through rate (CTR), and cost per click (CPC), publishers can quickly
                    calculate how much revenue their website traffic could potentially generate.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense is one of the most widely used monetization platforms for
                    websites and blogs. Publishers earn money when visitors click on ads shown
                    on their website pages. However, predicting monthly revenue can be difficult
                    because ad performance depends on several factors such as traffic volume,
                    user engagement, ad placement, niche competition, and advertiser demand.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense Monthly Income is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The estimated monthly AdSense income is calculated using three important
                    metrics: pageviews, CTR, and CPC. First, the calculator estimates the number
                    of ad clicks by multiplying pageviews with the CTR percentage. Then the total
                    clicks are multiplied by the CPC value to calculate the final advertising
                    earnings.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Monthly Adsense Income Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Monthly Income = Pageviews × CTR × CPC
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if a website receives 60,000 monthly visitors with a CTR of
                    2% and an average CPC of $0.35, the estimated monthly income would be
                    approximately $420. While the actual earnings may vary, this estimate
                    provides a useful benchmark for website monetization potential.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Adsense Monthly Earnings
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Website Traffic:</strong> Higher traffic increases the potential number of ad impressions.</li>
                    <li><strong>CTR (Click Through Rate):</strong> A higher CTR means more users clicking on ads.</li>
                    <li><strong>CPC (Cost Per Click):</strong> Higher CPC leads to higher earnings per ad click.</li>
                    <li><strong>Website Niche:</strong> Some niches like finance and insurance offer higher ad payouts.</li>
                    <li><strong>User Location:</strong> Traffic from countries like the US and UK generally produces higher ad revenue.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use an Adsense Monthly Income Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Using an Adsense income estimator helps website owners plan their
                    monetization strategy and set realistic revenue goals. It also helps
                    publishers understand how improving traffic, CTR, or CPC can significantly
                    increase their advertising income.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Monthly Income Calculator available on
                    <span className="font-semibold text-indigo-600">iSevenPlus</span>
                    allows bloggers and publishers to quickly estimate their potential
                    AdSense revenue and better understand how website traffic converts
                    into advertising income.
                </p>

            </div>
        </div>
    );
}