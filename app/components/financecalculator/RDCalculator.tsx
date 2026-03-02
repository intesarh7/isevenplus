"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import {
  IndianRupee,
  Percent,
  CalendarDays,
  Info,
  Calculator,
} from "lucide-react";

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateRD = () => {
    const P = Number(monthlyDeposit);
    const r = Number(rate) / 100;
    const m = Number(months);

    if (!P || !r || !m) return;

    const t = m / 12;
    const n = 4; // quarterly compounding

    const maturity =
      P *
      ((Math.pow(1 + r / n, n * t) - 1) /
        (1 - Math.pow(1 + r / n, -1 / 3)));

    const totalInvestment = P * m;
    const interest = maturity - totalInvestment;

    setResult({
      maturity,
      totalInvestment,
      interest,
    });
  };

  return (
    <>
      <CalculatorLayout
        title="RD Calculator"
        result={
          result && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                Maturity Amount: ₹{" "}
                {result.maturity.toFixed(2)}
              </div>

              <div className="text-gray-600">
                Total Investment: ₹{" "}
                {result.totalInvestment.toFixed(2)}
              </div>

              <div className="text-green-600">
                Total Interest Earned: ₹{" "}
                {result.interest.toFixed(2)}
              </div>
            </div>
          )
        }
      >
        {/* 🔹 Hint Section */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-sm text-gray-700">
          <Info size={18} className="text-blue-600 mt-1" />
          <div>
            Enter your monthly deposit amount,
            annual interest rate, and total duration
            in months to calculate RD maturity.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={18} />
          <input
            type="number"
            placeholder="Monthly Deposit Amount"
            className="input"
            value={monthlyDeposit}
            onChange={(e) =>
              setMonthlyDeposit(e.target.value)
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <Percent size={18} />
          <input
            type="number"
            placeholder="Annual Interest Rate (%)"
            className="input"
            value={rate}
            onChange={(e) =>
              setRate(e.target.value)
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={18} />
          <input
            type="number"
            placeholder="Duration (Months)"
            className="input"
            value={months}
            onChange={(e) =>
              setMonths(e.target.value)
            }
          />
        </div>

        <button
          onClick={calculateRD}
          className="btn flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          Calculate RD
        </button>
      </CalculatorLayout>

      {/* 🔹 Example Section */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <h2 className="text-2xl font-bold">
          Example Calculation
        </h2>

        <p className="text-gray-700 leading-7">
          Suppose you deposit ₹5,000 every month
          for 24 months at 7% annual interest rate.
        </p>

        <div className="bg-gray-100 p-4 rounded-xl font-mono text-center">
          Total Investment = 5000 × 24 = ₹1,20,000
        </div>

        <p className="text-gray-700 leading-7">
          The maturity amount will be approximately
          ₹1,29,000+ and total interest earned will be
          around ₹9,000+ depending on compounding.
        </p>
      </div>
    </>
  );
}