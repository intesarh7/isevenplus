"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function CPCCalculator() {
    const [totalCost, setTotalCost] = useState("");
    const [totalClicks, setTotalClicks] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateCPC = () => {
        const cost = parseFloat(totalCost);
        const clicks = parseFloat(totalClicks);

        if (!cost || !clicks || clicks === 0) {
            setResult(null);
            return;
        }

        const cpc = cost / clicks;
        setResult(parseFloat(cpc.toFixed(4)));
    };

    const tryExample = () => {
        setTotalCost("5000");
        setTotalClicks("250");
        setResult(20);
    };

    const resetFields = () => {
        setTotalCost("");
        setTotalClicks("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Calculator className="text-green-600" />
                CPC Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Advertising Cost (₹)
                    </label>
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(e.target.value)}
                        placeholder="Enter total cost"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Total Clicks
                    </label>
                    <input
                        type="number"
                        value={totalClicks}
                        onChange={(e) => setTotalClicks(e.target.value)}
                        placeholder="Enter total clicks"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCPC}
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
                        Cost Per Click (CPC)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}

            {/* SEO Content */}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is CPC (Cost Per Click)?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    CPC (Cost Per Click) is a digital advertising metric that shows how much you pay for each click on your ad.
                    It is calculated using the formula:
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    CPC = Total Advertising Cost ÷ Total Clicks
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why CPC is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Helps measure advertising efficiency</li>
                    <li>Useful for Google Ads and Facebook Ads campaigns</li>
                    <li>Improves ROI tracking</li>
                    <li>Budget optimization for marketing</li>
                </ul>

            </div>
        </div>
    );
}