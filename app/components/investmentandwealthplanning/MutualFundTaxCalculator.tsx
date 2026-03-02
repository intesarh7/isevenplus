"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function MutualFundTaxCalculator() {
    const [investment, setInvestment] = useState<string>("");
    const [redemption, setRedemption] = useState<string>("");
    const [months, setMonths] = useState<string>("");
    const [fundType, setFundType] = useState<string>("equity");
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const invest = parseFloat(investment) || 0;
        const redeem = parseFloat(redemption) || 0;
        const holding = parseFloat(months) || 0;

        if (!invest || !redeem || !holding) return;

        const gain = redeem - invest;

        if (gain <= 0) {
            setResult({
                gain: 0,
                tax: 0,
                netAmount: redeem,
                taxType: "No Capital Gain",
            });
            return;
        }

        let taxRate = 0;
        let taxType = "";

        if (fundType === "equity") {
            if (holding < 12) {
                taxRate = 0.15;
                taxType = "Equity STCG (15%)";
            } else {
                taxRate = 0.10;
                taxType = "Equity LTCG (10%)";
            }
        } else {
            taxRate = 0.30; // assumed slab
            taxType = "Debt Fund (Tax as per slab - assumed 30%)";
        }

        const tax = gain * taxRate;
        const netAmount = redeem - tax;

        setResult({
            gain: gain.toFixed(0),
            tax: tax.toFixed(0),
            netAmount: netAmount.toFixed(0),
            taxType,
        });
    };

    const tryExample = () => {
        setInvestment("200000");
        setRedemption("300000");
        setMonths("18");
        setFundType("equity");
    };

    const resetFields = () => {
        setInvestment("");
        setRedemption("");
        setMonths("");
        setFundType("equity");
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Mutual Fund Tax Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Investment Amount (₹)" value={investment} onChange={setInvestment} />
                <Input label="Redemption Amount (₹)" value={redemption} onChange={setRedemption} />
                <Input label="Holding Period (Months)" value={months} onChange={setMonths} />

                <div>
                    <label className="block text-sm font-medium">Fund Type</label>
                    <select
                        value={fundType}
                        onChange={(e) => setFundType(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="equity">Equity Fund</option>
                        <option value="debt">Debt Fund</option>
                    </select>
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
                    <p>Tax Type: {result.taxType}</p>
                    <p>Tax Payable: ₹ {Number(result.tax).toLocaleString()}</p>
                    <p className="font-bold text-lg">
                        Net Amount After Tax: ₹ {Number(result.netAmount).toLocaleString()}
                    </p>
                </div>
            )}
            <div className="max-w-6xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    How Mutual Fund Tax is Calculated in India?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Mutual fund taxation depends on fund type and holding period.
                    Equity funds have different tax rates compared to debt funds.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Equity Fund Tax Rules
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Holding less than 12 months → 15% STCG</li>
                    <li>Holding more than 12 months → 10% LTCG</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Debt Fund Tax Rules
                </h3>

                <p className="text-gray-700 mb-6">
                    Debt funds are generally taxed as per the investor’s income tax slab.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Mutual Fund Tax Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator instantly estimates capital gain tax and net redemption
                    amount, helping investors plan exits smartly.
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