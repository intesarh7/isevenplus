"use client";

import { useState } from "react";
import {
  CalendarDays,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState("lmp");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateDueDate = () => {
    if (!date) return;

    const inputDate = new Date(date);
    let dueDate = new Date(inputDate);

    if (method === "lmp") {
      // Naegele’s Rule: LMP + 280 days
      dueDate.setDate(dueDate.getDate() + 280);
    } else {
      // Conception date + 266 days
      dueDate.setDate(dueDate.getDate() + 266);
    }

    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const weeksLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

    setResult({
      dueDate: dueDate.toDateString(),
      weeksLeft,
    });
  };

  const handleTryExample = () => {
    setMethod("lmp");
    setDate("2025-01-01");
    setResult(null);
  };

  const handleReset = () => {
    setMethod("lmp");
    setDate("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="text-pink-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Pregnancy Due Date Calculator
        </h2>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Calculation Method
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="lmp">Last Menstrual Period (LMP)</option>
            <option value="conception">Conception Date</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Select Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateDueDate}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate Due Date
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
      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center space-y-3">
          <h3 className="text-xl font-semibold text-gray-700">
            Estimated Due Date
          </h3>
          <p className="text-2xl font-bold text-pink-500">
            {result.dueDate}
          </p>

          <p className="text-gray-600">
            Approximately {result.weeksLeft} weeks remaining.
          </p>

          <p className="text-gray-600 text-sm">
            Typical pregnancy lasts about 40 weeks (280 days).
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Does the Pregnancy Due Date Calculator Work?
        </h3>
        <p>
          This calculator uses Naegele’s Rule, which estimates your baby's
          due date by adding 280 days (40 weeks) to the first day of your
          last menstrual period (LMP).
        </p>

        <h3 className="text-2xl font-bold">
          What is Naegele’s Rule?
        </h3>
        <p>
          Naegele’s Rule is a standard medical method used worldwide to
          estimate pregnancy due dates. It assumes a 28-day cycle and ovulation
          occurring on day 14.
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. How accurate is the due date?
            </h4>
            <p>
              Only about 5% of babies are born exactly on their due date.
              It is an estimate.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can ultrasound change due date?
            </h4>
            <p>
              Yes, early pregnancy ultrasounds may adjust your estimated due date.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. How long is a full-term pregnancy?
            </h4>
            <p>
              A full-term pregnancy typically lasts 37–42 weeks.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}