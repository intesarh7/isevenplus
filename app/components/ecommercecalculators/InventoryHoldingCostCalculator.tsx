"use client";

import { useState } from "react";
import { Archive, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function InventoryHoldingCostCalculator() {
    const [costPerUnit, setCostPerUnit] = useState("");
    const [averageUnits, setAverageUnits] = useState("");
    const [holdingRate, setHoldingRate] = useState("");

    const [holdingCost, setHoldingCost] = useState<number | null>(null);

    const calculateHoldingCost = () => {
        const cost = parseFloat(costPerUnit);
        const units = parseFloat(averageUnits);
        const rate = parseFloat(holdingRate);

        if (isNaN(cost) || isNaN(units) || isNaN(rate)) {
            setHoldingCost(null);
            return;
        }

        const averageInventoryValue = cost * units;
        const totalHoldingCost = (averageInventoryValue * rate) / 100;

        setHoldingCost(parseFloat(totalHoldingCost.toFixed(2)));
    };

    const tryExample = () => {
        setCostPerUnit("800");
        setAverageUnits("500");
        setHoldingRate("18");

        const averageInventoryValue = 800 * 500;
        const totalHoldingCost = (averageInventoryValue * 18) / 100;

        setHoldingCost(totalHoldingCost);
    };

    const resetFields = () => {
        setCostPerUnit("");
        setAverageUnits("");
        setHoldingRate("");
        setHoldingCost(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Archive className="text-green-600" />
                Inventory Holding Cost Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Cost Per Unit (₹)"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Average Units Stored"
                    value={averageUnits}
                    onChange={(e) => setAverageUnits(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Holding Cost Rate (%)"
                    value={holdingRate}
                    onChange={(e) => setHoldingRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateHoldingCost}
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

            {holdingCost !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Estimated Annual Holding Cost
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {holdingCost}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Inventory Holding Cost?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Inventory holding cost refers to the total cost of storing unsold goods,
                    including storage, insurance, damage risk and capital cost.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Holding Cost = Inventory Value × Holding Rate (%)
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Reducing Holding Cost is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improves cash flow</li>
                    <li>Reduces warehouse burden</li>
                    <li>Minimizes dead stock</li>
                    <li>Increases overall profitability</li>
                </ul>

            </div>
        </div>
    );
}