"use client";

import { useState } from "react";
import { RefreshCw, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function InventoryTurnoverCalculatorITR() {
    const [cogs, setCogs] = useState("");
    const [openingStock, setOpeningStock] = useState("");
    const [closingStock, setClosingStock] = useState("");

    const [turnoverRatio, setTurnoverRatio] = useState<number | null>(null);

    const calculateTurnover = () => {
        const totalCogs = parseFloat(cogs);
        const opening = parseFloat(openingStock);
        const closing = parseFloat(closingStock);

        if (isNaN(totalCogs) || isNaN(opening) || isNaN(closing)) {
            setTurnoverRatio(null);
            return;
        }

        const averageInventory = (opening + closing) / 2;

        if (averageInventory === 0) {
            setTurnoverRatio(null);
            return;
        }

        const ratio = totalCogs / averageInventory;
        setTurnoverRatio(parseFloat(ratio.toFixed(2)));
    };

    const tryExample = () => {
        setCogs("500000");
        setOpeningStock("80000");
        setClosingStock("120000");

        const averageInventory = (80000 + 120000) / 2;
        const ratio = 500000 / averageInventory;

        setTurnoverRatio(parseFloat(ratio.toFixed(2)));
    };

    const resetFields = () => {
        setCogs("");
        setOpeningStock("");
        setClosingStock("");
        setTurnoverRatio(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <RefreshCw className="text-green-600" />
                Inventory Turnover Ratio Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Cost of Goods Sold (₹)"
                    value={cogs}
                    onChange={(e) => setCogs(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Opening Stock Value (₹)"
                    value={openingStock}
                    onChange={(e) => setOpeningStock(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Closing Stock Value (₹)"
                    value={closingStock}
                    onChange={(e) => setClosingStock(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateTurnover}
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

            {turnoverRatio !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Inventory Turnover Ratio
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {turnoverRatio} Times
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Inventory Turnover Ratio?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Inventory turnover ratio measures how efficiently a business
                    sells and replaces its inventory during a specific period.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Turnover Ratio = COGS ÷ Average Inventory
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why It Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Indicates sales performance</li>
                    <li>Helps reduce dead stock</li>
                    <li>Improves cash flow management</li>
                    <li>Optimizes purchasing decisions</li>
                </ul>

            </div>

        </div>
    );
}