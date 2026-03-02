"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function BusinessValuationCalculator() {
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [annualProfit, setAnnualProfit] = useState("");
  const [ebitda, setEbitda] = useState("");
  const [multiplier, setMultiplier] = useState("");

  const [revenueValuation, setRevenueValuation] = useState<number | null>(null);
  const [profitValuation, setProfitValuation] = useState<number | null>(null);
  const [ebitdaValuation, setEbitdaValuation] = useState<number | null>(null);

  const calculateValuation = () => {
    const revenue = parseFloat(annualRevenue) || 0;
    const profit = parseFloat(annualProfit) || 0;
    const ebitdaValue = parseFloat(ebitda) || 0;
    const multiple = parseFloat(multiplier) || 0;

    if (!multiple) return;

    setRevenueValuation(revenue * multiple);
    setProfitValuation(profit * multiple);
    setEbitdaValuation(ebitdaValue * multiple);
  };

  const tryExample = () => {
    setAnnualRevenue("5000000");
    setAnnualProfit("800000");
    setEbitda("1000000");
    setMultiplier("3");
    setTimeout(() => calculateValuation(), 100);
  };

  const resetFields = () => {
    setAnnualRevenue("");
    setAnnualProfit("");
    setEbitda("");
    setMultiplier("");
    setRevenueValuation(null);
    setProfitValuation(null);
    setEbitdaValuation(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Business Valuation Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Annual Revenue (₹)"
          value={annualRevenue}
          onChange={(e) => setAnnualRevenue(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Annual Net Profit (₹)"
          value={annualProfit}
          onChange={(e) => setAnnualProfit(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="EBITDA (₹) (Optional)"
          value={ebitda}
          onChange={(e) => setEbitda(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Industry Multiplier"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={calculateValuation}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Valuation
        </button>

        <button
          onClick={tryExample}
          className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={resetFields}
          className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {(revenueValuation !== null || profitValuation !== null) && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Valuation Breakdown</h3>

          {revenueValuation !== null && (
            <p>Revenue-Based Valuation: <strong>₹{revenueValuation.toFixed(2)}</strong></p>
          )}

          {profitValuation !== null && (
            <p>Profit-Based Valuation: <strong>₹{profitValuation.toFixed(2)}</strong></p>
          )}

          {ebitdaValuation !== null && (
            <p>EBITDA-Based Valuation: <strong>₹{ebitdaValuation.toFixed(2)}</strong></p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Business Valuation?</h2>
        <p>
          Business valuation determines the economic value of a company.
          It is commonly used for investment, mergers, acquisitions and fundraising.
        </p>

        <h2 className="text-2xl font-bold">Common Valuation Methods</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Revenue Multiple Method</li>
          <li>Profit Multiple Method</li>
          <li>EBITDA Multiple Method</li>
        </ul>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Investor pitch preparation</li>
          <li>Startup funding estimation</li>
          <li>M&A planning</li>
          <li>Business exit strategy</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is a good valuation multiplier?</p>
          <p>
            It depends on industry. Tech startups may have higher multiples (5x–10x),
            while traditional businesses may range 2x–4x.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Is valuation same as selling price?</p>
          <p>
            Not necessarily. Final selling price depends on negotiation and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}