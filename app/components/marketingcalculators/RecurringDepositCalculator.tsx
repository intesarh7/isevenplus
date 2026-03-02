"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function RecurringDepositCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");

  const [maturityAmount, setMaturityAmount] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateRD = () => {
    const P = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(tenureMonths);

    if (!P || !r || !n) return;

    const maturity =
      P *
      ((Math.pow(1 + r, n) - 1) / r) *
      (1 + r);

    const investment = P * n;
    const interest = maturity - investment;

    setMaturityAmount(maturity);
    setTotalInvestment(investment);
    setTotalInterest(interest);
  };

  const tryExample = () => {
    setMonthlyDeposit("5000");
    setInterestRate("7");
    setTenureMonths("24");
    setTimeout(() => calculateRD(), 100);
  };

  const resetFields = () => {
    setMonthlyDeposit("");
    setInterestRate("");
    setTenureMonths("");
    setMaturityAmount(null);
    setTotalInvestment(null);
    setTotalInterest(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Recurring Deposit Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Monthly Deposit (₹)</label>
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Tenure (Months)</label>
          <input
            type="number"
            value={tenureMonths}
            onChange={(e) => setTenureMonths(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* iSevenPlus Standard Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateRD}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate RD
        </button>

        <button
          onClick={tryExample}
          className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={resetFields}
          className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

      {maturityAmount !== null &&
        totalInvestment !== null &&
        totalInterest !== null && (
          <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
            <h3 className="text-xl font-semibold">RD Maturity Details</h3>

            <p>
              Total Investment: <strong>₹{totalInvestment.toFixed(2)}</strong>
            </p>

            <p>
              Total Interest Earned:{" "}
              <strong className="text-green-600">
                ₹{totalInterest.toFixed(2)}
              </strong>
            </p>

            <p>
              Maturity Amount:{" "}
              <strong className="text-indigo-600">
                ₹{maturityAmount.toFixed(2)}
              </strong>
            </p>
          </div>
        )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">

        <h2 className="text-2xl font-bold">
          What is a Recurring Deposit?
        </h2>
        <p>
          A Recurring Deposit (RD) is a savings scheme where you deposit a fixed 
          amount every month and earn interest over a fixed tenure.
        </p>

        <h2 className="text-2xl font-bold">
          RD Formula
        </h2>
        <p>
          <strong>
            M = P × [(1+r)^n − 1] / r × (1+r)
          </strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use This Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Estimate maturity amount</li>
          <li>Plan savings goals</li>
          <li>Compare RD interest returns</li>
          <li>Financial planning support</li>
        </ul>

      </div>

    </div>
  );
}