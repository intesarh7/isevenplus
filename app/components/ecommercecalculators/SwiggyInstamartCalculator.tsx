"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

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

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Calculator className="text-indigo-600" size={24} />

                        About Swiggy Instamart Seller Calculator

                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Swiggy Instamart Seller Calculator helps quick commerce sellers estimate
                        their final payout after platform commission and GST deductions.

                        When sellers list products on Swiggy Instamart, the platform charges a
                        commission percentage depending on category, order value and operational fees.

                    </p>

                    <p className="text-gray-700 mt-3">

                        Using this calculator sellers can quickly calculate commission,
                        GST on commission and final payout amount.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Percent className="text-green-600" size={24} />

                        How Swiggy Instamart Commission Works

                    </h2>

                    <p className="text-gray-700">

                        Swiggy Instamart usually charges commission between
                        <b>18% to 25%</b> depending on product category.

                        Additionally, <b>18% GST</b> is applied on the commission amount.

                    </p>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="space-y-1 text-sm">

                            <li>Selling Price: ₹1000</li>
                            <li>Commission: 22%</li>
                            <li>GST on Commission: 18%</li>
                            <li>Commission Amount = ₹220</li>
                            <li>GST = ₹39.60</li>
                            <li>Total Charges = ₹259.60</li>

                            <li className="font-semibold text-green-700">

                                Final Seller Payout = ₹740.40

                            </li>

                        </ul>

                    </div>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <BadgeIndianRupee className="text-yellow-600" size={24} />

                        Benefits of Using This Calculator

                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Estimate Swiggy Instamart seller payout instantly</li>

                        <li>Understand commission and GST deductions</li>

                        <li>Improve pricing strategy before listing products</li>

                        <li>Calculate real profit margins</li>

                        <li>Plan product pricing for quick commerce platforms</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Tag className="text-indigo-600" size={24} />

                        Related Search Tags

                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "swiggy instamart commission calculator",
                            "swiggy instamart seller calculator",
                            "swiggy instamart seller fees",
                            "swiggy instamart payout calculator",
                            "swiggy instamart profit calculator",
                            "swiggy seller commission calculator",
                            "quick commerce seller calculator"
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
        </>
    );

}