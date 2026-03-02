"use client";

import { useState } from "react";

export default function BreakEvenCalculator() {
  const [fixedCost, setFixedCost] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const fixed = parseFloat(fixedCost);
    const variable = parseFloat(variableCost);
    const price = parseFloat(sellingPrice);

    if (!fixed || !variable || !price || price <= variable) return;

    const breakEvenUnits = fixed / (price - variable);
    const breakEvenRevenue = breakEvenUnits * price;

    setResult({
      breakEvenUnits: breakEvenUnits.toFixed(0),
      breakEvenRevenue: breakEvenRevenue.toFixed(2),
    });
  };

  const loadExample = () => {
    setFixedCost("100000");
    setVariableCost("200");
    setSellingPrice("500");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Break-Even Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Total Fixed Cost (₹)"
          value={fixedCost}
          onChange={(e) => setFixedCost(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Variable Cost per Unit (₹)"
          value={variableCost}
          onChange={(e) => setVariableCost(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Selling Price per Unit (₹)"
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
          Try Example (Fixed ₹1,00,000 | VC ₹200 | SP ₹500)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Break-Even Units: {result.breakEvenUnits}
          </p>
          <p>
            Break-Even Revenue: ₹{result.breakEvenRevenue}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If your fixed cost is ₹1,00,000, variable cost per unit is ₹200,
          and selling price per unit is ₹500:
        </p>

        <p className="mt-2">
          Break-Even Units = Fixed Cost ÷ (Selling Price − Variable Cost)
        </p>

        <p>
          Break-Even Units ≈ 334 units <br />
          Break-Even Revenue ≈ ₹1,67,000
        </p>

        <p className="mt-4">
          Break-even point is when total revenue equals total cost — meaning
          no profit, no loss.
        </p>
      </div>
    </div>
  );
}