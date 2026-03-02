"use client";
import { useState } from "react";
import CalculatorLayout from "./CalculatorLayout";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!value || !percent) return;

    const res = (Number(value) * Number(percent)) / 100;
    setResult(res);
  };

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      result={
        result !== null && (
          <>Result: {result.toFixed(2)}</>
        )
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="number"
          placeholder="Enter Value"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Percentage (%)"
          className="input"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />

        <button onClick={calculate} className="btn">
          Calculate Percentage
        </button>
      </div>
    </CalculatorLayout>
  );
}