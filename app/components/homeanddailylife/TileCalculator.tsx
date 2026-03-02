"use client";

import { useState, useRef } from "react";
import {
    Calculator,
    RotateCcw,
    Wand2,
    Download,
    Share2,
    Grid3X3
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
        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">

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
                <section className="mt-14">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                        About Tile Calculator
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our Tile Calculator helps you estimate the number of tiles required
                        for flooring or wall installation based on room dimensions and tile size.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                How It Works
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Enter room length and width</li>
                                <li>Enter tile dimensions</li>
                                <li>Click Calculate</li>
                                <li>Get total tiles required instantly</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                                Benefits
                            </h3>
                            <ul className="space-y-2 text-gray-600 list-disc pl-5">
                                <li>Accurate tile estimation</li>
                                <li>Mobile responsive</li>
                                <li>Download result image</li>
                                <li>Easy sharing</li>
                                <li>Free to use</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}