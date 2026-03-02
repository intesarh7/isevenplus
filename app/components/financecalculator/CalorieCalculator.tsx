"use client";

import { useState } from "react";
import {
  Flame,
  Calculator,
  RotateCcw,
  PlayCircle,
  Target,
} from "lucide-react";

export default function CalorieCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
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

    let tdee = bmr * Number(activity);

    if (goal === "loss") tdee -= 500;
    if (goal === "gain") tdee += 500;

    setCalories(tdee);
  };

  const handleTryExample = () => {
    setGender("male");
    setAge("28");
    setWeight("75");
    setHeight("178");
    setActivity("1.55");
    setGoal("maintain");
    setCalories(null);
  };

  const handleReset = () => {
    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("1.2");
    setGoal("maintain");
    setCalories(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Flame className="text-orange-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Calorie Calculator – Daily Calorie Goal
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
          <label className="block font-semibold mb-2">Age</label>
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

        <div>
          <label className="block font-semibold mb-2">Activity Level</label>
          <select
            className="w-full border rounded-lg p-3"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Light Exercise</option>
            <option value="1.55">Moderate Exercise</option>
            <option value="1.725">Heavy Exercise</option>
            <option value="1.9">Athlete</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Goal</label>
          <select
            className="w-full border rounded-lg p-3"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="loss">Weight Loss</option>
            <option value="gain">Weight Gain</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateCalories}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
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
      {calories && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Your Recommended Daily Calories
          </h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {calories.toFixed(0)} kcal/day
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is a Calorie Calculator?
        </h3>
        <p>
          A calorie calculator estimates how many calories you need daily
          based on age, gender, weight, height, activity level, and fitness goal.
        </p>

        <h3 className="text-2xl font-bold">
          How to Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Enter your personal details.</li>
          <li>Select your activity level.</li>
          <li>Choose your goal (maintain, lose, or gain).</li>
          <li>Click Calculate.</li>
        </ul>

        <h3 className="text-2xl font-bold">FAQs</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. How many calories should I eat to lose weight?
            </h4>
            <p>
              A daily 500 calorie deficit is generally safe for steady weight loss.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Is this calculator accurate?
            </h4>
            <p>
              It uses the scientifically validated Mifflin-St Jeor formula.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Can I use this daily?
            </h4>
            <p>
              Yes, especially when adjusting your fitness or diet goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}