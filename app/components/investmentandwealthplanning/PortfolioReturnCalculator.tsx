"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function PortfolioReturnCalculator() {
    const [stocks, setStocks] = useState([
        { buy: "", qty: "", current: "" },
        { buy: "", qty: "", current: "" },
        { buy: "", qty: "", current: "" },
    ]);

    const [result, setResult] = useState<any>(null);

    type Stock = {
  buy: string;
  qty: string;
  current: string;
};

const handleChange = (
  index: number,
  field: keyof Stock,
  value: string
) => {
  const updated = [...stocks];
  updated[index][field] = value;
  setStocks(updated);
};

    const calculatePortfolio = () => {
        let totalInvestment = 0;
        let totalValue = 0;

        stocks.forEach((stock) => {
            const buy = parseFloat(stock.buy) || 0;
            const qty = parseFloat(stock.qty) || 0;
            const current = parseFloat(stock.current) || 0;

            totalInvestment += buy * qty;
            totalValue += current * qty;
        });

        if (!totalInvestment) return;

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
        setStocks([
            { buy: "500", qty: "10", current: "600" },
            { buy: "300", qty: "20", current: "350" },
            { buy: "1000", qty: "5", current: "1100" },
        ]);
    };

    const resetFields = () => {
        setStocks([
            { buy: "", qty: "", current: "" },
            { buy: "", qty: "", current: "" },
            { buy: "", qty: "", current: "" },
        ]);
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Portfolio Return Calculator
            </h2>

            <div className="space-y-8">
                {stocks.map((stock, index) => (
                    <div key={index} className="grid md:grid-cols-3 gap-6">
                        <Input
                            label={`Stock ${index + 1} Buy Price (₹)`}
                            value={stock.buy}
                            onChange={(v) => handleChange(index, "buy", v)}
                        />
                        <Input
                            label="Quantity"
                            value={stock.qty}
                            onChange={(v) => handleChange(index, "qty", v)}
                        />
                        <Input
                            label="Current Price (₹)"
                            value={stock.current}
                            onChange={(v) => handleChange(index, "current", v)}
                        />
                    </div>
                ))}
            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculatePortfolio}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Portfolio
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
                    <h3 className="text-xl font-semibold mb-4">Portfolio Summary</h3>

                    <p>Total Investment: ₹ {Number(result.totalInvestment).toLocaleString()}</p>
                    <p>Current Portfolio Value: ₹ {Number(result.totalValue).toLocaleString()}</p>
                    <p className={`font-bold ${Number(result.profitLoss) >= 0 ? "text-green-600" : "text-red-600"}`}>
                        Profit / Loss: ₹ {Number(result.profitLoss).toLocaleString()}
                    </p>
                    <p>Overall Return: {result.returnPercent}%</p>
                </div>
            )}

            <div className="max-w-6xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is Portfolio Return?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Portfolio return measures the overall performance of multiple investments
                    combined. It helps investors understand total profit, loss, and percentage
                    return across their entire stock portfolio.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    How Portfolio Return is Calculated
                </h3>

                <p className="text-gray-700 mb-6">
                    Portfolio return is calculated by dividing total profit or loss
                    by total investment and multiplying by 100.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Portfolio Return Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator helps investors track overall portfolio performance
                    instantly, making investment decisions smarter and data-driven.
                </p>

            </div>

        </div>
    );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}