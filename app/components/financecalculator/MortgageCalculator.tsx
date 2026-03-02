"use client";

import { useState } from "react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanYears);

    if (!P || !annualRate || !years) return;

    const r = annualRate / 100 / 12; // monthly rate
    const n = years * 12; // total months

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const loadExample = () => {
    setLoanAmount("3000000");
    setInterestRate("8.5");
    setLoanYears("20");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mortgage Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Loan Amount (₹)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
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
          Try Example (₹30,00,000 @8.5% for 20 Years)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="text-lg font-semibold">
            Monthly EMI: ₹{result.emi}
          </p>
          <p>Total Interest: ₹{result.totalInterest}</p>
          <p className="font-bold">
            Total Payment: ₹{result.totalPayment}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          For a ₹30,00,000 home loan at 8.5% interest for 20 years:
        </p>

        <p className="mt-2">
          Monthly EMI ≈ ₹26,035 <br />
          Total Interest ≈ ₹32,48,000+ <br />
          Total Payment ≈ ₹62,48,000+
        </p>

        <p className="mt-4">
          Mortgage EMI is calculated using the standard loan amortization formula.
          This calculator helps estimate monthly payments and total interest cost.
        </p>
      </div>
    </div>
  );
}