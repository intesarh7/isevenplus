"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Calculator,
  RotateCcw,
  PlayCircle,
  CalendarDays, Zap, CheckCircle, Briefcase, Settings, Sparkles, HelpCircle
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
      <div className="mt-12 space-y-10 text-gray-700 leading-relaxed">

        {/* 🔷 INTRO */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="text-indigo-600" size={22} />
            What is a Working Days Calculator?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            A <strong>Working Days Calculator</strong> is a powerful online tool that helps you calculate the number of
            business days between two specific dates. Unlike regular date calculators, it automatically excludes weekends
            (Saturday and Sunday) and can also exclude public holidays based on your settings.
          </p>

          <p className="mt-3 text-sm md:text-base">
            This tool is widely used in industries where accurate time tracking is crucial. Whether you're managing
            projects, calculating employee workdays, or setting invoice deadlines, a working day calculator ensures
            precision and efficiency.
          </p>

          <p className="mt-3 text-sm md:text-base">
            By eliminating non-working days, this calculator gives you a realistic estimate of actual business days,
            helping you avoid delays and miscalculations in professional workflows.
          </p>
        </div>

        {/* 🔷 WHY USE */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-500" size={22} />
            Why Use a Working Days Calculator?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            Calculating working days manually can be time-consuming and error-prone. This tool simplifies the process
            by providing instant and accurate results. Here are some key benefits:
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <span><strong>Accurate Business Day Calculation:</strong> Automatically excludes weekends and holidays.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <span><strong>Time Saving:</strong> No need to manually count days on a calendar.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <span><strong>Improved Planning:</strong> Helps in project deadlines and scheduling tasks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              <span><strong>Error-Free Results:</strong> Eliminates human calculation mistakes.</span>
            </li>
          </ul>
        </div>

        {/* 🔷 USE CASES */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="text-indigo-600" size={22} />
            Common Use Cases
          </h3>

          <p className="mt-3 text-sm md:text-base">
            A working days calculator is useful in various real-life scenarios across industries:
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <span><strong>Project Planning:</strong> Determine exact timelines for project completion.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <span><strong>Payroll Processing:</strong> Calculate employee working days for salary computation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <span><strong>Invoice Management:</strong> Set accurate payment due dates.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <span><strong>HR & Leave Tracking:</strong> Track employee leaves and attendance.</span>
            </li>
          </ul>
        </div>

        {/* 🔷 HOW IT WORKS */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="text-purple-600" size={22} />
            How Does It Work?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            The working days calculator uses a simple algorithm to calculate the number of days between two dates
            while excluding weekends and optional holidays.
          </p>

          <ol className="mt-4 space-y-2 text-sm md:text-base list-decimal ml-6">
            <li>Select the start date</li>
            <li>Select the end date</li>
            <li>Choose whether to include Saturdays or Sundays</li>
            <li>Add public holidays if required</li>
            <li>Get instant working days result</li>
          </ol>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-pink-600" size={22} />
            Benefits of Using Our Calculator
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              100% free and easy to use
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Fast and accurate results
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Mobile-friendly design
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              No login or signup required
            </li>
          </ul>
        </div>

        {/* 🔷 FAQ */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="text-indigo-600" size={22} />
            Frequently Asked Questions
          </h3>

          <div className="mt-4 space-y-5 text-sm md:text-base">

            <div>
              <h4 className="font-semibold">
                1. Does this calculator include public holidays?
              </h4>
              <p className="text-gray-600 mt-1">
                You can manually add public holidays to exclude them from the calculation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                2. Can I include Saturdays as working days?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, you can customize settings to include or exclude Saturdays.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                3. Is this tool useful for HR and payroll?
              </h4>
              <p className="text-gray-600 mt-1">
                Absolutely. HR professionals use it for attendance tracking and salary calculations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                4. Is the working days calculator free?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, it is completely free with no hidden charges.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}