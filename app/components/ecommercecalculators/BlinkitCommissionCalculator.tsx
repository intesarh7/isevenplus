"use client";

import { BadgeIndianRupee, BarChart3, Calculator, HelpCircle, Percent, Tag, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function BlinkitCommissionCalculator() {

    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("18");
    const [gst, setGst] = useState("18");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const sellingPrice = Number(price);
        const commissionRate = Number(commission);
        const gstRate = Number(gst);

        if (!sellingPrice) return;

        const commissionAmount = (sellingPrice * commissionRate) / 100;

        const gstOnCommission = (commissionAmount * gstRate) / 100;

        const totalCharges = commissionAmount + gstOnCommission;

        const payout = sellingPrice - totalCharges;

        setResult({
            commissionAmount,
            gstOnCommission,
            totalCharges,
            payout
        });
    };

    const reset = () => {
        setPrice("");
        setCommission("18");
        setGst("18");
        setResult(null);
    };

    const example = () => {
        setPrice("1000");
        setCommission("18");
        setGst("18");
    };

    return (
        <>
            <div className="mx-auto bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Blinkit Seller Commission Calculator
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium">
                            Product Selling Price (₹)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter selling price"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Blinkit Commission (%)
                        </label>
                        <input
                            type="number"
                            value={commission}
                            onChange={(e) => setCommission(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            GST on Commission (%)
                        </label>
                        <input
                            type="number"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        <button
                            onClick={calculate}
                            className="w-full sm:flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Calculate
                        </button>

                        <button
                            onClick={example}
                            className="w-full sm:flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        >
                            Try Example
                        </button>

                        <button
                            onClick={reset}
                            className="w-full sm:flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                        >
                            Reset
                        </button>

                    </div>

                </div>

                {result && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">

                        <h3 className="font-semibold text-lg mb-3">
                            Result
                        </h3>

                        <div className="space-y-2 text-sm">

                            <p>
                                Commission Amount: <b>₹{result.commissionAmount.toFixed(2)}</b>
                            </p>

                            <p>
                                GST on Commission: <b>₹{result.gstOnCommission.toFixed(2)}</b>
                            </p>

                            <p>
                                Total Charges: <b>₹{result.totalCharges.toFixed(2)}</b>
                            </p>

                            <p className="text-lg text-green-700 font-semibold">
                                Seller Payout: ₹{result.payout.toFixed(2)}
                            </p>

                        </div>

                    </div>
                )}
            </div>

            <div className="mx-auto mt-10 space-y-10">

                {/* HERO TRUST SECTION */}
                <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp className="text-indigo-600" />
                                Trusted by 10,000+ Sellers
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Calculate accurate Blinkit fees, GST & profit instantly – 100% free tool.
                            </p>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                ⚡ Instant Results
                            </span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                ✅ No Signup
                            </span>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Blinkit Seller Commission Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Blinkit Seller Commission Calculator ek advanced tool hai jo India ke quick commerce sellers ko unka exact payout calculate karne me help karta hai. Jab aap Blinkit par product sell karte ho, platform aapse commission charge karta hai jo category aur pricing par depend karta hai.
                    </p>

                    <p className="text-gray-700 leading-relaxed mt-3">
                        Iske alawa GST bhi commission par apply hota hai. Ye calculator aapko instantly batata hai:
                    </p>

                    <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                        <li>Total commission charges</li>
                        <li>GST on commission</li>
                        <li>Final payout amount</li>
                        <li>Net profit estimation</li>
                    </ul>
                </section>

                {/* HOW IT WORKS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Blinkit Commission Works
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Blinkit seller commission typically 15% se 25% ke beech hota hai. Ye depend karta hai:
                    </p>

                    <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-1">
                        <li>Product category (FMCG, Grocery, Electronics)</li>
                        <li>Order value</li>
                        <li>Discount applied</li>
                        <li>Seller performance</li>
                    </ul>

                    <div className="mt-5 bg-gray-50 p-4 rounded-xl">
                        <p className="font-semibold mb-2">Example Calculation</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>Selling Price: ₹1000</li>
                            <li>Commission: 18%</li>
                            <li>GST on Commission: 18%</li>
                            <li>Commission Amount = ₹180</li>
                            <li>GST = ₹32.40</li>
                            <li>Total Charges = ₹212.40</li>
                            <li className="text-green-700 font-semibold">
                                Final Payout = ₹787.60
                            </li>
                        </ul>
                    </div>
                </section>

                {/* WHY USE */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BarChart3 className="text-purple-600" />
                        Why You Need This Calculator
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Avoid loss before listing products</li>
                        <li>Plan pricing strategy smartly</li>
                        <li>Understand hidden platform charges</li>
                        <li>Increase profit margins</li>
                        <li>Make data-driven decisions</li>
                    </ul>
                </section>

                {/* BENEFITS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Instant payout calculation</li>
                        <li>Accurate GST calculation</li>
                        <li>Easy to use interface</li>
                        <li>Free for all sellers</li>
                        <li>No login required</li>
                    </ul>
                </section>

                {/* PROFIT STRATEGY */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <TrendingUp className="text-indigo-600" />
                        How to Increase Profit on Blinkit
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Keep margin above 30%</li>
                        <li>Optimize pricing based on demand</li>
                        <li>Reduce unnecessary discounts</li>
                        <li>Focus on high-margin products</li>
                        <li>Monitor competitor pricing</li>
                    </ul>
                </section>

                {/* FAQ */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <HelpCircle className="text-indigo-600" />
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">

                        {[
                            {
                                q: "What is Blinkit seller commission?",
                                a: "Blinkit charges around 15% to 25% commission depending on product category."
                            },
                            {
                                q: "Is GST applied on Blinkit commission?",
                                a: "Yes, 18% GST is applied on the commission amount."
                            },
                            {
                                q: "How to calculate Blinkit profit?",
                                a: "Profit = Selling Price - Commission - GST - Other charges."
                            },
                            {
                                q: "Is this calculator free?",
                                a: "Yes, this tool is 100% free and requires no signup."
                            }

                        ].map((faq, i) => (
                            <div key={i} className="border rounded-xl p-4">
                                <h3 className="font-semibold text-gray-800">{faq.q}</h3>
                                <p className="text-gray-600 mt-1">{faq.a}</p>
                            </div>
                        ))}

                    </div>
                </section>

                {/* TAGS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {[
                            "blinkit commission calculator",
                            "blinkit seller calculator",
                            "blinkit gst calculator",
                            "blinkit profit calculator",
                            "blinkit seller fees india",
                            "quick commerce calculator",
                        ].map((tag, index) => (
                            <span
                                key={index}
                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
}