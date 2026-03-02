"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function AdvancedCapitalGainsCalculator() {
    const [purchase, setPurchase] = useState("");
    const [selling, setSelling] = useState("");
    const [months, setMonths] = useState("");
    const [ciiPurchase, setCiiPurchase] = useState("");
    const [ciiSelling, setCiiSelling] = useState("");
    const [useIndexation, setUseIndexation] = useState(false);
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const buy = parseFloat(purchase);
        const sell = parseFloat(selling);
        const holdingMonths = parseFloat(months);
        const ciiBuy = parseFloat(ciiPurchase);
        const ciiSell = parseFloat(ciiSelling);

        if (!buy || !sell || !holdingMonths) return;

        let adjustedCost = buy;

        if (useIndexation && ciiBuy && ciiSell) {
            adjustedCost = buy * (ciiSell / ciiBuy);
        }

        const gain = sell - adjustedCost;

        if (gain <= 0) {
            setResult({ gain: 0, tax: 0, type: "No Gain" });
            return;
        }

        let taxRate = 0;
        let type = "";

        if (holdingMonths < 24) {
            taxRate = 0.15; // STCG assumed
            type = "Short Term Capital Gain (STCG)";
        } else {
            taxRate = useIndexation ? 0.20 : 0.10;
            type = useIndexation
                ? "Long Term Capital Gain (LTCG with Indexation)"
                : "Long Term Capital Gain (LTCG without Indexation)";
        }

        const tax = gain * taxRate;

        setResult({
            adjustedCost: adjustedCost.toFixed(0),
            gain: gain.toFixed(0),
            tax: tax.toFixed(0),
            type,
        });
    };

    const tryExample = () => {
        setPurchase("1000000");
        setSelling("1800000");
        setMonths("36");
        setCiiPurchase("280");
        setCiiSelling("348");
        setUseIndexation(true);
    };

    const resetFields = () => {
        setPurchase("");
        setSelling("");
        setMonths("");
        setCiiPurchase("");
        setCiiSelling("");
        setUseIndexation(false);
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Advanced Capital Gains Calculator (Indexation Option)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">Purchase Price (₹)</label>
                    <input
                        type="number"
                        value={purchase}
                        onChange={(e) => setPurchase(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Selling Price (₹)</label>
                    <input
                        type="number"
                        value={selling}
                        onChange={(e) => setSelling(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Holding Period (Months)</label>
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        checked={useIndexation}
                        onChange={(e) => setUseIndexation(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm font-medium">
                        Apply Indexation (for LTCG)
                    </label>
                </div>

                {useIndexation && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">
                                CII Purchase Year
                            </label>
                            <input
                                type="number"
                                value={ciiPurchase}
                                onChange={(e) => setCiiPurchase(e.target.value)}
                                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                CII Selling Year
                            </label>
                            <input
                                type="number"
                                value={ciiSelling}
                                onChange={(e) => setCiiSelling(e.target.value)}
                                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </>
                )}

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

                    <p>Adjusted Cost: ₹ {Number(result.adjustedCost).toLocaleString()}</p>
                    <p>Capital Gain: ₹ {Number(result.gain).toLocaleString()}</p>
                    <p>Tax Type: {result.type}</p>
                    <p className="font-bold text-lg">
                        Estimated Tax: ₹ {Number(result.tax).toLocaleString()}
                    </p>
                </div>
            )}
            {/* SEO CONTENT SECTION */}
            <div className="max-w-6xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is Indexation in Capital Gains?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Indexation adjusts the purchase cost of an asset based on inflation
                    using the Cost Inflation Index (CII). This reduces taxable capital gain
                    and lowers tax liability in long-term investments.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Formula for Indexed Cost
                </h3>

                <p className="text-gray-700 mb-6">
                    Indexed Cost = Purchase Price × (CII of Sale Year / CII of Purchase Year)
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Benefits of Using Indexation
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Reduces taxable capital gains</li>
                    <li>Protects against inflation impact</li>
                    <li>Useful for property & debt mutual funds</li>
                </ul>

            </div>
        </div>
    );
}