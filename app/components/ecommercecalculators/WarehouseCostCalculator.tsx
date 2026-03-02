"use client";

import { useState } from "react";
import { Warehouse, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function WarehouseCostCalculator() {
    const [area, setArea] = useState("");
    const [costPerSqft, setCostPerSqft] = useState("");
    const [staffCount, setStaffCount] = useState("");
    const [salaryPerStaff, setSalaryPerStaff] = useState("");
    const [utilities, setUtilities] = useState("");
    const [otherExpenses, setOtherExpenses] = useState("");

    const [totalCost, setTotalCost] = useState<number | null>(null);

    const calculateCost = () => {
        const warehouseArea = parseFloat(area);
        const rate = parseFloat(costPerSqft);
        const staff = parseFloat(staffCount) || 0;
        const salary = parseFloat(salaryPerStaff) || 0;
        const utilityCost = parseFloat(utilities) || 0;
        const extraCost = parseFloat(otherExpenses) || 0;

        if (isNaN(warehouseArea) || isNaN(rate)) {
            setTotalCost(null);
            return;
        }

        const storageCost = warehouseArea * rate;
        const laborCost = staff * salary;

        const total = storageCost + laborCost + utilityCost + extraCost;

        setTotalCost(parseFloat(total.toFixed(2)));
    };

    const tryExample = () => {
        setArea("2000");
        setCostPerSqft("25");
        setStaffCount("5");
        setSalaryPerStaff("15000");
        setUtilities("20000");
        setOtherExpenses("10000");

        const storageCost = 2000 * 25;
        const laborCost = 5 * 15000;
        const total = storageCost + laborCost + 20000 + 10000;

        setTotalCost(total);
    };

    const resetFields = () => {
        setArea("");
        setCostPerSqft("");
        setStaffCount("");
        setSalaryPerStaff("");
        setUtilities("");
        setOtherExpenses("");
        setTotalCost(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Warehouse className="text-green-600" />
                Warehouse Cost Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Warehouse Area (Sqft)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Cost Per Sqft (₹)"
                    value={costPerSqft}
                    onChange={(e) => setCostPerSqft(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Number of Staff"
                    value={staffCount}
                    onChange={(e) => setStaffCount(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Salary Per Staff (₹)"
                    value={salaryPerStaff}
                    onChange={(e) => setSalaryPerStaff(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Monthly Utilities (₹)"
                    value={utilities}
                    onChange={(e) => setUtilities(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Other Expenses (₹)"
                    value={otherExpenses}
                    onChange={(e) => setOtherExpenses(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
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
                        Estimated Monthly Warehouse Cost
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {totalCost}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Warehouse Cost is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Warehouse cost includes storage rent, staff salaries,
                    utilities and other operational expenses.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Total Cost = Storage + Labor + Utilities + Other Expenses
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Tracking Warehouse Cost is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improves operational efficiency</li>
                    <li>Optimizes profit margins</li>
                    <li>Reduces unnecessary expenses</li>
                    <li>Supports long-term scaling</li>
                </ul>

            </div>
        </div>
    );
}