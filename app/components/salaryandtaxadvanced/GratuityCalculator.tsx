"use client";

import { useState } from "react";
import {
  IndianRupee,
  CalendarDays,
  Info,
  Calculator,
} from "lucide-react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateGratuity = () => {
    const monthlySalary = Number(salary);
    const serviceYears = Number(years);

    if (!monthlySalary || !serviceYears) return;

    const gratuity =
      (monthlySalary * 15 * serviceYears) / 26;

    setResult(gratuity);
  };

  return (
    <>
      <CalculatorLayout
        title="Gratuity Calculator (India)"
        result={
          result !== null && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                Estimated Gratuity: ₹{" "}
                {result.toFixed(2)}
              </div>
            </div>
          )
        }
      >
        {/* 🧠 Hint Section */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-sm text-gray-700">
          <Info size={18} className="text-blue-600 mt-1" />
          <div>
            Enter your last drawn monthly salary 
            (Basic + DA) and total years of service.
            Minimum 5 years of service is required
            to claim gratuity.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={18} />
          <input
            type="number"
            placeholder="Last Drawn Monthly Salary"
            className="input"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={18} />
          <input
            type="number"
            placeholder="Years of Service"
            className="input"
            value={years}
            onChange={(e) =>
              setYears(e.target.value)
            }
          />
        </div>

        <button
          onClick={calculateGratuity}
          className="btn flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          Calculate Gratuity
        </button>
      </CalculatorLayout>

      {/* 📘 Explanation Section */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <h2 className="text-2xl font-bold">
          How Gratuity is Calculated?
        </h2>

        <p className="text-gray-700 leading-7">
          As per the Payment of Gratuity Act,
          gratuity is calculated using the formula:
        </p>

        <div className="bg-gray-100 p-4 rounded-xl font-mono text-center">
          (Last Drawn Salary × 15 × Years of Service) ÷ 26
        </div>

        <p className="text-gray-700 leading-7">
          Example: If your last drawn salary is
          ₹30,000 and you worked for 10 years:
        </p>

        <div className="bg-gray-100 p-4 rounded-xl font-mono text-center">
          (30000 × 15 × 10) ÷ 26 = ₹1,73,076
        </div>

        <p className="text-gray-600 text-sm">
          Note: Only applicable if employee has completed
          minimum 5 years of continuous service.
        </p>
      </div>
    </>
  );
}