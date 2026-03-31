"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw, TrendingUp, Clock, Zap, CheckCircle, Briefcase, ShieldCheck, HelpCircle } from "lucide-react";

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
        <div className="bg-white shadow-xl rounded-2xl p-4">

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
            <div className="mt-14 px-2 space-y-10 text-gray-700 leading-relaxed">

                {/* 🔷 INTRO */}
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                        <TrendingUp className="text-indigo-600" size={22} />
                        What is Capital Gains Tax?
                    </h2>

                    <p className="mt-4 text-sm md:text-base">
                        <strong>Capital Gains Tax</strong> is the tax you pay on the profit earned when you sell a capital asset such as stocks, mutual funds, real estate, bonds, or gold. The difference between the purchase price and the selling price is known as the capital gain, and this gain is subject to taxation under income tax laws.
                    </p>

                    <p className="mt-3 text-sm md:text-base">
                        For example, if you bought a property for ₹10,00,000 and sold it for ₹15,00,000, your capital gain would be ₹5,00,000. This gain is taxable based on the holding period and applicable tax rules.
                    </p>

                    <p className="mt-3 text-sm md:text-base">
                        Understanding capital gains tax is essential for investors, traders, and property owners because it directly impacts your net profit and financial planning.
                    </p>
                </div>

                {/* 🔷 TYPES */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Clock className="text-indigo-600" size={20} />
                        Short Term vs Long Term Capital Gains
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        Capital gains are classified into two types based on how long the asset is held before selling:
                    </p>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="text-green-600 mt-1" size={16} />
                            <span>
                                <strong>Short Term Capital Gain (STCG):</strong> If the asset is held for less than 12 months (for stocks/equity), the profit is taxed at a higher rate.
                            </span>
                        </li>

                        <li className="flex items-start gap-2">
                            <CheckCircle className="text-green-600 mt-1" size={16} />
                            <span>
                                <strong>Long Term Capital Gain (LTCG):</strong> If the asset is held for more than 12 months, it qualifies for lower tax rates and exemptions.
                            </span>
                        </li>
                    </ul>

                    <p className="mt-3 text-sm md:text-base">
                        The exact holding period criteria may vary depending on asset type such as property, gold, or mutual funds.
                    </p>
                </div>

                {/* 🔷 FORMULA */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Calculator className="text-indigo-600" size={20} />
                        Capital Gains Calculation Formula
                    </h3>

                    <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
                        Capital Gain = Selling Price - Purchase Price - Expenses
                    </div>

                    <p className="mt-3 text-sm md:text-base">
                        In some cases, additional deductions such as brokerage, stamp duty, and improvement costs are also considered while calculating the net capital gain.
                    </p>
                </div>

                {/* 🔷 HOW TOOL HELPS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Zap className="text-yellow-500" size={20} />
                        Why Use Capital Gains Tax Calculator?
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        Calculating capital gains tax manually can be complex due to multiple variables like holding period, tax rates, and deductions. Our <strong>Capital Gains Tax Calculator</strong> simplifies this process by providing instant and accurate results.
                    </p>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Instant tax calculation based on real inputs
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Helps in financial planning and tax saving
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Supports stock, property, and mutual fund calculations
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Easy to use with no technical knowledge required
                        </li>
                    </ul>
                </div>

                {/* 🔷 USE CASES */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Briefcase className="text-indigo-600" size={20} />
                        Who Should Use This Calculator?
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Stock market investors planning profit booking
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Property sellers calculating real estate gains
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Mutual fund investors planning redemptions
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Financial planners and tax consultants
                        </li>
                    </ul>
                </div>

                {/* 🔷 TAX SAVING */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <ShieldCheck className="text-green-600" size={20} />
                        Tips to Save Capital Gains Tax
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Invest in tax-saving bonds under Section 54EC
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Reinvest in property under Section 54
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Use capital loss to offset gains
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Hold assets longer to qualify for LTCG benefits
                        </li>
                    </ul>
                </div>

                {/* 🔷 FAQ */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <HelpCircle className="text-indigo-600" size={20} />
                        Frequently Asked Questions
                    </h3>

                    <div className="mt-4 space-y-5 text-sm md:text-base">

                        <div>
                            <h4 className="font-semibold">
                                1. What is the tax rate on capital gains in India?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                STCG is usually taxed at 15% for equity, while LTCG above ₹1 lakh is taxed at 10%.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                2. Are capital gains taxable on property?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Yes, property gains are taxable depending on holding period and indexation benefits.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                3. Can I avoid capital gains tax?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                You can reduce or defer tax using exemptions and reinvestment options.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                4. Is this calculator free?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Yes, our Capital Gains Tax Calculator is completely free and easy to use.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}