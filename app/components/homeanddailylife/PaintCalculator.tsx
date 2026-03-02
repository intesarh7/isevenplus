"use client";

import { useState, useRef } from "react";
import { Calculator, RotateCcw, Wand2, Download, Share2, Paintbrush } from "lucide-react";

export default function PaintCalculator() {
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [coverage, setCoverage] = useState("");
    const [price, setPrice] = useState("");
    const [liters, setLiters] = useState<number | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const calculatePaint = () => {
        const l = parseFloat(length);
        const h = parseFloat(height);
        const c = parseFloat(coverage);
        const p = parseFloat(price) || 0;

        if (!l || !h || !c) return;

        const area = l * h;
        const requiredLiters = area / c;
        const cost = requiredLiters * p;

        setLiters(requiredLiters);
        setTotalCost(cost);
    };

    const tryExample = () => {
        setLength("20");
        setHeight("10");
        setCoverage("100");
        setPrice("250");

        const area = 20 * 10;
        const requiredLiters = area / 100;
        const cost = requiredLiters * 250;

        setLiters(requiredLiters);
        setTotalCost(cost);
    };

    const resetForm = () => {
        setLength("");
        setHeight("");
        setCoverage("");
        setPrice("");
        setLiters(null);
        setTotalCost(null);
    };

    const downloadImage = async () => {
        if (!resultRef.current) return;

        const html2canvas = (await import("html2canvas")).default;

        const canvas = await html2canvas(resultRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
        });

        const link = document.createElement("a");
        link.download = "paint-calculation.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-left mb-6">
                    <Paintbrush className="w-8 h-8 text-purple-600" />
                    Paint Calculator
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Wall Length (ft)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Wall Height (ft)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Coverage per Litre (sq ft)"
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Price per Litre (₹)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={calculatePaint}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl w-full sm:flex-1 transition"
                    >
                        <Calculator size={18} /> Calculate
                    </button>

                    <button
                        onClick={tryExample}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full sm:flex-1 transition"
                    >
                        <Wand2 size={18} /> Try Example
                    </button>

                    <button
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl w-full sm:flex-1 transition"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>
                </div>

                {(liters !== null && totalCost !== null) && (
                    <>
                        <div
                            ref={resultRef}
                            style={{
                                marginTop: "2rem",
                                backgroundColor: "#F3E8FF",
                                border: "1px solid #E9D5FF",
                                padding: "24px",
                                borderRadius: "16px",
                                textAlign: "center",
                            }}
                        >
                            <h3 style={{ fontSize: "18px", color: "#374151" }}>
                                Paint Required
                            </h3>

                            <p
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    color: "#7C3AED",
                                    marginTop: "6px",
                                }}
                            >
                                {liters.toFixed(2)} Litres
                            </p>

                            <h3 style={{ fontSize: "18px", marginTop: "12px", color: "#374151" }}>
                                Estimated Cost
                            </h3>

                            <p
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    color: "#7C3AED",
                                    marginTop: "6px",
                                }}
                            >
                                ₹ {totalCost.toFixed(2)}
                            </p>


                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={downloadImage}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl w-full transition"
                            >
                                <Download size={18} /> Download Image
                            </button>

                            <button
                                onClick={() =>
                                    navigator.share?.({
                                        title: "Paint Calculation Result",
                                        text: `Paint Required: ${liters.toFixed(
                                            2
                                        )} Litres | Cost: ₹ ${totalCost.toFixed(2)}`,
                                        url: window.location.href,
                                    })
                                }
                                className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl w-full transition"
                            >
                                <Share2 size={18} /> Share
                            </button>
                        </div>
                    </>
                )}


                {/* SEO Section */}
                <section className="mt-14">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                        About Paint Calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our Paint Calculator helps you estimate the amount of paint required
                        and total cost for painting your walls based on dimensions and paint
                        coverage per litre.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-600">
                                How It Works
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Enter wall length and height</li>
                                <li>Enter paint coverage per litre</li>
                                <li>Enter price per litre</li>
                                <li>Click Calculate</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-600">
                                Benefits
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Instant paint estimation</li>
                                <li>Cost calculation</li>
                                <li>Mobile responsive</li>
                                <li>Download result image</li>
                                <li>Free & easy to use</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}