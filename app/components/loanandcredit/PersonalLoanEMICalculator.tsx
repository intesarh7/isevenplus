"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function PersonalLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    let months = parseFloat(tenure);

    if (!principal || !annualRate || !months) return;

    if (tenureType === "years") {
      months = months * 12;
    }

    const monthlyRate = annualRate / 12 / 100;

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPay = emiValue * months;
    const interestPay = totalPay - principal;

    setEmi(emiValue);
    setTotalInterest(interestPay);
    setTotalPayment(totalPay);
  };

  const tryExample = () => {
    setLoanAmount("500000");
    setInterestRate("12");
    setTenure("5");
    setTenureType("years");
    setTimeout(() => calculateEMI(), 100);
  };

  const resetFields = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setTenureType("years");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Personal Loan EMI Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-medium">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Interest Rate (% per annum)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Loan Tenure</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter tenure"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Tenure Type</label>
          <select
            value={tenureType}
            onChange={(e) => setTenureType(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateEMI}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate EMI
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

      {emi !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">EMI Breakdown</h3>
          <p>Monthly EMI: <strong>₹{emi.toFixed(2)}</strong></p>
          <p>Total Interest Payable: <strong>₹{totalInterest?.toFixed(2)}</strong></p>
          <p>Total Payment: <strong>₹{totalPayment?.toFixed(2)}</strong></p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is EMI?</h2>
        <p>
          EMI (Equated Monthly Installment) is the fixed monthly payment you make
          to repay your personal loan over a specified tenure.
        </p>

        <h2 className="text-2xl font-bold">EMI Formula</h2>
        <p>
          <strong>
            EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]
          </strong>
        </p>
        <p>
          Where P = Principal, r = Monthly Interest Rate, n = Number of Months
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Loan affordability planning</li>
          <li>Compare loan offers</li>
          <li>Interest cost estimation</li>
          <li>Financial budgeting</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Is EMI same every month?
          </p>
          <p>
            Yes, in fixed-rate loans EMI remains constant throughout tenure.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Can I prepay my loan?
          </p>
          <p>
            Yes, but check bank policies for prepayment charges.
          </p>
        </div>
      </div>
    </div>
  );
}