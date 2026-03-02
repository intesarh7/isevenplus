"use client";

import { useState } from "react";
import {
  CalendarClock,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function DateDurationCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeEnd, setIncludeEnd] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateDuration = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return;

    let diffTime = end.getTime() - start.getTime();
    let totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (includeEnd) totalDays += 1;

    // Breakdown
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

    const totalWeeks = (totalDays / 7).toFixed(2);
    const totalMonths = (totalDays / 30.44).toFixed(2);

    setResult({
      years,
      months,
      remainingDays,
      totalDays,
      totalWeeks,
      totalMonths,
    });
  };

  const handleTryExample = () => {
    setStartDate("2024-01-01");
    setEndDate("2025-06-01");
    setIncludeEnd(false);
    setResult(null);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setIncludeEnd(false);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarClock className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Date Duration Calculator
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
          checked={includeEnd}
          onChange={(e) => setIncludeEnd(e.target.checked)}
        />
        <label className="font-medium">
          Include End Date
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateDuration}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate Duration
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl space-y-3 text-center">
          <h3 className="text-xl font-semibold">
            Duration Result
          </h3>

          <p className="text-2xl font-bold text-indigo-600">
            {result.years} Years, {result.months} Months, {result.remainingDays} Days
          </p>

          <p>Total Days: {result.totalDays}</p>
          <p>Total Weeks: {result.totalWeeks}</p>
          <p>Total Months: {result.totalMonths}</p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is a Date Duration Calculator?
        </h3>
        <p>
          A Date Duration Calculator computes the exact time span
          between two calendar dates in years, months, weeks,
          and total days.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Project timeline planning</li>
          <li>Contract duration calculation</li>
          <li>Employment period tracking</li>
          <li>Event planning</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Does it include leap years?
            </h4>
            <p>
              Yes, leap years are automatically handled.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. What does Include End Date mean?
            </h4>
            <p>
              It counts both the start and end date in total duration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is it accurate globally?
            </h4>
            <p>
              Yes, it uses the Gregorian calendar standard.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}