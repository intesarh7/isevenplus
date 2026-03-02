"use client";

import { useState } from "react";
import { Users, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function EmployeeCostCalculator() {
    const [baseSalary, setBaseSalary] = useState("");
    const [benefits, setBenefits] = useState("");
    const [bonuses, setBonuses] = useState("");
    const [employerContribution, setEmployerContribution] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");

    const [totalCost, setTotalCost] = useState<number | null>(null);

    const calculateCost = () => {
        const salary = parseFloat(baseSalary);
        const ben = parseFloat(benefits) || 0;
        const bonus = parseFloat(bonuses) || 0;
        const contribution = parseFloat(employerContribution) || 0;
        const count = parseFloat(employeeCount) || 1;

        if (isNaN(salary)) {
            setTotalCost(null);
            return;
        }

        const perEmployee = salary + ben + bonus + contribution;
        const total = perEmployee * count;

        setTotalCost(parseFloat(total.toFixed(2)));
    };

    const tryExample = () => {
        setBaseSalary("40000");
        setBenefits("5000");
        setBonuses("3000");
        setEmployerContribution("2000");
        setEmployeeCount("10");

        const perEmployee = 40000 + 5000 + 3000 + 2000;
        const total = perEmployee * 10;

        setTotalCost(total);
    };

    const resetFields = () => {
        setBaseSalary("");
        setBenefits("");
        setBonuses("");
        setEmployerContribution("");
        setEmployeeCount("");
        setTotalCost(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Users className="text-green-600" />
                Employee Cost Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Base Salary Per Employee (₹)"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Benefits (₹)"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Bonuses (₹)"
                    value={bonuses}
                    onChange={(e) => setBonuses(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Employer Contribution (₹)"
                    value={employerContribution}
                    onChange={(e) => setEmployerContribution(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Number of Employees"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCost}
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

            {totalCost !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Total Employee Cost
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {totalCost}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Employee Cost?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Employee cost includes salary, benefits, bonuses and employer contributions.
                    It represents the real financial impact of hiring staff.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Total Cost = Salary + Benefits + Bonuses + Employer Contributions
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Calculate Employee Cost?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Helps budget workforce expenses</li>
                    <li>Improves hiring decisions</li>
                    <li>Supports financial planning</li>
                    <li>Prevents underestimating payroll costs</li>
                </ul>

            </div>
        </div>
    );
}