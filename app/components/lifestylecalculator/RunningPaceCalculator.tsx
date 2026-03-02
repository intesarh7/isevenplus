"use client";

import { useState } from "react";
import { Timer, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function RunningPaceCalculator() {
    const [distance, setDistance] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const [pace, setPace] = useState<string | null>(null);

    const calculatePace = () => {
        const dist = parseFloat(distance);
        const h = parseFloat(hours) || 0;
        const m = parseFloat(minutes) || 0;
        const s = parseFloat(seconds) || 0;

        if (isNaN(dist) || dist <= 0) {
            setPace(null);
            return;
        }

        const totalSeconds = h * 3600 + m * 60 + s;
        const paceSeconds = totalSeconds / dist;

        const paceMin = Math.floor(paceSeconds / 60);
        const paceSec = Math.round(paceSeconds % 60);

        setPace(`${paceMin} min ${paceSec} sec / km`);
    };

    const tryExample = () => {
        setDistance("5");
        setHours("0");
        setMinutes("25");
        setSeconds("0");

        const totalSeconds = 25 * 60;
        const paceSeconds = totalSeconds / 5;

        const paceMin = Math.floor(paceSeconds / 60);
        const paceSec = Math.round(paceSeconds % 60);

        setPace(`${paceMin} min ${paceSec} sec / km`);
    };

    const resetFields = () => {
        setDistance("");
        setHours("");
        setMinutes("");
        setSeconds("");
        setPace(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Timer className="text-green-600" />
                Running Pace Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Distance (km)"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <div className="grid grid-cols-3 gap-2">
                    <input
                        type="number"
                        placeholder="Hours"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="border rounded-lg px-3 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Minutes"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="border rounded-lg px-3 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Seconds"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        className="border rounded-lg px-3 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculatePace}
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

            {pace && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Your Running Pace
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {pace}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Running Pace?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Running pace tells you how many minutes it takes to complete
                    one kilometer. It helps runners track performance and improve speed.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Pace = Total Time ÷ Distance
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Track Running Pace?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Improve race timing</li>
                    <li>Plan marathon strategy</li>
                    <li>Measure endurance progress</li>
                    <li>Set realistic fitness goals</li>
                </ul>

            </div>
        </div>
    );
}