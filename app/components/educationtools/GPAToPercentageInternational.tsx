"use client";

import { useState } from "react";
import {
  Globe,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function GPAToPercentageInternational() {
  const [gpa, setGpa] = useState("");
  const [scale, setScale] = useState("4");
  const [customScale, setCustomScale] = useState("");
  const [result, setResult] = useState<number | null>(
    null
  );

  const calculate = () => {
    const gpaValue = Number(gpa);
    const selectedScale =
      scale === "custom"
        ? Number(customScale)
        : Number(scale);

    if (!gpaValue || !selectedScale) return;

    const percentage =
      (gpaValue / selectedScale) * 100;

    setResult(Number(percentage.toFixed(2)));
  };

  const handleTryExample = () => {
    setGpa("3.6");
    setScale("4");
    setCustomScale("");
    setResult(null);
  };

  const handleReset = () => {
    setGpa("");
    setScale("4");
    setCustomScale("");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          GPA to Percentage International Converter
        </h2>
      </div>

      {/* Scale Selection */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Select GPA Scale
        </label>
        <select
          className="w-full border rounded-lg p-3"
          value={scale}
          onChange={(e) =>
            setScale(e.target.value)
          }
        >
          <option value="4">4.0 Scale (USA)</option>
          <option value="5">5.0 Scale</option>
          <option value="7">7.0 Scale (Australia)</option>
          <option value="10">10.0 Scale</option>
          <option value="custom">
            Custom Scale
          </option>
        </select>
      </div>

      {/* Custom Scale */}
      {scale === "custom" && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Enter Custom Scale
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={customScale}
            onChange={(e) =>
              setCustomScale(e.target.value)
            }
          />
        </div>
      )}

      {/* GPA Input */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Enter GPA
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded-lg p-3"
          value={gpa}
          onChange={(e) =>
            setGpa(e.target.value)
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={calculate}
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
          How to Convert GPA to Percentage?
        </h3>
        <p>
          The general formula used internationally:
        </p>

        <p className="font-semibold text-indigo-600">
          Percentage = (GPA ÷ GPA Scale) × 100
        </p>

        <h3 className="text-2xl font-bold">
          Supported GPA Systems
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>4.0 GPA (USA)</li>
          <li>5.0 GPA</li>
          <li>7.0 GPA (Australia)</li>
          <li>10.0 GPA</li>
          <li>Custom GPA Systems</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is GPA to Percentage exact?
            </h4>
            <p>
              Universities may use slightly different formulas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can I use custom GPA scale?
            </h4>
            <p>
              Yes, select custom scale and enter your value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}