"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function LumpsumCalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateLumpsum = () => {
        const P = parseFloat(amount);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);

        if (!P || !r || !t) return;

        const futureValue = P * Math.pow(1 + r, t);
        setResult(parseFloat(futureValue.toFixed(2)));
    };

    const tryExample = () => {
        setAmount("100000");
        setRate("12");
        setYears("5");
    };

    const resetFields = () => {
        setAmount("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-6">
                Lumpsum Investment Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Investment Amount (₹)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Enter amount"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Annual Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Enter rate"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Investment Period (Years)
                    </label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Enter years"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                {/* Calculate */}
                <button
                    onClick={calculateLumpsum}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Check Returns
                </button>

                {/* Try Example */}
                <button
                    onClick={tryExample}
                    className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <PlayCircle size={18} />
                    Try Example
                </button>

                {/* Reset */}
                <button
                    onClick={resetFields}
                    className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {result !== null && (
                <div className="mt-8 p-6 bg-green-50 border rounded-xl">
                    <h3 className="text-xl font-semibold">
                        Future Value: ₹ {result.toLocaleString()}
                    </h3>
                </div>
            )}
            <div className="max-w-4xl mx-auto mt-10 px-4">
                <h2 className="text-2xl font-bold mb-4">
                    What is a Lumpsum Investment?
                </h2>

                <p className="mb-4 text-gray-700 leading-7">
                    A lumpsum investment means investing a large amount of money at one time
                    instead of investing regularly. This type of investment is common in
                    mutual funds, fixed deposits, and stock markets.
                </p>

                <h3 className="text-xl font-semibold mb-2">
                    Lumpsum Investment Formula
                </h3>

                <p className="mb-4 text-gray-700">
                    Future Value = P × (1 + r)<sup>t</sup>
                </p>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>P = Principal Amount</li>
                    <li>r = Annual Interest Rate</li>
                    <li>t = Time in Years</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                    Benefits of Lumpsum Investment
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Higher returns with compounding</li>
                    <li>Simple one-time investment</li>
                    <li>Best for long-term wealth growth</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                    When Should You Use This Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Use this tool before investing in mutual funds, fixed deposits,
                    or long-term financial planning to estimate your potential future returns.
                </p>
            </div>
        </div>
    );
}
