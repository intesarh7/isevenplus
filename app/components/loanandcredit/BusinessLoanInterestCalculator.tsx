"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

interface ScheduleItem {
  month: number;
  emi: number;
  interest: number;
  principal: number;
  balance: number;
}

export default function BusinessLoanInterestCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    let n = parseFloat(tenure);

    if (!P || !annualRate || !n) return;

    if (tenureType === "years") n = n * 12;

    const r = annualRate / 12 / 100;

    const emiValue =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    let balance = P;
    let totalInt = 0;
    const amortization: ScheduleItem[] = [];

    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = emiValue - interest;
      balance -= principal;
      totalInt += interest;

      amortization.push({
        month,
        emi: emiValue,
        interest,
        principal,
        balance: balance > 0 ? balance : 0,
      });
    }

    setEmi(emiValue);
    setTotalInterest(totalInt);
    setTotalPayment(emiValue * n);
    setSchedule(amortization);
  };

  const tryExample = () => {
    setLoanAmount("1000000");
    setInterestRate("10");
    setTenure("5");
    setTenureType("years");
    setTimeout(() => calculateLoan(), 100);
  };

  const resetFields = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setTenureType("years");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setSchedule([]);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Business Loan Interest Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Interest Rate (% per annum)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Loan Tenure</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
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

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={calculateLoan}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate
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
          <h3 className="text-xl font-semibold mb-2">Loan Summary</h3>
          <p>Monthly EMI: <strong>₹{emi.toFixed(2)}</strong></p>
          <p>Total Interest: <strong>₹{totalInterest?.toFixed(2)}</strong></p>
          <p>Total Payment: <strong>₹{totalPayment?.toFixed(2)}</strong></p>
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Amortization Schedule</h3>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-2">Month</th>
                <th className="p-2">EMI</th>
                <th className="p-2">Interest</th>
                <th className="p-2">Principal</th>
                <th className="p-2">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month} className="text-center border-t">
                  <td className="p-2">{row.month}</td>
                  <td className="p-2">₹{row.emi.toFixed(2)}</td>
                  <td className="p-2">₹{row.interest.toFixed(2)}</td>
                  <td className="p-2">₹{row.principal.toFixed(2)}</td>
                  <td className="p-2">₹{row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Business Loan Interest?</h2>
        <p>
          Business loan interest is the cost paid to borrow funds for business expansion,
          operations, or working capital.
        </p>

        <h2 className="text-2xl font-bold">EMI Formula</h2>
        <p>
          EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Loan cost planning</li>
          <li>Interest burden estimation</li>
          <li>Cash flow forecasting</li>
          <li>Business financial strategy</li>
        </ul>
      </div>
    </div>
  );
}