"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag, TrendingUp, BarChart3, HelpCircle } from "lucide-react";

export default function SwiggyInstamartCalculator() {

    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("22");
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
        setCommission("22");
        setGst("18");
        setResult(null);
    };

    const example = () => {
        setPrice("1000");
        setCommission("22");
        setGst("18");
    };

    return (
        <>
            <div className="mx-auto bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Swiggy Instamart Seller Commission Calculator
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
                            Swiggy Instamart Commission (%)
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

                        <p className="text-green-700 text-lg font-semibold">
                            Seller Payout: ₹{result.payout.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>

            <div className="mx-auto mt-10 space-y-10">

                {/* TRUST SECTION */}
                <section className="bg-linear-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl shadow-sm border">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp className="text-orange-600" />
                                Trusted by 15,000+ Sellers
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Calculate Swiggy Instamart fees, GST & profit instantly with 100% accuracy.
                            </p>
                        </div>

                        <div className="flex gap-3 text-sm items-center">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                ⚡ Instant Results
                            </span>
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                                ✅ Free Tool
                            </span>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-orange-600" />
                        About Swiggy Instamart Seller Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Swiggy Instamart Seller Calculator ek powerful aur advanced tool hai jo India ke quick commerce sellers ko unka exact payout aur profit calculate karne me madad karta hai. Instamart par products sell karte waqt seller ko multiple charges face karne padte hain jaise commission, GST aur kabhi-kabhi delivery related charges.
                    </p>

                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Ye calculator specially design kiya gaya hai taaki aap apni earning ka clear breakdown samajh sakein aur listing se pehle hi apna profit estimate kar sakein.
                    </p>

                    <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
                        <li>Swiggy commission calculation</li>
                        <li>GST on commission</li>
                        <li>Final payout calculation</li>
                        <li>Profit margin estimation</li>
                    </ul>
                </section>

                {/* HOW IT WORKS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Swiggy Instamart Commission Works
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Swiggy Instamart sellers se commission charge karta hai jo usually <b>15% se 25%</b> ke beech hota hai. Ye percentage depend karta hai product category, pricing aur demand par.
                    </p>

                    <p className="text-gray-700 mt-3 leading-relaxed">
                        Commission ke alawa, GST bhi apply hota hai jo normally <b>18%</b> hota hai aur ye commission amount par lagta hai.
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
                        Bahut se sellers bina proper calculation ke products list kar dete hain jisse unhe loss ho sakta hai. Ye calculator aapko pehle hi clear idea deta hai ki aapko kitna margin milega.
                    </p>

                    <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
                        <li>Avoid losses before listing</li>
                        <li>Better pricing strategy</li>
                        <li>Transparent cost breakdown</li>
                        <li>Increase profitability</li>
                    </ul>
                </section>

                {/* PROFIT STRATEGY */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <TrendingUp className="text-orange-600" />
                        How to Increase Profit on Instamart
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Keep margin above 30%</li>
                        <li>Reduce heavy discounting</li>
                        <li>Choose high-demand products</li>
                        <li>Optimize pricing dynamically</li>
                        <li>Track competitor prices regularly</li>
                    </ul>
                </section>

                {/* BENEFITS */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Tool
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Instant & accurate calculations</li>
                        <li>Easy to use interface</li>
                        <li>Free for all sellers</li>
                        <li>No login required</li>
                        <li>Helps in decision making</li>
                    </ul>
                </section>

                {/* FAQ */}
                <section className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                        <HelpCircle className="text-orange-600" />
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "What is Swiggy Instamart seller commission?",
                                a: "It ranges between 15% to 25% depending on product category and pricing."
                            },
                            {
                                q: "Is GST applied on Instamart commission?",
                                a: "Yes, 18% GST is applied on commission charges."
                            },
                            {
                                q: "How to calculate Instamart profit?",
                                a: "Profit = Selling Price - Commission - GST - Other costs."
                            },
                            {
                                q: "Is this calculator free?",
                                a: "Yes, it is completely free and requires no signup."
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
                        <Tag className="text-orange-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {[
                            "swiggy instamart calculator",
                            "instamart seller calculator",
                            "instamart commission calculator",
                            "instamart gst calculator",
                            "instamart profit calculator",
                            "quick commerce seller tool"
                        ].map((tag, i) => (
                            <span
                                key={i}
                                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm"
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