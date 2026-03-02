"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function Section80CCalculator() {

    const [epf, setEpf] = useState("");
    const [ppf, setPpf] = useState("");
    const [elss, setElss] = useState("");
    const [insurance, setInsurance] = useState("");
    const [homeLoan, setHomeLoan] = useState("");
    const [tuition, setTuition] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const total =
            parseFloat(epf || "0") +
            parseFloat(ppf || "0") +
            parseFloat(elss || "0") +
            parseFloat(insurance || "0") +
            parseFloat(homeLoan || "0") +
            parseFloat(tuition || "0");

        const maxDeduction = Math.min(total, 150000);

        setResult({
            totalInvestment: total.toFixed(0),
            eligibleDeduction: maxDeduction.toFixed(0),
            excess: total > 150000 ? (total - 150000).toFixed(0) : "0"
        });
    };

    const tryExample = () => {
        setEpf("60000");
        setPpf("30000");
        setElss("25000");
        setInsurance("20000");
        setHomeLoan("30000");
        setTuition("15000");
    };

    const resetFields = () => {
        setEpf("");
        setPpf("");
        setElss("");
        setInsurance("");
        setHomeLoan("");
        setTuition("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Section 80C Deduction Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input type="number" placeholder="EPF Contribution (₹)"
                    value={epf}
                    onChange={(e) => setEpf(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="PPF Investment (₹)"
                    value={ppf}
                    onChange={(e) => setPpf(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="ELSS Investment (₹)"
                    value={elss}
                    onChange={(e) => setElss(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Life Insurance Premium (₹)"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Home Loan Principal (₹)"
                    value={homeLoan}
                    onChange={(e) => setHomeLoan(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Tuition Fees (₹)"
                    value={tuition}
                    onChange={(e) => setTuition(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculate}
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

            {result && (
                <div className="mt-8 bg-gray-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p><strong>Total Investment:</strong> ₹{result.totalInvestment}</p>
                    <p className="text-green-600 font-semibold">
                        Eligible Deduction (Max ₹1.5L): ₹{result.eligibleDeduction}
                    </p>
                    {result.excess !== "0" && (
                        <p className="text-red-600">
                            Excess Investment (Not Eligible): ₹{result.excess}
                        </p>
                    )}
                </div>
            )}

            <section className="mt-14">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Section 80C Calculator – Maximize Your Tax Savings
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    Section 80C of the Income Tax Act allows individuals to claim
                    deductions up to ₹1,50,000 per financial year on eligible investments.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Eligible Investments Under 80C
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>EPF (Employee Provident Fund)</li>
                    <li>PPF (Public Provident Fund)</li>
                    <li>ELSS Mutual Funds</li>
                    <li>Life Insurance Premium</li>
                    <li>Home Loan Principal Repayment</li>
                    <li>Children’s Tuition Fees</li>
                </ul>
            </section>

        </div>
    );
}