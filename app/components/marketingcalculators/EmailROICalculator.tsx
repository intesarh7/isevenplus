"use client";

import { useState } from "react";
import { Mail, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function EmailROICalculator() {
    const [revenue, setRevenue] = useState("");
    const [cost, setCost] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateROI = () => {
        const totalRevenue = parseFloat(revenue);
        const totalCost = parseFloat(cost);

        if (!totalRevenue || !totalCost || totalCost === 0) {
            setResult(null);
            return;
        }

        const roi = ((totalRevenue - totalCost) / totalCost) * 100;
        setResult(parseFloat(roi.toFixed(2)));
    };

    const tryExample = () => {
        setRevenue("20000");
        setCost("5000");
        setResult(300);
    };

    const resetFields = () => {
        setRevenue("");
        setCost("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Mail className="text-green-600" />
                Email ROI Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Revenue Generated (₹)
                    </label>
                    <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        placeholder="Enter revenue"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Total Email Campaign Cost (₹)
                    </label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="Enter campaign cost"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateROI}
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
                        Email Campaign ROI
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {result} %
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Email ROI?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Email ROI (Return on Investment) measures the profitability of your email marketing campaigns.
                    It shows how much return you are generating compared to the cost of running the campaign.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    ROI = ((Revenue - Cost) ÷ Cost) × 100
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Email ROI Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Measures campaign profitability</li>
                    <li>Helps optimize email marketing budget</li>
                    <li>Improves long-term marketing strategy</li>
                    <li>Tracks performance accurately</li>
                </ul>

            </div>
        </div>
    );
}