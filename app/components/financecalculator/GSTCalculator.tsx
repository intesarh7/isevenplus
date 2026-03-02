"use client";
import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateGST = () => {
    const gst = (Number(amount) * Number(rate)) / 100;
    setResult(gst);
  };

  return (
    <CalculatorLayout title="GST Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="GST Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={calculateGST}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </div>
      {result !== null && (
        <div className="bg-green-100 p-4 rounded-lg text-center font-semibold">
          GST Amount: ₹ {result.toFixed(2)}
        </div>
      )}
    </CalculatorLayout>
  );
}