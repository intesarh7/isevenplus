"use client";

import { useState } from "react";
import { MousePointerClick, RotateCcw, PlayCircle } from "lucide-react";

export default function CTRCalculator() {
    const [clicks, setClicks] = useState("");
    const [impressions, setImpressions] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateCTR = () => {
        const totalClicks = parseFloat(clicks);
        const totalImpressions = parseFloat(impressions);

        if (!totalClicks || !totalImpressions || totalImpressions === 0) {
            setResult(null);
            return;
        }

        const ctr = (totalClicks / totalImpressions) * 100;
        setResult(parseFloat(ctr.toFixed(2)));
    };

    const tryExample = () => {
        setClicks("150");
        setImpressions("5000");
        setResult(3);
    };

    const resetFields = () => {
        setClicks("");
        setImpressions("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <MousePointerClick className="text-green-600" />
                CTR Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Clicks
                    </label>
                    <input
                        type="number"
                        value={clicks}
                        onChange={(e) => setClicks(e.target.value)}
                        placeholder="Enter total clicks"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Total Impressions
                    </label>
                    <input
                        type="number"
                        value={impressions}
                        onChange={(e) => setImpressions(e.target.value)}
                        placeholder="Enter total impressions"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCTR}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <MousePointerClick size={18} />
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
                        Click Through Rate (CTR)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {result} %
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is CTR (Click Through Rate)?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    CTR (Click Through Rate) is a digital marketing metric that shows the percentage of people who clicked on your advertisement after seeing it.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    CTR = (Total Clicks ÷ Total Impressions) × 100
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why CTR Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Measures ad performance</li>
                    <li>Improves Quality Score in Google Ads</li>
                    <li>Helps optimize marketing campaigns</li>
                    <li>Increases ROI tracking accuracy</li>
                </ul>

            </div>
        </div>
    );
}