"use client";

import { useState } from "react";

export default function VAMortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("30");
  const [fundingFeePercent, setFundingFeePercent] = useState("2.3");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanYears);
    const fundingPercent = parseFloat(fundingFeePercent);

    if (!price || !rate || !years) return;

    const baseLoan = price - down;

    // VA Funding Fee
    const fundingFee = (baseLoan * fundingPercent) / 100;

    const totalLoan = baseLoan + fundingFee;

    const r = rate / 100 / 12;
    const n = years * 12;

    const emi =
      (totalLoan * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setResult({
      baseLoan: baseLoan.toFixed(2),
      fundingFee: fundingFee.toFixed(2),
      emi: emi.toFixed(2),
    });
  };

  const loadExample = () => {
    setHomePrice("350000");
    setDownPayment("0");
    setInterestRate("6.25");
    setLoanYears("30");
    setFundingFeePercent("2.3");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        VA Mortgage Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Home Price ($)"
          value={homePrice}
          onChange={(e)=>setHomePrice(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Down Payment ($)"
          value={downPayment}
          onChange={(e)=>setDownPayment(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="VA Funding Fee (%)"
          value={fundingFeePercent}
          onChange={(e)=>setFundingFeePercent(e.target.value)}
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
          <p>Base Loan Amount: ${result.baseLoan}</p>
          <p>VA Funding Fee: ${result.fundingFee}</p>
          <p className="text-lg font-bold">
            Estimated Monthly Payment: ${result.emi}
          </p>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          What is a VA Loan?
        </h3>
        <p>
          VA loans are backed by the U.S. Department of Veterans Affairs.
          They typically require no down payment and no monthly PMI,
          but include a one-time VA funding fee.
        </p>
      </div>
    </div>
  );
}