"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function PropertyCapitalGainWithStampCalculator() {
    const [purchasePrice, setPurchasePrice] = useState<string>("");
    const [stampDuty, setStampDuty] = useState<string>("");
    const [improvementCost, setImprovementCost] = useState<string>("");
    const [sellingPrice, setSellingPrice] = useState<string>("");
    const [holdingMonths, setHoldingMonths] = useState<string>("");
    const [result, setResult] = useState<any>(null);

    const calculateGain = () => {
        const buy = parseFloat(purchasePrice) || 0;
        const duty = parseFloat(stampDuty) || 0;
        const improve = parseFloat(improvementCost) || 0;
        const sell = parseFloat(sellingPrice) || 0;
        const months = parseFloat(holdingMonths) || 0;

        if (!buy || !sell || !months) return;

        const totalCost = buy + duty + improve;
        const gain = sell - totalCost;

        let taxRate = 0;
        let taxType = "";

        if (months >= 24) {
            taxRate = 0.20; // LTCG
            taxType = "Long Term Capital Gain (20%)";
        } else {
            taxRate = 0.30; // STCG assumed slab
            taxType = "Short Term Capital Gain (30% assumed)";
        }

        const tax = gain > 0 ? gain * taxRate : 0;

        setResult({
            totalCost: totalCost.toFixed(0),
            gain: gain.toFixed(0),
            tax: tax.toFixed(0),
            taxType,
        });
    };

    const tryExample = () => {
        setPurchasePrice("5000000");
        setStampDuty("300000");
        setImprovementCost("500000");
        setSellingPrice("8000000");
        setHoldingMonths("36");
    };

    const resetFields = () => {
        setPurchasePrice("");
        setStampDuty("");
        setImprovementCost("");
        setSellingPrice("");
        setHoldingMonths("");
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Property Capital Gain Calculator (With Stamp Duty)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Purchase Price (₹)" value={purchasePrice} onChange={setPurchasePrice} />
                <Input label="Stamp Duty & Registration (₹)" value={stampDuty} onChange={setStampDuty} />
                <Input label="Improvement Cost (₹)" value={improvementCost} onChange={setImprovementCost} />
                <Input label="Selling Price (₹)" value={sellingPrice} onChange={setSellingPrice} />
                <Input label="Holding Period (Months)" value={holdingMonths} onChange={setHoldingMonths} />

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateGain}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Tax
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
                <div className="mt-10 p-6 bg-green-50 border rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Capital Gain Summary</h3>

                    <p>Total Cost (Including Stamp Duty): ₹ {Number(result.totalCost).toLocaleString()}</p>
                    <p>Capital Gain: ₹ {Number(result.gain).toLocaleString()}</p>
                    <p>Tax Type: {result.taxType}</p>
                    <p className="font-bold text-lg">
                        Estimated Tax: ₹ {Number(result.tax).toLocaleString()}
                    </p>
                </div>
            )}

            <div className="max-w-6xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    Property Capital Gain with Stamp Duty Explained
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    When calculating property capital gains, stamp duty and registration
                    charges are added to the purchase cost. This increases the total cost
                    base and reduces taxable capital gain.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Capital Gain Formula
                </h3>

                <p className="text-gray-700 mb-6">
                    Capital Gain = Selling Price − (Purchase Price + Stamp Duty + Improvement Cost)
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator helps property investors estimate real estate tax
                    liability accurately before selling property.
                </p>

            </div>

        </div>
    );
}

type InputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function Input({ label, value, onChange }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value)
                }
                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}