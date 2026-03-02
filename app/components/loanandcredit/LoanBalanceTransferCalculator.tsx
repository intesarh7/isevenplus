"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function LoanBalanceTransferCalculator() {

    const [outstanding, setOutstanding] = useState("");
    const [currentRate, setCurrentRate] = useState("");
    const [newRate, setNewRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [charges, setCharges] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const P = parseFloat(outstanding);
        const r1 = parseFloat(currentRate) / 12 / 100;
        const r2 = parseFloat(newRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;
        const fee = parseFloat(charges || "0");

        if (!P || !r1 || !r2 || !n) return;

        const emiCurrent =
            (P * r1 * Math.pow(1 + r1, n)) /
            (Math.pow(1 + r1, n) - 1);

        const emiNew =
            (P * r2 * Math.pow(1 + r2, n)) /
            (Math.pow(1 + r2, n) - 1);

        const totalInterestCurrent = emiCurrent * n - P;
        const totalInterestNew = emiNew * n - P;

        const totalSavings = totalInterestCurrent - totalInterestNew;
        const netSavings = totalSavings - fee;

        setResult({
            emiCurrent: emiCurrent.toFixed(0),
            emiNew: emiNew.toFixed(0),
            totalSavings: totalSavings.toFixed(0),
            netSavings: netSavings.toFixed(0),
        });
    };

    const tryExample = () => {
        setOutstanding("1000000");
        setCurrentRate("12");
        setNewRate("10");
        setTenure("5");
        setCharges("15000");
    };

    const resetFields = () => {
        setOutstanding("");
        setCurrentRate("");
        setNewRate("");
        setTenure("");
        setCharges("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Loan Balance Transfer Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input type="number" placeholder="Outstanding Loan Amount (₹)"
                    value={outstanding}
                    onChange={(e) => setOutstanding(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Current Interest Rate (%)"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="New Interest Rate (%)"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Remaining Tenure (Years)"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Transfer Charges / Processing Fee (₹)"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
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
                <div className="mt-8 bg-green-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p><strong>Current EMI:</strong> ₹{result.emiCurrent}</p>
                    <p><strong>New EMI:</strong> ₹{result.emiNew}</p>
                    <p className="text-green-600 font-semibold">
                        Total Interest Savings: ₹{result.totalSavings}
                    </p>
                    <p className="text-blue-600 font-semibold">
                        Net Savings After Charges: ₹{result.netSavings}
                    </p>
                </div>
            )}
            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Loan Balance Transfer Calculator – Reduce Your Interest Burden
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Loan Balance Transfer Calculator helps you determine whether
                    switching your loan to a lower interest rate lender can save you money.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    When Should You Transfer a Loan?
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>When new interest rates are lower</li>
                    <li>If EMI burden is high</li>
                    <li>When tenure is long enough to benefit</li>
                    <li>After calculating processing costs</li>
                </ul>

            </section>
        </div>
    );
}