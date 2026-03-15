"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function AmazonFBAProfitCalculator() {

    const [price, setPrice] = useState("");
    const [cost, setCost] = useState("");
    const [referral, setReferral] = useState("15");
    const [fbaFee, setFbaFee] = useState("60");
    const [shipping, setShipping] = useState("40");
    const [gst, setGst] = useState("18");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const sellingPrice = Number(price);
        const productCost = Number(cost);
        const referralRate = Number(referral);
        const fbaFees = Number(fbaFee);
        const shippingFee = Number(shipping);
        const gstRate = Number(gst);

        if (!sellingPrice || !productCost) return;

        const referralFee = (sellingPrice * referralRate) / 100;

        const gstOnFees = ((referralFee + fbaFees + shippingFee) * gstRate) / 100;

        const totalFees = referralFee + fbaFees + shippingFee + gstOnFees;

        const profit = sellingPrice - productCost - totalFees;

        setResult({
            referralFee,
            fbaFees,
            shippingFee,
            gstOnFees,
            totalFees,
            profit
        });

    };

    const example = () => {
        setPrice("1200");
        setCost("700");
        setReferral("15");
        setFbaFee("60");
        setShipping("40");
        setGst("18");
    };

    const reset = () => {
        setPrice("");
        setCost("");
        setReferral("15");
        setFbaFee("60");
        setShipping("40");
        setGst("18");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Amazon FBA Profit Calculator
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
                            Product Cost (₹)
                        </label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter product cost"
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
                            FBA Fulfillment Fee (₹)
                        </label>
                        <input
                            type="number"
                            value={fbaFee}
                            onChange={(e) => setFbaFee(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block">
                            Shipping Cost (₹)
                        </label>
                        <input
                            type="number"
                            value={shipping}
                            onChange={(e) => setShipping(e.target.value)}
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

                        <p>FBA Fee: ₹{result.fbaFees.toFixed(2)}</p>

                        <p>Shipping Cost: ₹{result.shippingFee.toFixed(2)}</p>

                        <p>GST on Fees: ₹{result.gstOnFees.toFixed(2)}</p>

                        <p>Total Amazon Fees: ₹{result.totalFees.toFixed(2)}</p>

                        <p className={`text-lg font-semibold ${result.profit > 0 ? "text-green-700" : "text-red-600"}`}>
                            Net Profit: ₹{result.profit.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Amazon FBA Profit Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Amazon FBA Profit Calculator helps sellers estimate their real profit when selling products using Fulfillment by Amazon (FBA). Sellers need to consider multiple costs including referral fees, fulfillment fees, shipping costs, and GST applied on platform charges.

                    </p>

                    <p className="text-gray-700 mt-3">

                        Using this calculator sellers can determine their expected profit margin before listing products on Amazon marketplace.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Amazon FBA Fees Work
                    </h2>

                    <p className="text-gray-700">

                        Amazon typically charges a referral fee between <b>8% to 20%</b> depending on product category. In addition sellers using Amazon FBA pay fulfillment fees for storage, packing, and shipping orders.

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="text-sm space-y-1">

                            <li>Selling Price: ₹1200</li>
                            <li>Product Cost: ₹700</li>
                            <li>Referral Fee: 15%</li>
                            <li>FBA Fee: ₹60</li>
                            <li>Shipping Cost: ₹40</li>

                            <li>Referral Fee = ₹180</li>
                            <li>Total Fees ≈ ₹327.60</li>

                            <li className="text-green-700 font-semibold">
                                Estimated Profit ≈ ₹172.40
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

                        <li>Estimate Amazon FBA seller profit instantly</li>
                        <li>Understand referral and fulfillment fees</li>
                        <li>Calculate GST applied on Amazon service charges</li>
                        <li>Plan product pricing strategy</li>
                        <li>Optimize profit margins before launching products</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "amazon fba profit calculator",
                            "amazon fba fees calculator",
                            "amazon fba seller calculator",
                            "amazon fba commission calculator",
                            "amazon fba profit margin calculator",
                            "amazon seller fba calculator",
                            "amazon fulfillment fees calculator"
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