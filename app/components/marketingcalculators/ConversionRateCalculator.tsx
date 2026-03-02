"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function ConversionRateCalculator() {

    const [totalVisitors, setTotalVisitors] = useState("");
    const [totalConversions, setTotalConversions] = useState("");

    const [conversionRate, setConversionRate] = useState<number | null>(null);

    const calculateConversionRate = () => {
        const visitors = parseFloat(totalVisitors);
        const conversions = parseFloat(totalConversions);

        if (!visitors || !conversions || visitors <= 0) return;

        const rate = (conversions / visitors) * 100;
        setConversionRate(rate);
    };

    const tryExample = () => {
        setTotalVisitors("10000");
        setTotalConversions("450");
    };

    const resetFields = () => {
        setTotalVisitors("");
        setTotalConversions("");
        setConversionRate(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                Conversion Rate Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">Total Visitors</label>
                    <input
                        type="number"
                        value={totalVisitors}
                        onChange={(e) => setTotalVisitors(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">Total Conversions</label>
                    <input
                        type="number"
                        value={totalConversions}
                        onChange={(e) => setTotalConversions(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateConversionRate}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Rate
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

            {conversionRate !== null && (
                <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">
                        Conversion Result
                    </h3>

                    <p>
                        Conversion Rate: 
                        <strong> {conversionRate.toFixed(2)}%</strong>
                    </p>
                </div>
            )}

            {/* SEO Section */}
            <div className="mt-12 space-y-6 text-gray-700">

                <h2 className="text-2xl font-bold">
                    What is Conversion Rate?
                </h2>
                <p>
                    Conversion rate measures the percentage of visitors who
                    complete a desired action such as making a purchase,
                    signing up, or filling out a form.
                </p>

                <h2 className="text-2xl font-bold">
                    Conversion Rate Formula
                </h2>
                <p>
                    <strong>
                        Conversion Rate = (Total Conversions ÷ Total Visitors) × 100
                    </strong>
                </p>

                <h2 className="text-2xl font-bold">
                    Why Use This Calculator?
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Measure marketing campaign effectiveness</li>
                    <li>Optimize website performance</li>
                    <li>Improve sales funnel strategy</li>
                    <li>Track business growth</li>
                </ul>

            </div>

        </div>
    );
}