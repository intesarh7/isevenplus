"use client";

import { useState } from "react";

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [result, setResult] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanYears);

    if (!P || !annualRate || !years) return;

    const r = annualRate / 100 / 12;
    const n = years * 12;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    let balance = P;
    let amortizationData: any[] = [];

    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance -= principal;

      amortizationData.push({
        month,
        emi: emi.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });

    setSchedule(amortizationData);
  };

  const loadExample = () => {
    setLoanAmount("2000000");
    setInterestRate("8");
    setLoanYears("15");
    setResult(null);
    setSchedule([]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Amortization Calculator
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Loan Amount (₹)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="mt-4 space-y-3">
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
          Try Example (₹20,00,000 @8% for 15 Years)
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

      {schedule.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h3 className="font-semibold mb-3">
            Amortization Schedule
          </h3>
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">EMI</th>
                <th className="p-2 border">Principal</th>
                <th className="p-2 border">Interest</th>
                <th className="p-2 border">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 24).map((row) => (
                <tr key={row.month}>
                  <td className="p-2 border">{row.month}</td>
                  <td className="p-2 border">₹{row.emi}</td>
                  <td className="p-2 border">₹{row.principal}</td>
                  <td className="p-2 border">₹{row.interest}</td>
                  <td className="p-2 border">₹{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs mt-2 text-gray-500">
            Showing first 24 months for preview.
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          What is an Amortization Schedule?
        </h3>
        <p>
          An amortization schedule shows the breakdown of each loan payment
          into principal and interest over time. Early payments contain
          more interest, while later payments contain more principal.
        </p>
      </div>
    </div>
  );
}