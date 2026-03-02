"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function PFCalculator() {

    const [basicSalary, setBasicSalary] = useState("");
    const [years, setYears] = useState("");
    const [interestRate, setInterestRate] = useState("8.15");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const salary = parseFloat(basicSalary);
        const serviceYears = parseFloat(years);
        const rate = parseFloat(interestRate) / 100;

        if (!salary || !serviceYears) return;

        const monthlyEmployee = salary * 0.12;
        const monthlyEmployer = salary * 0.12;
        const monthlyTotal = monthlyEmployee + monthlyEmployer;

        const months = serviceYears * 12;

        // Future value calculation (monthly compounding)
        const futureValue =
            monthlyTotal *
            ((Math.pow(1 + rate / 12, months) - 1) / (rate / 12));

        setResult({
            monthlyEmployee: monthlyEmployee.toFixed(0),
            monthlyEmployer: monthlyEmployer.toFixed(0),
            totalContribution: (monthlyTotal * months).toFixed(0),
            corpus: futureValue.toFixed(0),
        });
    };

    const tryExample = () => {
        setBasicSalary("30000");
        setYears("10");
        setInterestRate("8.15");
    };

    const resetFields = () => {
        setBasicSalary("");
        setYears("");
        setInterestRate("8.15");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                PF Calculator (EPF)
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    placeholder="Monthly Basic Salary (₹)"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Years of Service"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Interest Rate (%)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

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
                    <p><strong>Employee Monthly Contribution (12%):</strong> ₹{result.monthlyEmployee}</p>
                    <p><strong>Employer Monthly Contribution (12%):</strong> ₹{result.monthlyEmployer}</p>
                    <p><strong>Total Contribution Over Period:</strong> ₹{result.totalContribution}</p>
                    <p className="text-green-600 font-semibold">
                        Estimated PF Corpus with Interest: ₹{result.corpus}
                    </p>
                </div>
            )}

            <section className="mt-14">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    PF Calculator – Estimate Your EPF Corpus
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus PF Calculator helps employees calculate their monthly EPF
                    contribution and estimate the total retirement corpus with interest.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    EPF Contribution Structure
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Employee contributes 12% of Basic Salary</li>
                    <li>Employer contributes 12%</li>
                    <li>Interest rate declared annually by EPFO</li>
                </ul>
            </section>

        </div>
    );
}