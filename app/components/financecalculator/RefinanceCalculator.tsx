"use client";

import { useState } from "react";

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [remainingYears, setRemainingYears] = useState("");
  const [newRate, setNewRate] = useState("");
  const [closingCost, setClosingCost] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateEMI = (P: number, annualRate: number, years: number) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    return (P * r * Math.pow(1 + r, n)) /
           (Math.pow(1 + r, n) - 1);
  };

  const calculate = () => {
    const balance = parseFloat(currentBalance);
    const currRate = parseFloat(currentRate);
    const years = parseFloat(remainingYears);
    const rateNew = parseFloat(newRate);
    const cost = parseFloat(closingCost) || 0;

    if (!balance || !currRate || !years || !rateNew) return;

    const currentEMI = calculateEMI(balance, currRate, years);
    const newEMI = calculateEMI(balance, rateNew, years);

    const monthlySavings = currentEMI - newEMI;

    const totalCurrentPayment = currentEMI * years * 12;
    const totalNewPayment = newEMI * years * 12 + cost;

    const totalSavings = totalCurrentPayment - totalNewPayment;

    const breakEvenMonths = cost > 0 && monthlySavings > 0
      ? (cost / monthlySavings).toFixed(0)
      : "0";

    setResult({
      currentEMI: currentEMI.toFixed(2),
      newEMI: newEMI.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      breakEvenMonths,
    });
  };

  const loadExample = () => {
    setCurrentBalance("2500000");
    setCurrentRate("9");
    setRemainingYears("15");
    setNewRate("8");
    setClosingCost("50000");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Refinance Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Current Loan Balance (₹)"
          value={currentBalance}
          onChange={(e)=>setCurrentBalance(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Current Interest Rate (%)"
          value={currentRate}
          onChange={(e)=>setCurrentRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Remaining Loan Term (Years)"
          value={remainingYears}
          onChange={(e)=>setRemainingYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="New Interest Rate (%)"
          value={newRate}
          onChange={(e)=>setNewRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Closing Costs (₹)"
          value={closingCost}
          onChange={(e)=>setClosingCost(e.target.value)}
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
          <p>Current EMI: ₹{result.currentEMI}</p>
          <p>New EMI: ₹{result.newEMI}</p>
          <p className="font-semibold">Monthly Savings: ₹{result.monthlySavings}</p>
          <p>Total Savings: ₹{result.totalSavings}</p>
          <p>Break-even Period: {result.breakEvenMonths} months</p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is Refinancing?
        </h3>
        <p>
          Refinancing replaces your current mortgage with a new one,
          usually at a lower interest rate. This calculator helps determine
          if refinancing saves money after considering closing costs.
        </p>
      </div>
    </div>
  );
}