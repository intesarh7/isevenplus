"use client";

import { useState } from "react";

export default function AdsenseRevenuePerVisitorCalculator() {

    const [revenue, setRevenue] = useState("");
    const [visitors, setVisitors] = useState("");

    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {

        const rev = Number(revenue);
        const vis = Number(visitors);

        if (!rev || !vis) {
            setResult(null);
            return;
        }

        const value = rev / vis;

        setResult(Number(value.toFixed(4)));
    };

    const reset = () => {
        setRevenue("");
        setVisitors("");
        setResult(null);
    };

    const example = () => {
        setRevenue("250");
        setVisitors("50000");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Revenue Per Visitor Calculator
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
                        placeholder="e.g. 250"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Total Visitors
                    </label>
                    <input
                        type="number"
                        value={visitors}
                        onChange={(e) => setVisitors(e.target.value)}
                        placeholder="e.g. 50000"
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

            {result !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Revenue Per Visitor
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${result}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Revenue Per Visitor Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Revenue Per Visitor Calculator is a helpful tool used by
                    bloggers and website owners to determine how much revenue each visitor
                    generates from Google AdSense advertisements. Instead of only tracking
                    total earnings, this metric allows publishers to understand the value
                    of individual website visitors.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense income depends on several factors including traffic
                    volume, click-through rate (CTR), cost per click (CPC), and audience
                    engagement. By calculating revenue per visitor, publishers can measure
                    how effectively their website converts traffic into advertising income.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Revenue Per Visitor is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The calculation for revenue per visitor is simple. The total revenue
                    generated from advertisements is divided by the total number of
                    visitors during the same period.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Revenue Per Visitor Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Revenue Per Visitor = Total Revenue / Total Visitors
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if a website earns $250 from 50,000 visitors, the revenue
                    per visitor would be $0.005. This means each visitor generates
                    approximately half a cent in advertising income.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Revenue Per Visitor Matters
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Traffic Value Measurement:</strong> Helps understand how valuable each visitor is.</li>
                    <li><strong>Monetization Optimization:</strong> Shows whether ads are performing effectively.</li>
                    <li><strong>SEO Strategy Planning:</strong> Helps identify high-value traffic sources.</li>
                    <li><strong>Revenue Growth:</strong> Improving revenue per visitor increases total income.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How to Increase Revenue Per Visitor
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Improving revenue per visitor requires optimizing ad placement,
                    targeting high CPC keywords, and attracting high-quality traffic.
                    Website owners can also increase this metric by focusing on
                    content that attracts audiences from high-paying advertising markets.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Revenue Per Visitor Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps publishers quickly determine the average earnings generated
                    by each visitor and better understand their website monetization
                    performance.
                </p>

            </div>
        </div>
    );
}