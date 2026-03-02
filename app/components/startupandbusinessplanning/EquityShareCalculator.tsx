"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function EquityShareCalculator() {
  const [preMoneyValuation, setPreMoneyValuation] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [existingShares, setExistingShares] = useState("");

  const [postMoneyValuation, setPostMoneyValuation] = useState<number | null>(null);
  const [newShares, setNewShares] = useState<number | null>(null);
  const [investorOwnership, setInvestorOwnership] = useState<number | null>(null);
  const [founderOwnership, setFounderOwnership] = useState<number | null>(null);

  const calculateEquity = () => {
    const preMoney = parseFloat(preMoneyValuation);
    const investment = parseFloat(investmentAmount);
    const shares = parseFloat(existingShares);

    if (!preMoney || !investment || !shares) return;

    const postMoney = preMoney + investment;

    const pricePerShare = preMoney / shares;
    const issuedShares = investment / pricePerShare;

    const totalShares = shares + issuedShares;

    const investorPercent = (issuedShares / totalShares) * 100;
    const founderPercent = (shares / totalShares) * 100;

    setPostMoneyValuation(postMoney);
    setNewShares(issuedShares);
    setInvestorOwnership(investorPercent);
    setFounderOwnership(founderPercent);
  };

  const tryExample = () => {
    setPreMoneyValuation("5000000");
    setInvestmentAmount("1000000");
    setExistingShares("100000");
    setTimeout(() => calculateEquity(), 100);
  };

  const resetFields = () => {
    setPreMoneyValuation("");
    setInvestmentAmount("");
    setExistingShares("");
    setPostMoneyValuation(null);
    setNewShares(null);
    setInvestorOwnership(null);
    setFounderOwnership(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Equity Share Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Pre-Money Valuation (₹)</label>
          <input
            type="number"
            value={preMoneyValuation}
            onChange={(e) => setPreMoneyValuation(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Investment Amount (₹)</label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Existing Shares</label>
          <input
            type="number"
            value={existingShares}
            onChange={(e) => setExistingShares(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateEquity}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Equity
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

      {postMoneyValuation !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">

          <h3 className="text-xl font-semibold">Equity Breakdown</h3>

          <p>
            Post-Money Valuation: <strong>₹{postMoneyValuation.toFixed(2)}</strong>
          </p>

          <p>
            New Shares Issued: <strong>{newShares?.toFixed(0)}</strong>
          </p>

          <p>
            Investor Ownership: <strong>{investorOwnership?.toFixed(2)}%</strong>
          </p>

          <p>
            Founder Ownership After Dilution: <strong>{founderOwnership?.toFixed(2)}%</strong>
          </p>

        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">

        <h2 className="text-2xl font-bold">What is Equity Share Calculation?</h2>
        <p>
          Equity share calculation determines how ownership is distributed 
          after an investment round based on pre-money valuation.
        </p>

        <h2 className="text-2xl font-bold">Equity Formula</h2>
        <p>
          <strong>
            Investor Ownership = Investment / Post-Money Valuation
          </strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Startup fundraising planning</li>
          <li>Founder dilution analysis</li>
          <li>Investor ownership calculation</li>
          <li>Equity round modeling</li>
        </ul>

      </div>

    </div>
  );
}