"use client";
import { useState } from "react";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const m = parseFloat(payment);
    if (!P || !r || !m) return;

    let months = 0;
    let totalInterest = 0;
    let remaining = P;

    while (remaining > 0 && months < 600) {
      const interest = remaining * r;
      remaining = remaining + interest - m;
      totalInterest += interest;
      months++;
    }

    setResult({
      months,
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const loadExample = () => {
    setBalance("5000");
    setRate("18");
    setPayment("200");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Credit Card Payoff Calculator
      </h2>

      <div className="space-y-4">
        <input type="number" placeholder="Credit Card Balance ($)"
          value={balance} onChange={(e) => setBalance(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <input type="number" placeholder="Interest Rate (%)"
          value={rate} onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <input type="number" placeholder="Monthly Payment ($)"
          value={payment} onChange={(e) => setPayment(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <button onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold">
          Calculate
        </button>

        <button onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg">
          Try Example ($5,000 at 18% with $200/month)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
          <p>Payoff Time: {result.months} months</p>
          <p>Total Interest Paid: ${result.totalInterest}</p>
        </div>
      )}

      {/* ✅ SEO CONTENT SECTION */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6 space-y-4">
        <h3 className="text-lg font-semibold">
          What is a Credit Card Payoff Calculator?
        </h3>
        <p>
          A Credit Card Payoff Calculator helps you estimate how long it will
          take to eliminate your credit card debt based on your current balance,
          interest rate, and monthly payment amount.
        </p>

        <h3 className="text-lg font-semibold">
          How Credit Card Interest Works
        </h3>
        <p>
          Credit cards typically charge compound interest monthly. The formula
          used is:
        </p>
        <p className="font-mono">
          Monthly Interest = Outstanding Balance × (APR ÷ 12)
        </p>
        <p>
          If your monthly payment is low, most of it may go toward interest
          instead of reducing the principal.
        </p>

        <h3 className="text-lg font-semibold">
          Example Calculation
        </h3>
        <p>
          If you have a $5,000 balance at 18% APR and pay $200 monthly,
          it will take approximately 32 months to fully pay off your debt,
          and you will pay over $1,000 in interest.
        </p>

        <h3 className="text-lg font-semibold">
          Why Paying More Saves Money
        </h3>
        <p>
          Increasing your monthly payment reduces the principal faster,
          lowers total interest paid, and shortens the payoff time.
          Even small extra payments can significantly reduce debt duration.
        </p>
      </div>
    </div>
  );
}