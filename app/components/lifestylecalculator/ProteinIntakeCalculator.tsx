"use client";

import { useState } from "react";
import { Dumbbell, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function ProteinIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [goal, setGoal] = useState("maintenance");

    const [protein, setProtein] = useState<number | null>(null);

    const getMultiplier = () => {
        switch (goal) {
            case "weightloss":
                return 1.2;
            case "muscle":
                return 1.8;
            default:
                return 1.0;
        }
    };

    const calculateProtein = () => {
        const bodyWeight = parseFloat(weight);

        if (isNaN(bodyWeight) || bodyWeight <= 0) {
            setProtein(null);
            return;
        }

        const requiredProtein = bodyWeight * getMultiplier();
        setProtein(parseFloat(requiredProtein.toFixed(2)));
    };

    const tryExample = () => {
        setWeight("70");
        setGoal("muscle");

        const requiredProtein = 70 * 1.8;
        setProtein(requiredProtein);
    };

    const resetFields = () => {
        setWeight("");
        setGoal("maintenance");
        setProtein(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Dumbbell className="text-green-600" />
                Protein Intake Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Body Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                    onClick={calculateProtein}
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
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Recommended Daily Protein Intake
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {protein} grams / day
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Much Protein Do You Need?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Daily protein requirement depends on body weight and fitness goals.
                    Higher protein intake supports muscle growth and fat loss.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Protein (g) = Body Weight (kg) × Goal Multiplier
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Protein is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Supports muscle repair & growth</li>
                    <li>Improves metabolism</li>
                    <li>Helps in fat loss</li>
                    <li>Boosts overall recovery</li>
                </ul>

            </div>
        </div>
    );
}