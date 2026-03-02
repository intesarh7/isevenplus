"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function DividendYieldCalculator() {
    const [dividend, setDividend] = useState("");
    const [price, setPrice] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateYield = () => {
        const d = parseFloat(dividend);
        const p = parseFloat(price);

        if (!d || !p) return;

        const yieldPercent = (d / p) * 100;
        setResult(parseFloat(yieldPercent.toFixed(2)));
    };

    const tryExample = () => {
        setDividend("20");
        setPrice("400");
    };

    const resetFields = () => {
        setDividend("");
        setPrice("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Dividend Yield Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Annual Dividend per Share (₹)
                    </label>
                    <input
                        type="number"
                        value={dividend}
                        onChange={(e) => setDividend(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter annual dividend"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Current Share Price (₹)
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter share price"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateYield}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Yield
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

            {result !== null && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl text-center">
                    <h3 className="text-xl font-semibold">
                        Dividend Yield: {result}%
                    </h3>
                </div>
            )}
            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is Dividend Yield?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Dividend yield is a financial ratio that shows how much a company pays
                    out in dividends each year relative to its current share price.
                    It helps investors measure the income return on their stock investment.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Dividend Yield Formula
                </h3>

                <p className="text-gray-700 mb-6">
                    Dividend Yield (%) = (Annual Dividend per Share ÷ Current Share Price) × 100
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Dividend Yield is Important?
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Helps compare income potential between stocks</li>
                    <li>Useful for passive income investors</li>
                    <li>Supports long-term portfolio planning</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                    Why Use iSevenPlus Dividend Yield Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator instantly computes dividend yield percentage, helping
                    investors evaluate stock performance and income opportunities with ease.
                </p>

            </div>
        </div>
    );
}