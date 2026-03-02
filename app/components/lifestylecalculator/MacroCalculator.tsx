"use client";

import { useState } from "react";
import { Apple, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function MacroCalculator() {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("maintenance");

  const [protein, setProtein] = useState<number | null>(null);
  const [carbs, setCarbs] = useState<number | null>(null);
  const [fats, setFats] = useState<number | null>(null);

  const getMacroSplit = () => {
    switch (goal) {
      case "weightloss":
        return { p: 0.4, c: 0.3, f: 0.3 };
      case "muscle":
        return { p: 0.35, c: 0.45, f: 0.2 };
      default:
        return { p: 0.3, c: 0.4, f: 0.3 };
    }
  };

  const calculateMacros = () => {
    const totalCalories = parseFloat(calories);

    if (isNaN(totalCalories) || totalCalories <= 0) {
      setProtein(null);
      return;
    }

    const split = getMacroSplit();

    const proteinGrams = (totalCalories * split.p) / 4;
    const carbsGrams = (totalCalories * split.c) / 4;
    const fatsGrams = (totalCalories * split.f) / 9;

    setProtein(parseFloat(proteinGrams.toFixed(2)));
    setCarbs(parseFloat(carbsGrams.toFixed(2)));
    setFats(parseFloat(fatsGrams.toFixed(2)));
  };

  const tryExample = () => {
    setCalories("2500");
    setGoal("muscle");

    const split = { p: 0.35, c: 0.45, f: 0.2 };

    setProtein(parseFloat(((2500 * split.p) / 4).toFixed(2)));
    setCarbs(parseFloat(((2500 * split.c) / 4).toFixed(2)));
    setFats(parseFloat(((2500 * split.f) / 9).toFixed(2)));
  };

  const resetFields = () => {
    setCalories("");
    setGoal("maintenance");
    setProtein(null);
    setCarbs(null);
    setFats(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Apple className="text-green-600" />
        Macro Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Daily Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="maintenance">Maintenance</option>
          <option value="weightloss">Weight Loss</option>
          <option value="muscle">Muscle Gain</option>
        </select>

      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">

        <button
          onClick={calculateMacros}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Calculator size={18} /> Calculate
        </button>

        <button
          onClick={tryExample}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <PlayCircle size={18} /> Try Example
        </button>

        <button
          onClick={resetFields}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Reset
        </button>

      </div>

      {protein !== null && (
        <div className="mt-8 bg-indigo-50 p-6 rounded-lg space-y-2 text-center">
          <p className="font-semibold">Protein: {protein} g</p>
          <p className="font-semibold">Carbs: {carbs} g</p>
          <p className="font-semibold">Fats: {fats} g</p>
        </div>
      )}
      <div className="mt-16">

        <h2 className="text-2xl font-bold mb-4">
          What is a Macro Calculator?
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          A macro calculator determines your daily protein, carbohydrate and fat
          intake based on your calorie target and fitness goal.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
          Macros = Calories × Macro % ÷ Calories per gram
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Why Track Macros?
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Improves fat loss</li>
          <li>Supports muscle growth</li>
          <li>Optimizes energy levels</li>
          <li>Helps structured meal planning</li>
        </ul>

      </div>
    </div>
  );
}