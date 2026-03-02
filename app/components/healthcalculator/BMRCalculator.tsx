"use client";

import { useState } from "react";
import {
  Flame,
  Calculator,
  RotateCcw,
  PlayCircle,
  User,
} from "lucide-react";

export default function BMRCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = () => {
    if (!age || !weight || !height) return;

    let result = 0;

    if (gender === "male") {
      result =
        10 * Number(weight) +
        6.25 * Number(height) -
        5 * Number(age) +
        5;
    } else {
      result =
        10 * Number(weight) +
        6.25 * Number(height) -
        5 * Number(age) -
        161;
    }

    setBmr(result);
  };

  const handleTryExample = () => {
    setGender("male");
    setAge("25");
    setWeight("70");
    setHeight("175");
    setBmr(null);
  };

  const handleReset = () => {
    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");
    setBmr(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Flame className="text-red-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          BMR Calculator – Calculate Daily Calorie Needs
        </h2>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Gender</label>
          <select
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
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
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateBMR}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Calculator size={20} />
          Calculate BMR
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
      {bmr && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Your Basal Metabolic Rate
          </h3>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {bmr.toFixed(2)} Calories/day
          </p>
          <p className="text-gray-600 mt-2">
            This means your body needs approximately {bmr.toFixed(0)} calories
            per day to maintain basic life functions.
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is BMR (Basal Metabolic Rate)?
        </h3>
        <p>
          Basal Metabolic Rate (BMR) represents the number of calories your body
          burns at complete rest. It includes essential functions such as breathing,
          blood circulation, temperature regulation, and cell production.
        </p>

        <h3 className="text-2xl font-bold">
          How to Use This BMR Calculator?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Select your gender.</li>
          <li>Enter your age in years.</li>
          <li>Enter your weight in kilograms.</li>
          <li>Enter your height in centimeters.</li>
          <li>Click on "Calculate BMR".</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Example Calculation
        </h3>
        <p>
          For a 25-year-old male weighing 70 kg with a height of 175 cm:
        </p>
        <p className="font-semibold text-red-500">
          BMR ≈ 1673 Calories per day
        </p>

        <h3 className="text-2xl font-bold">
          Frequently Asked Questions (FAQs)
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Why is BMR important?
            </h4>
            <p>
              BMR helps determine your daily calorie requirement and supports
              weight loss, weight gain, or maintenance goals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Is BMR the same as TDEE?
            </h4>
            <p>
              No. BMR is calories burned at rest, while TDEE includes physical
              activity and exercise.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. How accurate is this calculator?
            </h4>
            <p>
              This calculator uses the Mifflin-St Jeor equation, one of the most
              accurate formulas for estimating BMR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}