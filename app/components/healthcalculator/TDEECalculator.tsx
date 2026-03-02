"use client";

import { useState } from "react";
import {
  Flame,
  Calculator,
  RotateCcw,
  PlayCircle,
  Activity,
} from "lucide-react";

export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateTDEE = () => {
    if (!age || !weight || !height) return;

    let bmr = 0;

    // Mifflin-St Jeor Formula
    if (gender === "male") {
      bmr =
        10 * Number(weight) +
        6.25 * Number(height) -
        5 * Number(age) +
        5;
    } else {
      bmr =
        10 * Number(weight) +
        6.25 * Number(height) -
        5 * Number(age) -
        161;
    }

    const result = bmr * Number(activity);
    setTdee(result);
  };

  const handleTryExample = () => {
    setGender("male");
    setAge("25");
    setWeight("70");
    setHeight("175");
    setActivity("1.55");
    setTdee(null);
  };

  const handleReset = () => {
    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("1.2");
    setTdee(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-green-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          TDEE Calculator – Daily Calorie Requirement
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
          <label className="block font-semibold mb-2">Age (Years)</label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Weight (kg)</label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Height (cm)</label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">
            Activity Level
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="1.2">Sedentary (Little or no exercise)</option>
            <option value="1.375">Light Exercise (1-3 days/week)</option>
            <option value="1.55">Moderate Exercise (3-5 days/week)</option>
            <option value="1.725">Heavy Exercise (6-7 days/week)</option>
            <option value="1.9">Athlete (Very intense training)</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateTDEE}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate TDEE
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
      {tdee && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Your Total Daily Energy Expenditure
          </h3>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {tdee.toFixed(2)} Calories/day
          </p>

          <div className="mt-4 text-gray-600">
            <p>Weight Loss Calories: {(tdee - 500).toFixed(0)} kcal/day</p>
            <p>Weight Gain Calories: {(tdee + 500).toFixed(0)} kcal/day</p>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is TDEE?
        </h3>
        <p>
          Total Daily Energy Expenditure (TDEE) represents the total number of
          calories you burn in a day including physical activity, exercise, and
          basic body functions.
        </p>

        <h3 className="text-2xl font-bold">
          How to Use This TDEE Calculator?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Select gender.</li>
          <li>Enter age, weight, and height.</li>
          <li>Select your activity level.</li>
          <li>Click Calculate.</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Example
        </h3>
        <p>
          A 25-year-old male weighing 70kg, height 175cm with moderate exercise:
        </p>
        <p className="font-semibold text-green-500">
          TDEE ≈ 2590 Calories/day
        </p>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. What is the difference between BMR and TDEE?
            </h4>
            <p>
              BMR is calories burned at rest. TDEE includes activity and exercise.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. How much calorie deficit is safe?
            </h4>
            <p>
              A 500 calorie daily deficit is generally considered safe for
              gradual weight loss.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this calculator accurate?
            </h4>
            <p>
              It uses the Mifflin-St Jeor formula combined with activity
              multipliers for reliable estimation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}