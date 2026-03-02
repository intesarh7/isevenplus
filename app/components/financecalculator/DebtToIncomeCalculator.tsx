"use client";

import { useState } from "react";

export default function DebtToIncomeCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome);
    const debt = parseFloat(monthlyDebt);

    if (!income || !debt) return;

    const dti = (debt / income) * 100;

    let category = "";
    if (dti <= 35) category = "Healthy";
    else if (dti <= 50) category = "Moderate";
    else category = "High Risk";

    setResult({
      dti: dti.toFixed(2),
      category,
    });
  };

  const loadExample = () => {
    setMonthlyIncome("80000");
    setMonthlyDebt("25000");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Debt-to-Income (DTI) Ratio Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Gross Monthly Income (₹)"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Total Monthly Debt Payments (₹)"
          value={monthlyDebt}
          onChange={(e) => setMonthlyDebt(e.target.value)}
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
          Try Example (₹80k income, ₹25k debt)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="text-lg font-semibold">
            DTI Ratio: {result.dti}%
          </p>
          <p>
            Risk Category: <span className="font-bold">{result.category}</span>
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          What is Debt-to-Income Ratio?
        </h3>
        <p>
          DTI ratio measures the percentage of your monthly income that goes
          toward debt payments. Lenders use it to evaluate your ability to
          repay loans.
        </p>
        <p className="mt-2">
          Formula: DTI = (Total Monthly Debt ÷ Gross Monthly Income) × 100
        </p>
        <p className="mt-2">
          Generally, a DTI below 35% is considered healthy.
        </p>
      </div>
    </div>
  );
}