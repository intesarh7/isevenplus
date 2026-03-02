"use client";

import { useState } from "react";

export default function RentalPropertyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanYears);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(monthlyExpenses) || 0;

    if (!price || !down || !rate || !years || !rent) return;

    const loanAmount = price - down;
    const r = rate / 100 / 12;
    const n = years * 12;

    const emi =
      (loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const netMonthlyCashFlow = rent - emi - expenses;
    const annualCashFlow = netMonthlyCashFlow * 12;

    const roi = (annualCashFlow / down) * 100;

    setResult({
      loanAmount: loanAmount.toFixed(2),
      emi: emi.toFixed(2),
      netMonthlyCashFlow: netMonthlyCashFlow.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      roi: roi.toFixed(2),
    });
  };

  const loadExample = () => {
    setPropertyPrice("6000000");
    setDownPayment("1200000");
    setInterestRate("8.5");
    setLoanYears("20");
    setMonthlyRent("35000");
    setMonthlyExpenses("5000");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rental Property Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Property Price (₹)"
          value={propertyPrice}
          onChange={(e)=>setPropertyPrice(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Down Payment (₹)"
          value={downPayment}
          onChange={(e)=>setDownPayment(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Monthly Rent (₹)"
          value={monthlyRent}
          onChange={(e)=>setMonthlyRent(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Monthly Expenses (₹)"
          value={monthlyExpenses}
          onChange={(e)=>setMonthlyExpenses(e.target.value)}
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
          <p>Loan Amount: ₹{result.loanAmount}</p>
          <p>Monthly EMI: ₹{result.emi}</p>
          <p className="font-semibold">Net Monthly Cash Flow: ₹{result.netMonthlyCashFlow}</p>
          <p>Annual Cash Flow: ₹{result.annualCashFlow}</p>
          <p className="text-lg font-bold">ROI on Down Payment: {result.roi}%</p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          How Rental Property ROI Works
        </h3>
        <p>
          This calculator estimates cash flow and return on investment
          for rental properties. Positive cash flow means your rent covers
          EMI and expenses. ROI helps compare different investment properties.
        </p>
      </div>
    </div>
  );
}