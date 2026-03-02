"use client";

import { useState } from "react";
import {
  GraduationCap,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function PercentageToCGPAConverter() {
  const [percentage, setPercentage] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [scale, setScale] = useState("10");
  const [mode, setMode] = useState("percentageToCgpa");
  const [result, setResult] = useState<any>(null);

  const convert = () => {
    if (mode === "percentageToCgpa") {
      if (!percentage) return;

      let converted;
      if (scale === "10") {
        converted = Number(percentage) / 9.5;
      } else {
        converted =
          (Number(percentage) / 100) * Number(scale);
      }

      setResult({
        value: converted.toFixed(2),
        label: "CGPA",
      });
    } else {
      if (!cgpa) return;

      let converted;
      if (scale === "10") {
        converted = Number(cgpa) * 9.5;
      } else {
        converted =
          (Number(cgpa) / Number(scale)) * 100;
      }

      setResult({
        value: converted.toFixed(2),
        label: "Percentage",
      });
    }
  };

  const handleTryExample = () => {
    setMode("percentageToCgpa");
    setScale("10");
    setPercentage("85");
    setCgpa("");
    setResult(null);
  };

  const handleReset = () => {
    setPercentage("");
    setCgpa("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Percentage ↔ CGPA Converter
        </h2>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Conversion Type
        </label>
        <select
          className="w-full border rounded-lg p-3"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="percentageToCgpa">
            Percentage → CGPA
          </option>
          <option value="cgpaToPercentage">
            CGPA → Percentage
          </option>
        </select>
      </div>

      {/* Scale */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">
          CGPA Scale
        </label>
        <select
          className="w-full border rounded-lg p-3"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        >
          <option value="10">10 Point Scale (CBSE)</option>
          <option value="4">4 Point Scale</option>
          <option value="5">5 Point Scale</option>
        </select>
      </div>

      {/* Input */}
      <div className="mb-6">
        {mode === "percentageToCgpa" ? (
          <>
            <label className="block font-semibold mb-2">
              Enter Percentage
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </>
        ) : (
          <>
            <label className="block font-semibold mb-2">
              Enter CGPA
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={convert}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Convert
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
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold">
            Converted Result
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {result.value} {result.label}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Convert Percentage to CGPA?
        </h3>
        <p>
          In CBSE 10-point grading system, CGPA is calculated by
          dividing the percentage by 9.5.
        </p>

        <h3 className="text-2xl font-bold">
          CGPA to Percentage Formula
        </h3>
        <p>
          Percentage = CGPA × 9.5 (for 10-point scale).
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. What is CGPA?
            </h4>
            <p>
              CGPA stands for Cumulative Grade Point Average.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Is 9.5 rule universal?
            </h4>
            <p>
              No, some universities use different formulas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Does this support 4 point scale?
            </h4>
            <p>
              Yes, you can select custom scale.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}