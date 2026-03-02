"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function NetProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);

  const calculateProfit = () => {
    const rev = parseFloat(revenue);
    const exp = parseFloat(expenses);

    if (!rev || rev <= 0) return;

    const net = rev - exp;
    const profitMargin = (net / rev) * 100;

    setResult(net);
    setMargin(profitMargin);
  };

  const tryExample = () => {
    setRevenue("150000");
    setExpenses("90000");
    setTimeout(() => calculateProfit(), 100);
  };

  const resetFields = () => {
    setRevenue("");
    setExpenses("");
    setResult(null);
    setMargin(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Net Profit Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Total Revenue (₹)</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="Enter total revenue"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Expenses (₹)</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="Enter total expenses"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateProfit}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate
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

      {result !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            Net Profit: <strong>₹{result.toFixed(2)}</strong>
          </p>
          <p className="text-lg">
            Net Profit Margin: <strong>{margin?.toFixed(2)}%</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is a Net Profit Calculator?
        </h2>
        <p>
          A Net Profit Calculator helps businesses calculate the final profit
          after deducting all expenses from total revenue. It also shows the
          net profit margin percentage.
        </p>

        <h2 className="text-2xl font-bold">
          Net Profit Formula
        </h2>
        <p>
          <strong>Net Profit = Total Revenue - Total Expenses</strong>
        </p>
        <p>
          <strong>Net Profit Margin = (Net Profit / Revenue) × 100</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use This Tool?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Understand real business profitability</li>
          <li>Track overall financial performance</li>
          <li>Make better pricing decisions</li>
          <li>Essential for investors & startups</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. What is the difference between gross and net profit?
          </p>
          <p>
            Gross profit deducts only cost of goods sold, while net profit
            deducts all business expenses including taxes and operating costs.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Is net profit always positive?
          </p>
          <p>
            No. If expenses exceed revenue, the result will be a net loss.
          </p>
        </div>
      </div>
    </div>
  );
}