"use client";

import { useState } from "react";

export default function ProfitMarginCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const cost = parseFloat(costPrice);
    const sell = parseFloat(sellingPrice);

    if (!cost || !sell) return;

    const profit = sell - cost;
    const margin = (profit / sell) * 100;
    const markup = (profit / cost) * 100;

    setResult({
      profit: profit.toFixed(2),
      margin: margin.toFixed(2),
      markup: markup.toFixed(2),
    });
  };

  const loadExample = () => {
    setCostPrice("500");
    setSellingPrice("800");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Profit Margin Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Cost Price (₹)"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Selling Price (₹)"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold transition"
        >
          Calculate
        </button>

        <button
          onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-medium"
        >
          Try Example (Cost ₹500, Sell ₹800)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Profit: ₹{result.profit}
          </p>
          <p>Profit Margin: {result.margin}%</p>
          <p>Markup: {result.markup}%</p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If the cost price of a product is ₹500 and you sell it for ₹800:
        </p>

        <p className="mt-2">
          Profit = ₹300 <br />
          Profit Margin = 37.5% <br />
          Markup = 60%
        </p>

        <p className="mt-4">
          Profit margin is calculated as (Profit ÷ Selling Price) × 100.
          Markup is calculated as (Profit ÷ Cost Price) × 100.
        </p>
      </div>
    </div>
  );
}