"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle, Sigma } from "lucide-react";

export default function EOQCalculator() {
    const [annualDemand, setAnnualDemand] = useState("");
    const [orderingCost, setOrderingCost] = useState("");
    const [holdingCost, setHoldingCost] = useState("");

    const [eoq, setEoq] = useState<number | null>(null);

    const calculateEOQ = () => {
        const D = parseFloat(annualDemand);
        const S = parseFloat(orderingCost);
        const H = parseFloat(holdingCost);

        if (isNaN(D) || isNaN(S) || isNaN(H) || H === 0) {
            setEoq(null);
            return;
        }

        const result = Math.sqrt((2 * D * S) / H);
        setEoq(parseFloat(result.toFixed(2)));
    };

    const tryExample = () => {
        setAnnualDemand("10000");
        setOrderingCost("500");
        setHoldingCost("20");

        const result = Math.sqrt((2 * 10000 * 500) / 20);
        setEoq(parseFloat(result.toFixed(2)));
    };

    const resetFields = () => {
        setAnnualDemand("");
        setOrderingCost("");
        setHoldingCost("");
        setEoq(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Sigma className="text-green-600" />
                Economic Order Quantity (EOQ) Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Annual Demand (Units)"
                    value={annualDemand}
                    onChange={(e) => setAnnualDemand(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Ordering Cost Per Order (₹)"
                    value={orderingCost}
                    onChange={(e) => setOrderingCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Holding Cost Per Unit Per Year (₹)"
                    value={holdingCost}
                    onChange={(e) => setHoldingCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateEOQ}
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

            {eoq !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Optimal Order Quantity (EOQ)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {eoq} Units
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Economic Order Quantity (EOQ)?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    EOQ is the optimal order quantity that minimizes total inventory costs,
                    including ordering and holding costs.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    EOQ = √((2 × Demand × Ordering Cost) ÷ Holding Cost)
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why EOQ is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Reduces total inventory cost</li>
                    <li>Optimizes warehouse efficiency</li>
                    <li>Improves cash flow management</li>
                    <li>Supports long-term scaling strategy</li>
                </ul>

            </div>
        </div>
    );
}