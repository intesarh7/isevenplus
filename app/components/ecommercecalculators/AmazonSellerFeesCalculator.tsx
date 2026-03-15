"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function AmazonSellerFeesCalculator() {

    const [price, setPrice] = useState("");
    const [referral, setReferral] = useState("15");
    const [closing, setClosing] = useState("20");
    const [gst, setGst] = useState("18");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const sellingPrice = Number(price);
        const referralRate = Number(referral);
        const closingFee = Number(closing);
        const gstRate = Number(gst);

        if (!sellingPrice) return;

        const referralFee = (sellingPrice * referralRate) / 100;

        const gstOnFee = ((referralFee + closingFee) * gstRate) / 100;

        const totalFees = referralFee + closingFee + gstOnFee;

        const payout = sellingPrice - totalFees;

        setResult({
            referralFee,
            closingFee,
            gstOnFee,
            totalFees,
            payout
        });

    };

    const example = () => {
        setPrice("1000");
        setReferral("15");
        setClosing("20");
        setGst("18");
    };

    const reset = () => {
        setPrice("");
        setReferral("15");
        setClosing("20");
        setGst("18");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Amazon Seller Fees Calculator
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="text-sm font-medium block">
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
                        <label className="text-sm font-medium block">
                            Amazon Referral Fee (%)
                        </label>

                        <input
                            type="number"
                            value={referral}
                            onChange={(e) => setReferral(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block">
                            Closing Fee (₹)
                        </label>

                        <input
                            type="number"
                            value={closing}
                            onChange={(e) => setClosing(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block">
                            GST on Fees (%)
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

                        <p>Referral Fee: ₹{result.referralFee.toFixed(2)}</p>

                        <p>Closing Fee: ₹{result.closingFee.toFixed(2)}</p>

                        <p>GST on Fees: ₹{result.gstOnFee.toFixed(2)}</p>

                        <p>Total Amazon Fees: ₹{result.totalFees.toFixed(2)}</p>

                        <p className="text-green-700 font-semibold text-lg">
                            Seller Payout: ₹{result.payout.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Amazon Seller Fees Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Amazon Seller Fees Calculator helps sellers estimate their profit after Amazon platform charges. When selling products on Amazon marketplace, sellers need to pay several types of fees including referral fees, closing fees, shipping fees and GST on service charges.

                    </p>

                    <p className="text-gray-700 mt-3">

                        Using this calculator sellers can quickly estimate Amazon fees and understand how much payout they will receive after deductions.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Amazon Seller Fees Work
                    </h2>

                    <p className="text-gray-700">

                        Amazon usually charges a <b>referral fee between 5% to 20%</b> depending on product category. Additionally Amazon may charge a fixed closing fee per order and GST on service charges.

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="text-sm space-y-1">

                            <li>Selling Price: ₹1000</li>
                            <li>Referral Fee: 15%</li>
                            <li>Closing Fee: ₹20</li>
                            <li>GST: 18%</li>

                            <li>Referral Fee = ₹150</li>
                            <li>Closing Fee = ₹20</li>
                            <li>GST = ₹30.60</li>

                            <li className="text-green-700 font-semibold">
                                Final Seller Payout = ₹799.40
                            </li>

                        </ul>

                    </div>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Estimate Amazon seller profit instantly</li>
                        <li>Understand referral and closing fees</li>
                        <li>Calculate GST applied on Amazon fees</li>
                        <li>Plan product pricing strategy</li>
                        <li>Optimize profit margins before listing products</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "amazon seller fees calculator",
                            "amazon seller commission calculator",
                            "amazon referral fee calculator",
                            "amazon seller profit calculator",
                            "amazon fba fees calculator",
                            "amazon seller payout calculator",
                            "amazon seller charges"
                        ].map((tag, i) => (
                            <span
                                key={i}
                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}

                    </div>

                </section>

            </div>

        </div>

    );

}