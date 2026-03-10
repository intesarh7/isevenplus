"use client";

import { useState } from "react";

export default function AdsenseTrafficIncomeCalculator() {

    const [income, setIncome] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [traffic, setTraffic] = useState<number | null>(null);

    const calculate = () => {

        const targetIncome = Number(income);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!targetIncome || !clickRate || !costPerClick) {
            setTraffic(null);
            return;
        }

        const requiredTraffic = targetIncome / ((clickRate / 100) * costPerClick);

        setTraffic(Math.round(requiredTraffic));
    };

    const reset = () => {
        setIncome("");
        setCtr("");
        setCpc("");
        setTraffic(null);
    };

    const example = () => {
        setIncome("500");
        setCtr("2");
        setCpc("0.40");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Traffic Income Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Target Monthly Income ($)
                    </label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="e.g. 500"
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
                        placeholder="e.g. 0.40"
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

            {traffic !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Required Monthly Traffic
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {traffic.toLocaleString()} Visitors
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Traffic Income Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Traffic Income Calculator is a helpful online tool that
                    allows bloggers and website owners to estimate how much traffic is
                    required to achieve a specific income from Google AdSense. Instead of
                    guessing how many visitors you need, this calculator provides a quick
                    and realistic estimate based on your website's CTR and CPC values.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense earnings depend on several factors including website
                    traffic, ad click-through rate (CTR), and cost per click (CPC). By
                    combining these metrics, publishers can estimate how many visitors
                    are required to reach a particular revenue goal such as $100,
                    $500, or even $1000 per month.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How the Adsense Traffic Calculator Works
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The calculator uses your target income, CTR percentage, and CPC value
                    to determine how many visitors your website must receive in order to
                    generate the desired advertising revenue.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Traffic Calculation Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Required Traffic = Target Income / (CTR × CPC)
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your goal is to earn $500 per month from AdSense with
                    a CTR of 2% and an average CPC of $0.40, your website would need
                    approximately 62,500 monthly visitors to reach that income level.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Website Traffic Matters for Adsense Earnings
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Higher Traffic:</strong> More visitors increase the number of ad impressions.</li>
                    <li><strong>Higher CTR:</strong> A higher click rate leads to more ad clicks.</li>
                    <li><strong>Higher CPC:</strong> High-paying niches generate better earnings.</li>
                    <li><strong>Audience Quality:</strong> Targeted traffic usually produces higher ad engagement.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How to Increase Your Adsense Traffic
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    To increase AdSense income, website owners should focus on growing
                    their website traffic through search engine optimization, high-quality
                    content, and social media promotion. Ranking for high CPC keywords and
                    targeting audiences from high-value countries can also significantly
                    increase advertising revenue.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Traffic Income Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps publishers estimate their traffic requirements and plan a
                    realistic strategy to reach their AdSense income goals.
                </p>

            </div>
        </div>
    );
}