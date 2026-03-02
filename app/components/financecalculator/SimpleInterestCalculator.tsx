"use client";

import { useState } from "react";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (!P || !R || !T) return;

    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;

    setResult({
      totalInterest: interest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const loadExample = () => {
    setPrincipal("50000");
    setRate("8");
    setTime("3");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Simple Interest Calculator
      </h2>

      {/* Inputs */}
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
          Try Example (₹50,000 @8% for 3 Years)
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">
            Total Interest: ₹{result.totalInterest}
          </p>
          <p className="mt-2">
            Total Amount: ₹{result.totalAmount}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          Suppose you invest ₹50,000 at an interest rate of 8% per year for 3 years.
        </p>

        <p className="mt-2 bg-gray-100 p-3 rounded font-mono">
          Simple Interest = (P × R × T) / 100
        </p>

        <p className="mt-2">
          Interest = ₹12,000 <br />
          Total Amount = ₹62,000
        </p>

        <p className="mt-4">
          Simple interest is calculated only on the original principal amount.
          It does not include interest on accumulated interest.
        </p>
      </div>
    </div>
  );
}