"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function LoanPrepaymentCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [extraEMI, setExtraEMI] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateLoan = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;
        const extra = parseFloat(extraEMI || "0");

        if (!P || !r || !n) return;

        const emi =
            (P * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1);

        const totalInterest = emi * n - P;

        let balance = P;
        let months = 0;
        let totalPaid = 0;

        while (balance > 0) {
            const interest = balance * r;
            const principalPaid = emi + extra - interest;
            if (principalPaid <= 0) break;

            balance -= principalPaid;
            totalPaid += emi + extra;
            months++;
        }

        const newInterest = totalPaid - P;

        setResult({
            emi: emi.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
            interestSaved: (totalInterest - newInterest).toFixed(0),
            tenureReduced: (n - months).toFixed(0),
            newTenure: months,
        });
    };

    const tryExample = () => {
        setLoanAmount("2000000");
        setInterestRate("8");
        setTenure("20");
        setExtraEMI("2000");
    };

    const resetFields = () => {
        setLoanAmount("");
        setInterestRate("");
        setTenure("");
        setExtraEMI("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Loan Prepayment Calculator (Extra EMI Impact)
            </h2>

            {/* Input Fields */}
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
                    placeholder="Extra EMI per Month (₹)"
                    value={extraEMI}
                    onChange={(e) => setExtraEMI(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateLoan}
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

            {/* Result Section */}
            {result && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl">
                    <p><strong>Monthly EMI:</strong> ₹{result.emi}</p>
                    <p><strong>Total Interest (Normal):</strong> ₹{result.totalInterest}</p>
                    <p className="text-green-600 font-semibold">
                        Interest Saved: ₹{result.interestSaved}
                    </p>
                    <p className="text-blue-600 font-semibold">
                        Tenure Reduced: {result.tenureReduced} months
                    </p>
                    <p><strong>New Loan Duration:</strong> {result.newTenure} months</p>
                </div>
            )}

             
                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Loan Prepayment Calculator – Reduce Your Loan Faster
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        The iSevenPlus Loan Prepayment Calculator helps you understand how paying extra EMI
                        every month can significantly reduce your total interest burden and shorten your loan tenure.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                        What is Loan Prepayment?
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Loan prepayment means paying additional money toward your loan principal
                        apart from your regular EMI. This reduces outstanding principal faster
                        and saves a large amount of interest over time.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                        Benefits of Paying Extra EMI
                    </h3>

                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Lower total interest paid</li>
                        <li>Shorter loan duration</li>
                        <li>Faster debt freedom</li>
                        <li>Better financial planning</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                        Why Use iSevenPlus Calculator?
                    </h3>

                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Accurate EMI calculation formula</li>
                        <li>Instant results</li>
                        <li>Mobile responsive design</li>
                        <li>Free and secure usage</li>
                    </ul>

                </div>
 
        </div>
    );
}