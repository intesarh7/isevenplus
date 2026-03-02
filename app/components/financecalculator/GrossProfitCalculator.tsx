"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function GrossProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue);
    const cst = parseFloat(cost);

    if (!rev || rev <= 0) return;

    const gross = rev - cst;
    const profitMargin = (gross / rev) * 100;

    setResult(gross);
    setMargin(profitMargin);
  };

  const handleExample = () => {
    setRevenue("100000");
    setCost("60000");
    setTimeout(() => calculate(), 100);
  };

  const handleReset = () => {
    setRevenue("");
    setCost("");
    setResult(null);
    setMargin(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-green-600" size={28} />
        Gross Profit Calculator
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
          <label className="font-medium">Cost of Goods Sold (₹)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter total cost"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={calculate}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate
        </button>

        <button
          onClick={handleExample}
          className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {result !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            Gross Profit: <strong>₹{result.toFixed(2)}</strong>
          </p>
          <p className="text-lg">
            Gross Profit Margin: <strong>{margin?.toFixed(2)}%</strong>
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is a Gross Profit Calculator?
        </h2>
        <p>
          A Gross Profit Calculator helps businesses determine the difference
          between total revenue and cost of goods sold (COGS). It also
          calculates the gross profit margin percentage.
        </p>

        <h2 className="text-2xl font-bold">Why Use This Tool?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Measure business profitability</li>
          <li>Improve pricing strategy</li>
          <li>Track operational efficiency</li>
          <li>Financial planning & analysis</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>
        <div>
          <p className="font-semibold">
            1. What is Gross Profit?
          </p>
          <p>
            Gross profit is the amount remaining after subtracting cost of goods
            sold from total revenue.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. What is Gross Profit Margin?
          </p>
          <p>
            It is the percentage of revenue that exceeds the cost of goods sold.
          </p>
        </div>
      </div>
    </div>
  );
}