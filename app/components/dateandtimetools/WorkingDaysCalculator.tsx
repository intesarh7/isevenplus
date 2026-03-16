"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [excludeSaturday, setExcludeSaturday] = useState(true);
  const [excludeSunday, setExcludeSunday] = useState(true);
  const [holidays, setHolidays] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateWorkingDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return;

    let count = 0;
    const holidayArray = holidays
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const day = date.getDay();
      const formatted = date.toISOString().split("T")[0];

      if (
        (excludeSaturday && day === 6) ||
        (excludeSunday && day === 0)
      ) {
        continue;
      }

      if (holidayArray.includes(formatted)) {
        continue;
      }

      count++;
    }

    setResult(count);
  };

  const handleTryExample = () => {
    setStartDate("2025-01-01");
    setEndDate("2025-01-31");
    setExcludeSaturday(true);
    setExcludeSunday(true);
    setHolidays("2025-01-26");
    setResult(null);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setExcludeSaturday(true);
    setExcludeSunday(true);
    setHolidays("");
    setResult(null);
  };

  return (
    <div className="mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarCheck className="text-green-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Working Days Calculator
        </h2>
      </div>

      {/* Date Inputs */}
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

      {/* Weekend Options */}
      <div className="mt-4 space-y-2">
        <label className="font-semibold block">
          Exclude Weekends
        </label>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              checked={excludeSaturday}
              onChange={(e) =>
                setExcludeSaturday(e.target.checked)
              }
            />{" "}
            Saturday
          </label>

          <label>
            <input
              type="checkbox"
              checked={excludeSunday}
              onChange={(e) =>
                setExcludeSunday(e.target.checked)
              }
            />{" "}
            Sunday
          </label>
        </div>
      </div>

      {/* Holidays */}
      <div className="mt-4">
        <label className="block font-semibold mb-2">
          Public Holidays (comma separated YYYY-MM-DD)
        </label>
        <input
          type="text"
          placeholder="2025-01-26, 2025-01-01"
          className="w-full border rounded-lg p-3"
          value={holidays}
          onChange={(e) => setHolidays(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateWorkingDays}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
      {result !== null && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Total Working Days
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {result} Days
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is a Working Days Calculator?
        </h3>
        <p>
          A working days calculator calculates the number of business
          days between two dates while excluding weekends and
          public holidays.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Project planning</li>
          <li>Payroll calculations</li>
          <li>Invoice due dates</li>
          <li>Business contracts</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Does it count national holidays?
            </h4>
            <p>
              You can manually add public holidays to exclude them.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can I include Saturdays?
            </h4>
            <p>
              Yes, simply uncheck the Saturday option.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this useful for HR?
            </h4>
            <p>
              Yes, HR teams commonly use working day calculations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}