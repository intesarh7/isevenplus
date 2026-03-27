"use client";

import { BadgeIndianRupee, BarChart3, Calculator, HelpCircle, Percent, Tag, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ZeptoCommissionCalculator() {

    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("20");
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
        setCommission("20");
        setGst("18");
        setResult(null);
    };

    const example = () => {
        setPrice("1000");
        setCommission("20");
        setGst("18");
    };

    return (
        <>
            <div className="mx-auto bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Zepto Seller Commission Calculator
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
                            Zepto Commission (%)
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

                        <p>Commission Amount: ₹{result.commissionAmount.toFixed(2)}</p>
                        <p>GST on Commission: ₹{result.gstOnCommission.toFixed(2)}</p>
                        <p>Total Charges: ₹{result.totalCharges.toFixed(2)}</p>

                        <p className="text-lg text-green-700 font-semibold mt-2">
                            Seller Payout: ₹{result.payout.toFixed(2)}
                        </p>

                    </div>
                )}

            </div>


            <div className="mx-auto mt-10 space-y-10">

                {/* TRUST SECTION */}
                <section className="bg-linear-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-sm border">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp className="text-purple-600" />
                                Trusted by 12,000+ Zepto Sellers
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Calculate Zepto seller commission, GST & profit instantly with accurate results.
                            </p>
                        </div>

                        <div className="flex gap-3 text-sm items-center">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                ⚡ Instant Results
                            </span>
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                                ✅ 100% Free Tool
                            </span>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-purple-600" />
                        About Zepto Seller Commission Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Zepto Seller Commission Calculator ek advanced aur easy-to-use tool hai jo India ke quick commerce sellers ko unka exact payout aur profit calculate karne me madad karta hai. Zepto par product sell karte waqt platform seller se commission charge karta hai jo category aur pricing ke hisaab se vary karta hai.
                    </p>

                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Iske alawa GST bhi commission par apply hota hai. Ye tool aapko ek clear breakdown deta hai jisse aap apni earning ko accurately estimate kar sakte hain aur loss hone se bach sakte hain.
                    </p>

                    <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
                        <li>Zepto commission calculation</li>
                        <li>GST on commission calculation</li>
                        <li>Final payout estimation</li>
                        <li>Profit margin calculation</li>
                    </ul>
                </section>

                {/* HOW IT WORKS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Zepto Seller Commission Works
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Zepto seller commission generally <b>15% se 25%</b> ke beech hota hai. Ye depend karta hai:
                    </p>

                    <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-1">
                        <li>Product category</li>
                        <li>Pricing strategy</li>
                        <li>Order value</li>
                        <li>Market demand</li>
                    </ul>

                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Commission ke alawa, Zepto 18% GST bhi charge karta hai jo commission amount par apply hota hai.
                    </p>

                    <div className="mt-5 bg-gray-50 p-4 rounded-xl">
                        <p className="font-semibold mb-2">Example Calculation</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>Selling Price: ₹1000</li>
                            <li>Commission: 20%</li>
                            <li>GST: 18%</li>
                            <li>Commission = ₹200</li>
                            <li>GST = ₹36</li>
                            <li>Total Charges = ₹236</li>
                            <li className="text-green-700 font-semibold">
                                Final Payout = ₹764
                            </li>
                        </ul>
                    </div>
                </section>

                {/* WHY IMPORTANT */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BarChart3 className="text-indigo-600" />
                        Why This Calculator is Important
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Bahut se sellers bina calculation ke products list kar dete hain jisse unhe loss ho jata hai. Ye calculator aapko pehle hi bata deta hai ki aapka product profitable hai ya nahi.
                    </p>

                    <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
                        <li>Loss avoid karne me help karta hai</li>
                        <li>Better pricing strategy banane me madad karta hai</li>
                        <li>Transparent cost breakdown deta hai</li>
                        <li>Profit increase karne me help karta hai</li>
                    </ul>
                </section>

                {/* PROFIT STRATEGY */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <TrendingUp className="text-purple-600" />
                        How to Increase Profit on Zepto
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Minimum 30% margin maintain karein</li>
                        <li>High-demand products par focus karein</li>
                        <li>Discounts ko control me rakhein</li>
                        <li>Competitor pricing analyze karein</li>
                        <li>Bulk sourcing se cost reduce karein</li>
                    </ul>
                </section>

                {/* BENEFITS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Instant aur accurate calculation</li>
                        <li>Easy to use interface</li>
                        <li>Free tool for all sellers</li>
                        <li>No login required</li>
                        <li>Business decision making me help karta hai</li>
                    </ul>
                </section>

                {/* FAQ */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <HelpCircle className="text-purple-600" />
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "What is Zepto seller commission?",
                                a: "Zepto seller commission typically ranges from 15% to 25% depending on category."
                            },
                            {
                                q: "Does Zepto charge GST on commission?",
                                a: "Yes, 18% GST is applied on commission amount."
                            },
                            {
                                q: "How to calculate Zepto profit?",
                                a: "Profit = Selling Price - Commission - GST - Other costs."
                            },
                            {
                                q: "Is this calculator free?",
                                a: "Yes, this tool is completely free and requires no signup."
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
                        <Tag className="text-purple-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {[
                            "zepto seller calculator",
                            "zepto commission calculator",
                            "zepto gst calculator",
                            "zepto profit calculator",
                            "zepto seller fees india",
                            "quick commerce calculator india"
                        ].map((tag, i) => (
                            <span
                                key={i}
                                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
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