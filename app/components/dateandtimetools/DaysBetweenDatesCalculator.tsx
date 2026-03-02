"use client";

import { useState } from "react";
import {
  CalendarRange,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function DaysBetweenDatesCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inclusive, setInclusive] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return;

    const diffTime = end.getTime() - start.getTime();
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (inclusive) diffDays += 1;

    // Years, Months, Days breakdown
    let tempStart = new Date(start);
    let years = 0;
    let months = 0;

    while (
      new Date(
        tempStart.getFullYear() + 1,
        tempStart.getMonth(),
        tempStart.getDate()
      ) <= end
    ) {
      years++;
      tempStart.setFullYear(tempStart.getFullYear() + 1);
    }

    while (
      new Date(
        tempStart.getFullYear(),
        tempStart.getMonth() + 1,
        tempStart.getDate()
      ) <= end
    ) {
      months++;
      tempStart.setMonth(tempStart.getMonth() + 1);
    }

    const remainingDays = Math.floor(
      (end.getTime() - tempStart.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    setResult({
      totalDays: diffDays,
      years,
      months,
      remainingDays,
    });
  };

  const handleTryExample = () => {
    setStartDate("2024-01-01");
    setEndDate("2025-01-01");
    setInclusive(false);
    setResult(null);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setInclusive(false);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarRange className="text-indigo-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Days Between Dates Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            End Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={inclusive}
          onChange={(e) => setInclusive(e.target.checked)}
        />
        <label className="font-medium">
          Include end date in calculation
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateDifference}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            Date Difference Result
          </h3>

          <p className="text-3xl font-bold text-indigo-500">
            {result.totalDays} Days
          </p>

          <p>
            {result.years} Years, {result.months} Months,{" "}
            {result.remainingDays} Days
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Calculate Days Between Two Dates?
        </h3>
        <p>
          This calculator computes the total number of days
          between two calendar dates. It also provides a
          detailed breakdown into years, months, and days.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Calculate age differences</li>
          <li>Count days for events or deadlines</li>
          <li>Project planning & contracts</li>
          <li>Pregnancy tracking</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Does it count leap years?
            </h4>
            <p>
              Yes, the calculator automatically accounts for leap years.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. What is inclusive calculation?
            </h4>
            <p>
              Inclusive mode counts both start and end dates.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this accurate for all countries?
            </h4>
            <p>
              Yes, it works with standard Gregorian calendar dates.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}