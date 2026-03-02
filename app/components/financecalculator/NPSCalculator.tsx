"use client";

import { useState } from "react";

export default function NPSCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("25");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(rate) / 100 / 12;
    const t = parseFloat(years) * 12;

    if (!P || !r || !t) return;

    // Future Value of SIP formula
    const maturity =
      P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);

    const totalInvested = P * t;
    const totalInterest = maturity - totalInvested;

    // 60% lump sum, 40% annuity rule (approximation)
    const lumpSum = maturity * 0.6;
    const annuity = maturity * 0.4;

    setResult({
      totalInvested: totalInvested.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      maturity: maturity.toFixed(2),
      lumpSum: lumpSum.toFixed(2),
      annuity: annuity.toFixed(2),
    });
  };

  const loadExample = () => {
    setMonthlyInvestment("5000");
    setRate("10");
    setYears("25");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        NPS Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Monthly Investment (₹)"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Expected Return (%)"
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
          Try Example (₹5,000 monthly for 25 years @10%)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg space-y-2 text-center">
          <p>Total Invested: ₹{result.totalInvested}</p>
          <p>Total Interest Earned: ₹{result.totalInterest}</p>
          <p className="font-semibold text-lg">
            Total Corpus: ₹{result.maturity}
          </p>
          <p>Lump Sum (60%): ₹{result.lumpSum}</p>
          <p>Annuity (40%): ₹{result.annuity}</p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          Suppose you invest ₹5,000 per month in NPS for 25 years at an
          expected return of 10%.
        </p>

        <p className="mt-2">
          Total Investment ≈ ₹15,00,000
        </p>

        <p>
          Estimated Retirement Corpus ≈ ₹66,00,000+
        </p>

        <p className="mt-4">
          Under NPS rules, 60% of the corpus can be withdrawn as lump sum,
          while 40% must be used to purchase an annuity for pension income.
        </p>
      </div>
    </div>
  );
}