"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function PropertyCapitalGainCalculator() {
    const [purchase, setPurchase] = useState("");
    const [selling, setSelling] = useState("");
    const [stampDuty, setStampDuty] = useState("");
    const [improvement, setImprovement] = useState("");
    const [months, setMonths] = useState("");
    const [ciiPurchase, setCiiPurchase] = useState("");
    const [ciiSelling, setCiiSelling] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const buy = parseFloat(purchase) || 0;
        const sell = parseFloat(selling) || 0;
        const duty = parseFloat(stampDuty) || 0;
        const improve = parseFloat(improvement) || 0;
        const holdingMonths = parseFloat(months) || 0;
        const ciiBuy = parseFloat(ciiPurchase) || 0;
        const ciiSell = parseFloat(ciiSelling) || 0;

        if (!buy || !sell || !holdingMonths) return;

        const totalCost = buy + duty + improve;

        let adjustedCost = totalCost;
        let type = "";
        let taxRate = 0;

        if (holdingMonths >= 24 && ciiBuy && ciiSell) {
            adjustedCost = totalCost * (ciiSell / ciiBuy);
            taxRate = 0.20; // LTCG with indexation
            type = "Long Term Capital Gain (20% with Indexation)";
        } else {
            taxRate = 0.30; // STCG assumed slab
            type = "Short Term Capital Gain (As per Slab - assumed 30%)";
        }

        const gain = sell - adjustedCost;
        const tax = gain > 0 ? gain * taxRate : 0;

        setResult({
            totalCost: totalCost.toFixed(0),
            adjustedCost: adjustedCost.toFixed(0),
            gain: gain.toFixed(0),
            tax: tax.toFixed(0),
            type,
        });
    };

    const tryExample = () => {
        setPurchase("5000000");
        setSelling("8000000");
        setStampDuty("300000");
        setImprovement("500000");
        setMonths("36");
        setCiiPurchase("280");
        setCiiSelling("348");
    };

    const resetFields = () => {
        setPurchase("");
        setSelling("");
        setStampDuty("");
        setImprovement("");
        setMonths("");
        setCiiPurchase("");
        setCiiSelling("");
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Property Capital Gain Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Purchase Price (₹)" value={purchase} setValue={setPurchase} />
                <Input label="Selling Price (₹)" value={selling} setValue={setSelling} />
                <Input label="Stamp Duty & Registration (₹)" value={stampDuty} setValue={setStampDuty} />
                <Input label="Improvement Cost (₹)" value={improvement} setValue={setImprovement} />
                <Input label="Holding Period (Months)" value={months} setValue={setMonths} />
                <Input label="CII Purchase Year" value={ciiPurchase} setValue={setCiiPurchase} />
                <Input label="CII Selling Year" value={ciiSelling} setValue={setCiiSelling} />

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

                    <p>Total Cost (Including Duty & Improvement): ₹ {Number(result.totalCost).toLocaleString()}</p>
                    <p>Adjusted Cost: ₹ {Number(result.adjustedCost).toLocaleString()}</p>
                    <p>Capital Gain: ₹ {Number(result.gain).toLocaleString()}</p>
                    <p>Tax Type: {result.type}</p>
                    <p className="font-bold text-lg">
                        Estimated Tax: ₹ {Number(result.tax).toLocaleString()}
                    </p>
                </div>
            )}

            <div className="max-w-6xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    How Property Capital Gains Tax is Calculated?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    When you sell a property, the profit earned is called capital gain.
                    For properties held more than 24 months, Long Term Capital Gains (LTCG)
                    apply with indexation benefit. For shorter durations, Short Term Capital
                    Gains (STCG) apply and are taxed as per income slab.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    What Costs Are Included?
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Purchase Price</li>
                    <li>Stamp Duty & Registration Charges</li>
                    <li>Improvement & Renovation Costs</li>
                    <li>Indexation using Cost Inflation Index (CII)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Property Capital Gain Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our advanced calculator helps real estate investors estimate accurate
                    tax liability before selling property. It supports indexation and
                    additional cost adjustments for better financial planning.
                </p>

            </div>

        </div>

    );
}

function Input({ label, value, setValue }: any) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}