"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function GSTProfitMarginCalculator() {

    const [cost, setCost] = useState("");
    const [selling, setSelling] = useState("");
    const [gst, setGst] = useState("18");

    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const costPrice = Number(cost);
        const sellingPrice = Number(selling);
        const gstRate = Number(gst);

        if (!costPrice || !sellingPrice) return;

        const gstAmount = (sellingPrice * gstRate) / 100;

        const profit = sellingPrice - costPrice - gstAmount;

        const margin = (profit / sellingPrice) * 100;

        setResult({
            gstAmount,
            profit,
            margin
        });

    };

    const example = () => {
        setCost("500");
        setSelling("800");
        setGst("18");
    };

    const reset = () => {
        setCost("");
        setSelling("");
        setGst("18");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    GST Profit Margin Calculator
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="text-sm font-medium block">
                            Product Cost Price (₹)
                        </label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter cost price"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block">
                            Selling Price (₹)
                        </label>
                        <input
                            type="number"
                            value={selling}
                            onChange={(e) => setSelling(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter selling price"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block">
                            GST Rate (%)
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

                        <p>GST Amount: ₹{result.gstAmount.toFixed(2)}</p>

                        <p>Net Profit: ₹{result.profit.toFixed(2)}</p>

                        <p className="text-green-700 text-lg font-semibold">
                            Profit Margin: {result.margin.toFixed(2)}%
                        </p>

                    </div>

                )}

            </div>


            {/* SEO CONTENT */}

            <div className="space-y-10">

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" />
                        About GST Profit Margin Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        GST Profit Margin Calculator helps businesses and sellers estimate their actual profit after accounting for GST charges. When selling products in India, businesses must include GST in the selling price depending on the applicable tax rate.

                    </p>

                    <p className="text-gray-700 mt-3">

                        This calculator helps you determine GST amount, net profit, and profit margin so you can price your products correctly.

                    </p>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" />
                        How GST Profit Calculation Works
                    </h2>

                    <p className="text-gray-700">

                        GST is calculated as a percentage of the selling price. Businesses must deduct GST from the sale amount to determine the actual revenue and profit.

                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm">

                        <p>GST Amount = Selling Price × GST Rate</p>
                        <p>Profit = Selling Price − Cost Price − GST</p>
                        <p>Profit Margin = Profit ÷ Selling Price × 100</p>

                    </div>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <BadgeIndianRupee className="text-yellow-600" />
                        Benefits of Using This Calculator
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Calculate GST profit margin instantly</li>
                        <li>Understand the impact of GST on profits</li>
                        <li>Set better product pricing</li>
                        <li>Improve business profit planning</li>
                        <li>Useful for ecommerce sellers and retailers</li>

                    </ul>

                </section>


                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Tag className="text-indigo-600" />
                        Related Search Tags
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "gst profit margin calculator",
                            "gst margin calculator",
                            "gst profit calculator",
                            "gst selling price calculator",
                            "gst profit percentage calculator",
                            "gst cost profit calculator",
                            "gst business profit calculator"
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