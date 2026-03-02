"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function CommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [fixedCommission, setFixedCommission] = useState("");

  const [commissionEarned, setCommissionEarned] = useState<number | null>(null);
  const [totalAfterCommission, setTotalAfterCommission] = useState<number | null>(null);

  const calculateCommission = () => {
    const sales = parseFloat(salesAmount);
    const rate = parseFloat(commissionRate) || 0;
    const fixed = parseFloat(fixedCommission) || 0;

    if (!sales || sales <= 0) return;

    const percentageCommission = (sales * rate) / 100;
    const totalCommission = percentageCommission + fixed;
    const remaining = sales - totalCommission;

    setCommissionEarned(totalCommission);
    setTotalAfterCommission(remaining);
  };

  const tryExample = () => {
    setSalesAmount("100000");
    setCommissionRate("10");
    setFixedCommission("2000");
    setTimeout(() => calculateCommission(), 100);
  };

  const resetFields = () => {
    setSalesAmount("");
    setCommissionRate("");
    setFixedCommission("");
    setCommissionEarned(null);
    setTotalAfterCommission(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Commission Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Total Sales Amount (₹)</label>
          <input
            type="number"
            value={salesAmount}
            onChange={(e) => setSalesAmount(e.target.value)}
            placeholder="Enter sales amount"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Commission Rate (%)</label>
          <input
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            placeholder="Enter percentage commission"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Fixed Commission (₹) (Optional)</label>
          <input
            type="number"
            value={fixedCommission}
            onChange={(e) => setFixedCommission(e.target.value)}
            placeholder="Enter fixed commission"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateCommission}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Commission
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

      {commissionEarned !== null && totalAfterCommission !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Commission Breakdown</h3>
          <p>
            Commission Earned: <strong>₹{commissionEarned.toFixed(2)}</strong>
          </p>
          <p>
            Remaining After Commission: <strong>₹{totalAfterCommission.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is a Commission Calculator?</h2>
        <p>
          A Commission Calculator helps sales professionals, affiliates, and
          businesses calculate commission earnings based on percentage or fixed commission structure.
        </p>

        <h2 className="text-2xl font-bold">Commission Formula</h2>
        <p>
          <strong>Percentage Commission = Sales × Rate / 100</strong>
        </p>
        <p>
          <strong>Total Commission = Percentage Commission + Fixed Commission</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Sales performance tracking</li>
          <li>Affiliate earnings calculation</li>
          <li>Real estate commission estimation</li>
          <li>Payroll planning</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. Can I use both percentage and fixed commission?</p>
          <p>
            Yes. This calculator supports both combined commission models.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Is this useful for affiliate marketing?</p>
          <p>
            Yes. It is ideal for affiliate marketers, sales agents, and brokers.
          </p>
        </div>
      </div>
    </div>
  );
}