"use client";

import { useState, useRef } from "react";
import {
    RotateCcw,
    Wand2,
    Download,
    Share2,
    Grid3X3,
    LayoutGrid, Calculator, Settings, CheckCircle, Briefcase, Sparkles, HelpCircle
} from "lucide-react";

export default function TileCalculator() {
    const [roomLength, setRoomLength] = useState("");
    const [roomWidth, setRoomWidth] = useState("");
    const [tileLength, setTileLength] = useState("");
    const [tileWidth, setTileWidth] = useState("");
    const [tilesNeeded, setTilesNeeded] = useState<number | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    const calculateTiles = () => {
        const rl = parseFloat(roomLength);
        const rw = parseFloat(roomWidth);
        const tl = parseFloat(tileLength);
        const tw = parseFloat(tileWidth);

        if (!rl || !rw || !tl || !tw) return;

        const roomArea = rl * rw;
        const tileArea = tl * tw;

        const totalTiles = Math.ceil(roomArea / tileArea);
        setTilesNeeded(totalTiles);
    };

    const tryExample = () => {
        setRoomLength("20");
        setRoomWidth("15");
        setTileLength("2");
        setTileWidth("2");

        const roomArea = 20 * 15;
        const tileArea = 2 * 2;
        setTilesNeeded(Math.ceil(roomArea / tileArea));
    };

    const resetForm = () => {
        setRoomLength("");
        setRoomWidth("");
        setTileLength("");
        setTileWidth("");
        setTilesNeeded(null);
    };

    const downloadImage = async () => {
        if (!resultRef.current) return;

        const html2canvas = (await import("html2canvas")).default;

        const canvas = await html2canvas(resultRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
        });

        const link = document.createElement("a");
        link.download = "tile-calculation.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="">

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-4">

                {/* Heading with Lucide Icon */}
                <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-center mb-6">
                    <Grid3X3 className="w-8 h-8 text-indigo-600" />
                    Tile Calculator
                </h2>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Room Length (ft)"
                        value={roomLength}
                        onChange={(e) => setRoomLength(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Room Width (ft)"
                        value={roomWidth}
                        onChange={(e) => setRoomWidth(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Tile Length (ft)"
                        value={tileLength}
                        onChange={(e) => setTileLength(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Tile Width (ft)"
                        value={tileWidth}
                        onChange={(e) => setTileWidth(e.target.value)}
                        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={calculateTiles}
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
                {tilesNeeded !== null && (
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
                            <h3 style={{ fontSize: "18px", color: "#374151" }}>
                                Tiles Required
                            </h3>

                            <p
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    color: "#4F46E5",
                                    marginTop: "8px",
                                }}
                            >
                                {tilesNeeded} Tiles
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
                                        title: "Tile Calculation Result",
                                        text: `Tiles Required: ${tilesNeeded}`,
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
                            <LayoutGrid className="text-indigo-600" size={22} />
                            About Tile Calculator
                        </h2>

                        <p className="mt-4 text-sm md:text-base">
                            The <strong>Tile Calculator</strong> is a smart and easy-to-use online tool that helps you estimate
                            the number of tiles required for flooring or wall installation. By entering the room dimensions and
                            tile size, you can instantly calculate how many tiles you need for your project.
                        </p>

                        <p className="mt-3 text-sm md:text-base">
                            Whether you are renovating your home, designing interiors, or working on a construction project,
                            accurate tile estimation is essential to avoid wastage and extra costs. This tool ensures precise
                            calculations so you can plan your materials efficiently.
                        </p>

                        <p className="mt-3 text-sm md:text-base">
                            It is widely used by homeowners, contractors, builders, and interior designers to simplify
                            flooring and wall tiling calculations.
                        </p>
                    </div>

                    {/* 🔷 FORMULA */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Calculator className="text-indigo-600" size={22} />
                            Tile Calculation Formula
                        </h3>

                        <p className="mt-3 text-sm md:text-base">
                            The tile calculation is based on the total area of the room divided by the area of a single tile:
                        </p>

                        <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
                            Number of Tiles = Room Area ÷ Tile Area
                        </div>

                        <p className="mt-3 text-sm md:text-base">
                            For example, if your room area is 120 sq ft and each tile covers 1 sq ft, you will need
                            approximately <strong>120 tiles</strong>. You can also add extra tiles for wastage and cutting.
                        </p>
                    </div>

                    {/* 🔷 HOW IT WORKS */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Settings className="text-purple-600" size={22} />
                            How the Tile Calculator Works
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Enter the <strong>room length and width</strong>.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Input the <strong>tile dimensions</strong> (length & width).
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Click on the <strong>Calculate</strong> button.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Get instant results showing total tiles required.
                            </li>
                        </ul>
                    </div>

                    {/* 🔷 USE CASES */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Briefcase className="text-indigo-600" size={22} />
                            Where is Tile Calculator Used?
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Home Renovation:</strong> Estimate tiles for flooring and walls.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Interior Design:</strong> Plan layouts and tile arrangements.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Construction Projects:</strong> Manage material requirements efficiently.
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                <strong>Cost Estimation:</strong> Calculate total cost based on tile quantity.
                            </li>
                        </ul>
                    </div>

                    {/* 🔷 BENEFITS */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="text-pink-600" size={22} />
                            Benefits of Using Tile Calculator
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Accurate tile estimation with minimal wastage
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Saves time and effort compared to manual calculations
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Mobile-friendly and easy to use
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                Helps in budgeting and cost planning
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-1" />
                                100% free online tool with no signup required
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
                                    1. How many extra tiles should I buy?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    It is recommended to add 5–10% extra tiles for cutting and wastage.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    2. Can I use this for wall tiles?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, the calculator works for both floor tiles and wall tiles.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    3. Does it support different tile sizes?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, you can input any tile dimensions to get accurate results.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    4. Is this tile calculator free?
                                </h4>
                                <p className="text-gray-600 mt-1">
                                    Yes, it is completely free and available online without registration.
                                </p>
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}