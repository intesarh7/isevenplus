"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function StockReturnCalculator() {
    const [buyPrice, setBuyPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateReturn = () => {
        const buy = parseFloat(buyPrice) || 0;
        const sell = parseFloat(sellPrice) || 0;
        const qty = parseFloat(quantity) || 0;

        if (!buy || !sell || !qty) return;

        const totalInvestment = buy * qty;
        const totalValue = sell * qty;
        const profitLoss = totalValue - totalInvestment;
        const returnPercent = (profitLoss / totalInvestment) * 100;

        setResult({
            totalInvestment: totalInvestment.toFixed(0),
            totalValue: totalValue.toFixed(0),
            profitLoss: profitLoss.toFixed(0),
            returnPercent: returnPercent.toFixed(2),
        });
    };

    const tryExample = () => {
        setBuyPrice("500");
        setSellPrice("650");
        setQuantity("20");
    };

    const resetFields = () => {
        setBuyPrice("");
        setSellPrice("");
        setQuantity("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Stock Return Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Buy Price (₹)
                    </label>
                    <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Sell / Current Price (₹)
                    </label>
                    <input
                        type="number"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Quantity
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateReturn}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Return
                </button>

                <button
                    onClick={tryExample}
                    className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {result && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Return Summary</h3>

                    <p>Total Investment: ₹ {Number(result.totalInvestment).toLocaleString()}</p>
                    <p>Current Value: ₹ {Number(result.totalValue).toLocaleString()}</p>
                    <p className={`font-bold ${Number(result.profitLoss) >= 0 ? "text-green-600" : "text-red-600"}`}>
                        Profit / Loss: ₹ {Number(result.profitLoss).toLocaleString()}
                    </p>
                    <p>
                        Return Percentage: {result.returnPercent}%
                    </p>
                </div>
            )}
            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    How to Calculate Stock Returns?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Stock return measures the gain or loss generated from an investment
                    over a period of time. It helps investors understand the performance
                    of their stock holdings.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Stock Return Formula
                </h3>

                <p className="text-gray-700 mb-6">
                    Return (%) = [(Sell Price − Buy Price) ÷ Buy Price] × 100
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Stock Return Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator instantly shows total investment value, profit or loss,
                    and percentage return, helping investors track stock performance accurately.
                </p>

            </div>
        </div>
    );
}