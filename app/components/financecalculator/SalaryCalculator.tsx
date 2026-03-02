"use client";

import { useState } from "react";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState("");
  const [pfPercent, setPfPercent] = useState("12");
  const [taxPercent, setTaxPercent] = useState("10");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const annualCTC = parseFloat(ctc);
    const pf = (annualCTC * parseFloat(pfPercent)) / 100;
    const tax = (annualCTC * parseFloat(taxPercent)) / 100;

    if (!annualCTC) return;

    const annualInHand = annualCTC - pf - tax;
    const monthlyInHand = annualInHand / 12;

    setResult({
      pf: pf.toFixed(2),
      tax: tax.toFixed(2),
      annualInHand: annualInHand.toFixed(2),
      monthlyInHand: monthlyInHand.toFixed(2),
    });
  };

  const loadExample = () => {
    setCtc("600000");
    setPfPercent("12");
    setTaxPercent("10");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Salary Calculator (CTC → In-Hand)
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Annual CTC (₹)"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="PF Deduction (%)"
          value={pfPercent}
          onChange={(e) => setPfPercent(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Income Tax (%)"
          value={taxPercent}
          onChange={(e) => setTaxPercent(e.target.value)}
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
          Try Example (₹6,00,000 CTC)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p>PF Deduction: ₹{result.pf}</p>
          <p>Income Tax: ₹{result.tax}</p>
          <p className="font-semibold">
            Annual In-Hand: ₹{result.annualInHand}
          </p>
          <p className="text-lg font-bold">
            Monthly In-Hand: ₹{result.monthlyInHand}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If your annual CTC is ₹6,00,000 with 12% PF and 10% income tax:
        </p>

        <p className="mt-2">
          PF Deduction = ₹72,000 <br />
          Tax = ₹60,000 <br />
          Annual In-Hand ≈ ₹4,68,000 <br />
          Monthly In-Hand ≈ ₹39,000
        </p>

        <p className="mt-4">
          Your in-hand salary is the amount you receive after deductions like
          Provident Fund (PF) and Income Tax. Actual deductions may vary
          depending on your tax slab and company structure.
        </p>
      </div>
    </div>
  );
}