"use client";

import { useState } from "react";

export default function MortgagePayoffCalculator() {
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState("");
  const [extraPayment, setExtraPayment] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(balance);
    const annualRate = parseFloat(interestRate);
    const emi = parseFloat(monthlyEMI);
    const extra = parseFloat(extraPayment) || 0;

    if (!P || !annualRate || !emi) return;

    const r = annualRate / 100 / 12;
    let remainingBalance = P;
    let months = 0;
    let totalInterest = 0;

    while (remainingBalance > 0 && months < 1000) {
      const interest = remainingBalance * r;
      const principal = emi + extra - interest;

      if (principal <= 0) break;

      remainingBalance -= principal;
      totalInterest += interest;
      months++;
    }

    const years = (months / 12).toFixed(1);

    setResult({
      months,
      years,
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const loadExample = () => {
    setBalance("2500000");
    setInterestRate("8");
    setMonthlyEMI("25000");
    setExtraPayment("5000");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mortgage Payoff Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Current Loan Balance (₹)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Current Monthly EMI (₹)"
          value={monthlyEMI}
          onChange={(e) => setMonthlyEMI(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Extra Monthly Payment (₹)"
          value={extraPayment}
          onChange={(e) => setExtraPayment(e.target.value)}
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="mt-4 space-y-3">
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
          Try Example (₹25L balance, ₹25k EMI + ₹5k extra)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="text-lg font-semibold">
            Loan Payoff Time: {result.months} months (~{result.years} years)
          </p>
          <p>Total Interest Paid: ₹{result.totalInterest}</p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          How Extra Payments Help
        </h3>
        <p>
          Making extra monthly payments reduces your loan principal faster,
          which lowers total interest and shortens your loan tenure.
        </p>
      </div>
    </div>
  );
}