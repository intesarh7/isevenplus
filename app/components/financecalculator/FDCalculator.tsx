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

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState(4); // default quarterly
  const [result, setResult] = useState<any>(null);

  const calculateFD = () => {
    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(years);
    const n = Number(frequency);

    if (!P || !r || !t) return;

    const maturity =
      P * Math.pow(1 + r / n, n * t);

    const interest = maturity - P;

    setResult({
      maturity,
      interest,
    });
  };

  return (
    <>
      <CalculatorLayout
        title="FD Calculator"
        result={
          result && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                Maturity Amount: ₹{" "}
                {result.maturity.toFixed(2)}
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <IndianRupee size={18} />
                Total Interest: ₹{" "}
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
            Enter the deposit amount, annual interest rate,
            investment duration, and select compounding
            frequency to calculate FD maturity value.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <IndianRupee size={18} />
            <input
              type="number"
              placeholder="Deposit Amount"
              className="input"
              value={principal}
              onChange={(e) =>
                setPrincipal(e.target.value)
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
              placeholder="Time (Years)"
              className="input"
              value={years}
              onChange={(e) =>
                setYears(e.target.value)
              }
            />
          </div>

          <select
            className="input"
            value={frequency}
            onChange={(e) =>
              setFrequency(Number(e.target.value))
            }
          >
            <option value={1}>Yearly</option>
            <option value={2}>Half-Yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>

          <button
            onClick={calculateFD}
            className="btn flex items-center justify-center gap-2"
          >
            <Calculator size={18} />
            Calculate FD
          </button>
        </div>
      </CalculatorLayout>

      {/* 🔹 Example Section */}
      <div className="mt-10 space-y-6">
        <h2 className="text-2xl font-bold">
          Example Calculation
        </h2>

        <p className="text-gray-700 leading-7">
          Suppose you invest ₹1,00,000 at an interest
          rate of 7% per annum for 5 years,
          compounded quarterly.
        </p>

        <div className="bg-gray-100 p-4 rounded-xl font-mono text-center">
          A = 100000 × (1 + 0.07/4)^(4 × 5)
        </div>

        <p className="text-gray-700 leading-7">
          The maturity amount will be approximately
          ₹1,41,000+ and total interest earned will be
          around ₹41,000.
        </p>
      </div>
    </>
  );
}