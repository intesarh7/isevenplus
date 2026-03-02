"use client";

import { useState } from "react";
import {
  Calendar,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function PeriodCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [result, setResult] = useState<any>(null);

  const calculatePeriods = () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);
    const cycle = Number(cycleLength);

    const nextPeriods = [];

    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(lmpDate);
      nextDate.setDate(nextDate.getDate() + cycle * i);
      nextPeriods.push(nextDate.toDateString());
    }

    // Ovulation estimate
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(
      ovulationDate.getDate() + cycle - 14
    );

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    setResult({
      nextPeriods,
      ovulation: ovulationDate.toDateString(),
      fertileStart: fertileStart.toDateString(),
    });
  };

  const handleTryExample = () => {
    setLmp("2025-02-01");
    setCycleLength("28");
    setPeriodLength("5");
    setResult(null);
  };

  const handleReset = () => {
    setLmp("");
    setCycleLength("28");
    setPeriodLength("5");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-rose-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Period Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            First Day of Last Period (LMP)
          </label>
          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Average Cycle Length (days)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Average Period Length (days)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={periodLength}
            onChange={(e) => setPeriodLength(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculatePeriods}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl space-y-3 text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Upcoming Period Predictions
          </h3>

          {result.nextPeriods.map((date: string, index: number) => (
            <p key={index} className="font-semibold text-rose-600">
              Period {index + 1}: {date}
            </p>
          ))}

          <p className="mt-4">
            Estimated Ovulation: {result.ovulation}
          </p>

          <p>
            Fertile Window Starts: {result.fertileStart}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Does the Period Calculator Work?
        </h3>
        <p>
          This calculator predicts your next menstrual cycles based on
          your last period date and average cycle length.
        </p>

        <h3 className="text-2xl font-bold">
          Why Track Your Period?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Understand fertility patterns</li>
          <li>Plan pregnancy</li>
          <li>Identify irregular cycles</li>
          <li>Track hormonal health</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is cycle length always 28 days?
            </h4>
            <p>
              No, normal cycles range from 21 to 35 days.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can stress affect periods?
            </h4>
            <p>
              Yes, stress, illness, and lifestyle changes can
              delay or advance periods.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this tool medically accurate?
            </h4>
            <p>
              It provides estimates and should not replace
              professional medical advice.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}