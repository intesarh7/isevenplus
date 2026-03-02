"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function CreditScoreImprovementEstimator() {

    const [currentScore, setCurrentScore] = useState("");
    const [missedPayments, setMissedPayments] = useState("");
    const [creditUtilization, setCreditUtilization] = useState("");
    const [newLoans, setNewLoans] = useState("");
    const [creditAge, setCreditAge] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateImprovement = () => {

        const score = parseInt(currentScore);
        const missed = parseInt(missedPayments || "0");
        const utilization = parseInt(creditUtilization || "0");
        const loans = parseInt(newLoans || "0");
        const age = parseInt(creditAge || "0");

        if (!score) return;

        let improvement = 0;

        // Missed payments impact
        if (missed === 0) improvement += 40;
        else if (missed <= 2) improvement += 20;

        // Credit utilization impact
        if (utilization <= 30) improvement += 50;
        else if (utilization <= 50) improvement += 25;

        // New loans impact
        if (loans === 0) improvement += 20;

        // Credit age impact
        if (age >= 5) improvement += 30;
        else if (age >= 2) improvement += 15;

        const estimatedScore = Math.min(score + improvement, 900);

        setResult({
            estimatedScore,
            possibleIncrease: estimatedScore - score
        });
    };

    const tryExample = () => {
        setCurrentScore("650");
        setMissedPayments("1");
        setCreditUtilization("40");
        setNewLoans("0");
        setCreditAge("3");
    };

    const resetFields = () => {
        setCurrentScore("");
        setMissedPayments("");
        setCreditUtilization("");
        setNewLoans("");
        setCreditAge("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Credit Score Improvement Estimator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    placeholder="Current Credit Score"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Missed Payments (Last 12 Months)"
                    value={missedPayments}
                    onChange={(e) => setMissedPayments(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Credit Utilization (%)"
                    value={creditUtilization}
                    onChange={(e) => setCreditUtilization(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="New Loans in Last 6 Months"
                    value={newLoans}
                    onChange={(e) => setNewLoans(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Credit History Age (Years)"
                    value={creditAge}
                    onChange={(e) => setCreditAge(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateImprovement}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Estimate
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
                    <p><strong>Estimated New Score:</strong> {result.estimatedScore}</p>
                    <p className="text-green-600 font-semibold">
                        Possible Increase: +{result.possibleIncrease} points
                    </p>
                </div>
            )}


            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Credit Score Improvement Estimator – Boost Your CIBIL Score
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Credit Score Improvement Estimator helps you understand
                    how improving financial habits can increase your credit score over time.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Factors That Affect Credit Score
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Payment history</li>
                    <li>Credit utilization ratio</li>
                    <li>New credit inquiries</li>
                    <li>Length of credit history</li>
                    <li>Credit mix</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Tips to Improve Your Score
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Pay EMIs and credit card bills on time</li>
                    <li>Keep credit utilization below 30%</li>
                    <li>Avoid frequent loan applications</li>
                    <li>Maintain long-term credit accounts</li>
                </ul>

            </section>
        </div>
    );
}