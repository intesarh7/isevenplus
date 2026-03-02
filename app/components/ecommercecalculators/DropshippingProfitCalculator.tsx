"use client";

import { useState } from "react";
import { ShoppingCart, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function DropshippingProfitCalculator() {
    const [sellingPrice, setSellingPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [adCost, setAdCost] = useState("");
    const [quantity, setQuantity] = useState("");

    const [profit, setProfit] = useState<number | null>(null);
    const [revenue, setRevenue] = useState<number | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const calculateProfit = () => {
        const price = parseFloat(sellingPrice);
        const cost = parseFloat(productCost);
        const ads = parseFloat(adCost);
        const qty = parseFloat(quantity);

        if (!price || !cost || !ads || !qty) {
            setProfit(null);
            return;
        }

        const totalRevenue = price * qty;
        const totalExpense = (cost + ads) * qty;
        const netProfit = totalRevenue - totalExpense;

        setRevenue(parseFloat(totalRevenue.toFixed(2)));
        setTotalCost(parseFloat(totalExpense.toFixed(2)));
        setProfit(parseFloat(netProfit.toFixed(2)));
    };

    const tryExample = () => {
        setSellingPrice("1500");
        setProductCost("800");
        setAdCost("200");
        setQuantity("50");

        const totalRevenue = 1500 * 50;
        const totalExpense = (800 + 200) * 50;

        setRevenue(totalRevenue);
        setTotalCost(totalExpense);
        setProfit(totalRevenue - totalExpense);
    };

    const resetFields = () => {
        setSellingPrice("");
        setProductCost("");
        setAdCost("");
        setQuantity("");
        setProfit(null);
        setRevenue(null);
        setTotalCost(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <ShoppingCart className="text-green-600" />
                Dropshipping Profit Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">Selling Price (₹)</label>
                    <input
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Product Cost (₹)</label>
                    <input
                        type="number"
                        value={productCost}
                        onChange={(e) => setProductCost(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Ad Cost Per Sale (₹)</label>
                    <input
                        type="number"
                        value={adCost}
                        onChange={(e) => setAdCost(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Quantity Sold</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateProfit}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} />
                    Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {/* Results */}
            {profit !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-3">
                    <p className="text-lg font-semibold">Total Revenue: ₹ {revenue}</p>
                    <p className="text-lg font-semibold">Total Cost: ₹ {totalCost}</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Net Profit: ₹ {profit}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Dropshipping Profit is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Dropshipping profit depends on selling price, product cost, advertising cost and total quantity sold.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Net Profit = (Selling Price − Product Cost − Ad Cost) × Quantity Sold
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase Dropshipping Profit
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Optimize ad targeting</li>
                    <li>Negotiate supplier pricing</li>
                    <li>Increase average order value</li>
                    <li>Improve conversion rate</li>
                </ul>

            </div>
        </div>
    );
}