"use client";

import { useState } from "react";
import { Laptop, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function FreelancerHourlyRateCalculator() {
    const [targetIncome, setTargetIncome] = useState("");
    const [annualExpenses, setAnnualExpenses] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("");
    const [workingWeeks, setWorkingWeeks] = useState("");

    const [hourlyRate, setHourlyRate] = useState<number | null>(null);

    const calculateRate = () => {
        const income = parseFloat(targetIncome);
        const expenses = parseFloat(annualExpenses) || 0;
        const hours = parseFloat(hoursPerWeek);
        const weeks = parseFloat(workingWeeks);

        if (isNaN(income) || isNaN(hours) || isNaN(weeks) || hours === 0 || weeks === 0) {
            setHourlyRate(null);
            return;
        }

        const billableHours = hours * weeks;
        const requiredRate = (income + expenses) / billableHours;

        setHourlyRate(parseFloat(requiredRate.toFixed(2)));
    };

    const tryExample = () => {
        setTargetIncome("1200000");
        setAnnualExpenses("200000");
        setHoursPerWeek("25");
        setWorkingWeeks("48");

        const billableHours = 25 * 48;
        const requiredRate = (1200000 + 200000) / billableHours;

        setHourlyRate(parseFloat(requiredRate.toFixed(2)));
    };

    const resetFields = () => {
        setTargetIncome("");
        setAnnualExpenses("");
        setHoursPerWeek("");
        setWorkingWeeks("");
        setHourlyRate(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Laptop className="text-green-600" />
                Freelancer Hourly Rate Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Target Annual Income (₹)"
                    value={targetIncome}
                    onChange={(e) => setTargetIncome(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Annual Expenses (₹)"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Billable Hours Per Week"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Working Weeks Per Year"
                    value={workingWeeks}
                    onChange={(e) => setWorkingWeeks(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateRate}
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

            {hourlyRate !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Recommended Hourly Rate
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {hourlyRate} / hour
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How to Calculate Your Freelance Hourly Rate?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    To determine your ideal freelance rate, add your desired income
                    and annual expenses, then divide by total billable hours.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Hourly Rate = (Income Goal + Expenses) ÷ Billable Hours
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Setting the Right Rate is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Ensures sustainable income</li>
                    <li>Covers business expenses</li>
                    <li>Prevents underpricing services</li>
                    <li>Supports long-term career growth</li>
                </ul>

            </div>
        </div>
    );
}