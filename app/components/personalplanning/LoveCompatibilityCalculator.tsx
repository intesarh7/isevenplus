"use client";

import { useState, useRef } from "react";
import { Heart, RotateCcw, PlayCircle, Calculator, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";


export default function LoveCompatibilityCalculator() {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [quote, setQuote] = useState("");
    const storyRef = useRef<HTMLDivElement>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const quotes = [
        "Love is composed of a single soul inhabiting two bodies. ❤️",
        "Together is a beautiful place to be. 💕",
        "Every love story is beautiful, but yours is my favorite. 💖",
        "You are my today and all of my tomorrows. 💞",
        "True love never fails. 💘"
    ];

    const calculateCompatibility = () => {
        if (!name1 || !name2) return;

        const combined = (name1 + name2).toLowerCase();
        let total = 0;

        for (let i = 0; i < combined.length; i++) {
            total += combined.charCodeAt(i);
        }

        const percentage = total % 101;
        setResult(percentage);

        // Random Quote
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

        // Confetti if high score
        if (percentage > 85) {
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
            });
        }
    };

    const resetFields = () => {
        setName1("");
        setName2("");
        setResult(null);
    };

    const getMessage = (percent: number) => {
        if (percent > 85) return "Soulmates Forever ❤️";
        if (percent > 70) return "Perfect Match 💞";
        if (percent > 50) return "Strong Connection 💖";
        if (percent > 30) return "Cute Bond 💘";
        return "Opposites Attract 😉";
    };


    // 📸 Screenshot Download
    const downloadImage = async () => {
        if (!cardRef.current || !name1 || !name2) return;

        const canvas = await html2canvas(cardRef.current, {
            backgroundColor: null,
            useCORS: true,
        });

        // Safe filename (remove spaces & special chars)
        const safeName1 = name1.replace(/[^a-zA-Z0-9]/g, "");
        const safeName2 = name2.replace(/[^a-zA-Z0-9]/g, "");

        const fileName = `${safeName1}-${safeName2}-love-compatibilityi-SevenPlus.png`;

        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    // 📄 PDF Download
    const downloadPDF = async () => {
        if (!cardRef.current || !name1 || !name2) return;

        const canvas = await html2canvas(cardRef.current);
        const imgData = canvas.toDataURL("image/png");

        const safeName1 = name1.replace(/[^a-zA-Z0-9]/g, "");
        const safeName2 = name2.replace(/[^a-zA-Z0-9]/g, "");

        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
        pdf.save(`${safeName1}-${safeName2}-love-compatibility-iSevenPlus.pdf`);
    };

    const formatName = (name: string) =>
        name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    const downloadStory = async () => {
        if (!storyRef.current) return;

        const canvas = await html2canvas(storyRef.current, {
            scale: 1,
            useCORS: true,
        });

        const link = document.createElement("a");
        link.download = `${formatName(name1)}-${formatName(name2)}-instagram-story-iSevenPlus.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    // 📲 Social Share
    const shareResult = () => {
        const text = `❤️ Our Love Compatibility is ${result}% 💕 Check yours now on iSevenPlus!`;
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        window.open(shareUrl, "_blank");
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-3 md:p-10">

            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 flex items-center justify-center gap-2">
                <Heart className="animate-pulse" />
                Love Compatibility Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="border-2 border-pink-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400"
                />

                <input
                    type="text"
                    placeholder="Partner Name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="border-2 border-pink-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCompatibility}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {result !== null && (
                <>
                    {/* ❤️ Result Card */}
                    <div
                        ref={cardRef}
                        className="mt-10 p-8 rounded-2xl text-center text-white shadow-2xl animate-fadeIn"
                        style={{
                            background: "linear-gradient(90deg, #ec4899, #ef4444, #db2777)"
                        }}
                    >
                        <h3 className="text-2xl font-semibold mb-3">
                            {name1} ❤️ {name2}
                        </h3>

                        <p className="text-5xl font-extrabold mb-3 animate-bounce">
                            {result}%
                        </p>

                        <p className="text-4xl italic max-w-3xl mb-10">
                            "{quote}"
                        </p>

                        <p className="text-xl font-medium">
                            {getMessage(result)}
                        </p>

                        <p className="mt-4 text-sm opacity-90">
                            Generated by iSevenPlus 💕
                        </p>
                    </div>

                    {/* Hidden Instagram Story Layout */}
                    <div
                        ref={storyRef}
                        style={{
                            position: "fixed",
                            top: "-9999px",
                            left: "-9999px",
                            width: "1080px",
                            height: "1920px",
                            background: "linear-gradient(180deg, #ec4899, #ef4444, #db2777)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "120px",
                            color: "white",
                            overflow: "hidden",
                        }}
                    >

                        {/* Floating Hearts */}
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="heart"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDuration: `${4 + Math.random() * 4}s`,
                                    fontSize: `${30 + Math.random() * 40}px`,
                                }}
                            >
                                ❤️
                            </div>
                        ))}

                        <h1 style={{ fontSize: "80px", fontWeight: "bold", marginBottom: "40px" }}>
                            {name1} ❤️ {name2}
                        </h1>

                        <div
                            className="glow-text"
                            style={{ fontSize: "200px", fontWeight: "900", marginBottom: "40px" }}
                        >
                            {result}%
                        </div>

                        <p
                            style={{
                                fontSize: "50px",
                                fontStyle: "italic",
                                maxWidth: "900px",
                                marginBottom: "60px",
                            }}
                        >
                            "{quote}"
                        </p>

                        <p style={{ fontSize: "50px", marginBottom: "40px" }}>
                            {getMessage(result!)}
                        </p>

                        <p
                            style={{
                                position: "absolute",
                                bottom: "120px",
                                fontSize: "40px",
                                opacity: 0.8,
                            }}
                        >
                            Generated on iSevenPlus.com 💕
                        </p>
                    </div>

                    {/* 📲 Extra Features */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                        <button
                            onClick={downloadImage}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download Image
                        </button>

                        <button
                            onClick={downloadPDF}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download PDF
                        </button>
                        <button
                            onClick={downloadStory}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download Instagram Story
                        </button>

                        <button
                            onClick={shareResult}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            <Share2 size={18} /> Share on WhatsApp
                        </button>

                    </div>
                </>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Love Compatibility is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Our love compatibility calculator uses a fun name-based algorithm
                    to generate a compatibility percentage between two people.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Compatibility % = Name Value Calculation (Fun Based)
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Disclaimer
                </h3>

                <p className="text-gray-700">
                    This calculator is for entertainment purposes only.
                    Real relationships depend on trust, respect and communication.
                </p>

            </div>
        </div>
    );
}
