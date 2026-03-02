"use client";

import { useState } from "react";
import {
  CalendarHeart,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<any>(null);

  const calculateOvulation = () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);

    // Ovulation occurs ~14 days before next period
    const ovulationDay = new Date(lmpDate);
    ovulationDay.setDate(
      ovulationDay.getDate() + Number(cycleLength) - 14
    );

    // Fertile window (5 days before + ovulation day)
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDay);

    // Next period estimate
    const nextPeriod = new Date(lmpDate);
    nextPeriod.setDate(
      nextPeriod.getDate() + Number(cycleLength)
    );

    setResult({
      ovulation: ovulationDay.toDateString(),
      fertileStart: fertileStart.toDateString(),
      fertileEnd: fertileEnd.toDateString(),
      nextPeriod: nextPeriod.toDateString(),
    });
  };

  const handleTryExample = () => {
    setLmp("2025-02-01");
    setCycleLength("28");
    setResult(null);
  };

  const handleReset = () => {
    setLmp("");
    setCycleLength("28");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarHeart className="text-rose-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Ovulation Calculator
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
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateOvulation}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
            Ovulation Details
          </h3>
          <p className="text-rose-500 font-bold">
            Estimated Ovulation Date: {result.ovulation}
          </p>
          <p>
            Fertile Window: {result.fertileStart} – {result.fertileEnd}
          </p>
          <p>
            Next Expected Period: {result.nextPeriod}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Does an Ovulation Calculator Work?
        </h3>
        <p>
          Ovulation usually occurs about 14 days before your next period.
          This calculator estimates your ovulation date based on your last
          menstrual period and average cycle length.
        </p>

        <h3 className="text-2xl font-bold">
          What is the Fertile Window?
        </h3>
        <p>
          The fertile window includes the five days before ovulation
          and the day of ovulation itself — the best time to conceive.
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is ovulation always on day 14?
            </h4>
            <p>
              Not necessarily. It depends on your cycle length.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can irregular cycles affect accuracy?
            </h4>
            <p>
              Yes, irregular cycles may reduce prediction accuracy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this a guarantee of pregnancy?
            </h4>
            <p>
              No. This tool only estimates fertile days.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}