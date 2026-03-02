"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function StockAverageCalculator() {
    const [price1, setPrice1] = useState("");
    const [qty1, setQty1] = useState("");
    const [price2, setPrice2] = useState("");
    const [qty2, setQty2] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateAverage = () => {
        const p1 = parseFloat(price1) || 0;
        const q1 = parseFloat(qty1) || 0;
        const p2 = parseFloat(price2) || 0;
        const q2 = parseFloat(qty2) || 0;
        const cp = parseFloat(currentPrice) || 0;

        if (!p1 || !q1) return;

        const totalInvestment = (p1 * q1) + (p2 * q2);
        const totalQty = q1 + q2;
        const avgPrice = totalInvestment / totalQty;

        const currentValue = cp ? totalQty * cp : 0;
        const profitLoss = cp ? currentValue - totalInvestment : 0;

        setResult({
            totalInvestment: totalInvestment.toFixed(0),
            totalQty: totalQty.toFixed(0),
            avgPrice: avgPrice.toFixed(2),
            profitLoss: profitLoss.toFixed(0),
        });
    };

    const tryExample = () => {
        setPrice1("500");
        setQty1("10");
        setPrice2("400");
        setQty2("20");
        setCurrentPrice("450");
    };

    const resetFields = () => {
        setPrice1("");
        setQty1("");
        setPrice2("");
        setQty2("");
        setCurrentPrice("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Stock Average Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Buy Price 1 (₹)" value={price1} setValue={setPrice1} />
                <Input label="Quantity 1" value={qty1} setValue={setQty1} />
                <Input label="Buy Price 2 (₹)" value={price2} setValue={setPrice2} />
                <Input label="Quantity 2" value={qty2} setValue={setQty2} />
                <Input label="Current Market Price (₹)" value={currentPrice} setValue={setCurrentPrice} />

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateAverage}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Average
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
                    <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>

                    <p>Total Investment: ₹ {Number(result.totalInvestment).toLocaleString()}</p>
                    <p>Total Shares: {result.totalQty}</p>
                    <p>Average Price: ₹ {result.avgPrice}</p>
                    {currentPrice && (
                        <p className="font-bold text-lg">
                            Profit / Loss: ₹ {Number(result.profitLoss).toLocaleString()}
                        </p>
                    )}
                </div>
            )}

            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is Stock Averaging?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Stock averaging is a strategy where investors buy additional shares
                    at different price levels to reduce their overall average purchase price.
                    This helps manage losses during market corrections.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Stock Average Formula
                </h3>

                <p className="text-gray-700 mb-6">
                    Average Price = Total Investment ÷ Total Shares
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Stock Average Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator helps traders and long-term investors calculate their
                    updated average price after multiple purchases. It also estimates current
                    profit or loss instantly.
                </p>

            </div>

        </div>
    );
}

function Input({ label, value, setValue }: any) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}