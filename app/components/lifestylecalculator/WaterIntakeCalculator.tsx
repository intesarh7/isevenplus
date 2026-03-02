"use client";

import { useState } from "react";
import { Droplets, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function WaterIntakeCalculators() {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("low");

    const [waterLiters, setWaterLiters] = useState<number | null>(null);

    const calculateWater = () => {
        const bodyWeight = parseFloat(weight);

        if (isNaN(bodyWeight) || bodyWeight <= 0) {
            setWaterLiters(null);
            return;
        }

        let water = bodyWeight * 0.033;

        if (activity === "moderate") water += 0.5;
        if (activity === "high") water += 1;

        setWaterLiters(parseFloat(water.toFixed(2)));
    };

    const tryExample = () => {
        setWeight("70");
        setActivity("moderate");

        let water = 70 * 0.033 + 0.5;
        setWaterLiters(parseFloat(water.toFixed(2)));
    };

    const resetFields = () => {
        setWeight("");
        setActivity("low");
        setWaterLiters(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Droplets className="text-blue-600" />
                Water Intake Calculator
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
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="low">Low Activity</option>
                    <option value="moderate">Moderate Activity</option>
                    <option value="high">High Activity</option>
                </select>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateWater}
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

            {waterLiters !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Recommended Daily Water Intake
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {waterLiters} Liters / day
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Much Water Should You Drink Daily?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Daily water requirement depends on body weight and activity level.
                    Staying hydrated supports metabolism, energy and overall health.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Water (L) = Body Weight × 0.033 + Activity Adjustment
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Benefits of Proper Hydration
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improves digestion</li>
                    <li>Boosts metabolism</li>
                    <li>Enhances workout performance</li>
                    <li>Supports skin health</li>
                </ul>

            </div>
        </div>
    );
}