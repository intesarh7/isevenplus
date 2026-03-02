"use client";

import { useState } from "react";
import {
  Droplets,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("0");
  const [climate, setClimate] = useState("normal");
  const [result, setResult] = useState<number | null>(null);

  const calculateWater = () => {
    if (!weight) return;

    // Base Formula: 35 ml per kg
    let water = Number(weight) * 35;

    // Activity addition (each 30 min = +350 ml)
    water += Number(activity) * 350;

    // Hot climate extra 500 ml
    if (climate === "hot") water += 500;

    setResult(water);
  };

  const handleTryExample = () => {
    setWeight("70");
    setActivity("1");
    setClimate("normal");
    setResult(null);
  };

  const handleReset = () => {
    setWeight("");
    setActivity("0");
    setClimate("normal");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Droplets className="text-blue-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Water Intake Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Weight (kg)
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
            Exercise (30 min sessions per day)
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="0">No Exercise</option>
            <option value="1">1 Session</option>
            <option value="2">2 Sessions</option>
            <option value="3">3+ Sessions</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Climate
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="hot">Hot / Humid</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateWater}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate
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
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Recommended Daily Water Intake
          </h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {(result / 1000).toFixed(2)} Liters / day
          </p>
          <p className="text-gray-600 mt-2">
            ({result.toFixed(0)} ml per day)
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Much Water Should You Drink Daily?
        </h3>
        <p>
          Daily water intake depends on your weight, activity level,
          and climate. Staying hydrated supports digestion,
          metabolism, skin health, and energy levels.
        </p>

        <h3 className="text-2xl font-bold">
          Formula Used
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Base: 35 ml per kg body weight</li>
          <li>+350 ml per 30 minutes exercise</li>
          <li>+500 ml for hot climate</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is 8 glasses a day enough?
            </h4>
            <p>
              It depends on body weight and activity. This calculator
              gives a more personalized estimate.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can drinking too much water be harmful?
            </h4>
            <p>
              Yes, excessive intake may cause water intoxication,
              but it is rare.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Should I drink more during workouts?
            </h4>
            <p>
              Yes, exercise increases fluid loss through sweat,
              so hydration needs rise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}