"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function OperatingMarginCalculator() {
  const [revenue, setRevenue] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");

  const [operatingIncome, setOperatingIncome] = useState<number | null>(null);
  const [operatingMargin, setOperatingMargin] = useState<number | null>(null);

  const calculateOperatingMargin = () => {
    const rev = parseFloat(revenue);
    const expenses = parseFloat(operatingExpenses);

    if (!rev || rev <= 0 || !expenses) return;

    const income = rev - expenses;
    const margin = (income / rev) * 100;

    setOperatingIncome(income);
    setOperatingMargin(margin);
  };

  const tryExample = () => {
    setRevenue("500000");
    setOperatingExpenses("350000");
    setTimeout(() => calculateOperatingMargin(), 100);
  };

  const resetFields = () => {
    setRevenue("");
    setOperatingExpenses("");
    setOperatingIncome(null);
    setOperatingMargin(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Operating Margin Calculator
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
          <label className="font-medium">Operating Expenses (₹)</label>
          <input
            type="number"
            value={operatingExpenses}
            onChange={(e) => setOperatingExpenses(e.target.value)}
            placeholder="Enter operating expenses"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateOperatingMargin}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Operating Margin
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

      {operatingIncome !== null && operatingMargin !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Operating Margin Breakdown</h3>

          <p>
            Operating Income: <strong>₹{operatingIncome.toFixed(2)}</strong>
          </p>

          <p>
            Operating Margin: <strong>{operatingMargin.toFixed(2)}%</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Operating Margin?</h2>
        <p>
          Operating margin measures how much profit a company makes from its operations
          before interest and taxes. It indicates operational efficiency.
        </p>

        <h2 className="text-2xl font-bold">Operating Margin Formula</h2>
        <p>
          <strong>Operating Income = Revenue - Operating Expenses</strong>
        </p>
        <p>
          <strong>Operating Margin = (Operating Income / Revenue) × 100</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Evaluate operational efficiency</li>
          <li>Investor financial analysis</li>
          <li>Business performance tracking</li>
          <li>Cost management planning</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Is operating margin same as net profit margin?
          </p>
          <p>
            No. Operating margin excludes interest and taxes, while net profit margin includes them.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. What is a good operating margin?
          </p>
          <p>
            It varies by industry, but generally higher operating margins indicate better operational efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}