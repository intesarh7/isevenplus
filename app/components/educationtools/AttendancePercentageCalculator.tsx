"use client";

import { useState } from "react";
import {
  UserCheck,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function AttendancePercentageCalculator() {
  const [totalClasses, setTotalClasses] =
    useState("");
  const [attendedClasses, setAttendedClasses] =
    useState("");
  const [targetPercentage, setTargetPercentage] =
    useState("75");

  const [result, setResult] = useState<{
    currentPercentage: number;
    requiredClasses?: number;
    bunkAllowed?: number;
  } | null>(null);

  const calculate = () => {
    const total = Number(totalClasses);
    const attended = Number(attendedClasses);
    const target = Number(targetPercentage);

    if (!total || attended < 0 || attended > total)
      return;

    const current =
      (attended / total) * 100;

    let required = 0;
    let bunk = 0;

    if (current < target) {
      // Required classes to reach target
      required = Math.ceil(
        (target * total - 100 * attended) /
          (100 - target)
      );
    } else {
      // Bunk calculation
      bunk = Math.floor(
        (100 * attended - target * total) /
          target
      );
    }

    setResult({
      currentPercentage: Number(
        current.toFixed(2)
      ),
      requiredClasses:
        required > 0 ? required : undefined,
      bunkAllowed:
        bunk > 0 ? bunk : undefined,
    });
  };

  const handleTryExample = () => {
    setTotalClasses("100");
    setAttendedClasses("68");
    setTargetPercentage("75");
    setResult(null);
  };

  const handleReset = () => {
    setTotalClasses("");
    setAttendedClasses("");
    setTargetPercentage("75");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <UserCheck
          className="text-indigo-600"
          size={28}
        />
        <h2 className="text-2xl font-bold text-gray-800">
          Attendance Percentage Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Total Classes Held"
          className="border rounded-lg p-3"
          value={totalClasses}
          onChange={(e) =>
            setTotalClasses(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Classes Attended"
          className="border rounded-lg p-3"
          value={attendedClasses}
          onChange={(e) =>
            setAttendedClasses(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Target Percentage (e.g., 75)"
          className="border rounded-lg p-3"
          value={targetPercentage}
          onChange={(e) =>
            setTargetPercentage(e.target.value)
          }
        />
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
            Attendance Summary
          </h3>

          <p className="text-3xl font-bold text-indigo-600">
            Current Attendance:{" "}
            {result.currentPercentage}%
          </p>

          {result.requiredClasses && (
            <p>
              You must attend next{" "}
              <strong>
                {result.requiredClasses}
              </strong>{" "}
              classes continuously to reach
              target.
            </p>
          )}

          {result.bunkAllowed && (
            <p>
              You can bunk{" "}
              <strong>
                {result.bunkAllowed}
              </strong>{" "}
              more classes safely.
            </p>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Calculate Attendance Percentage?
        </h3>
        <p>
          Attendance Percentage =
        </p>
        <p className="font-semibold text-indigo-600">
          (Classes Attended ÷ Total Classes) × 100
        </p>

        <h3 className="text-2xl font-bold">
          Why Students Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Check 75% eligibility</li>
          <li>Plan safe bunk strategy</li>
          <li>University attendance compliance</li>
          <li>Board exam eligibility</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Pro Tip
        </h3>
        <p>
          Maintain attendance above required
          threshold to avoid exam disqualification.
        </p>
      </div>
    </div>
  );
}