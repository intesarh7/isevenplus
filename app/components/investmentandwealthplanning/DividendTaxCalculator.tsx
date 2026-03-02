"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function DividendTaxCalculator() {
    const [dividend, setDividend] = useState("");
    const [taxSlab, setTaxSlab] = useState("0.30");
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const income = parseFloat(dividend);
        const slab = parseFloat(taxSlab);

        if (!income) return;

        const incomeTax = income * slab;

        // Basic TDS logic (India example: 10% if dividend > 5000)
        const tds = income > 5000 ? income * 0.10 : 0;

        const netIncome = income - incomeTax;

        setResult({
            incomeTax: incomeTax.toFixed(0),
            tds: tds.toFixed(0),
            netIncome: netIncome.toFixed(0),
        });
    };

    const tryExample = () => {
        setDividend("50000");
        setTaxSlab("0.30");
    };

    const resetFields = () => {
        setDividend("");
        setTaxSlab("0.30");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Dividend Tax Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Total Dividend Income (₹)
                    </label>
                    <input
                        type="number"
                        value={dividend}
                        onChange={(e) => setDividend(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter dividend amount"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Select Income Tax Slab
                    </label>
                    <select
                        value={taxSlab}
                        onChange={(e) => setTaxSlab(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="0.05">5%</option>
                        <option value="0.10">10%</option>
                        <option value="0.20">20%</option>
                        <option value="0.30">30%</option>
                    </select>
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateTax}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Tax
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
                <div className="mt-10 p-6 bg-green-50 border rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Tax Summary</h3>

                    <p>Income Tax: ₹ {Number(result.incomeTax).toLocaleString()}</p>
                    <p>TDS Deducted (10% rule): ₹ {Number(result.tds).toLocaleString()}</p>
                    <p className="font-bold text-lg">
                        Net Dividend After Tax: ₹ {Number(result.netIncome).toLocaleString()}
                    </p>
                </div>
            )}

            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    How Dividend Tax Works in India?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Dividend income is taxable as per your income tax slab. After the removal
                    of Dividend Distribution Tax (DDT), investors must pay tax on dividend
                    income according to their applicable tax rate.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    TDS on Dividend
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    If dividend income exceeds ₹5,000 in a financial year, companies may
                    deduct 10% TDS before payment. You can adjust this while filing income tax return.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Dividend Tax Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator helps investors estimate tax liability on dividend income
                    instantly. It supports financial planning and helps you understand your
                    net income after tax deductions.
                </p>

            </div>
        </div>
    );
}