"use client";

import { useState } from "react";
import { DollarSign, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function AdsenseRevenueCalculator() {
    const [pageViews, setPageViews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateRevenue = () => {
        const views = parseFloat(pageViews);
        const clickRate = parseFloat(ctr);
        const costPerClick = parseFloat(cpc);

        if (!views || !clickRate || !costPerClick) {
            setResult(null);
            return;
        }

        const revenue = (views * (clickRate / 100)) * costPerClick;
        setResult(parseFloat(revenue.toFixed(2)));
    };

    const tryExample = () => {
        setPageViews("10000");
        setCtr("2");
        setCpc("10");
        setResult(2000);
    };

    const resetFields = () => {
        setPageViews("");
        setCtr("");
        setCpc("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <DollarSign className="text-green-600" />
                AdSense Revenue Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Monthly Page Views
                    </label>
                    <input
                        type="number"
                        value={pageViews}
                        onChange={(e) => setPageViews(e.target.value)}
                        placeholder="Enter page views"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Average CTR (%)
                    </label>
                    <input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(e.target.value)}
                        placeholder="Enter CTR percentage"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium mb-2">
                        Average CPC (₹)
                    </label>
                    <input
                        type="number"
                        value={cpc}
                        onChange={(e) => setCpc(e.target.value)}
                        placeholder="Enter CPC"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateRevenue}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <Calculator size={18} />
                    Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>
            </div>

            {/* Result */}
            {result !== null && (
                <div className="mt-8 bg-indigo-50 p-5 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Estimated Monthly Revenue
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How AdSense Revenue is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Google AdSense earnings depend on three major factors:
                    Page Views, Click Through Rate (CTR) and Cost Per Click (CPC).
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Revenue = Page Views × (CTR ÷ 100) × CPC
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase AdSense Earnings
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improve website traffic</li>
                    <li>Optimize ad placement</li>
                    <li>Target high CPC keywords</li>
                    <li>Improve user engagement</li>
                </ul>

            </div>
        </div>
    );
}