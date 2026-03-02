"use client";

import { useState } from "react";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState("");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(yearlyInvestment);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    if (!P || !r || !t) return;

    let totalAmount = 0;

    for (let i = 1; i <= t; i++) {
      totalAmount = (totalAmount + P) * (1 + r);
    }

    const totalInvested = P * t;
    const totalInterest = totalAmount - totalInvested;

    setResult({
      totalInvested: totalInvested.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      maturityAmount: totalAmount.toFixed(2),
    });
  };

  const loadExample = () => {
    setYearlyInvestment("100000");
    setRate("7.1");
    setYears("15");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        PPF Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Yearly Investment (₹)"
          value={yearlyInvestment}
          onChange={(e) => setYearlyInvestment(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Investment Period (Years)"
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
          Try Example (₹1,00,000 yearly for 15 years @7.1%)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold">
            Total Invested: ₹{result.totalInvested}
          </p>
          <p>
            Total Interest Earned: ₹{result.totalInterest}
          </p>
          <p className="text-lg font-bold">
            Maturity Amount: ₹{result.maturityAmount}
          </p>
        </div>
      )}

      {/* SEO Explanation Section */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          Suppose you invest ₹1,00,000 every year in PPF for 15 years at an interest rate of 7.1%.
        </p>

        <p className="mt-2">
          Total Investment = ₹15,00,000
        </p>

        <p className="mt-2">
          Estimated Maturity Amount ≈ ₹27,12,000+
        </p>

        <p className="mt-4">
          PPF (Public Provident Fund) is a government-backed long-term savings scheme 
          offering tax benefits under Section 80C and tax-free returns.
        </p>
      </div>
    </div>
  );
}