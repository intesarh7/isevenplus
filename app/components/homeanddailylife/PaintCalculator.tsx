"use client";

import { useState, useRef } from "react";
import { Calculator, RotateCcw, Wand2, Download, Share2, Paintbrush, Settings, CheckCircle, Home, Sparkles, HelpCircle } from "lucide-react";

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
        <div className="">

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-4">

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
                <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

                    {/* 🔷 ABOUT */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
                            <Paintbrush className="text-purple-600" size={22} />
                            About Paint Calculator
                        </h2>

                        <p className="mt-4 text-sm md:text-base">
                            The <strong>Paint Calculator</strong> is a smart online tool that helps you estimate the
                            amount of paint required to cover walls, ceilings, or surfaces based on dimensions and
                            paint coverage per litre. It also calculates the <strong>total painting cost</strong>,
                            making it perfect for homeowners, contractors, and interior designers.
                        </p>

                        <p className="mt-3 text-sm md:text-base">
                            Whether you are planning to paint a single room or an entire house, knowing the exact
                            quantity of paint required helps reduce wastage and save money. This tool provides
                            accurate results instantly without manual calculations.
                        </p>

                        <p className="mt-3 text-sm md:text-base">
                            It is widely used for <strong>home renovation, wall painting, construction projects,
                                and interior design planning</strong> where precise paint estimation is important.
                        </p>
                    </div>

                    {/* 🔷 FORMULA */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Calculator className="text-indigo-600" size={22} />
                            Paint Calculation Formula
                        </h3>

                        <p className="mt-3 text-sm md:text-base">
                            The paint requirement is calculated using the total surface area divided by paint coverage:
                        </p>

                        <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
                            Paint Required = Total Wall Area ÷ Coverage per Litre
                        </div>

                        <p className="mt-3 text-sm md:text-base">
                            For example, if your wall area is 200 sq ft and one litre of paint covers 100 sq ft,
                            you will need approximately <strong>2 litres of paint</strong>. You can also calculate
                            the total cost based on price per litre.
                        </p>
                    </div>

                    {/* 🔷 HOW IT WORKS */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Settings className="text-purple-600" size={22} />
                            How the Paint Calculator Works
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Enter the <strong>wall length and height</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Input the <strong>paint coverage per litre</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Enter the <strong>price per litre</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Click <strong>Calculate</strong> to get instant results.
                            </li>
                        </ul>
                    </div>

                    {/* 🔷 USE CASES */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Home className="text-indigo-600" size={22} />
                            Where is Paint Calculator Used?
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Home Painting:</strong> Estimate paint for walls and ceilings.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Interior Design:</strong> Plan color themes and coverage.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Construction Projects:</strong> Manage material requirements.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Cost Estimation:</strong> Calculate painting budget easily.
                            </li>
                        </ul>
                    </div>

                    {/* 🔷 BENEFITS */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="text-pink-600" size={22} />
                            Benefits of Using Paint Calculator
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Accurate paint estimation with minimal wastage
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Instant cost calculation
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Easy to use and mobile-friendly
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Helps in planning and budgeting
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                100% free with no signup required
                            </li>
                        </ul>
                    </div>

                    {/* 🔷 FAQ */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <HelpCircle className="text-indigo-600" size={22} />
                            Frequently Asked Questions
                        </h3>

                        <div className="mt-4 space-y-5 text-sm md:text-base">

                            <div>
                                <h4 className="font-semibold">
                                    1. How much paint do I need per square foot?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    On average, 1 litre of paint covers 80–120 sq ft depending on paint type.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    2. Should I buy extra paint?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, it is recommended to add 10–15% extra paint for multiple coats and wastage.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    3. Can I calculate paint cost?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, simply enter price per litre to get total cost instantly.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    4. Is this paint calculator free?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, it is completely free and works on all devices.
                                </p>
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}