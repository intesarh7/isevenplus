"use client";

import { useState } from "react";
import {
  Banknote,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function EducationLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [moratoriumYears, setMoratoriumYears] = useState("0");

  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculateEMI = () => {
    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);
    const moratorium = Number(moratoriumYears);

    if (!P || !annualRate || !years) return;

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: Number(emi.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
    });
  };

  const handleTryExample = () => {
    setLoanAmount("1000000");
    setInterestRate("9");
    setTenureYears("10");
    setMoratoriumYears("1");
    setResult(null);
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenureYears("");
    setMoratoriumYears("0");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Banknote className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold">
          Education Loan EMI Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Loan Amount"
          className="border rounded-lg p-3"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          className="border rounded-lg p-3"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Loan Tenure (Years)"
          className="border rounded-lg p-3"
          value={tenureYears}
          onChange={(e) => setTenureYears(e.target.value)}
        />

        <input
          type="number"
          placeholder="Moratorium Period (Years - Optional)"
          className="border rounded-lg p-3"
          value={moratoriumYears}
          onChange={(e) => setMoratoriumYears(e.target.value)}
        />

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={calculateEMI}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} /> Calculate EMI
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} /> Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl space-y-4 text-center">
          <h3 className="text-xl font-semibold">
            Loan Summary
          </h3>

          <p className="text-2xl font-bold text-indigo-600">
            Monthly EMI: ₹ {result.emi}
          </p>

          <p>Total Interest: ₹ {result.totalInterest}</p>
          <p>Total Payment: ₹ {result.totalPayment}</p>
        </div>
      )}

      {/* SEO */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Education Loan EMI is Calculated?
        </h3>
        <p>
          EMI is calculated using the standard reducing balance formula:
        </p>
        <p className="font-semibold text-indigo-600">
          EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]
        </p>

        <h3 className="text-2xl font-bold">
          Suitable For:
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Indian Education Loans</li>
          <li>Study Abroad Loans</li>
          <li>Bank Comparison Planning</li>
          <li>Financial Planning for Students</li>
        </ul>
      </div>

    </div>
  );
}