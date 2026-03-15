"use client";

import { BadgeIndianRupee, Calculator, Percent, Tag } from "lucide-react";
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

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" size={24} />
                        About Zepto Seller Commission Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Zepto Seller Commission Calculator helps quick commerce sellers estimate
                        their final payout after Zepto platform charges. When sellers list products
                        on Zepto, the platform deducts a commission percentage depending on product
                        category, order value, and service fees.

                    </p>

                    <p className="text-gray-700 leading-relaxed mt-3">

                        This calculator allows sellers to quickly calculate Zepto commission,
                        GST on commission, and the final amount they will receive after deductions.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" size={24} />
                        How Zepto Seller Commission Works
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Zepto typically charges commission ranging from <b>18% to 25%</b>
                        depending on the product category. In addition to the commission,
                        <b>18% GST</b> is applied on the commission amount charged by the platform.

                    </p>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="space-y-1 text-sm text-gray-700">

                            <li>Selling Price: ₹1000</li>
                            <li>Commission: 20%</li>
                            <li>GST on Commission: 18%</li>
                            <li>Commission Amount = ₹200</li>
                            <li>GST on Commission = ₹36</li>
                            <li>Total Charges = ₹236</li>

                            <li className="font-semibold text-green-700">
                                Final Seller Payout = ₹764
                            </li>

                        </ul>

                    </div>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" size={24} />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="space-y-2 text-gray-700 list-disc pl-5">

                        <li>Estimate Zepto seller payout instantly</li>
                        <li>Understand Zepto commission deductions</li>
                        <li>Calculate GST on platform commission</li>
                        <li>Improve pricing strategy before listing products</li>
                        <li>Optimize profit margins for quick commerce sellers</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" size={24} />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "zepto commission calculator",
                            "zepto seller calculator",
                            "zepto seller commission",
                            "zepto payout calculator",
                            "zepto seller profit calculator",
                            "quick commerce commission calculator",
                            "zepto seller fees calculator"
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