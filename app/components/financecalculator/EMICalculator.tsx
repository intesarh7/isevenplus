"use client";
import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function EMICalculator() {
  const [emi, setEmi] = useState<number | null>(null);

  const calculate = (p: any, r: any, t: any) => {
    const P = Number(p);
    const R = Number(r) / 12 / 100;
    const N = Number(t) * 12;

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    setEmi(EMI);
  };

  let principal = "";
  let rate = "";
  let tenure = "";

  return (
    <CalculatorLayout
      title="EMI Calculator"
      result={
        emi && <>Monthly EMI: ₹ {emi.toFixed(2)}</>
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="number"
          placeholder="Loan Amount"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (principal = e.target.value)}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (rate = e.target.value)}
        />
        <input
          type="number"
          placeholder="Loan Tenure (Years)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => (tenure = e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => calculate(principal, rate, tenure)}
        >
          Calculate EMI
        </button>
      </div>
    </CalculatorLayout>
  );
}