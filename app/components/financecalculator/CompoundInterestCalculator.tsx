"use client";

import { useState } from "react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (!P || !r || !t || !n) return;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    setResult({
      totalAmount: A.toFixed(2),
      totalInterest: interest.toFixed(2),
    });
  };

  const loadExample = () => {
    setPrincipal("10000");
    setRate("10");
    setTime("5");
    setFrequency("1");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Compound Interest Calculator
      </h2>

      {/* Calculator Inputs */}
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Principal Amount (₹)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
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
          placeholder="Time (Years)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="1">Yearly</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>

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
          Try Example (₹10,000 @10% for 5 Years)
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">
            Total Amount: ₹{result.totalAmount}
          </p>
          <p className="mt-2">
            Total Interest: ₹{result.totalInterest}
          </p>
        </div>
      )}

      {/* Explanation Section (SEO Boost) */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          Suppose you invest ₹10,000 at an annual interest rate of 10% for 5 years,
          compounded yearly.
        </p>

        <p className="mt-2">
          Formula used:
        </p>

        <p className="bg-gray-100 p-3 rounded mt-2 font-mono">
          A = P (1 + r/n)^(nt)
        </p>

        <p className="mt-2">
          Final Amount = ₹16,105 <br />
          Total Interest Earned = ₹6,105
        </p>

        <p className="mt-4">
          Compound interest helps your money grow faster because interest is
          calculated on both the initial principal and the accumulated interest.
        </p>
      </div>
    </div>
  );
}