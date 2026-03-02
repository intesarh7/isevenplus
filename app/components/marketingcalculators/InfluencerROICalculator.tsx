"use client";

import { useState } from "react";
import { TrendingUp, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function InfluencerROICalculator() {
    const [revenue, setRevenue] = useState("");
    const [campaignCost, setCampaignCost] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateROI = () => {
        const totalRevenue = parseFloat(revenue);
        const totalCost = parseFloat(campaignCost);

        if (isNaN(totalRevenue) || isNaN(totalCost) || totalCost <= 0) {
            setResult(null);
            return;
        }

        const roi = ((totalRevenue - totalCost) / totalCost) * 100;
        setResult(parseFloat(roi.toFixed(2)));
    };

    const tryExample = () => {
        setRevenue("120000");
        setCampaignCost("40000");
        setResult(parseFloat((((120000 - 40000) / 40000) * 100).toFixed(2)));
    };

    const resetFields = () => {
        setRevenue("");
        setCampaignCost("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <TrendingUp className="text-green-600" />
                Influencer ROI Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Revenue Generated (₹)
                    </label>
                    <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        placeholder="Enter revenue"
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Campaign Cost (₹)
                    </label>
                    <input
                        type="number"
                        value={campaignCost}
                        onChange={(e) => setCampaignCost(e.target.value)}
                        placeholder="Enter campaign cost"
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateROI}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} />
                    Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {result !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Influencer Campaign ROI
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {result} %
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Influencer ROI is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Influencer ROI measures how profitable your influencer marketing campaign was.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    ROI (%) = ((Revenue − Campaign Cost) ÷ Campaign Cost) × 100
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Influencer ROI Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Measures campaign success</li>
                    <li>Helps optimize marketing budget</li>
                    <li>Improves future influencer selection</li>
                    <li>Tracks profitability accurately</li>
                </ul>

            </div>
        </div>
    );
}