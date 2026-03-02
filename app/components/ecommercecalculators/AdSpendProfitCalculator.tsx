"use client";

import { useState } from "react";
import { BarChart3, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function AdSpendProfitCalculator() {
    const [adSpend, setAdSpend] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [sales, setSales] = useState("");

    const [revenue, setRevenue] = useState<number | null>(null);
    const [profit, setProfit] = useState<number | null>(null);
    const [roi, setRoi] = useState<number | null>(null);

    const calculateProfit = () => {
        const spend = parseFloat(adSpend);
        const price = parseFloat(sellingPrice);
        const cost = parseFloat(productCost);
        const totalSales = parseFloat(sales);

        if (isNaN(spend) || isNaN(price) || isNaN(cost) || isNaN(totalSales)) {
            setProfit(null);
            return;
        }

        const totalRevenue = price * totalSales;
        const totalCost = cost * totalSales;
        const netProfit = totalRevenue - totalCost - spend;
        const roiPercent = spend > 0 ? (netProfit / spend) * 100 : 0;

        setRevenue(parseFloat(totalRevenue.toFixed(2)));
        setProfit(parseFloat(netProfit.toFixed(2)));
        setRoi(parseFloat(roiPercent.toFixed(2)));
    };

    const tryExample = () => {
        setAdSpend("20000");
        setSellingPrice("1500");
        setProductCost("700");
        setSales("50");

        const totalRevenue = 1500 * 50;
        const totalCost = 700 * 50;
        const netProfit = totalRevenue - totalCost - 20000;
        const roiPercent = (netProfit / 20000) * 100;

        setRevenue(totalRevenue);
        setProfit(netProfit);
        setRoi(parseFloat(roiPercent.toFixed(2)));
    };

    const resetFields = () => {
        setAdSpend("");
        setSellingPrice("");
        setProductCost("");
        setSales("");
        setRevenue(null);
        setProfit(null);
        setRoi(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <BarChart3 className="text-green-600" />
                Ad Spend Profit Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input type="number" placeholder="Ad Spend (₹)"
                    value={adSpend}
                    onChange={(e) => setAdSpend(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Selling Price (₹)"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Product Cost Per Unit (₹)"
                    value={productCost}
                    onChange={(e) => setProductCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Number of Sales"
                    value={sales}
                    onChange={(e) => setSales(e.target.value)}
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
                    <p className="text-lg font-semibold">Net Profit: ₹ {profit}</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        ROI: {roi} %
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Ad Spend Profit is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Ad campaign profit depends on total revenue generated from sales
                    minus product cost and advertising spend.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    ROI (%) = (Net Profit ÷ Ad Spend) × 100
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Tracking Ad Profit is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Helps scale profitable campaigns</li>
                    <li>Stops loss-making ads early</li>
                    <li>Improves marketing efficiency</li>
                    <li>Optimizes return on investment</li>
                </ul>

            </div>
        </div>
    );
}