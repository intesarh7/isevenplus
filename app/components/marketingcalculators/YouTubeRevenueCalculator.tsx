"use client";

import { useState } from "react";
import { Youtube, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function YouTubeRevenueCalculator() {
    const [views, setViews] = useState("");
    const [rpm, setRpm] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateRevenue = () => {
        const totalViews = parseFloat(views);
        const revenuePerThousand = parseFloat(rpm);

        if (!totalViews || !revenuePerThousand) {
            setResult(null);
            return;
        }

        const revenue = (totalViews / 1000) * revenuePerThousand;
        setResult(parseFloat(revenue.toFixed(2)));
    };

    const tryExample = () => {
        setViews("100000");
        setRpm("80");
        setResult(8000);
    };

    const resetFields = () => {
        setViews("");
        setRpm("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Youtube className="text-red-600" />
                YouTube Revenue Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Monthly Views
                    </label>
                    <input
                        type="number"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                        placeholder="Enter total views"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Average RPM (₹)
                    </label>
                    <input
                        type="number"
                        value={rpm}
                        onChange={(e) => setRpm(e.target.value)}
                        placeholder="Enter RPM"
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
                        Estimated Monthly YouTube Earnings
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How YouTube Revenue is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    YouTube earnings depend mainly on RPM (Revenue Per 1000 Views).
                    RPM shows how much revenue you earn for every 1000 views on your videos.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Estimated Revenue = (Views ÷ 1000) × RPM
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase YouTube Earnings
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Create high engagement content</li>
                    <li>Target high CPM niches</li>
                    <li>Increase watch time</li>
                    <li>Improve audience retention</li>
                </ul>

            </div>
        </div>
    );
}