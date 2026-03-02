"use client";

import { useState } from "react";

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState("");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(currentAmount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    if (!P || !r || !t) return;

    // Future value adjusted for inflation
    const futureValue = P * Math.pow(1 + r, t);
    const lossOfValue = futureValue - P;

    setResult({
      futureValue: futureValue.toFixed(2),
      lossOfValue: lossOfValue.toFixed(2),
    });
  };

  const loadExample = () => {
    setCurrentAmount("100000");
    setRate("6");
    setYears("10");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Inflation Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Current Amount (₹)"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Inflation Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Number of Years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
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
          Try Example (₹1,00,000 for 10 years @6%)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Future Cost After Inflation: ₹{result.futureValue}
          </p>
          <p>
            Increase in Cost: ₹{result.lossOfValue}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If something costs ₹1,00,000 today and inflation is 6% per year,
          after 10 years its cost will be:
        </p>

        <p className="mt-2 bg-gray-100 p-3 rounded font-mono">
          Future Value = P × (1 + r)^t
        </p>

        <p className="mt-2">
          Future Cost ≈ ₹1,79,000+
        </p>

        <p className="mt-4">
          Inflation reduces purchasing power over time. This calculator helps
          you estimate how much money you will need in the future to maintain
          the same lifestyle.
        </p>
      </div>
    </div>
  );
}