"use client";

import { useState } from "react";
import { TrendingUp, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function MutualFundReturnCalculator() {
    const [investment, setInvestment] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");

    const [futureValue, setFutureValue] = useState<number | null>(null);
    const [totalGain, setTotalGain] = useState<number | null>(null);

    const calculateReturn = () => {
        const P = parseFloat(investment);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);

        if (isNaN(P) || isNaN(r) || isNaN(t)) {
            setFutureValue(null);
            return;
        }

        const FV = P * Math.pow(1 + r, t);
        const gain = FV - P;

        setFutureValue(parseFloat(FV.toFixed(2)));
        setTotalGain(parseFloat(gain.toFixed(2)));
    };

    const tryExample = () => {
        setInvestment("100000");
        setRate("12");
        setYears("10");

        const FV = 100000 * Math.pow(1 + 0.12, 10);
        const gain = FV - 100000;

        setFutureValue(parseFloat(FV.toFixed(2)));
        setTotalGain(parseFloat(gain.toFixed(2)));
    };

    const resetFields = () => {
        setInvestment("");
        setRate("");
        setYears("");
        setFutureValue(null);
        setTotalGain(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <TrendingUp className="text-green-600" />
                Mutual Fund Return Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Investment Amount (₹)"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Expected Annual Return (%)"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Investment Duration (Years)"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateReturn}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} /> Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {futureValue !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Future Value: ₹ {futureValue}
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Total Gain: ₹ {totalGain}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Mutual Fund Returns are Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Mutual fund returns are calculated using compound interest,
                    where your investment grows over time based on annual returns.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Future Value = P × (1 + r)^t
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Invest in Mutual Funds?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Compounding growth over time</li>
                    <li>Professional fund management</li>
                    <li>Diversified portfolio</li>
                    <li>Long-term wealth creation</li>
                </ul>

            </div>
        </div>
    );
}