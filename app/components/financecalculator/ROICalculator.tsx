"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [investment, setInvestment] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const invest = parseFloat(investment);
    const returns = parseFloat(returnAmount);
    const time = parseFloat(years);

    if (!invest || !returns) return;

    const profit = returns - invest;
    const roi = (profit / invest) * 100;

    let annualizedROI = null;
    if (time && time > 0) {
      annualizedROI =
        (Math.pow(returns / invest, 1 / time) - 1) * 100;
    }

    setResult({
      profit: profit.toFixed(2),
      roi: roi.toFixed(2),
      annualizedROI: annualizedROI
        ? annualizedROI.toFixed(2)
        : null,
    });
  };

  const loadExample = () => {
    setInvestment("100000");
    setReturnAmount("150000");
    setYears("3");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ROI Calculator (Return on Investment)
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Initial Investment (₹)"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Final Return Amount (₹)"
          value={returnAmount}
          onChange={(e) => setReturnAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Investment Period (Years - Optional)"
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
          Try Example (₹1,00,000 → ₹1,50,000 in 3 Years)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Profit: ₹{result.profit}
          </p>
          <p>Total ROI: {result.roi}%</p>
          {result.annualizedROI && (
            <p>
              Annualized ROI: {result.annualizedROI}%
            </p>
          )}
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If you invest ₹1,00,000 and receive ₹1,50,000 after 3 years:
        </p>

        <p className="mt-2">
          Profit = ₹50,000 <br />
          ROI = 50%
        </p>

        <p>
          Annualized ROI ≈ 14.47%
        </p>

        <p className="mt-4">
          ROI measures how efficiently your investment generates profit.
          Annualized ROI helps compare investments held for different time periods.
        </p>
      </div>
    </div>
  );
}