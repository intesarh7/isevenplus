"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function FlipkartSellerProfitCalculator() {

    const [price, setPrice] = useState("");
    const [cost, setCost] = useState("");
    const [commission, setCommission] = useState("18");
    const [shipping, setShipping] = useState("40");
    const [gst, setGst] = useState("18");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const sellingPrice = Number(price);
        const productCost = Number(cost);
        const commissionRate = Number(commission);
        const shippingFee = Number(shipping);
        const gstRate = Number(gst);

        if (!sellingPrice || !productCost) return;

        const commissionFee = (sellingPrice * commissionRate) / 100;

        const gstOnFees = ((commissionFee + shippingFee) * gstRate) / 100;

        const totalFees = commissionFee + shippingFee + gstOnFees;

        const profit = sellingPrice - productCost - totalFees;

        setResult({
            commissionFee,
            shippingFee,
            gstOnFees,
            totalFees,
            profit
        });

    };

    const example = () => {
        setPrice("1000");
        setCost("600");
        setCommission("18");
        setShipping("40");
        setGst("18");
    };

    const reset = () => {
        setPrice("");
        setCost("");
        setCommission("18");
        setShipping("40");
        setGst("18");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Flipkart Seller Profit Calculator
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
                        <label className="block text-sm font-medium">
                            Flipkart Commission (%)
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
                            Shipping Fee (₹)
                        </label>

                        <input
                            type="number"
                            value={shipping}
                            onChange={(e) => setShipping(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
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

                        <p>Commission Fee: ₹{result.commissionFee.toFixed(2)}</p>

                        <p>Shipping Fee: ₹{result.shippingFee.toFixed(2)}</p>

                        <p>GST on Fees: ₹{result.gstOnFees.toFixed(2)}</p>

                        <p>Total Platform Fees: ₹{result.totalFees.toFixed(2)}</p>

                        <p className={`text-lg font-semibold ${result.profit > 0 ? "text-green-700" : "text-red-600"}`}>
                            Seller Profit: ₹{result.profit.toFixed(2)}
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About Flipkart Seller Profit Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Flipkart Seller Profit Calculator helps online sellers estimate their actual profit after Flipkart marketplace charges. Sellers on Flipkart need to consider multiple fees including commission, shipping charges, and GST applied on platform services.

                    </p>

                    <p className="text-gray-700 mt-3">

                        Using this calculator sellers can quickly estimate their net profit before listing products on Flipkart marketplace.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How Flipkart Seller Fees Work
                    </h2>

                    <p className="text-gray-700">

                        Flipkart generally charges <b>10% to 25%</b> commission depending on product category. Sellers may also pay shipping charges and GST on platform fees.

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="text-sm space-y-1">

                            <li>Selling Price: ₹1000</li>
                            <li>Product Cost: ₹600</li>
                            <li>Commission: 18%</li>
                            <li>Shipping Fee: ₹40</li>

                            <li>Commission Fee = ₹180</li>
                            <li>Shipping Fee = ₹40</li>
                            <li>GST = ₹39.60</li>

                            <li className="text-green-700 font-semibold">
                                Final Profit = ₹140.40
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

                        <li>Calculate Flipkart seller profit instantly</li>
                        <li>Understand commission and shipping fees</li>
                        <li>Estimate GST on platform charges</li>
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
                            "flipkart seller profit calculator",
                            "flipkart commission calculator",
                            "flipkart seller fees calculator",
                            "flipkart seller charges",
                            "flipkart seller payout calculator",
                            "flipkart marketplace profit calculator",
                            "flipkart seller earnings calculator"
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