"use client";

import { useState } from "react";
import {
  Scale,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    let bmi = 0;

    if (unit === "metric") {
      const h = Number(height) / 100;
      bmi = Number(weight) / (h * h);
    } else {
      bmi = (Number(weight) / (Number(height) * Number(height))) * 703;
    }

    bmi = Number(bmi.toFixed(2));

    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 24.9) {
      category = "Normal Weight";
      color = "text-green-500";
    } else if (bmi < 29.9) {
      category = "Overweight";
      color = "text-yellow-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    setResult({ bmi, category, color });
  };

  const handleTryExample = () => {
    setUnit("metric");
    setWeight("70");
    setHeight("175");
    setResult(null);
  };

  const handleReset = () => {
    setUnit("metric");
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Scale className="text-indigo-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          BMI Calculator (Body Mass Index)
        </h2>
      </div>

      {/* Units */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Unit System</label>
        <select
          className="w-full border rounded-lg p-3"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="metric">Metric (kg & cm)</option>
          <option value="imperial">Imperial (lbs & inches)</option>
        </select>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Weight {unit === "metric" ? "(kg)" : "(lbs)"}
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Height {unit === "metric" ? "(cm)" : "(inches)"}
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateBMI}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate BMI
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
            Your BMI Result
          </h3>
          <p className={`text-3xl font-bold ${result.color}`}>
            {result.bmi}
          </p>
          <p className={`font-semibold ${result.color}`}>
            {result.category}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is BMI?
        </h3>
        <p>
          Body Mass Index (BMI) is a simple calculation using your weight and height.
          It helps determine whether you are underweight, normal weight,
          overweight, or obese.
        </p>

        <h3 className="text-2xl font-bold">
          BMI Formula
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Metric: weight (kg) / height² (m²)</li>
          <li>Imperial: (weight (lbs) / height² (in)) × 703</li>
        </ul>

        <h3 className="text-2xl font-bold">
          BMI Categories
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Underweight: Below 18.5</li>
          <li>Normal: 18.5 – 24.9</li>
          <li>Overweight: 25 – 29.9</li>
          <li>Obese: 30 and above</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is BMI accurate?
            </h4>
            <p>
              BMI is a useful screening tool but does not measure body fat directly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Does BMI apply to athletes?
            </h4>
            <p>
              Not always. Muscular individuals may have high BMI but low body fat.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Should children use this calculator?
            </h4>
            <p>
              Children require age-specific BMI charts.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}