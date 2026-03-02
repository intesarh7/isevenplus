"use client";

import { useState, useRef } from "react";
import {
    Calculator,
    RotateCcw,
    Wand2,
    Download,
    Share2,
    Home,
    Paintbrush,
    Ruler,
} from "lucide-react";

export default function RoomAreaCalculator() {
    const [mode, setMode] = useState<"rectangle" | "lshape">("rectangle");
    const [unit, setUnit] = useState<"ft" | "meter">("ft");

    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");

    // L Shape extra
    const [length2, setLength2] = useState("");
    const [width2, setWidth2] = useState("");

    const [coverage, setCoverage] = useState("100"); // paint coverage
    const [price, setPrice] = useState("250");

    const [area, setArea] = useState<number | null>(null);
    const [perimeter, setPerimeter] = useState<number | null>(null);
    const [paintLiters, setPaintLiters] = useState<number | null>(null);
    const [paintCost, setPaintCost] = useState<number | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const convertToFeet = (value: number) =>
        unit === "meter" ? value * 3.28084 : value;

    const calculate = () => {
        let l1 = parseFloat(length);
        let w1 = parseFloat(width);

        if (!l1 || !w1) return;

        l1 = convertToFeet(l1);
        w1 = convertToFeet(w1);

        let totalArea = l1 * w1;
        let totalPerimeter = 2 * (l1 + w1);

        if (mode === "lshape") {
            let l2 = parseFloat(length2);
            let w2 = parseFloat(width2);
            if (!l2 || !w2) return;

            l2 = convertToFeet(l2);
            w2 = convertToFeet(w2);

            totalArea += l2 * w2;
            totalPerimeter += 2 * (l2 + w2);
        }

        const cov = parseFloat(coverage);
        const pr = parseFloat(price);

        const liters = totalArea / cov;
        const cost = liters * pr;

        setArea(totalArea);
        setPerimeter(totalPerimeter);
        setPaintLiters(liters);
        setPaintCost(cost);
    };

    const resetForm = () => {
        setLength("");
        setWidth("");
        setLength2("");
        setWidth2("");
        setArea(null);
        setPerimeter(null);
        setPaintLiters(null);
        setPaintCost(null);
    };

    const downloadImage = async () => {
        if (!resultRef.current) return;
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(resultRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
        });
        const link = document.createElement("a");
        link.download = "room-calculation.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
    const tryExample = () => {
        if (mode === "rectangle") {
            setLength("20");
            setWidth("15");
            setCoverage("100");
            setPrice("250");

            const areaFt = 20 * 15;
            const peri = 2 * (20 + 15);
            const liters = areaFt / 100;
            const cost = liters * 250;

            setArea(areaFt);
            setPerimeter(peri);
            setPaintLiters(liters);
            setPaintCost(cost);
        } else {
            setLength("20");
            setWidth("15");
            setLength2("10");
            setWidth2("8");
            setCoverage("100");
            setPrice("250");

            const areaFt = 20 * 15 + 10 * 8;
            const peri = 2 * (20 + 15) + 2 * (10 + 8);
            const liters = areaFt / 100;
            const cost = liters * 250;

            setArea(areaFt);
            setPerimeter(peri);
            setPaintLiters(liters);
            setPaintCost(cost);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

                {/* Heading */}
                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-6">
                    <Home className="w-8 h-8 text-indigo-600" />
                    Room Area Calculator Pro
                </h2>

                {/* Mode Switch */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                        onClick={() => setMode("rectangle")}
                        className={`w-full sm:flex-1 py-2 rounded-xl ${mode === "rectangle"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        Rectangle
                    </button>
                    <button
                        onClick={() => setMode("lshape")}
                        className={`w-full sm:flex-1 py-2 rounded-xl ${mode === "lshape"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        L-Shape
                    </button>
                    <button
                        onClick={() => setUnit(unit === "ft" ? "meter" : "ft")}
                        className="w-full sm:flex-1 py-2 rounded-xl bg-purple-600 text-white"
                    >
                        Unit: {unit === "ft" ? "Feet" : "Meter"}
                    </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder={`Length (${unit})`}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />
                    <input
                        type="number"
                        placeholder={`Width (${unit})`}
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />

                    {mode === "lshape" && (
                        <>
                            <input
                                type="number"
                                placeholder={`Length 2 (${unit})`}
                                value={length2}
                                onChange={(e) => setLength2(e.target.value)}
                                className="border p-3 rounded-xl w-full"
                            />
                            <input
                                type="number"
                                placeholder={`Width 2 (${unit})`}
                                value={width2}
                                onChange={(e) => setWidth2(e.target.value)}
                                className="border p-3 rounded-xl w-full"
                            />
                        </>
                    )}

                    <input
                        type="number"
                        placeholder="Paint Coverage (sq ft per L)"
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />
                    <input
                        type="number"
                        placeholder="Paint Price per Litre (₹)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={calculate}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl w-full sm:flex-1"
                    >
                        <Calculator size={18} /> Calculate
                    </button>
                    <button
                        onClick={tryExample}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl w-full sm:flex-1"
                    >
                        <Wand2 size={18} /> Try Example
                    </button>
                    <button
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 rounded-xl w-full sm:flex-1"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>
                </div>

                {/* Result */}
                {area && (
                    <>
                        <div
                            ref={resultRef}
                            style={{
                                marginTop: "2rem",
                                backgroundColor: "#EEF2FF",
                                border: "1px solid #C7D2FE",
                                padding: "24px",
                                borderRadius: "16px",
                                textAlign: "center",
                            }}
                        >
                            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                                Area: {area.toFixed(2)} sq ft
                            </p>
                            <p>Perimeter: {perimeter?.toFixed(2)} ft</p>

                            <p style={{ marginTop: "10px" }}>
                                Paint Required: {paintLiters?.toFixed(2)} L
                            </p>
                            <p>Total Paint Cost: ₹ {paintCost?.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={downloadImage}
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl w-full"
                            >
                                <Download size={18} /> Download
                            </button>
                            <button
                                onClick={() =>
                                    navigator.share?.({
                                        title: "Room Area Result",
                                        text: `Area: ${area.toFixed(2)} sq ft`,
                                        url: window.location.href,
                                    })
                                }
                                className="flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-xl w-full"
                            >
                                <Share2 size={18} /> Share
                            </button>
                        </div>

                    </>
                )}
                {/* SEO Section */}
                <section className="mt-14">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                        About Room Area Calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        The Room Area Calculator helps you calculate the total area of a room
                        using its length and width. The result is displayed in square feet and square meters.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                How to Use
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Enter room length</li>
                                <li>Enter room width</li>
                                <li>Click Calculate</li>
                                <li>Get area instantly</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                Why Use This Tool?
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Instant calculation</li>
                                <li>Square feet & meter conversion</li>
                                <li>Mobile friendly</li>
                                <li>Download result image</li>
                                <li>100% free</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

