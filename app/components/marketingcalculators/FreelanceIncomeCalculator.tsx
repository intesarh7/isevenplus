"use client";

import { useState } from "react";
import { Briefcase, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function FreelanceIncomeCalculator() {
    const [hourlyRate, setHourlyRate] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateIncome = () => {
        const rate = parseFloat(hourlyRate);
        const hours = parseFloat(hoursPerWeek);

        if (!rate || !hours) {
            setResult(null);
            return;
        }

        const monthlyIncome = rate * hours * 4;
        setResult(parseFloat(monthlyIncome.toFixed(2)));
    };

    const tryExample = () => {
        setHourlyRate("800");
        setHoursPerWeek("25");
        setResult(800 * 25 * 4);
    };

    const resetFields = () => {
        setHourlyRate("");
        setHoursPerWeek("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Briefcase className="text-green-600" />
                Freelance Income Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Hourly Rate (₹)
                    </label>
                    <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="Enter hourly rate"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Hours Per Week
                    </label>
                    <input
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="Enter weekly hours"
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
                        Estimated Monthly Freelance Income
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Freelance Income is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Freelancers typically charge an hourly rate. Monthly income depends on how many hours they work each week.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Monthly Income = Hourly Rate × Hours Per Week × 4
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase Freelance Income
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Increase your hourly rate gradually</li>
                    <li>Improve skills and specialization</li>
                    <li>Build strong client relationships</li>
                    <li>Offer premium service packages</li>
                </ul>

            </div>
        </div>
    );
}