"use client";

import { useState, useRef } from "react";
import { Sparkles, RotateCcw, Calculator, Download } from "lucide-react";
import html2canvas from "html2canvas";

export default function ZodiacCompatibilityCalculator() {
    const [dob1, setDob1] = useState("");
    const [dob2, setDob2] = useState("");
    const [zodiac1, setZodiac1] = useState("");
    const [zodiac2, setZodiac2] = useState("");
    const [percentage, setPercentage] = useState<number | null>(null);
    const [report, setReport] = useState("");

    const storyRef = useRef<HTMLDivElement>(null);

    const zodiacSigns = [
        { sign: "Capricorn ♑", from: "12-22", to: "01-19" },
        { sign: "Aquarius ♒", from: "01-20", to: "02-18" },
        { sign: "Pisces ♓", from: "02-19", to: "03-20" },
        { sign: "Aries ♈", from: "03-21", to: "04-19" },
        { sign: "Taurus ♉", from: "04-20", to: "05-20" },
        { sign: "Gemini ♊", from: "05-21", to: "06-20" },
        { sign: "Cancer ♋", from: "06-21", to: "07-22" },
        { sign: "Leo ♌", from: "07-23", to: "08-22" },
        { sign: "Virgo ♍", from: "08-23", to: "09-22" },
        { sign: "Libra ♎", from: "09-23", to: "10-22" },
        { sign: "Scorpio ♏", from: "10-23", to: "11-21" },
        { sign: "Sagittarius ♐", from: "11-22", to: "12-21" },
    ];

    const compatibilityMatrix: any = {
        Aries: { Leo: 90, Sagittarius: 88, Taurus: 60 },
        Taurus: { Virgo: 92, Capricorn: 89, Aries: 60 },
        Gemini: { Libra: 91, Aquarius: 87 },
        Cancer: { Scorpio: 93, Pisces: 90 },
        Leo: { Aries: 90, Sagittarius: 88 },
        Virgo: { Taurus: 92, Capricorn: 86 },
        Libra: { Gemini: 91, Aquarius: 85 },
        Scorpio: { Cancer: 93, Pisces: 89 },
        Sagittarius: { Aries: 88, Leo: 88 },
        Capricorn: { Taurus: 89, Virgo: 86 },
        Aquarius: { Gemini: 87, Libra: 85 },
        Pisces: { Cancer: 90, Scorpio: 89 },
    };

    const detectZodiac = (dob: string) => {
        const [, month, day] = dob.split("-");
        const mmdd = `${month}-${day}`;

        const found = zodiacSigns.find((z) => {
            if (z.from <= z.to) {
                return mmdd >= z.from && mmdd <= z.to;
            } else {
                return mmdd >= z.from || mmdd <= z.to;
            }
        });

        return found ? found.sign : "";
    };

    const calculateCompatibility = () => {
        if (!dob1 || !dob2) return;

        const z1 = detectZodiac(dob1);
        const z2 = detectZodiac(dob2);

        setZodiac1(z1);
        setZodiac2(z2);

        const sign1 = z1.split(" ")[0];
        const sign2 = z2.split(" ")[0];

        let percent = 70;

        if (compatibilityMatrix[sign1]?.[sign2]) {
            percent = compatibilityMatrix[sign1][sign2];
        } else if (compatibilityMatrix[sign2]?.[sign1]) {
            percent = compatibilityMatrix[sign2][sign1];
        }

        setPercentage(percent);

        setReport(
            `${sign1} and ${sign2} share a dynamic emotional and romantic connection. Their strengths complement each other, creating balance and passion in their relationship.`
        );
    };

    const downloadStory = async () => {
        if (!storyRef.current) return;

        const canvas = await html2canvas(storyRef.current, {
            scale: 1,
            useCORS: true,
        });

        const link = document.createElement("a");
        link.download = `zodiac-compatibility-iSevenPlus.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">

            <h2 className="text-3xl font-bold text-center text-purple-600 mb-8 flex items-center justify-center gap-2">
                <Sparkles />
                Zodiac Compatibility Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Person 1 */}
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">
                        Your Date of Birth
                    </label>
                    <input
                        type="date"
                        value={dob1}
                        onChange={(e) => setDob1(e.target.value)}
                        className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400"
                    />
                    <span className="text-sm text-gray-500 mt-1">
                        Enter your birth date
                    </span>
                </div>

                {/* Person 2 */}
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold text-gray-700">
                        Partner's Date of Birth
                    </label>
                    <input
                        type="date"
                        value={dob2}
                        onChange={(e) => setDob2(e.target.value)}
                        className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400"
                    />
                    <span className="text-sm text-gray-500 mt-1">
                        Enter your partner's birth date
                    </span>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                    onClick={calculateCompatibility}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={downloadStory}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <Download size={18} /> Download Instagram Story
                </button>
            </div>

            {percentage !== null && (
                <>
                    <div
                        className="mt-10 p-8 rounded-2xl text-center text-white shadow-2xl"
                        style={{
                            background: "linear-gradient(180deg, #7c3aed, #a855f7, #c084fc)"
                        }}
                    >
                        <p className="text-4xl mb-2">{zodiac1} ❤️ {zodiac2}</p>
                        <p className="text-6xl font-extrabold mb-4">{percentage}%</p>
                        <p className="italic">{report}</p>
                        <p className="text-sm mt-4 opacity-90">Generated by iSevenPlus 🔮</p>
                    </div>

                    {/* Hidden Story Layout */}
                    <div
                        ref={storyRef}
                        style={{
                            position: "fixed",
                            top: "-9999px",
                            left: "-9999px",
                            width: "1080px",
                            height: "1920px",
                            background: "linear-gradient(180deg, #7c3aed, #a855f7, #c084fc)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "120px",
                            color: "white",
                        }}
                    >
                        <h1 style={{ fontSize: "80px", marginBottom: "40px" }}>
                            {zodiac1} ❤️ {zodiac2}
                        </h1>
                        <div style={{ fontSize: "200px", fontWeight: "900", marginBottom: "40px" }}>
                            {percentage}%
                        </div>
                        <p style={{ fontSize: "50px", maxWidth: "900px" }}>{report}</p>
                        <p style={{ position: "absolute", bottom: "120px", fontSize: "40px", opacity: 0.8 }}>
                            iSevenPlus 🔮
                        </p>
                    </div>
                </>
            )}

            {/* SEO CONTENT */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-4">
                    Zodiac Compatibility Meaning
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Zodiac compatibility helps determine romantic and emotional alignment between two signs.
                    Each zodiac sign has elemental traits that influence relationship dynamics.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Why Check Zodiac Compatibility?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand emotional bonding</li>
                    <li>Discover strengths & weaknesses</li>
                    <li>Improve communication</li>
                    <li>Explore romantic potential</li>
                </ul>
            </div>

        </div>
    );
}