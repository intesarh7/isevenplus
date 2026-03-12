"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import { Calculator, RotateCcw, FlaskConical } from "lucide-react";

export default function LoanCalculator() {

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [emi, setEmi] = useState<number | null>(null);
  const [interest, setInterest] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const calculateLoan = () => {

    if (!amount || !rate || !years) return;

    const P = Number(amount);
    const annualRate = Number(rate) / 100;
    const N = Number(years) * 12;
    const R = annualRate / 12;

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPayment = EMI * N;
    const totalInterest = totalPayment - P;

    setEmi(EMI);
    setTotal(totalPayment);
    setInterest(totalInterest);
  };

  const resetForm = () => {
    setAmount("");
    setRate("");
    setYears("");
    setEmi(null);
    setInterest(null);
    setTotal(null);
  };

  const exampleFill = () => {
    setAmount("500000");
    setRate("10");
    setYears("5");
  };

  return (
    <CalculatorLayout
      title="Loan EMI Calculator"
      result={
        emi !== null && (
          <div className="space-y-3 text-lg">

            <div className="flex justify-between">
              <span>Monthly EMI</span>
              <span className="font-semibold text-indigo-600">
                ₹ {emi.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Interest</span>
              <span className="font-semibold">
                ₹ {interest?.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Payment</span>
              <span className="font-semibold">
                ₹ {total?.toFixed(2)}
              </span>
            </div>

          </div>
        )
      }
    >

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Loan Amount"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          className="input"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Loan Duration (Years)"
          className="input"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />

      </div>


      {/* BUTTON SECTION */}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">

        <button
          onClick={calculateLoan}
          className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
        >
          <Calculator size={18} />
          Calculate EMI
        </button>

        <button
          onClick={exampleFill}
          className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          <FlaskConical size={18} />
          Try Example
        </button>

        <button
          onClick={resetForm}
          className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>


      {/* SEO ARTICLE */}

      <div className="mt-12 space-y-6 text-gray-700 leading-relaxed">

        <h2 className="text-2xl font-semibold">
          Loan EMI Calculator – Calculate Your Monthly Loan Payment
        </h2>

        <p>
          A Loan EMI Calculator is an essential financial tool that helps borrowers estimate their monthly loan repayment amount. Whether you are planning to take a home loan, personal loan, or car loan, understanding your monthly EMI is very important for financial planning.
        </p>

        <p>
          This calculator helps you determine the Equated Monthly Installment (EMI) based on the loan amount, interest rate, and loan tenure. By using this tool, you can quickly estimate how much you need to pay every month and the total interest payable during the loan period.
        </p>

        <h3 className="text-xl font-semibold">
          What is EMI?
        </h3>

        <p>
          EMI stands for Equated Monthly Installment. It is the fixed amount that a borrower pays to the lender every month until the loan is fully repaid. Each EMI payment includes both the principal amount and the interest charged by the lender.
        </p>

        <h3 className="text-xl font-semibold">
          How to Use the Loan EMI Calculator
        </h3>

        <ul className="list-disc pl-6 space-y-2">

          <li>Enter the total loan amount you want to borrow.</li>

          <li>Enter the annual interest rate provided by the lender.</li>

          <li>Select the loan duration in years.</li>

          <li>Click the Calculate EMI button to see your monthly payment.</li>

        </ul>

        <h3 className="text-xl font-semibold">
          Benefits of Using a Loan Calculator
        </h3>

        <ul className="list-disc pl-6 space-y-2">

          <li>Helps plan your monthly budget.</li>

          <li>Provides instant and accurate EMI calculation.</li>

          <li>Allows comparison of different loan options.</li>

          <li>Shows total interest payable over time.</li>

        </ul>

        <p>
          Using a Loan EMI Calculator before applying for a loan helps you make better financial decisions. It ensures that you choose the right loan amount and repayment period that fits your financial capacity.
        </p>

      </div>

    </CalculatorLayout>
  );
}