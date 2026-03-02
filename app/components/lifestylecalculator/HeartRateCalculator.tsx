"use client";

import { useState } from "react";
import { Heart, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function HeartRateCalculator() {
    const [age, setAge] = useState("");
    const [maxHr, setMaxHr] = useState<number | null>(null);
    const [zones, setZones] = useState<any>(null);

    const calculateHeartRate = () => {
        const userAge = parseFloat(age);

        if (isNaN(userAge) || userAge <= 0) {
            setMaxHr(null);
            return;
        }

        const mhr = 220 - userAge;

        setMaxHr(mhr);
        setZones({
            light: [Math.round(mhr * 0.5), Math.round(mhr * 0.6)],
            moderate: [Math.round(mhr * 0.6), Math.round(mhr * 0.7)],
            intense: [Math.round(mhr * 0.7), Math.round(mhr * 0.85)],
            peak: [Math.round(mhr * 0.85), Math.round(mhr * 0.95)],
        });
    };

    const tryExample = () => {
        setAge("30");
        const mhr = 220 - 30;

        setMaxHr(mhr);
        setZones({
            light: [Math.round(mhr * 0.5), Math.round(mhr * 0.6)],
            moderate: [Math.round(mhr * 0.6), Math.round(mhr * 0.7)],
            intense: [Math.round(mhr * 0.7), Math.round(mhr * 0.85)],
            peak: [Math.round(mhr * 0.85), Math.round(mhr * 0.95)],
        });
    };

    const resetFields = () => {
        setAge("");
        setMaxHr(null);
        setZones(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Heart className="text-red-600" />
                Heart Rate Calculator
            </h2>

            <div className="grid md:grid-cols-1 gap-6">

                <input
                    type="number"
                    placeholder="Enter Your Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateHeartRate}
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

            {maxHr !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg space-y-3">

                    <p className="text-lg font-semibold text-center">
                        Maximum Heart Rate: {maxHr} bpm
                    </p>

                    <div className="space-y-1">
                        <p>Light Zone (50–60%): {zones.light[0]} - {zones.light[1]} bpm</p>
                        <p>Moderate Zone (60–70%): {zones.moderate[0]} - {zones.moderate[1]} bpm</p>
                        <p>Intense Zone (70–85%): {zones.intense[0]} - {zones.intense[1]} bpm</p>
                        <p>Peak Zone (85–95%): {zones.peak[0]} - {zones.peak[1]} bpm</p>
                    </div>

                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Maximum Heart Rate?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Maximum Heart Rate (MHR) is the highest number of beats per minute
                    your heart can safely achieve during exercise.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    MHR = 220 − Age
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Monitor Heart Rate?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improves workout efficiency</li>
                    <li>Prevents overtraining</li>
                    <li>Supports fat burning</li>
                    <li>Optimizes cardiovascular health</li>
                </ul>

            </div>
        </div>
    );
}