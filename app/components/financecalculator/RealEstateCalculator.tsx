"use client";

import { useState } from "react";

export default function RealEstateCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [annualRent, setAnnualRent] = useState("");
  const [annualExpenses, setAnnualExpenses] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment) || 0;
    const rent = parseFloat(annualRent) || 0;
    const expenses = parseFloat(annualExpenses) || 0;

    if (!price) return;

    const loanAmount = price - down;
    const netCashFlow = rent - expenses;
    const roi = down > 0 ? (netCashFlow / down) * 100 : 0;

    setResult({
      loanAmount: loanAmount.toFixed(2),
      netCashFlow: netCashFlow.toFixed(2),
      roi: roi.toFixed(2),
    });
  };

  const loadExample = () => {
    setPropertyPrice("5000000");
    setDownPayment("1000000");
    setAnnualRent("360000");
    setAnnualExpenses("60000");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Real Estate Investment Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Property Price (₹)"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Down Payment (₹)"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Annual Rental Income (₹)"
          value={annualRent}
          onChange={(e) => setAnnualRent(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Annual Expenses (₹)"
          value={annualExpenses}
          onChange={(e) => setAnnualExpenses(e.target.value)}
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
          Try Example (₹50L property)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold">
            Loan Amount Required: ₹{result.loanAmount}
          </p>
          <p>
            Net Annual Cash Flow: ₹{result.netCashFlow}
          </p>
          <p className="text-lg font-bold">
            ROI on Down Payment: {result.roi}%
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          How Real Estate ROI Works
        </h3>
        <p>
          This calculator estimates your annual return on investment (ROI)
          based on rental income and expenses. ROI is calculated as:
        </p>
        <p className="mt-2">
          ROI = (Net Annual Cash Flow ÷ Down Payment) × 100
        </p>
        <p className="mt-2">
          Investors use this metric to evaluate rental property performance.
        </p>
      </div>
    </div>
  );
}