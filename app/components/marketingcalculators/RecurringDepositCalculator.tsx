"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle, Rocket, CheckCircle, Scale, Lightbulb, Target, Wallet, TrendingUp, PiggyBank } from "lucide-react";

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
    <div className="bg-white shadow-lg rounded-2xl p-8">

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
      {/* SEO Content */}
      <div className="mt-12 space-y-10 text-gray-700 leading-relaxed">

        {/* Section 1 */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-indigo-600" />
            What is a Recurring Deposit (RD)?
          </h2>

          <p className="mt-4">
            A Recurring Deposit (RD) is a popular savings scheme offered by banks and financial institutions
            that allows individuals to deposit a fixed amount of money every month for a specific period of time.
            At the end of the tenure, the investor receives the maturity amount along with interest earned.
          </p>

          <p className="mt-4">
            RD is an ideal investment option for individuals who want to build disciplined savings habits.
            It is especially suitable for salaried individuals, students, and anyone who prefers low-risk investments
            with guaranteed returns. Unlike lump sum investments like Fixed Deposits (FD), RD allows you to invest gradually.
          </p>

          <p className="mt-4">
            With flexible tenure options ranging from 6 months to 10 years, RD provides a safe and predictable way
            to grow your savings over time.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            RD Formula
          </h2>

          <p className="mt-4">
            The maturity amount of a Recurring Deposit is calculated using a compound interest formula.
            This formula considers the monthly deposit amount, interest rate, and tenure.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold mt-4">
            M = P × [(1+r)^n − 1] / r × (1+r)
          </div>

          <p className="mt-4">
            Where:
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>M:</strong> Maturity Amount</li>
            <li><strong>P:</strong> Monthly Deposit Amount</li>
            <li><strong>r:</strong> Monthly Interest Rate</li>
            <li><strong>n:</strong> Number of Months</li>
          </ul>

          <p className="mt-4">
            This formula helps investors calculate how their monthly contributions grow over time with compounding interest.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Why Choose a Recurring Deposit?
          </h3>

          <p className="mt-4">
            Recurring Deposits are one of the safest and most reliable investment options available.
            They are backed by banks and offer fixed returns, making them ideal for risk-averse investors.
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Encourages disciplined monthly savings</li>
            <li>Low-risk investment with guaranteed returns</li>
            <li>Flexible tenure options</li>
            <li>Suitable for short-term and medium-term goals</li>
            <li>Easy to open and manage</li>
          </ul>

          <p className="mt-4">
            RD is perfect for building a savings habit while earning steady interest.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-600" />
            How RD Works
          </h3>

          <p className="mt-4">
            In a Recurring Deposit, you deposit a fixed amount every month for a chosen tenure.
            The bank pays interest on each installment, and the interest is compounded quarterly.
          </p>

          <p className="mt-4">
            At the end of the tenure, you receive the total invested amount plus the accumulated interest.
            Missing a payment may result in a penalty, so consistency is important.
          </p>

          <p className="mt-4">
            RD accounts can usually be opened online or offline, and many banks offer auto-debit facilities
            to ensure timely payments.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Target  className="w-5 h-5 text-red-500" />
            Benefits of Recurring Deposit
          </h3>

          <p className="mt-4">
            Recurring Deposits offer several advantages that make them a preferred choice for conservative investors.
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Guaranteed returns with minimal risk</li>
            <li>Helps achieve financial goals like education or travel</li>
            <li>Affordable monthly investment</li>
            <li>No need for large initial investment</li>
            <li>Suitable for beginners in investing</li>
          </ul>

          <p className="mt-4">
            These benefits make RD an excellent tool for financial planning.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Tips to Maximize RD Returns
          </h3>

          <p className="mt-4">
            To get the best returns from your RD, consider the following strategies:
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Choose a higher interest rate bank</li>
            <li>Invest for a longer tenure</li>
            <li>Avoid missing monthly deposits</li>
            <li>Start early to benefit from compounding</li>
            <li>Compare different RD schemes before investing</li>
          </ul>

          <p className="mt-4">
            Proper planning can significantly increase your maturity amount.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-600" />
            RD vs FD (Fixed Deposit)
          </h3>

          <p className="mt-4">
            RD and FD are both popular savings options, but they differ in how investments are made.
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>RD:</strong> Monthly deposits</li>
            <li><strong>FD:</strong> One-time lump sum investment</li>
            <li><strong>RD:</strong> Suitable for regular savers</li>
            <li><strong>FD:</strong> Suitable for those with large funds</li>
          </ul>

          <p className="mt-4">
            Choosing between RD and FD depends on your financial situation and goals.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Why Use This RD Calculator?
          </h3>

          <p className="mt-4">
            An RD calculator helps you estimate the maturity amount quickly and accurately without manual calculations.
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Estimate maturity value instantly</li>
            <li>Plan your savings goals efficiently</li>
            <li>Compare different RD interest rates</li>
            <li>Improve financial planning</li>
          </ul>

          <p className="mt-4">
            It simplifies complex calculations and helps you make better investment decisions.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-600" />
            Final Thoughts on Recurring Deposit
          </h3>

          <p>
            Recurring Deposits are a reliable and safe investment option for individuals looking to build savings gradually.
            With guaranteed returns and disciplined investing, RD helps you achieve your financial goals without taking high risks.
          </p>

          <p className="mt-4">
            Use this RD calculator to plan your investments, track your growth,
            and secure your financial future with confidence.
          </p>
        </div>

      </div>

    </div>
  );
}