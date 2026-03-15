"use client";

import { useState } from "react";
import { Calculator, Percent, BadgeIndianRupee, Tag } from "lucide-react";

export default function MeeshoSellerCommissionCalculator() {

    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("10");
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

    const example = () => {
        setPrice("1000");
        setCommission("10");
        setGst("18");
    };

    const reset = () => {
        setPrice("");
        setCommission("10");
        setGst("18");
        setResult(null);
    };

    return (

        <div className="mx-auto space-y-10">

            {/* Calculator */}

            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Meesho Seller Commission Calculator
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
                            Meesho Commission (%)
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

            {/* SEO CONTENT */}

            <div className="space-y-10">

                {/* About */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Calculator className="text-indigo-600" size={24} />
                        About Meesho Seller Commission Calculator
                    </h2>

                    <p className="text-gray-700 leading-relaxed">

                        Meesho Seller Commission Calculator helps sellers estimate their final payout after Meesho platform charges. Meesho is one of India's fastest growing e-commerce marketplaces where sellers can list products and reach millions of customers.

                    </p>

                    <p className="text-gray-700 mt-3">

                        This calculator allows sellers to calculate Meesho commission, GST on commission and final payout before listing products on the platform.

                    </p>

                </section>

                {/* Commission */}

                <section className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Percent className="text-green-600" size={24} />
                        How Meesho Seller Commission Works
                    </h2>

                    <p className="text-gray-700">

                        Meesho typically charges commission between <b>0% to 15%</b> depending on category and pricing rules.

                        Additionally GST (usually <b>18%</b>) may be applied on service charges depending on seller agreement.

                    </p>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">

                        <p className="font-semibold mb-2">Example</p>

                        <ul className="space-y-1 text-sm">

                            <li>Selling Price: ₹1000</li>
                            <li>Commission: 10%</li>
                            <li>GST on Commission: 18%</li>
                            <li>Commission Amount = ₹100</li>
                            <li>GST = ₹18</li>
                            <li>Total Charges = ₹118</li>

                            <li className="font-semibold text-green-700">
                                Final Seller Payout = ₹882
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

                    <ul className="list-disc pl-5 space-y-2 text-gray-700">

                        <li>Estimate Meesho seller payout instantly</li>

                        <li>Understand Meesho commission deductions</li>

                        <li>Calculate GST applied on platform fees</li>

                        <li>Plan product pricing strategy</li>

                        <li>Optimize profit margins before listing products</li>

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
                            "meesho commission calculator",
                            "meesho seller calculator",
                            "meesho seller fees calculator",
                            "meesho seller profit calculator",
                            "meesho payout calculator",
                            "meesho seller charges",
                            "meesho seller commission"
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