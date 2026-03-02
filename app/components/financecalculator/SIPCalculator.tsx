"use client";
import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function SIPCalculator() {
  const [result, setResult] = useState<number | null>(null);
  let monthly = "";
  let rate = "";
  let years = "";

  const calculate = () => {
    const P = Number(monthly);
    const r = Number(rate) / 100 / 12;
    const n = Number(years) * 12;

    const maturity =
      P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    setResult(maturity);
  };

  return (
    <CalculatorLayout
      title="SIP Calculator"
      result={
        result && <>Maturity Amount: ₹ {result.toFixed(2)}</>
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="number"
          placeholder="Monthly Investment"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (monthly = e.target.value)}
        />
        <input
          type="number"
          placeholder="Expected Return (%)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (rate = e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (Years)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (years = e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" onClick={calculate}>
          Calculate SIP
        </button>
      </div>
    </CalculatorLayout>
  );
}