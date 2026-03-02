"use client";

import { useState } from "react";

export default function HELOCCalculator() {
  const [homeValue, setHomeValue] = useState("");
  const [remainingMortgage, setRemainingMortgage] = useState("");
  const [ltvPercent, setLtvPercent] = useState("85");
  const [interestRate, setInterestRate] = useState("");
  const [repaymentYears, setRepaymentYears] = useState("15");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const value = parseFloat(homeValue);
    const balance = parseFloat(remainingMortgage);
    const ltv = parseFloat(ltvPercent);
    const rate = parseFloat(interestRate);
    const years = parseFloat(repaymentYears);

    if (!value || !balance || !ltv || !rate || !years) return;

    const maxLoanAllowed = (value * ltv) / 100 - balance;

    const monthlyRate = rate / 100 / 12;

    // Interest-only payment during draw period
    const interestOnlyPayment = maxLoanAllowed * monthlyRate;

    // Full repayment EMI
    const n = years * 12;
    const emi =
      (maxLoanAllowed * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    setResult({
      availableCredit: maxLoanAllowed.toFixed(2),
      interestOnlyPayment: interestOnlyPayment.toFixed(2),
      fullRepaymentEMI: emi.toFixed(2),
    });
  };

  const loadExample = () => {
    setHomeValue("600000");
    setRemainingMortgage("300000");
    setLtvPercent("85");
    setInterestRate("7");
    setRepaymentYears("15");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        HELOC Calculator (Home Equity Line of Credit)
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Current Home Value ($)"
          value={homeValue}
          onChange={(e)=>setHomeValue(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Remaining Mortgage ($)"
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

        <input type="number" placeholder="Repayment Term (Years)"
          value={repaymentYears}
          onChange={(e)=>setRepaymentYears(e.target.value)}
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
          <p>Available Credit Line: ${result.availableCredit}</p>
          <p>Interest-Only Monthly Payment: ${result.interestOnlyPayment}</p>
          <p className="text-lg font-bold">
            Full Repayment EMI: ${result.fullRepaymentEMI}
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is HELOC?
        </h3>
        <p>
          A HELOC is a revolving line of credit secured by your home.
          During the draw period, borrowers often pay interest-only payments.
          During repayment period, full principal + interest EMI applies.
        </p>
      </div>
    </div>
  );
}