"use client";

import { useState } from "react";
import {
  Users,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateAgeDifference = () => {
    if (!date1 || !date2) return;

    let d1 = new Date(date1);
    let d2 = new Date(date2);

    let olderPerson = "";

    if (d1 < d2) {
      olderPerson = "Person 1 is older";
    } else if (d2 < d1) {
      olderPerson = "Person 2 is older";
    } else {
      olderPerson = "Both are the same age";
    }

    let start = d1 < d2 ? d1 : d2;
    let end = d1 < d2 ? d2 : d1;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      );
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const totalMonths = years * 12 + months;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      olderPerson,
    });
  };

  const handleTryExample = () => {
    setDate1("1995-05-10");
    setDate2("2000-08-20");
    setResult(null);
  };

  const handleReset = () => {
    setDate1("");
    setDate2("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Age Difference Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Birth Date – Person 1
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Birth Date – Person 2
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateAgeDifference}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
            Age Difference Result
          </h3>

          <p className="text-2xl font-bold text-blue-600">
            {result.years} Years, {result.months} Months, {result.days} Days
          </p>

          <p>Total Months: {result.totalMonths}</p>
          <p>Total Days: {result.totalDays}</p>

          <p className="font-semibold mt-2">
            {result.olderPerson}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is an Age Difference Calculator?
        </h3>
        <p>
          This calculator computes the exact difference between two
          birth dates in years, months, and days. It also calculates
          total days and total months difference.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Relationship age difference</li>
          <li>Sibling age gap</li>
          <li>Employee age comparison</li>
          <li>Legal age verification</li>
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
              Yes, leap years are automatically considered.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can both dates be the same?
            </h4>
            <p>
              Yes, it will show zero difference.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this accurate worldwide?
            </h4>
            <p>
              Yes, it uses the standard Gregorian calendar.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}