"use client";

import { useState, useRef } from "react";
import {
    Calculator,
    RotateCcw,
    Wand2,
    Download,
    Share2,
} from "lucide-react";

export default function ElectricityBillCalculator() {
    const [units, setUnits] = useState("");
    const [rate, setRate] = useState("");
    const [fixed, setFixed] = useState("");
    const [tax, setTax] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const calculateBill = () => {
        const u = parseFloat(units);
        const r = parseFloat(rate);
        const f = parseFloat(fixed) || 0;
        const t = parseFloat(tax) || 0;

        if (!u || !r) return;

        const energyCost = u * r;
        const taxAmount = (energyCost * t) / 100;
        const total = energyCost + taxAmount + f;

        setResult(total);
    };

    const tryExample = () => {
        setUnits("350");
        setRate("6");
        setFixed("150");
        setTax("5");
        setResult(350 * 6 + (350 * 6 * 5) / 100 + 150);
    };

    const resetForm = () => {
        setUnits("");
        setRate("");
        setFixed("");
        setTax("");
        setResult(null);
    };

    const downloadImage = async () => {
        if (!resultRef.current) return;

        const html2canvas = (await import("html2canvas")).default;

        // Clone node
        const clone = resultRef.current.cloneNode(true) as HTMLElement;

        // Remove all Tailwind classes (important!)
        clone.className = "";

        // Apply safe inline styling
        clone.style.background = "#ffffff";
        clone.style.color = "#000000";
        clone.style.padding = "30px";
        clone.style.borderRadius = "20px";
        clone.style.textAlign = "center";
        clone.style.width = "400px";
        clone.style.fontFamily = "Arial, sans-serif";

        document.body.appendChild(clone);

        const canvas = await html2canvas(clone, {
            backgroundColor: "#ffffff",
            scale: 2,
        });

        document.body.removeChild(clone);

        const link = document.createElement("a");
        link.download = "electricity-bill-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* ================= CALCULATOR CARD ================= */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6">
                    ⚡ Electricity Bill Calculator
                </h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Units Consumed (kWh)"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Rate per Unit (₹)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Fixed Charges (₹)"
                        value={fixed}
                        onChange={(e) => setFixed(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Tax (%)"
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
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

                {/* Result */}
                {result !== null && (
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
                                position: "relative",
                            }}
                        >
                            <h3 style={{ fontSize: "18px", color: "#374151" }}>
                                Estimated Total Bill
                            </h3>

                            <p
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: "#4F46E5",
                                    marginTop: "8px",
                                }}
                            >
                                ₹ {result.toFixed(2)}
                            </p>
                            <p style={{ position: "absolute", bottom: "5px", right: "10px", fontSize: "8px", opacity: 0.8 }}>
                                iSevenPlus.com
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
                                        title: "Electricity Bill Result",
                                        text: `My electricity bill is ₹ ${result.toFixed(2)}`,
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


                {/* ================= SEO CONTENT SECTION ================= */}
                <section className="mt-14">

                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                        About Electricity Bill Calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        The Electricity Bill Calculator helps you estimate your monthly power
                        consumption cost instantly. Simply enter the units consumed,
                        electricity rate per unit, fixed charges and tax percentage to
                        calculate your total electricity bill.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                How It Works
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Enter total units consumed (kWh)</li>
                                <li>Enter electricity rate per unit</li>
                                <li>Add fixed charges (if any)</li>
                                <li>Add tax percentage</li>
                                <li>Click Calculate to see total bill</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                Why Use This Tool?
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Instant & accurate calculation</li>
                                <li>Fully mobile responsive</li>
                                <li>Downloadable result image</li>
                                <li>Easy social sharing</li>
                                <li>100% free to use</li>
                            </ul>
                        </div>

                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                            Example Calculation
                        </h3>
                        <p className="text-gray-600">
                            If you consume <strong>350 units</strong> at ₹6 per unit,
                            fixed charges ₹150 and 5% tax, your estimated electricity bill
                            will be calculated automatically using this tool.
                        </p>
                    </div>

                </section>
            </div>
        </div >
    );
}