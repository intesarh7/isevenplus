"use client";

import { useState } from "react";
import {
  Scale,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateIdealWeight = () => {
    if (!height) return;

    const h = Number(height);

    // Convert cm to inches
    const inches = h / 2.54;

    let devine = 0;
    let robinson = 0;
    let miller = 0;

    if (gender === "male") {
      devine = 50 + 2.3 * (inches - 60);
      robinson = 52 + 1.9 * (inches - 60);
      miller = 56.2 + 1.41 * (inches - 60);
    } else {
      devine = 45.5 + 2.3 * (inches - 60);
      robinson = 49 + 1.7 * (inches - 60);
      miller = 53.1 + 1.36 * (inches - 60);
    }

    setResult({
      devine: devine.toFixed(1),
      robinson: robinson.toFixed(1),
      miller: miller.toFixed(1),
    });
  };

  const handleTryExample = () => {
    setGender("male");
    setHeight("175");
    setResult(null);
  };

  const handleReset = () => {
    setGender("male");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Scale className="text-purple-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Ideal Weight Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Gender</label>
          <select
            className="w-full border rounded-lg p-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Height (cm)
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
          onClick={calculateIdealWeight}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            Your Ideal Weight Range
          </h3>
          <p className="text-purple-500 font-bold">
            Devine Formula: {result.devine} kg
          </p>
          <p className="text-purple-500 font-bold">
            Robinson Formula: {result.robinson} kg
          </p>
          <p className="text-purple-500 font-bold">
            Miller Formula: {result.miller} kg
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is Ideal Weight?
        </h3>
        <p>
          Ideal body weight refers to the optimal weight range based on your
          height and gender. It helps assess healthy body composition and
          long-term fitness goals.
        </p>

        <h3 className="text-2xl font-bold">
          How to Use This Calculator?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Select your gender.</li>
          <li>Enter your height in centimeters.</li>
          <li>Click Calculate to see results.</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Why Multiple Formulas?
        </h3>
        <p>
          Different formulas like Devine, Robinson, and Miller provide slightly
          different results based on research methods. Viewing all helps give a
          more balanced estimation.
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is ideal weight the same as BMI?
            </h4>
            <p>
              No. BMI measures body mass index, while ideal weight estimates a
              healthy weight based on height.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Which formula is most accurate?
            </h4>
            <p>
              No single formula is perfect. They provide approximations for
              healthy body weight.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Should I strictly follow this weight?
            </h4>
            <p>
              Use it as a guideline, not an absolute rule. Fitness level and
              body composition also matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}