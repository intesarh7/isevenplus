"use client";

import { useState } from "react";

export default function HouseAffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(monthlyExpenses);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanYears);

    if (!income || !annualRate || !years) return;

    // Assume 40% of disposable income can go to EMI
    const disposableIncome = income - (expenses || 0);
    const maxEMI = disposableIncome * 0.4;

    const r = annualRate / 100 / 12;
    const n = years * 12;

    const loanAmount =
      (maxEMI * (Math.pow(1 + r, n) - 1)) /
      (r * Math.pow(1 + r, n));

    setResult({
      maxEMI: maxEMI.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
    });
  };

  const loadExample = () => {
    setMonthlyIncome("100000");
    setMonthlyExpenses("30000");
    setInterestRate("8.5");
    setLoanYears("20");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        House Affordability Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Monthly Income (₹)"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Monthly Expenses (₹)"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
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
          Try Example (₹1L income, ₹30k expenses)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Affordable EMI: ₹{result.maxEMI}
          </p>
          <p>
            Estimated Loan Eligibility: ₹{result.loanAmount}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          How House Affordability Works
        </h3>
        <p>
          Lenders generally allow up to 35–45% of your disposable income
          towards EMI payments. This calculator estimates the maximum loan
          you can afford based on your income, expenses, interest rate
          and loan term.
        </p>
      </div>
    </div>
  );
}