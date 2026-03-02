"use client";

import { useState } from "react";
import {
  Activity,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateBodyFat = () => {
    if (!height || !neck || !waist) return;

    const h = Number(height);
    const n = Number(neck);
    const w = Number(waist);
    const hp = Number(hip);

    let bodyFat = 0;

    // US Navy Formula
    if (gender === "male") {
      bodyFat =
        86.010 * Math.log10(w - n) -
        70.041 * Math.log10(h) +
        36.76;
    } else {
      if (!hip) return;
      bodyFat =
        163.205 * Math.log10(w + hp - n) -
        97.684 * Math.log10(h) -
        78.387;
    }

    bodyFat = Number(bodyFat.toFixed(2));

    let category = "";

    if (gender === "male") {
      if (bodyFat < 6) category = "Essential Fat";
      else if (bodyFat < 14) category = "Athletic";
      else if (bodyFat < 18) category = "Fitness";
      else if (bodyFat < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFat < 14) category = "Essential Fat";
      else if (bodyFat < 21) category = "Athletic";
      else if (bodyFat < 25) category = "Fitness";
      else if (bodyFat < 32) category = "Average";
      else category = "Obese";
    }

    setResult({ bodyFat, category });
  };

  const handleTryExample = () => {
    setGender("male");
    setHeight("175");
    setNeck("40");
    setWaist("85");
    setHip("");
    setResult(null);
  };

  const handleReset = () => {
    setGender("male");
    setHeight("");
    setNeck("");
    setWaist("");
    setHip("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-pink-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Body Fat Calculator (US Navy Method)
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

        <div>
          <label className="block font-semibold mb-2">
            Neck (cm)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Waist (cm)
          </label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>

        {gender === "female" && (
          <div>
            <label className="block font-semibold mb-2">
              Hip (cm)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateBodyFat}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
            Your Body Fat Percentage
          </h3>
          <p className="text-3xl font-bold text-pink-500">
            {result.bodyFat} %
          </p>
          <p className="font-semibold text-gray-700">
            Category: {result.category}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is Body Fat Percentage?
        </h3>
        <p>
          Body fat percentage represents the proportion of fat in your body
          compared to total body weight. It gives a better fitness indicator
          than BMI.
        </p>

        <h3 className="text-2xl font-bold">
          How to Measure?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Measure height, neck, and waist.</li>
          <li>For females, measure hip circumference.</li>
          <li>Enter values and click Calculate.</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is body fat better than BMI?
            </h4>
            <p>
              Yes, body fat gives a more accurate picture of body composition.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. What is healthy body fat?
            </h4>
            <p>
              For men: 14-24% is considered healthy.  
              For women: 21-31% is considered healthy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this method accurate?
            </h4>
            <p>
              The US Navy method is widely used and fairly reliable for general
              fitness estimation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}