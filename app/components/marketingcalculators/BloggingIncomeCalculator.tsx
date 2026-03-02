"use client";

import { useState } from "react";
import { PenTool, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function BloggingIncomeCalculator() {
    const [pageViews, setPageViews] = useState("");
    const [rpm, setRpm] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateIncome = () => {
        const views = parseFloat(pageViews);
        const revenuePerThousand = parseFloat(rpm);

        if (!views || !revenuePerThousand) {
            setResult(null);
            return;
        }

        const income = (views / 1000) * revenuePerThousand;
        setResult(parseFloat(income.toFixed(2)));
    };

    const tryExample = () => {
        setPageViews("50000");
        setRpm("150");
        setResult((50000 / 1000) * 150);
    };

    const resetFields = () => {
        setPageViews("");
        setRpm("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <PenTool className="text-green-600" />
                Blogging Income Calculator
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
                        placeholder="Enter monthly page views"
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
                        placeholder="Enter average RPM"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateIncome}
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
                        Estimated Monthly Blogging Income
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Blogging Income is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Blogging income depends mainly on traffic (page views) and RPM (Revenue Per 1000 Views).
                    RPM can include earnings from AdSense, affiliate marketing and sponsored posts.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Monthly Income = (Page Views ÷ 1000) × RPM
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase Blog Income
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Target high CPC keywords</li>
                    <li>Improve SEO ranking</li>
                    <li>Add affiliate marketing</li>
                    <li>Increase email subscribers</li>
                </ul>

            </div>
        </div>
    );
}