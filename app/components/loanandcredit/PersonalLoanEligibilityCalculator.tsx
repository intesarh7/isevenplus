"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function PersonalLoanEligibilityCalculator() {

    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [existingEMI, setExistingEMI] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateEligibility = () => {
        const income = parseFloat(monthlyIncome);
        const emiExisting = parseFloat(existingEMI || "0");
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (!income || !r || !n) return;

        // Banks usually allow 50-60% FOIR (Fixed Obligation to Income Ratio)
        const maxAllowedEMI = income * 0.6 - emiExisting;

        if (maxAllowedEMI <= 0) {
            setResult({
                eligibleAmount: 0,
                maxEMI: 0,
            });
            return;
        }

        const eligibleLoan =
            (maxAllowedEMI * (Math.pow(1 + r, n) - 1)) /
            (r * Math.pow(1 + r, n));

        setResult({
            eligibleAmount: eligibleLoan.toFixed(0),
            maxEMI: maxAllowedEMI.toFixed(0),
        });
    };

    const tryExample = () => {
        setMonthlyIncome("60000");
        setExistingEMI("10000");
        setInterestRate("12");
        setTenure("5");
    };

    const resetFields = () => {
        setMonthlyIncome("");
        setExistingEMI("");
        setInterestRate("");
        setTenure("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Personal Loan Eligibility Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-5">
                <input
                    type="number"
                    placeholder="Monthly Income (₹)"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Existing EMI (₹)"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Loan Tenure (Years)"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateEligibility}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate
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

            {/* Result */}
            {result && (
                <div className="mt-8 bg-green-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p><strong>Maximum EMI You Can Pay:</strong> ₹{result.maxEMI}</p>
                    <p className="text-green-600 font-semibold">
                        Eligible Loan Amount: ₹{result.eligibleAmount}
                    </p>
                </div>
            )}
            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Personal Loan Eligibility Calculator – Check Your Loan Capacity
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Personal Loan Eligibility Calculator helps you determine
                    the maximum loan amount you can get based on your income, existing EMIs,
                    interest rate and loan tenure.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    How Banks Decide Eligibility
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    Banks use FOIR (Fixed Obligation to Income Ratio), usually 50% to 60%.
                    This means your total EMIs should not exceed 60% of your monthly income.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Factors That Affect Eligibility
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Monthly income</li>
                    <li>Existing EMIs</li>
                    <li>Credit score</li>
                    <li>Interest rate</li>
                    <li>Loan tenure</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Why Use iSevenPlus Calculator?
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Instant and accurate calculation</li>
                    <li>Mobile-friendly design</li>
                    <li>Free to use</li>
                    <li>No registration required</li>
                </ul>

            </section>
        </div>
    );
}