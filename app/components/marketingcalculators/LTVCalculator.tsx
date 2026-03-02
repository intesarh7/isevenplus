"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function LTVCalculator() {

    const [averagePurchaseValue, setAveragePurchaseValue] = useState("");
    const [purchaseFrequency, setPurchaseFrequency] = useState("");
    const [customerLifespan, setCustomerLifespan] = useState("");

    const [ltv, setLtv] = useState<number | null>(null);

    const calculateLTV = () => {
        const apv = parseFloat(averagePurchaseValue);
        const frequency = parseFloat(purchaseFrequency);
        const lifespan = parseFloat(customerLifespan);

        if (!apv || !frequency || !lifespan) return;

        const result = apv * frequency * lifespan;
        setLtv(result);
    };

    const tryExample = () => {
        setAveragePurchaseValue("2000");
        setPurchaseFrequency("5");
        setCustomerLifespan("3");
    };

    const resetFields = () => {
        setAveragePurchaseValue("");
        setPurchaseFrequency("");
        setCustomerLifespan("");
        setLtv(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                Customer Lifetime Value (LTV) Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">
                        Average Purchase Value (₹)
                    </label>
                    <input
                        type="number"
                        value={averagePurchaseValue}
                        onChange={(e) => setAveragePurchaseValue(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Purchase Frequency (per year)
                    </label>
                    <input
                        type="number"
                        value={purchaseFrequency}
                        onChange={(e) => setPurchaseFrequency(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Customer Lifespan (years)
                    </label>
                    <input
                        type="number"
                        value={customerLifespan}
                        onChange={(e) => setCustomerLifespan(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateLTV}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate LTV
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

            {ltv !== null && (
                <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">
                        LTV Result
                    </h3>

                    <p>
                        Customer Lifetime Value (LTV): 
                        <strong> ₹{ltv.toFixed(2)}</strong>
                    </p>
                </div>
            )}

            {/* SEO Section */}
            <div className="mt-12 space-y-6 text-gray-700">

                <h2 className="text-2xl font-bold">
                    What is Customer Lifetime Value (LTV)?
                </h2>
                <p>
                    Customer Lifetime Value (LTV) represents the total revenue
                    a business can expect from a single customer over the
                    entire duration of their relationship.
                </p>

                <h2 className="text-2xl font-bold">
                    LTV Formula
                </h2>
                <p>
                    <strong>
                        LTV = Average Purchase Value × Purchase Frequency × Customer Lifespan
                    </strong>
                </p>

                <h2 className="text-2xl font-bold">
                    Why Use This Calculator?
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Measure long-term customer profitability</li>
                    <li>Compare LTV vs CAC</li>
                    <li>Improve marketing ROI</li>
                    <li>Plan sustainable business growth</li>
                </ul>

            </div>

        </div>
    );
}