"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import { IndianRupee, Percent, FileText } from "lucide-react";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    const annualIncome = Number(income);
    let calculatedTax = 0;

    if (regime === "new") {
      if (annualIncome <= 300000) calculatedTax = 0;
      else if (annualIncome <= 600000)
        calculatedTax = (annualIncome - 300000) * 0.05;
      else if (annualIncome <= 900000)
        calculatedTax =
          15000 + (annualIncome - 600000) * 0.1;
      else if (annualIncome <= 1200000)
        calculatedTax =
          45000 + (annualIncome - 900000) * 0.15;
      else if (annualIncome <= 1500000)
        calculatedTax =
          90000 + (annualIncome - 1200000) * 0.2;
      else
        calculatedTax =
          150000 + (annualIncome - 1500000) * 0.3;
    }

    if (regime === "old") {
      if (annualIncome <= 250000) calculatedTax = 0;
      else if (annualIncome <= 500000)
        calculatedTax = (annualIncome - 250000) * 0.05;
      else if (annualIncome <= 1000000)
        calculatedTax =
          12500 + (annualIncome - 500000) * 0.2;
      else
        calculatedTax =
          112500 + (annualIncome - 1000000) * 0.3;
    }

    setTax(calculatedTax);
  };

  return (
    <CalculatorLayout
      title="Income Tax Calculator (India)"
      result={
        tax !== null && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <IndianRupee size={18} />
              Total Tax: ₹ {tax.toFixed(2)}
            </div>
          </div>
        )
      }
    >
      <div className="flex items-center gap-2">
        <IndianRupee size={18} />
        <input
          type="number"
          placeholder="Enter Annual Income"
          className="input"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setRegime("new")}
          className={`flex-1 py-2 rounded-xl ${
            regime === "new"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          New Regime
        </button>

        <button
          onClick={() => setRegime("old")}
          className={`flex-1 py-2 rounded-xl ${
            regime === "old"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Old Regime
        </button>
      </div>

      <button
        onClick={calculateTax}
        className="btn flex items-center justify-center gap-2"
      >
        <FileText size={18} />
        Calculate Tax
      </button>
    </CalculatorLayout>
  );
}