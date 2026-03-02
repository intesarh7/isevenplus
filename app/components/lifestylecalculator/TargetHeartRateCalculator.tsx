"use client";

import { useState } from "react";
import { HeartPulse, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function TargetHeartRateCalculator() {
    const [age, setAge] = useState("");
    const [restingHr, setRestingHr] = useState("");
    const [intensity, setIntensity] = useState("70");

    const [targetHr, setTargetHr] = useState<number | null>(null);

    const calculateTargetHr = () => {
        const userAge = parseFloat(age);
        const resting = parseFloat(restingHr);
        const intensityPercent = parseFloat(intensity) / 100;

        if (isNaN(userAge) || isNaN(resting)) {
            setTargetHr(null);
            return;
        }

        const maxHr = 220 - userAge;
        const result =
            (maxHr - resting) * intensityPercent + resting;

        setTargetHr(Math.round(result));
    };

    const tryExample = () => {
        setAge("30");
        setRestingHr("65");
        setIntensity("75");

        const maxHr = 220 - 30;
        const result = (maxHr - 65) * 0.75 + 65;

        setTargetHr(Math.round(result));
    };

    const resetFields = () => {
        setAge("");
        setRestingHr("");
        setIntensity("70");
        setTargetHr(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <HeartPulse className="text-red-600" />
                Target Heart Rate Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Resting Heart Rate (bpm)"
                    value={restingHr}
                    onChange={(e) => setRestingHr(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <select
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="50">50% (Light)</option>
                    <option value="60">60% (Moderate)</option>
                    <option value="70">70% (Fat Burn)</option>
                    <option value="75">75% (Cardio)</option>
                    <option value="85">85% (Intense)</option>
                </select>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateTargetHr}
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

            {targetHr !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Target Heart Rate
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {targetHr} bpm
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Target Heart Rate?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Target heart rate is the ideal heart rate zone
                    to maximize workout efficiency and cardiovascular benefits.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Target HR = ((Max HR − Resting HR) × Intensity) + Resting HR
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use Karvonen Formula?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>More personalized calculation</li>
                    <li>Accounts for resting heart rate</li>
                    <li>Improves fat burn & cardio planning</li>
                    <li>Reduces overtraining risk</li>
                </ul>

            </div>
        </div>
    );
}