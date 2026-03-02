"use client";

import { useState } from "react";

export default function FHALoanCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("3.5");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("30");
  const [annualMIPRate, setAnnualMIPRate] = useState("0.85");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const downPercent = parseFloat(downPaymentPercent);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanYears);
    const mipRate = parseFloat(annualMIPRate);

    if (!price || !rate || !years) return;

    const downPayment = (price * downPercent) / 100;
    const baseLoan = price - downPayment;

    // Upfront MIP (1.75% standard FHA)
    const upfrontMIP = baseLoan * 0.0175;
    const totalLoan = baseLoan + upfrontMIP;

    const r = rate / 100 / 12;
    const n = years * 12;

    const emi =
      (totalLoan * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const monthlyMIP = (baseLoan * mipRate / 100) / 12;

    const totalMonthlyPayment = emi + monthlyMIP;

    setResult({
      downPayment: downPayment.toFixed(2),
      upfrontMIP: upfrontMIP.toFixed(2),
      emi: emi.toFixed(2),
      monthlyMIP: monthlyMIP.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
    });
  };

  const loadExample = () => {
    setHomePrice("300000");
    setInterestRate("6.5");
    setLoanYears("30");
    setAnnualMIPRate("0.85");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        FHA Loan Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Home Price ($)"
          value={homePrice}
          onChange={(e)=>setHomePrice(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Down Payment (%)"
          value={downPaymentPercent}
          onChange={(e)=>setDownPaymentPercent(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Annual MIP Rate (%)"
          value={annualMIPRate}
          onChange={(e)=>setAnnualMIPRate(e.target.value)}
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
          <p>Down Payment: ${result.downPayment}</p>
          <p>Upfront MIP (1.75%): ${result.upfrontMIP}</p>
          <p>Base EMI: ${result.emi}</p>
          <p>Monthly MIP: ${result.monthlyMIP}</p>
          <p className="text-lg font-bold">
            Total Monthly Payment: ${result.totalMonthlyPayment}
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is an FHA Loan?
        </h3>
        <p>
          FHA loans are government-backed mortgages that allow lower
          down payments (as low as 3.5%). Borrowers must pay both
          upfront and annual Mortgage Insurance Premium (MIP).
        </p>
      </div>
    </div>
  );
}