"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function CPMCalculator() {

    const [totalCost, setTotalCost] = useState("");
    const [totalImpressions, setTotalImpressions] = useState("");

    const [cpm, setCpm] = useState<number | null>(null);

    const calculateCPM = () => {
        const cost = parseFloat(totalCost);
        const impressions = parseFloat(totalImpressions);

        if (!cost || !impressions || impressions <= 0) return;

        const result = (cost / impressions) * 1000;
        setCpm(result);
    };

    const tryExample = () => {
        setTotalCost("5000");
        setTotalImpressions("100000");
    };

    const resetFields = () => {
        setTotalCost("");
        setTotalImpressions("");
        setCpm(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                CPM (Cost Per Mille) Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">Total Advertising Cost (₹)</label>
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">Total Impressions</label>
                    <input
                        type="number"
                        value={totalImpressions}
                        onChange={(e) => setTotalImpressions(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateCPM}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate CPM
                </button>

                <button
                    onClick={tryExample}
                    className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {cpm !== null && (
                <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">
                        CPM Result
                    </h3>

                    <p>
                        Cost Per 1,000 Impressions (CPM): 
                        <strong> ₹{cpm.toFixed(2)}</strong>
                    </p>
                </div>
            )}

            {/* SEO Section */}
            <div className="mt-12 space-y-6 text-gray-700">

                <h2 className="text-2xl font-bold">
                    What is CPM (Cost Per Mille)?
                </h2>
                <p>
                    CPM stands for Cost Per Mille, meaning the cost of 1,000
                    advertising impressions. It is widely used in digital
                    marketing to measure advertising efficiency.
                </p>

                <h2 className="text-2xl font-bold">
                    CPM Formula
                </h2>
                <p>
                    <strong>
                        CPM = (Total Advertising Cost ÷ Total Impressions) × 1000
                    </strong>
                </p>

                <h2 className="text-2xl font-bold">
                    Why Use This Calculator?
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Measure advertising campaign performance</li>
                    <li>Compare ad platform efficiency</li>
                    <li>Optimize marketing budget</li>
                    <li>Improve ROI analysis</li>
                </ul>

            </div>

        </div>
    );
}