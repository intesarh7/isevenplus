"use client";

import { useState } from "react";
import { Boxes, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function InventoryRestockCalculator() {
    const [dailySales, setDailySales] = useState("");
    const [leadTime, setLeadTime] = useState("");
    const [safetyStock, setSafetyStock] = useState("");
    const [currentStock, setCurrentStock] = useState("");

    const [reorderPoint, setReorderPoint] = useState<number | null>(null);
    const [restockQty, setRestockQty] = useState<number | null>(null);

    const calculateRestock = () => {
        const sales = parseFloat(dailySales);
        const lead = parseFloat(leadTime);
        const safety = parseFloat(safetyStock) || 0;
        const stock = parseFloat(currentStock) || 0;

        if (isNaN(sales) || isNaN(lead)) {
            setReorderPoint(null);
            return;
        }

        const reorder = sales * lead + safety;
        const restock = reorder - stock;

        setReorderPoint(parseFloat(reorder.toFixed(2)));
        setRestockQty(parseFloat(restock.toFixed(2)));
    };

    const tryExample = () => {
        setDailySales("20");
        setLeadTime("7");
        setSafetyStock("50");
        setCurrentStock("60");

        const reorder = 20 * 7 + 50;
        const restock = reorder - 60;

        setReorderPoint(reorder);
        setRestockQty(restock);
    };

    const resetFields = () => {
        setDailySales("");
        setLeadTime("");
        setSafetyStock("");
        setCurrentStock("");
        setReorderPoint(null);
        setRestockQty(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Boxes className="text-green-600" />
                Inventory Restock Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Average Daily Sales (Units)"
                    value={dailySales}
                    onChange={(e) => setDailySales(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Lead Time (Days)"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Safety Stock (Units)"
                    value={safetyStock}
                    onChange={(e) => setSafetyStock(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Current Stock (Units)"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateRestock}
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

            {reorderPoint !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Reorder Point: {reorderPoint} Units
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Recommended Restock Quantity: {restockQty} Units
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Reorder Point?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Reorder point is the inventory level at which you need to place
                    a new order to avoid stockouts.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Reorder Point = (Daily Sales × Lead Time) + Safety Stock
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Inventory Planning is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Prevents stock shortages</li>
                    <li>Reduces overstock risk</li>
                    <li>Improves cash flow management</li>
                    <li>Optimizes supply chain efficiency</li>
                </ul>

            </div>
        </div>
    );
}