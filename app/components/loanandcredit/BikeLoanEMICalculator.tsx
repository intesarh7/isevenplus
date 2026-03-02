"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function BikeLoanEMICalculator() {

    const [bikePrice, setBikePrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateEMI = () => {

        const price = parseFloat(bikePrice);
        const down = parseFloat(downPayment || "0");
        const P = price - down;
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (!price || !r || !n || P <= 0) return;

        const emi =
            (P * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1);

        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        setResult({
            loanAmount: P.toFixed(0),
            emi: emi.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
            totalPayment: totalPayment.toFixed(0),
        });
    };

    const tryExample = () => {
        setBikePrice("120000");
        setDownPayment("20000");
        setInterestRate("10");
        setTenure("3");
    };

    const resetFields = () => {
        setBikePrice("");
        setDownPayment("");
        setInterestRate("");
        setTenure("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Bike Loan EMI Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    placeholder="Bike Price (₹)"
                    value={bikePrice}
                    onChange={(e) => setBikePrice(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Down Payment (₹)"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
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

            {result && (
                <div className="mt-8 bg-green-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p><strong>Loan Amount:</strong> ₹{result.loanAmount}</p>
                    <p><strong>Monthly EMI:</strong> ₹{result.emi}</p>
                    <p><strong>Total Interest:</strong> ₹{result.totalInterest}</p>
                    <p className="text-green-600 font-semibold">
                        Total Payment: ₹{result.totalPayment}
                    </p>
                </div>
            )}
            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Bike Loan EMI Calculator – Plan Your Two-Wheeler Purchase
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Bike Loan EMI Calculator helps you calculate your monthly EMI,
                    total interest payable and overall repayment before purchasing a two-wheeler.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Why Use This Calculator?
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Know your EMI before applying</li>
                    <li>Compare different tenure options</li>
                    <li>Plan down payment smartly</li>
                    <li>Avoid financial stress</li>
                </ul>

            </section>
        </div>
    );
}