"use client";

import { useState } from "react";
import { Gift, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function BonusCalculator() {
    const [basicSalary, setBasicSalary] = useState("");
    const [bonusRate, setBonusRate] = useState("");

    const [bonusAmount, setBonusAmount] = useState<number | null>(null);
    const [totalSalary, setTotalSalary] = useState<number | null>(null);

    const calculateBonus = () => {
        const salary = parseFloat(basicSalary);
        const rate = parseFloat(bonusRate);

        if (isNaN(salary) || isNaN(rate)) {
            setBonusAmount(null);
            return;
        }

        const bonus = (salary * rate) / 100;
        const total = salary + bonus;

        setBonusAmount(parseFloat(bonus.toFixed(2)));
        setTotalSalary(parseFloat(total.toFixed(2)));
    };

    const tryExample = () => {
        setBasicSalary("60000");
        setBonusRate("15");

        const bonus = (60000 * 15) / 100;
        const total = 60000 + bonus;

        setBonusAmount(bonus);
        setTotalSalary(total);
    };

    const resetFields = () => {
        setBasicSalary("");
        setBonusRate("");
        setBonusAmount(null);
        setTotalSalary(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Gift className="text-green-600" />
                Bonus Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Basic Salary (₹)"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Bonus Percentage (%)"
                    value={bonusRate}
                    onChange={(e) => setBonusRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateBonus}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} /> Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {bonusAmount !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Bonus Amount: ₹ {bonusAmount}
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Total Salary After Bonus: ₹ {totalSalary}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Bonus is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Bonus is usually calculated as a percentage of the employee’s
                    basic salary and added to the total compensation.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Bonus = Basic Salary × Bonus %
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use a Bonus Calculator?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Ensures accurate bonus calculation</li>
                    <li>Helps HR in payroll processing</li>
                    <li>Supports performance-based rewards</li>
                    <li>Improves salary transparency</li>
                </ul>

            </div>
        </div>
    );
}