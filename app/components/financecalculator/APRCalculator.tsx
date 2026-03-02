"use client";

import { useState } from "react";

export default function APRCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [fees, setFees] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanYears);
    const feeAmount = parseFloat(fees) || 0;

    if (!P || !annualRate || !years) return;

    const r = annualRate / 100 / 12;
    const n = years * 12;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalCost = totalPayment + feeAmount;
    const totalInterest = totalCost - P;

    const apr =
      (totalInterest / P / years) * 100;

    setResult({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      apr: apr.toFixed(2),
    });
  };

  const loadExample = () => {
    setLoanAmount("1000000");
    setInterestRate("8");
    setLoanYears("5");
    setFees("20000");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        APR Calculator (Annual Percentage Rate)
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Loan Amount (₹)"
          value={loanAmount}
          onChange={(e)=>setLoanAmount(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Processing / Closing Fees (₹)"
          value={fees}
          onChange={(e)=>setFees(e.target.value)}
          className="border p-3 rounded-lg"/>
      </div>

      <div className="mt-4 space-y-3">
        <button onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold transition">
          Calculate
        </button>

        <button onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-medium">
          Try Example
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p>Monthly EMI: ₹{result.emi}</p>
          <p>Total Interest (Including Fees): ₹{result.totalInterest}</p>
          <p className="text-lg font-bold">
            Effective APR: {result.apr}%
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is APR?
        </h3>
        <p>
          APR (Annual Percentage Rate) represents the true annual cost of a loan,
          including interest and additional fees. It helps compare different loan offers accurately.
        </p>
      </div>
    </div>
  );
}