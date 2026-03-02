"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function HomeLoanEMICalculator() {

    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [processingFee, setProcessingFee] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateEMI = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;
        const fee = parseFloat(processingFee || "0");

        if (!P || !r || !n) return;

        const emi =
            (P * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1);

        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;
        const totalCost = totalPayment + fee;

        setResult({
            emi: emi.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
            totalPayment: totalPayment.toFixed(0),
            totalCost: totalCost.toFixed(0)
        });
    };

    const tryExample = () => {
        setLoanAmount("3000000");
        setInterestRate("8.5");
        setTenure("20");
        setProcessingFee("15000");
    };

    const resetFields = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setProcessingFee("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Home Loan EMI Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    placeholder="Loan Amount (₹)"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
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

                <input
                    type="number"
                    placeholder="Processing Fee (₹)"
                    value={processingFee}
                    onChange={(e) => setProcessingFee(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateEMI}
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

            {/* Results */}
            {result && (
                <div className="mt-8 bg-green-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p><strong>Monthly EMI:</strong> ₹{result.emi}</p>
                    <p><strong>Total Interest Payable:</strong> ₹{result.totalInterest}</p>
                    <p><strong>Total Repayment (Principal + Interest):</strong> ₹{result.totalPayment}</p>
                    <p className="text-green-600 font-semibold">
                        Total Cost Including Processing Fee: ₹{result.totalCost}
                    </p>
                </div>
            )}

            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Home Loan EMI Calculator – Plan Your Dream Home Smartly
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Home Loan EMI Calculator helps you calculate your monthly EMI,
                    total interest payable and total repayment before applying for a housing loan.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    How EMI is Calculated
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    EMI is calculated using a standard amortization formula based on principal,
                    interest rate and loan tenure.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Benefits of Using This Calculator
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Understand exact EMI amount</li>
                    <li>Compare different tenures</li>
                    <li>Estimate total interest burden</li>
                    <li>Better financial planning</li>
                </ul>

            </section>

        </div>
    );
}