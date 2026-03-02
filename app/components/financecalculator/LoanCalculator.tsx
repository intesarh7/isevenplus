"use client";
import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const [interest, setInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    if (!amount || !rate || !years) return;

    const principal = Number(amount);
    const r = Number(rate);
    const t = Number(years);

    const totalInterest = (principal * r * t) / 100;
    const totalPayable = principal + totalInterest;

    setInterest(totalInterest);
    setTotal(totalPayable);
  };

  return (
    <CalculatorLayout
      title="Loan Calculator"
      result={
        total !== null && (
          <div className="space-y-2">
            <div>Total Interest: ₹ {interest?.toFixed(2)}</div>
            <div>Total Payable: ₹ {total.toFixed(2)}</div>
          </div>
        )
      }
    >
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

      <button onClick={calculateLoan} className="btn">
        Calculate Loan
      </button>
      </div>
    </CalculatorLayout>
  );
}