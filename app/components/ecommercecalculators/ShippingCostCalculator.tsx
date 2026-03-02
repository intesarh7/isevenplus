"use client";

import { useState } from "react";
import { Truck, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function ShippingCostCalculator() {
    const [weight, setWeight] = useState("");
    const [costPerKg, setCostPerKg] = useState("");
    const [packagingCost, setPackagingCost] = useState("");
    const [extraCharges, setExtraCharges] = useState("");

    const [result, setResult] = useState<number | null>(null);

    const calculateShipping = () => {
        const w = parseFloat(weight);
        const rate = parseFloat(costPerKg);
        const packaging = parseFloat(packagingCost) || 0;
        const extra = parseFloat(extraCharges) || 0;

        if (isNaN(w) || isNaN(rate)) {
            setResult(null);
            return;
        }

        const shippingCost = w * rate + packaging + extra;
        setResult(parseFloat(shippingCost.toFixed(2)));
    };

    const tryExample = () => {
        setWeight("5");
        setCostPerKg("120");
        setPackagingCost("50");
        setExtraCharges("30");

        const example = 5 * 120 + 50 + 30;
        setResult(example);
    };

    const resetFields = () => {
        setWeight("");
        setCostPerKg("");
        setPackagingCost("");
        setExtraCharges("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Truck className="text-green-600" />
                Shipping Cost Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Cost Per Kg (₹)"
                    value={costPerKg}
                    onChange={(e) => setCostPerKg(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Packaging Cost (₹)"
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Extra Charges (₹)"
                    value={extraCharges}
                    onChange={(e) => setExtraCharges(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateShipping}
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

            {result !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Estimated Shipping Cost
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Shipping Cost is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Shipping cost depends on parcel weight, courier rate per kilogram,
                    packaging cost and any additional charges such as fuel surcharge.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Shipping Cost = (Weight × Cost Per Kg) + Packaging + Extra Charges
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Reduce Shipping Cost
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Use lightweight packaging</li>
                    <li>Negotiate bulk courier rates</li>
                    <li>Optimize product dimensions</li>
                    <li>Compare multiple logistics providers</li>
                </ul>

            </div>
        </div>
    );
}