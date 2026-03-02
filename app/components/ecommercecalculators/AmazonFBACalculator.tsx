"use client";

import { useState } from "react";
import { Package, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function AmazonFBACalculator() {
    const [sellingPrice, setSellingPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [referralRate, setReferralRate] = useState("");
    const [fbaFee, setFbaFee] = useState("");
    const [shippingCost, setShippingCost] = useState("");

    const [profit, setProfit] = useState<number | null>(null);
    const [totalFees, setTotalFees] = useState<number | null>(null);

    const calculateFBA = () => {
        const price = parseFloat(sellingPrice);
        const cost = parseFloat(productCost);
        const referral = parseFloat(referralRate);
        const fba = parseFloat(fbaFee);
        const shipping = parseFloat(shippingCost);

        if (
            isNaN(price) ||
            isNaN(cost) ||
            isNaN(referral) ||
            isNaN(fba) ||
            isNaN(shipping)
        ) {
            setProfit(null);
            return;
        }

        const referralFee = (price * referral) / 100;
        const total = referralFee + fba + shipping;
        const netProfit = price - cost - total;

        setTotalFees(parseFloat(total.toFixed(2)));
        setProfit(parseFloat(netProfit.toFixed(2)));
    };

    const tryExample = () => {
        setSellingPrice("2000");
        setProductCost("900");
        setReferralRate("15");
        setFbaFee("300");
        setShippingCost("100");

        const referralFee = (2000 * 15) / 100;
        const total = referralFee + 300 + 100;
        const netProfit = 2000 - 900 - total;

        setTotalFees(total);
        setProfit(netProfit);
    };

    const resetFields = () => {
        setSellingPrice("");
        setProductCost("");
        setReferralRate("");
        setFbaFee("");
        setShippingCost("");
        setProfit(null);
        setTotalFees(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Package className="text-green-600" />
                Amazon FBA Fee Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input type="number" placeholder="Selling Price (₹)"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Product Cost (₹)"
                    value={productCost}
                    onChange={(e) => setProductCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Referral Fee (%)"
                    value={referralRate}
                    onChange={(e) => setReferralRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="FBA Fee (₹)"
                    value={fbaFee}
                    onChange={(e) => setFbaFee(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Shipping Cost (₹)"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button onClick={calculateFBA}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <Calculator size={18} /> Calculate
                </button>

                <button onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <PlayCircle size={18} /> Try Example
                </button>

                <button onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {profit !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">Total Amazon Fees: ₹ {totalFees}</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Estimated Net Profit: ₹ {profit}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Amazon FBA Fees Are Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Amazon FBA fees include referral fee percentage, fulfillment (FBA) charges and shipping costs.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Net Profit = Selling Price − Product Cost − (Referral Fee + FBA Fee + Shipping)
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase Amazon FBA Profit
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Optimize product sourcing cost</li>
                    <li>Reduce shipping expense</li>
                    <li>Choose high margin categories</li>
                    <li>Improve listing conversion rate</li>
                </ul>

            </div>
        </div>
    );
}