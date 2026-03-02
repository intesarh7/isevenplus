"use client";

import { useState } from "react";

export default function HomeEquityLoanCalculator() {
  const [homeValue, setHomeValue] = useState("");
  const [remainingMortgage, setRemainingMortgage] = useState("");
  const [ltvPercent, setLtvPercent] = useState("80");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const value = parseFloat(homeValue);
    const balance = parseFloat(remainingMortgage);
    const ltv = parseFloat(ltvPercent);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanYears);

    if (!value || !balance || !ltv || !rate || !years) return;

    const availableEquity = value - balance;
    const maxLoanAllowed = (value * ltv) / 100 - balance;

    const r = rate / 100 / 12;
    const n = years * 12;

    const emi =
      (maxLoanAllowed * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setResult({
      availableEquity: availableEquity.toFixed(2),
      maxLoanAllowed: maxLoanAllowed.toFixed(2),
      emi: emi.toFixed(2),
    });
  };

  const loadExample = () => {
    setHomeValue("500000");
    setRemainingMortgage("250000");
    setLtvPercent("80");
    setInterestRate("7.5");
    setLoanYears("15");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Home Equity Loan Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Current Home Value ($)"
          value={homeValue}
          onChange={(e)=>setHomeValue(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Remaining Mortgage Balance ($)"
          value={remainingMortgage}
          onChange={(e)=>setRemainingMortgage(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="LTV Limit (%)"
          value={ltvPercent}
          onChange={(e)=>setLtvPercent(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg md:col-span-2"/>
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
          <p>Available Home Equity: ${result.availableEquity}</p>
          <p>Maximum Borrowable Amount: ${result.maxLoanAllowed}</p>
          <p className="text-lg font-bold">
            Estimated Monthly Payment: ${result.emi}
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is a Home Equity Loan?
        </h3>
        <p>
          A home equity loan allows homeowners to borrow against the equity
          in their property. Lenders typically allow borrowing up to 75–85%
          of the home's value minus remaining mortgage balance.
        </p>
      </div>
    </div>
  );
}