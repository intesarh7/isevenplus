"use client";

import { useState } from "react";
import { Footprints, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function StepsToCalorieCalculator() {
    const [steps, setSteps] = useState("");
    const [calories, setCalories] = useState<number | null>(null);

    const calculateCalories = () => {
        const totalSteps = parseFloat(steps);

        if (isNaN(totalSteps) || totalSteps <= 0) {
            setCalories(null);
            return;
        }

        const burned = totalSteps * 0.04;
        setCalories(parseFloat(burned.toFixed(2)));
    };

    const tryExample = () => {
        setSteps("10000");
        setCalories(parseFloat((10000 * 0.04).toFixed(2)));
    };

    const resetFields = () => {
        setSteps("");
        setCalories(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Footprints className="text-green-600" />
                Steps to Calorie Calculator
            </h2>

            <div className="grid md:grid-cols-1 gap-6">

                <input
                    type="number"
                    placeholder="Enter Steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCalories}
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

            {calories !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Estimated Calories Burned
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {calories} kcal
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Steps Convert to Calories?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    On average, one step burns approximately 0.04 calories.
                    The exact value depends on body weight and walking speed.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Calories Burned = Steps × 0.04
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Track Steps?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Supports weight loss goals</li>
                    <li>Encourages daily movement</li>
                    <li>Improves cardiovascular health</li>
                    <li>Tracks physical activity easily</li>
                </ul>

            </div>
        </div>
    );
}