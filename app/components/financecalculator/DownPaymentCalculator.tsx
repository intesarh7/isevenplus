"use client";

import { useState } from "react";

export default function DownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPercent, setDownPercent] = useState("20");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const percent = parseFloat(downPercent);

    if (!price || !percent) return;

    const downAmount = (price * percent) / 100;
    const loanAmount = price - downAmount;
    const ltv = (loanAmount / price) * 100;

    setResult({
      downAmount: downAmount.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      ltv: ltv.toFixed(2),
    });
  };

  const loadExample = () => {
    setHomePrice("400000");
    setDownPercent("20");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Down Payment Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Home Price ($)"
          value={homePrice}
          onChange={(e) => setHomePrice(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Down Payment (%)"
          value={downPercent}
          onChange={(e) => setDownPercent(e.target.value)}
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="mt-4 space-y-3">
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
          Try Example (20% on $400,000)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p>Down Payment Amount: ${result.downAmount}</p>
          <p>Loan Amount: ${result.loanAmount}</p>
          <p className="text-lg font-bold">
            Loan-to-Value (LTV): {result.ltv}%
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          Why Down Payment Matters?
        </h3>
        <p>
          A higher down payment reduces your loan amount and monthly EMI.
          It also lowers your Loan-to-Value (LTV) ratio, which may help
          you qualify for better interest rates and avoid mortgage insurance.
        </p>
      </div>
    </div>
  );
}