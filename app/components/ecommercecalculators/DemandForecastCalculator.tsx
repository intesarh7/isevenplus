"use client";

import { useState } from "react";
import { TrendingUp, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function DemandForecastCalculator() {
    const [month1, setMonth1] = useState("");
    const [month2, setMonth2] = useState("");
    const [month3, setMonth3] = useState("");

    const [forecast, setForecast] = useState<number | null>(null);

    const calculateForecast = () => {
        const m1 = parseFloat(month1);
        const m2 = parseFloat(month2);
        const m3 = parseFloat(month3);

        if (isNaN(m1) || isNaN(m2) || isNaN(m3)) {
            setForecast(null);
            return;
        }

        const average = (m1 + m2 + m3) / 3;
        setForecast(parseFloat(average.toFixed(2)));
    };

    const tryExample = () => {
        setMonth1("1200");
        setMonth2("1500");
        setMonth3("1300");

        const average = (1200 + 1500 + 1300) / 3;
        setForecast(average);
    };

    const resetFields = () => {
        setMonth1("");
        setMonth2("");
        setMonth3("");
        setForecast(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <TrendingUp className="text-green-600" />
                Demand Forecast Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Sales Period 1"
                    value={month1}
                    onChange={(e) => setMonth1(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Sales Period 2"
                    value={month2}
                    onChange={(e) => setMonth2(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Sales Period 3"
                    value={month3}
                    onChange={(e) => setMonth3(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateForecast}
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

            {forecast !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Forecasted Demand (Next Period)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {forecast} Units
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Demand Forecasting?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Demand forecasting helps businesses predict future sales
                    based on past performance data.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Forecast = (Sales1 + Sales2 + Sales3) ÷ 3
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Demand Forecasting is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Prevents overstock and stockouts</li>
                    <li>Improves cash flow planning</li>
                    <li>Optimizes supply chain</li>
                    <li>Supports business growth decisions</li>
                </ul>

            </div>
        </div>
    );
}