"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function SWPCalculator() {
    const [investment, setInvestment] = useState("");
    const [withdrawal, setWithdrawal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateSWP = () => {
        const P = parseFloat(investment);
        const W = parseFloat(withdrawal);
        const r = parseFloat(rate) / 100 / 12;
        const t = parseFloat(years) * 12;

        if (!P || !W || !r || !t) return;

        let balance = P;
        let totalWithdrawn = 0;

        for (let month = 1; month <= t; month++) {
            balance = balance * (1 + r);
            balance -= W;

            if (balance <= 0) {
                balance = 0;
                totalWithdrawn += W;
                break;
            }

            totalWithdrawn += W;
        }

        setResult({
            finalBalance: balance.toFixed(0),
            withdrawn: totalWithdrawn.toFixed(0),
        });
    };

    const tryExample = () => {
        setInvestment("1000000");
        setWithdrawal("10000");
        setRate("8");
        setYears("15");
    };

    const resetFields = () => {
        setInvestment("");
        setWithdrawal("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                SWP Calculator (Systematic Withdrawal Plan)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Initial Investment (₹)
                    </label>
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter initial corpus"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Monthly Withdrawal (₹)
                    </label>
                    <input
                        type="number"
                        value={withdrawal}
                        onChange={(e) => setWithdrawal(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter withdrawal amount"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Expected Annual Return (%)
                    </label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter annual return"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Withdrawal Duration (Years)
                    </label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter years"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateSWP}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Check Withdrawal Plan
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
                    <h3 className="text-xl font-semibold mb-4">Withdrawal Summary</h3>

                    <p>Total Withdrawn: ₹ {Number(result.withdrawn).toLocaleString()}</p>
                    <p className="font-bold text-lg">
                        Remaining Balance: ₹ {Number(result.finalBalance).toLocaleString()}
                    </p>
                </div>
            )}
            {/* SEO CONTENT SECTION */}
            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is SWP (Systematic Withdrawal Plan)?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    A Systematic Withdrawal Plan (SWP) allows investors to withdraw a fixed
                    amount regularly from their mutual fund investment while the remaining
                    corpus continues to earn returns. It is commonly used for retirement
                    income planning.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    How SWP Works
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    In SWP, you invest a lump sum amount and withdraw a fixed monthly
                    amount. The remaining balance keeps growing based on the expected
                    annual return rate. This helps maintain regular cash flow while
                    preserving capital.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Benefits of SWP
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Regular income stream</li>
                    <li>Tax-efficient withdrawal option</li>
                    <li>Capital preservation</li>
                    <li>Ideal for retirement planning</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus SWP Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our SWP Calculator helps you estimate how long your investment will last,
                    total withdrawn amount, and remaining corpus. It supports better financial
                    planning and retirement income management.
                </p>

            </div>
        </div>
    );
}