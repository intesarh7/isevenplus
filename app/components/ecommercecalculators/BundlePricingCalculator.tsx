"use client";

import { useState } from "react";
import { Gift, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function BundlePricingCalculator() {
    const [productPrice, setProductPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [quantity, setQuantity] = useState("");
    const [discountRate, setDiscountRate] = useState("");

    const [bundlePrice, setBundlePrice] = useState<number | null>(null);
    const [profit, setProfit] = useState<number | null>(null);

    const calculateBundle = () => {
        const price = parseFloat(productPrice);
        const cost = parseFloat(productCost);
        const qty = parseFloat(quantity);
        const discount = parseFloat(discountRate) || 0;

        if (isNaN(price) || isNaN(cost) || isNaN(qty)) {
            setBundlePrice(null);
            return;
        }

        const totalPrice = price * qty;
        const totalCost = cost * qty;
        const discountAmount = (totalPrice * discount) / 100;
        const finalPrice = totalPrice - discountAmount;
        const netProfit = finalPrice - totalCost;

        setBundlePrice(parseFloat(finalPrice.toFixed(2)));
        setProfit(parseFloat(netProfit.toFixed(2)));
    };

    const tryExample = () => {
        setProductPrice("1000");
        setProductCost("600");
        setQuantity("3");
        setDiscountRate("15");

        const totalPrice = 1000 * 3;
        const totalCost = 600 * 3;
        const discountAmount = (totalPrice * 15) / 100;
        const finalPrice = totalPrice - discountAmount;

        setBundlePrice(finalPrice);
        setProfit(finalPrice - totalCost);
    };

    const resetFields = () => {
        setProductPrice("");
        setProductCost("");
        setQuantity("");
        setDiscountRate("");
        setBundlePrice(null);
        setProfit(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Gift className="text-green-600" />
                Bundle Pricing Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Selling Price Per Product (₹)"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Product Cost Per Unit (₹)"
                    value={productCost}
                    onChange={(e) => setProductCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Quantity in Bundle"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Bundle Discount (%)"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateBundle}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} /> Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {bundlePrice !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Final Bundle Price: ₹ {bundlePrice}
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Estimated Profit: ₹ {profit}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Bundle Pricing Works?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Bundle pricing combines multiple products into one offer
                    with a discount to increase sales volume.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Final Price = (Product Price × Quantity) − Discount
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Benefits of Bundle Pricing
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Increases average order value</li>
                    <li>Boosts product sales</li>
                    <li>Improves customer perception of value</li>
                    <li>Clears slow-moving inventory</li>
                </ul>

            </div>
        </div>
    );
}