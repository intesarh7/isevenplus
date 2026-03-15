"use client";

import { BadgeIndianRupee, Calculator, Percent, Tag } from "lucide-react";
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

                {/* About Section */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Calculator className="text-indigo-600" size={24} />

                        About Blinkit Seller Commission Calculator

                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Blinkit Seller Commission Calculator is a powerful tool designed for quick commerce sellers

                        who want to estimate the actual payout they will receive after Blinkit commissions and taxes.

                        When selling products on Blinkit, the platform charges a commission based on product

                        category and order value. Additionally, GST is applied on the commission amount.

                    </p>

                    <p className="text-gray-700 leading-relaxed mt-3">

                        Using this calculator, sellers can quickly determine the total platform charges and

                        their final payout amount before listing products on Blinkit.

                    </p>

                </section>


                {/* Commission Section */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Percent className="text-green-600" size={24} />

                        How Blinkit Commission Works

                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Blinkit typically charges commission ranging between <b>15% to 25%</b>

                        depending on the product category and order value. Apart from this,

                        <b>GST (usually 18%)</b> is applied on the commission amount charged by Blinkit.

                    </p>


                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">

                        <p className="font-semibold mb-2">Example Calculation</p>

                        <ul className="space-y-1 text-sm text-gray-700">

                            <li>Selling Price: ₹1000</li>

                            <li>Commission: 18%</li>

                            <li>GST on Commission: 18%</li>

                            <li>Commission Amount = ₹180</li>

                            <li>GST on Commission = ₹32.40</li>

                            <li>Total Charges = ₹212.40</li>

                            <li className="font-semibold text-green-700">

                                Final Seller Payout = ₹787.60

                            </li>

                        </ul>

                    </div>

                </section>


                {/* Benefits */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <BadgeIndianRupee className="text-yellow-600" size={24} />

                        Benefits of Using This Calculator

                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">

                        <li>Instantly estimate Blinkit seller payout</li>

                        <li>Understand commission deductions clearly</li>

                        <li>Calculate GST applied on Blinkit commission</li>

                        <li>Plan pricing strategy for better margins</li>

                        <li>Improve product profitability before listing</li>

                    </ul>

                </section>


                {/* Tags */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">

                        <Tag className="text-indigo-600" size={24} />

                        Related Search Tags

                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[

                            "blinkit commission calculator",

                            "blinkit seller calculator",

                            "blinkit fees calculator",

                            "blinkit payout calculator",

                            "blinkit seller profit calculator",

                            "blinkit commission percentage",

                            "quick commerce seller calculator"

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