"use client";

import { useState } from "react";
import {
  Clock,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function StudyTimeCalculator() {
  const [dailyHours, setDailyHours] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [targetHours, setTargetHours] = useState("");
  const [mode, setMode] = useState<"forward" | "reverse">(
    "forward"
  );

  const [result, setResult] = useState<{
    totalHours?: number;
    weeklyHours?: number;
    requiredDaily?: number;
  } | null>(null);

  const calculate = () => {
    const daily = Number(dailyHours);
    const days = Number(daysLeft);
    const target = Number(targetHours);

    if (mode === "forward") {
      if (!daily || !days) return;

      const total = daily * days;
      const weekly = daily * 7;

      setResult({
        totalHours: Number(total.toFixed(2)),
        weeklyHours: Number(weekly.toFixed(2)),
      });
    } else {
      if (!target || !days) return;

      const required = target / days;

      setResult({
        requiredDaily: Number(required.toFixed(2)),
      });
    }
  };

  const handleTryExample = () => {
    setMode("forward");
    setDailyHours("5");
    setDaysLeft("30");
    setTargetHours("");
    setResult(null);
  };

  const handleReset = () => {
    setDailyHours("");
    setDaysLeft("");
    setTargetHours("");
    setMode("forward");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Study Time Calculator
        </h2>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Calculation Mode
        </label>
        <select
          className="w-full border rounded-lg p-3"
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as any)
          }
        >
          <option value="forward">
            Calculate Total Study Time
          </option>
          <option value="reverse">
            Calculate Required Daily Study Time
          </option>
        </select>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        {mode === "forward" && (
          <>
            <input
              type="number"
              placeholder="Daily Study Hours"
              className="border rounded-lg p-3"
              value={dailyHours}
              onChange={(e) =>
                setDailyHours(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Days Until Exam"
              className="border rounded-lg p-3"
              value={daysLeft}
              onChange={(e) =>
                setDaysLeft(e.target.value)
              }
            />
          </>
        )}

        {mode === "reverse" && (
          <>
            <input
              type="number"
              placeholder="Target Study Hours"
              className="border rounded-lg p-3"
              value={targetHours}
              onChange={(e) =>
                setTargetHours(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Days Available"
              className="border rounded-lg p-3"
              value={daysLeft}
              onChange={(e) =>
                setDaysLeft(e.target.value)
              }
            />
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center space-y-3">
          <h3 className="text-xl font-semibold">
            Study Plan Result
          </h3>

          {result.totalHours !== undefined && (
            <>
              <p className="text-2xl font-bold text-indigo-600">
                Total Study Hours: {result.totalHours}
              </p>
              <p>Weekly Study Hours: {result.weeklyHours}</p>
            </>
          )}

          {result.requiredDaily !== undefined && (
            <p className="text-2xl font-bold text-indigo-600">
              Required Daily Study: {result.requiredDaily} Hours
            </p>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Does Study Time Calculator Work?
        </h3>
        <p>
          This calculator helps you plan your preparation by
          calculating total study hours or required daily
          study time before exams.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Board exam preparation</li>
          <li>Competitive exam planning</li>
          <li>University semester study planning</li>
          <li>Goal-based study scheduling</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Pro Tip
        </h3>
        <p>
          Consistency matters more than intensity. Study
          daily with focused sessions.
        </p>
      </div>
    </div>
  );
}