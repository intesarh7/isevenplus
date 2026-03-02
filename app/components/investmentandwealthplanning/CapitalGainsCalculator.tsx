"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function CapitalGainsCalculator() {
    const [purchase, setPurchase] = useState("");
    const [selling, setSelling] = useState("");
    const [months, setMonths] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const buy = parseFloat(purchase);
        const sell = parseFloat(selling);
        const holdingMonths = parseFloat(months);

        if (!buy || !sell || !holdingMonths) return;

        const gain = sell - buy;

        if (gain <= 0) {
            setResult({
                gain: 0,
                tax: 0,
                type: "No Gain",
            });
            return;
        }

        let taxRate = 0;
        let type = "";

        // Basic India logic example
        if (holdingMonths < 12) {
            taxRate = 0.15; // 15% Short Term
            type = "Short Term Capital Gain (STCG)";
        } else {
            taxRate = 0.10; // 10% Long Term
            type = "Long Term Capital Gain (LTCG)";
        }

        const tax = gain * taxRate;

        setResult({
            gain: gain.toFixed(0),
            tax: tax.toFixed(0),
            type,
        });
    };

    const tryExample = () => {
        setPurchase("500000");
        setSelling("800000");
        setMonths("18");
    };

    const resetFields = () => {
        setPurchase("");
        setSelling("");
        setMonths("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Capital Gains Tax Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Purchase Price (₹)
                    </label>
                    <input
                        type="number"
                        value={purchase}
                        onChange={(e) => setPurchase(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter purchase price"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Selling Price (₹)
                    </label>
                    <input
                        type="number"
                        value={selling}
                        onChange={(e) => setSelling(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter selling price"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Holding Period (Months)
                    </label>
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter months"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateTax}
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
                    <h3 className="text-xl font-semibold mb-4">Tax Summary</h3>

                    <p>Capital Gain: ₹ {Number(result.gain).toLocaleString()}</p>
                    <p>Tax Type: {result.type}</p>
                    <p className="font-bold text-lg">
                        Estimated Tax: ₹ {Number(result.tax).toLocaleString()}
                    </p>
                </div>
            )}
            {/* SEO CONTENT SECTION */}
            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is Capital Gains Tax?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Capital Gains Tax is the tax you pay on the profit earned from selling
                    an asset such as stocks, mutual funds, property, or bonds. The tax rate
                    depends on how long you held the asset before selling.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Short Term vs Long Term Capital Gains
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Short Term Capital Gain (STCG):</strong> Asset held for less than 12 months.</li>
                    <li><strong>Long Term Capital Gain (LTCG):</strong> Asset held for more than 12 months.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Capital Gains Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator helps you quickly estimate your tax liability based on
                    purchase price, selling price, and holding period. It is useful for
                    investors planning stock sales, property transactions, or mutual fund redemptions.
                </p>

            </div>
        </div>
    );
}