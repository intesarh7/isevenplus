"use client";

import { useState } from "react";
import { Clock, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function OvertimeCalculator() {
    const [hourlyRate, setHourlyRate] = useState("");
    const [overtimeHours, setOvertimeHours] = useState("");
    const [multiplier, setMultiplier] = useState("1.5");

    const [overtimePay, setOvertimePay] = useState<number | null>(null);

    const calculateOvertime = () => {
        const rate = parseFloat(hourlyRate);
        const hours = parseFloat(overtimeHours);
        const multi = parseFloat(multiplier);

        if (isNaN(rate) || isNaN(hours) || isNaN(multi)) {
            setOvertimePay(null);
            return;
        }

        const pay = rate * hours * multi;
        setOvertimePay(parseFloat(pay.toFixed(2)));
    };

    const tryExample = () => {
        setHourlyRate("500");
        setOvertimeHours("10");
        setMultiplier("2");

        const pay = 500 * 10 * 2;
        setOvertimePay(pay);
    };

    const resetFields = () => {
        setHourlyRate("");
        setOvertimeHours("");
        setMultiplier("1.5");
        setOvertimePay(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Clock className="text-green-600" />
                Overtime Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Hourly Rate (₹)"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Overtime Hours"
                    value={overtimeHours}
                    onChange={(e) => setOvertimeHours(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    step="0.1"
                    placeholder="Overtime Multiplier (e.g., 1.5 or 2)"
                    value={multiplier}
                    onChange={(e) => setMultiplier(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateOvertime}
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

            {overtimePay !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Total Overtime Pay
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {overtimePay}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Overtime Pay is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Overtime pay is calculated by multiplying overtime hours
                    with hourly wage and overtime rate multiplier.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Overtime Pay = Hourly Rate × Overtime Hours × Multiplier
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why This Calculator is Useful?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Helps HR calculate payroll accurately</li>
                    <li>Ensures legal wage compliance</li>
                    <li>Tracks extra working hours</li>
                    <li>Supports financial planning</li>
                </ul>

            </div>
        </div>
    );
}