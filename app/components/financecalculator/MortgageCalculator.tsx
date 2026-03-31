"use client";

import { useState } from "react";
import { Calculator, CheckCircle, TrendingUp, Circle, Sparkles, BarChart3, ShieldCheck, Lightbulb } from "lucide-react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanYears);

    if (!P || !annualRate || !years) return;

    const r = annualRate / 100 / 12; // monthly rate
    const n = years * 12; // total months

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const loadExample = () => {
    setLoanAmount("3000000");
    setInterestRate("8.5");
    setLoanYears("20");
    setResult(null);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mortgage Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Loan Amount (₹)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

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
          Try Example (₹30,00,000 @8.5% for 20 Years)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="text-lg font-semibold">
            Monthly EMI: ₹{result.emi}
          </p>
          <p>Total Interest: ₹{result.totalInterest}</p>
          <p className="font-bold">
            Total Payment: ₹{result.totalPayment}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-8 space-y-8 text-gray-700 leading-relaxed">

        {/* 🔷 HEADER */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Calculator className="text-indigo-600" size={20} />
            Mortgage Calculator Example
          </h3>

          <p className="text-sm md:text-base mt-2 text-gray-600">
            Let’s understand how a <strong>Mortgage Calculator</strong> works with a real-life home loan example.
          </p>
        </div>

        {/* 🔷 EXAMPLE BOX */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">

          <p className="text-sm md:text-base mb-3">
            Suppose you take a <strong>home loan of ₹30,00,000</strong> at an annual interest rate of
            <strong> 8.5%</strong> for a tenure of <strong>20 years</strong>.
          </p>

          <div className="space-y-2 text-sm md:text-base">

            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <strong>Monthly EMI:</strong> ₹26,035 (approx)
            </p>

            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <strong>Total Interest Payable:</strong> ₹32,48,000+
            </p>

            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <strong>Total Payment:</strong> ₹62,48,000+
            </p>

          </div>

        </div>

        {/* 🔷 EXPLANATION */}
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={18} />
            How Mortgage EMI is Calculated
          </h4>

          <p className="mt-2 text-sm md:text-base">
            The <strong>Mortgage EMI (Equated Monthly Installment)</strong> is calculated using the
            standard loan amortization formula. It considers the loan amount (principal), interest rate,
            and loan tenure to determine a fixed monthly payment.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Each EMI consists of two components:
          </p>

          <ul className="mt-3 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <Circle className="text-indigo-600 mt-1" size={10} />
              <span><strong>Principal Amount:</strong> Portion of the loan repaid each month</span>
            </li>
            <li className="flex items-start gap-2">
              <Circle className="text-indigo-600 mt-1" size={10} />
              <span><strong>Interest Amount:</strong> Cost charged by the lender</span>
            </li>
          </ul>

          <p className="mt-3 text-sm md:text-base">
            In the initial years, a larger portion of EMI goes toward interest, while in later years,
            more of it goes toward the principal repayment.
          </p>
        </div>

        {/* 🔷 WHY USE */}
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="text-pink-600" size={18} />
            Why Use a Mortgage Calculator?
          </h4>

          <ul className="mt-3 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Plan your monthly budget before taking a home loan
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Compare different interest rates and loan tenures
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Understand total interest payable over time
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Make better financial and investment decisions
            </li>
          </ul>
        </div>

        {/* 🔷 EXTRA CONTENT */}
        <div className="space-y-6">

          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={18} />
              Key Factors That Affect Your Mortgage EMI
            </h4>

            <p className="mt-2 text-sm md:text-base">
              Your monthly EMI depends on several important factors. Understanding these can help you
              reduce your loan burden and make better financial decisions:
            </p>

            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Loan Amount:</strong> Higher loan amount results in higher EMI.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Interest Rate:</strong> Even a small increase in rate can significantly increase total interest.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Loan Tenure:</strong> Longer tenure reduces EMI but increases total interest paid.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              Tips to Reduce Your Home Loan EMI
            </h4>

            <p className="mt-2 text-sm md:text-base">
              If you're planning to take a home loan, here are some practical tips to reduce your EMI
              and overall interest burden:
            </p>

            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span>Make a higher down payment to reduce loan principal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span>Choose a shorter tenure if you can afford higher EMI</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span>Compare multiple lenders to get the lowest interest rate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span>Make prepayments whenever possible to reduce interest</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={18} />
              Why Accurate EMI Calculation Matters
            </h4>

            <p className="mt-2 text-sm md:text-base">
              Accurate EMI calculation is essential for financial planning. A mortgage is a long-term
              commitment, and even small miscalculations can lead to budgeting issues. By using a
              reliable <strong>Mortgage Calculator</strong>, you can clearly understand your repayment
              schedule and avoid financial stress.
            </p>

            <p className="mt-3 text-sm md:text-base">
              This tool helps you visualize your loan structure, compare different loan scenarios,
              and make informed decisions before applying for a home loan. It is especially useful
              for first-time home buyers who want clarity on their monthly financial obligations.
            </p>
          </div>

        </div>

        {/* 🔷 SEO PARAGRAPH */}
        <div>
          <p className="text-sm md:text-base">
            Our <strong>Mortgage Calculator</strong> helps you calculate monthly EMI, total interest,
            and total repayment amount instantly. Whether you are planning to buy a home, refinance
            your loan, or compare different mortgage options, this tool provides accurate results
            to support your financial planning.
          </p>
        </div>

      </div>
    </div>
  );
}