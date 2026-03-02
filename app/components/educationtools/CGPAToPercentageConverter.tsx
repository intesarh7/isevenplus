"use client";

import { useState } from "react";
import {
  GraduationCap,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function CGPAToPercentageConverter() {
  const [cgpa, setCgpa] = useState("");
  const [scale, setScale] = useState("10");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    if (!cgpa) return;

    let percentage;

    if (scale === "10") {
      // CBSE Standard
      percentage = Number(cgpa) * 9.5;
    } else {
      percentage =
        (Number(cgpa) / Number(scale)) * 100;
    }

    setResult(Number(percentage.toFixed(2)));
  };

  const handleTryExample = () => {
    setCgpa("8.2");
    setScale("10");
    setResult(null);
  };

  const handleReset = () => {
    setCgpa("");
    setScale("10");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          CGPA to Percentage Converter
        </h2>
      </div>

      {/* Scale Selection */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Select CGPA Scale
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
        <label className="block font-semibold mb-2">
          Enter CGPA
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded-lg p-3"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
        />
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
      {result !== null && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold">
            Converted Percentage
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {result}%
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Convert CGPA to Percentage?
        </h3>
        <p>
          In the CBSE 10-point grading system, the standard formula
          to convert CGPA into percentage is:
        </p>

        <p className="font-semibold text-indigo-600">
          Percentage = CGPA × 9.5
        </p>

        <h3 className="text-2xl font-bold">
          For Other Grading Scales
        </h3>
        <p>
          Percentage = (CGPA ÷ Maximum Scale) × 100
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is 9.5 rule applicable everywhere?
            </h4>
            <p>
              No, some universities use different formulas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. What is a good CGPA?
            </h4>
            <p>
              Generally, above 8.0 is considered good in 10-point scale.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Does this support 4-point GPA?
            </h4>
            <p>
              Yes, select the appropriate scale before converting.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}