"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function PartnershipProfitSplitCalculator() {
    const [totalProfit, setTotalProfit] = useState("");
    const [partner1Capital, setPartner1Capital] = useState("");
    const [partner2Capital, setPartner2Capital] = useState("");
    const [customRatio, setCustomRatio] = useState(false);
    const [ratio1, setRatio1] = useState("");
    const [ratio2, setRatio2] = useState("");

    const [share1, setShare1] = useState<number | null>(null);
    const [share2, setShare2] = useState<number | null>(null);
    const [percentage1, setPercentage1] = useState<number | null>(null);
    const [percentage2, setPercentage2] = useState<number | null>(null);

    const calculateSplit = () => {
        const profit = parseFloat(totalProfit);
        if (!profit) return;

        let r1, r2;

        if (customRatio) {
            r1 = parseFloat(ratio1);
            r2 = parseFloat(ratio2);
        } else {
            r1 = parseFloat(partner1Capital);
            r2 = parseFloat(partner2Capital);
        }

        if (!r1 || !r2) return;

        const totalRatio = r1 + r2;

        const p1Share = (profit * r1) / totalRatio;
        const p2Share = (profit * r2) / totalRatio;

        setShare1(p1Share);
        setShare2(p2Share);
        setPercentage1((r1 / totalRatio) * 100);
        setPercentage2((r2 / totalRatio) * 100);
    };

    const tryExample = () => {
        setTotalProfit("500000");
        setPartner1Capital("300000");
        setPartner2Capital("200000");
        setCustomRatio(false);
        setTimeout(() => calculateSplit(), 100);
    };

    const resetFields = () => {
        setTotalProfit("");
        setPartner1Capital("");
        setPartner2Capital("");
        setRatio1("");
        setRatio2("");
        setShare1(null);
        setShare2(null);
        setPercentage1(null);
        setPercentage2(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                Partnership Profit Split Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">Total Profit (₹)</label>
                    <input
                        type="number"
                        value={totalProfit}
                        onChange={(e) => setTotalProfit(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                {!customRatio && (
                    <>
                        <div>
                            <label className="font-medium">Partner 1 Capital (₹)</label>
                            <input
                                type="number"
                                value={partner1Capital}
                                onChange={(e) => setPartner1Capital(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mt-2"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Partner 2 Capital (₹)</label>
                            <input
                                type="number"
                                value={partner2Capital}
                                onChange={(e) => setPartner2Capital(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mt-2"
                            />
                        </div>
                    </>
                )}

                {customRatio && (
                    <>
                        <div>
                            <label className="font-medium">Partner 1 Ratio</label>
                            <input
                                type="number"
                                value={ratio1}
                                onChange={(e) => setRatio1(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mt-2"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Partner 2 Ratio</label>
                            <input
                                type="number"
                                value={ratio2}
                                onChange={(e) => setRatio2(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mt-2"
                            />
                        </div>
                    </>
                )}

            </div>

            <div className="mt-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={customRatio}
                        onChange={() => setCustomRatio(!customRatio)}
                    />
                    Use Custom Ratio Instead of Capital
                </label>
            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateSplit}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Split
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

            {share1 !== null && share2 !== null && percentage1 !== null && percentage2 !== null && (
                <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">Profit Distribution</h3>

                    <p>
                        Partner 1 Share: <strong>₹{share1.toFixed(2)}</strong> ({percentage1.toFixed(1)}%)
                    </p>

                    <p>
                        Partner 2 Share: <strong>₹{share2.toFixed(2)}</strong> ({percentage2.toFixed(1)}%)
                    </p>
                </div>
            )}

            {/* SEO Section */}
            <div className="mt-12 space-y-6 text-gray-700">

                <h2 className="text-2xl font-bold">What is Partnership Profit Split?</h2>
                <p>
                    Partnership profit split determines how profits are distributed among partners
                    based on their investment or agreed ratio.
                </p>

                <h2 className="text-2xl font-bold">Profit Split Formula</h2>
                <p>
                    <strong>
                        Partner Share = (Partner Ratio / Total Ratio) × Total Profit
                    </strong>
                </p>

                <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>LLP profit distribution</li>
                    <li>Startup co-founder equity split</li>
                    <li>Business partnership accounting</li>
                    <li>Transparent profit allocation</li>
                </ul>

            </div>

        </div>
    );
}