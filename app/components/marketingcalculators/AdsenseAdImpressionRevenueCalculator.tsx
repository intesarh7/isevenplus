"use client";

import { useState } from "react";

export default function AdsenseAdImpressionRevenueCalculator() {

    const [impressions, setImpressions] = useState("");
    const [cpm, setCpm] = useState("");

    const [revenue, setRevenue] = useState<number | null>(null);

    const calculate = () => {

        const imp = Number(impressions);
        const costPerThousand = Number(cpm);

        if (!imp || !costPerThousand) {
            setRevenue(null);
            return;
        }

        const result = (imp * costPerThousand) / 1000;

        setRevenue(Number(result.toFixed(2)));
    };

    const reset = () => {
        setImpressions("");
        setCpm("");
        setRevenue(null);
    };

    const example = () => {
        setImpressions("80000");
        setCpm("4");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Ad Impression Revenue Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Ad Impressions
                    </label>
                    <input
                        type="number"
                        value={impressions}
                        onChange={(e) => setImpressions(e.target.value)}
                        placeholder="e.g. 80000"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        CPM ($)
                    </label>
                    <input
                        type="number"
                        value={cpm}
                        onChange={(e) => setCpm(e.target.value)}
                        placeholder="e.g. 4"
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

            {revenue !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Revenue from Impressions
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${revenue}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Ad Impression Revenue Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Ad Impression Revenue Calculator is a simple online tool
                    that helps bloggers and website publishers estimate their potential
                    earnings from ad impressions. Instead of calculating earnings manually,
                    this tool quickly determines how much revenue can be generated based
                    on the number of ad impressions and the CPM value.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense earnings are often influenced by both clicks and
                    impressions. While cost per click (CPC) determines earnings when
                    users click on ads, CPM (cost per thousand impressions) determines
                    how much revenue advertisers pay for every thousand ad views.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Ad Impression Revenue is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The calculation for ad impression revenue is based on the CPM model.
                    The total number of impressions is multiplied by the CPM value and
                    then divided by 1000 to determine the final revenue.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Ad Impression Revenue Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Revenue = (Impressions × CPM) / 1000
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website generates 80,000 ad impressions and
                    the average CPM is $4, your estimated revenue would be $320.
                    This simple calculation helps publishers understand how impressions
                    translate into advertising income.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Ad Impression Revenue
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Ad Impressions:</strong> More impressions increase the chances of higher revenue.</li>
                    <li><strong>CPM Rates:</strong> Higher CPM values result in better earnings.</li>
                    <li><strong>Website Niche:</strong> Certain niches like finance and technology often have higher CPM.</li>
                    <li><strong>Audience Location:</strong> Traffic from premium countries usually generates higher ad revenue.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use an Adsense Impression Revenue Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Using an Adsense impression revenue calculator allows publishers
                    to quickly estimate how much revenue they can generate from their
                    website traffic without performing complicated calculations.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Ad Impression Revenue Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps bloggers and publishers better understand how ad impressions
                    affect their overall advertising revenue and website monetization
                    strategy.
                </p>

            </div>
        </div>
    );
}