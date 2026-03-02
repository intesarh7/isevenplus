"use client";

import { useState } from "react";
import { ShoppingBag, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function OrderProfitCalculator() {
    const [sellingPrice, setSellingPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [shippingCost, setShippingCost] = useState("");
    const [paymentFee, setPaymentFee] = useState("");
    const [otherCost, setOtherCost] = useState("");
    const [quantity, setQuantity] = useState("");

    const [profit, setProfit] = useState<number | null>(null);
    const [revenue, setRevenue] = useState<number | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const calculateProfit = () => {
        const price = parseFloat(sellingPrice);
        const cost = parseFloat(productCost);
        const shipping = parseFloat(shippingCost) || 0;
        const payment = parseFloat(paymentFee) || 0;
        const other = parseFloat(otherCost) || 0;
        const qty = parseFloat(quantity);

        if (isNaN(price) || isNaN(cost) || isNaN(qty)) {
            setProfit(null);
            return;
        }

        const totalRevenue = price * qty;
        const perUnitCost = cost + shipping + payment + other;
        const totalExpense = perUnitCost * qty;
        const netProfit = totalRevenue - totalExpense;

        setRevenue(parseFloat(totalRevenue.toFixed(2)));
        setTotalCost(parseFloat(totalExpense.toFixed(2)));
        setProfit(parseFloat(netProfit.toFixed(2)));
    };

    const tryExample = () => {
        setSellingPrice("1200");
        setProductCost("600");
        setShippingCost("100");
        setPaymentFee("50");
        setOtherCost("30");
        setQuantity("20");

        const totalRevenue = 1200 * 20;
        const totalExpense = (600 + 100 + 50 + 30) * 20;

        setRevenue(totalRevenue);
        setTotalCost(totalExpense);
        setProfit(totalRevenue - totalExpense);
    };

    const resetFields = () => {
        setSellingPrice("");
        setProductCost("");
        setShippingCost("");
        setPaymentFee("");
        setOtherCost("");
        setQuantity("");
        setProfit(null);
        setRevenue(null);
        setTotalCost(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <ShoppingBag className="text-green-600" />
                Order Profit Calculator
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

                <input type="number" placeholder="Shipping Cost Per Unit (₹)"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Payment Gateway Fee (₹)"
                    value={paymentFee}
                    onChange={(e) => setPaymentFee(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Other Cost (₹)"
                    value={otherCost}
                    onChange={(e) => setOtherCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Quantity Sold"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button onClick={calculateProfit}
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
                    <p className="text-lg font-semibold">Total Revenue: ₹ {revenue}</p>
                    <p className="text-lg font-semibold">Total Cost: ₹ {totalCost}</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Net Profit: ₹ {profit}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Order Profit is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Order profit depends on selling price, product cost, shipping,
                    payment fees and additional expenses.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Net Profit = (Selling Price × Quantity) − Total Costs
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Order Profit Tracking is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Helps monitor business profitability</li>
                    <li>Improves pricing strategy</li>
                    <li>Identifies hidden expenses</li>
                    <li>Optimizes marketing ROI</li>
                </ul>

            </div>
        </div>
    );
}