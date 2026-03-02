"use client";

import { useState, useRef } from "react";
import { Calculator, RotateCcw, Wand2, Download, Share2 } from "lucide-react";

export default function WaterBillCalculator() {
    const [units, setUnits] = useState("");
    const [rate, setRate] = useState("");
    const [fixed, setFixed] = useState("");
    const [sewer, setSewer] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const calculateBill = () => {
        const u = parseFloat(units);
        const r = parseFloat(rate);
        const f = parseFloat(fixed) || 0;
        const s = parseFloat(sewer) || 0;

        if (!u || !r) return;

        const waterCost = u * r;
        const total = waterCost + f + s;

        setResult(total);
    };

    const tryExample = () => {
        setUnits("25");
        setRate("15");
        setFixed("120");
        setSewer("80");
        setResult(25 * 15 + 120 + 80);
    };

    const resetForm = () => {
        setUnits("");
        setRate("");
        setFixed("");
        setSewer("");
        setResult(null);
    };

    const downloadImage = async () => {
        if (!resultRef.current) return;

        const html2canvas = (await import("html2canvas")).default;

        const canvas = await html2canvas(resultRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
        });

        const link = document.createElement("a");
        link.download = "water-bill-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* Calculator Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6">
                    💧 Water Bill Calculator
                </h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Water Units Consumed"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Rate per Unit (₹)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Fixed Charges (₹)"
                        value={fixed}
                        onChange={(e) => setFixed(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Sewerage Charges (₹)"
                        value={sewer}
                        onChange={(e) => setSewer(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={calculateBill}
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

                {/* Result (SAFE INLINE STYLE to avoid lab() error) */}
                {result !== null && (
                    <>
                        <div
                            ref={resultRef}
                            style={{
                                marginTop: "2rem",
                                backgroundColor: "#E0F2FE",
                                border: "1px solid #BAE6FD",
                                padding: "24px",
                                borderRadius: "16px",
                                textAlign: "center",
                            }}
                        >
                            <h3 style={{ fontSize: "18px", color: "#374151" }}>
                                Estimated Water Bill
                            </h3>

                            <p
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: "#0284C7",
                                    marginTop: "8px",
                                }}
                            >
                                ₹ {result.toFixed(2)}
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
                                        title: "Water Bill Result",
                                        text: `My water bill is ₹ ${result.toFixed(2)}`,
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


                {/* SEO SECTION */}
                <section className="mt-14">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                        About Water Bill Calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        The Water Bill Calculator helps you estimate your monthly water
                        charges based on units consumed, per-unit rate, fixed service charges,
                        and sewerage charges.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-600">
                                How It Works
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Enter total water units used</li>
                                <li>Enter rate per unit</li>
                                <li>Add fixed service charges</li>
                                <li>Add sewerage charges</li>
                                <li>Click Calculate</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-600">
                                Why Use This Tool?
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Instant bill estimation</li>
                                <li>Mobile friendly</li>
                                <li>Download result image</li>
                                <li>Easy sharing option</li>
                                <li>Free & fast</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}