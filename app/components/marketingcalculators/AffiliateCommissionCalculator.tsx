"use client";

import { useState } from "react";
import { Percent, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function AffiliateCommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateCommission = () => {
    const sales = parseFloat(salesAmount);
    const rate = parseFloat(commissionRate);

    if (!sales || !rate) {
      setResult(null);
      return;
    }

    const commission = (sales * rate) / 100;
    setResult(parseFloat(commission.toFixed(2)));
  };

  const tryExample = () => {
    setSalesAmount("50000");
    setCommissionRate("10");
    setResult(5000);
  };

  const resetFields = () => {
    setSalesAmount("");
    setCommissionRate("");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

      {/* Title */}
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Percent className="text-green-600" />
        Affiliate Commission Calculator
      </h2>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Total Sales Amount (₹)
          </label>
          <input
            type="number"
            value={salesAmount}
            onChange={(e) => setSalesAmount(e.target.value)}
            placeholder="Enter total sales"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Commission Rate (%)
          </label>
          <input
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            placeholder="Enter commission rate"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">

        <button
          onClick={calculateCommission}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={18} />
          Calculate
        </button>

        <button
          onClick={tryExample}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={resetFields}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="mt-8 bg-indigo-50 p-5 rounded-lg text-center">
          <p className="text-lg font-semibold">
            Estimated Affiliate Commission
          </p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ₹ {result}
          </p>
        </div>
      )}
      <div className="mt-16">

  <h2 className="text-2xl font-bold mb-4">
    How Affiliate Commission is Calculated?
  </h2>

  <p className="mb-4 text-gray-700 leading-relaxed">
    Affiliate commission is calculated based on total sales generated and the agreed commission percentage.
  </p>

  <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
    Commission = (Total Sales × Commission Rate) ÷ 100
  </div>

  <h3 className="text-xl font-semibold mb-3">
    Tips to Increase Affiliate Earnings
  </h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Promote high-ticket products</li>
    <li>Target high-converting audiences</li>
    <li>Create honest product reviews</li>
    <li>Use SEO and paid ads smartly</li>
  </ul>

</div>
    </div>
  );
}