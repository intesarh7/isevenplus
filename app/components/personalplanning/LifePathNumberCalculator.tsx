"use client";

import { useState, useRef } from "react";
import { Sparkles, RotateCcw, Calculator, Download } from "lucide-react";
import html2canvas from "html2canvas";

export default function LifePathNumberCalculator() {
  const [dob, setDob] = useState("");
  const [lifePath, setLifePath] = useState<number | null>(null);
  const [meaning, setMeaning] = useState("");
  const [zodiac, setZodiac] = useState("");

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

  const detailedReports: any = {
    1: "You are a born leader with strong independence and ambition. You thrive when taking initiative and creating your own path. Success comes when you trust your instincts.",
    2: "You are diplomatic, intuitive and emotionally intelligent. You bring harmony wherever you go and excel in partnerships.",
    3: "You are creative, expressive and naturally optimistic. Communication and artistic talents define your journey.",
    4: "You are practical and disciplined. Hard work and structure lead you toward long-term stability.",
    5: "You crave freedom and adventure. Life brings you growth through change and exploration.",
    6: "You are nurturing and responsible. Family, love and service define your destiny.",
    7: "You are spiritual and analytical. Deep thinking and inner wisdom guide your path.",
    8: "You are powerful and ambitious. Financial and material success align strongly with you.",
    9: "You are compassionate and humanitarian. You inspire others with your generosity.",
    11: "Master Intuitive - Highly spiritual and inspirational soul with deep psychic energy.",
    12: "Master Builder - You are capable of turning dreams into large-scale reality.",
    13: "Master Teacher - You uplift humanity with wisdom and compassion."
  };

  const calculateLifePath = () => {
    if (!dob) return;

    const digits = dob.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    const reduceNumber = (num: number): number => {
      if ([11, 22, 33].includes(num)) return num;
      if (num < 10) return num;
      return reduceNumber(
        num.toString().split("").reduce((a, b) => a + Number(b), 0)
      );
    };

    const result = reduceNumber(sum);
    setLifePath(result);
    setMeaning(detailedReports[result]);

    const [year, month, day] = dob.split("-");
    const mmdd = `${month}-${day}`;

    const found = zodiacSigns.find((z) => {
      if (z.from <= z.to) {
        return mmdd >= z.from && mmdd <= z.to;
      } else {
        return mmdd >= z.from || mmdd <= z.to;
      }
    });

    setZodiac(found ? found.sign : "");
  };

  const downloadStory = async () => {
    if (!storyRef.current) return;

    const canvas = await html2canvas(storyRef.current, {
      scale: 1,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `life-path-${lifePath}-iSevenPlus.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">

      <h2 className="text-3xl font-bold text-center text-purple-600 mb-8 flex items-center justify-center gap-2">
        <Sparkles />
        Life Path Number Calculator
      </h2>

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 w-full"
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={calculateLifePath}
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

      {lifePath !== null && (
        <>
          <div
            className="mt-10 p-8 rounded-2xl text-center text-white shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #a855f7, #c084fc)"
            }}
          >
            <p className="text-6xl font-extrabold mb-4">
              {lifePath}
            </p>
            <p className="text-xl mb-2">{zodiac}</p>
            <p className="text-lg italic mb-4">{meaning}</p>
            <p className="text-sm opacity-90">
              Generated by iSevenPlus ✨
            </p>
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
            <h1 style={{ fontSize: "200px", fontWeight: "900", marginBottom: "40px" }}>
              {lifePath}
            </h1>
            <p style={{ fontSize: "60px", marginBottom: "30px" }}>{zodiac}</p>
            <p style={{ fontSize: "50px", maxWidth: "900px" }}>{meaning}</p>
            <p style={{ position: "absolute", bottom: "120px", fontSize: "40px", opacity: 0.8 }}>
              iSevenPlus 🔮
            </p>
          </div>
        </>
      )}

      {/* SEO CONTENT */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          What is a Life Path Number?
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Life Path Number in numerology represents your core personality,
          strengths, weaknesses and life purpose. It is calculated using your full date of birth.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
          Life Path = Sum of Birth Date Digits (Reduced to Single Digit or Master Number)
        </div>

        <h3 className="text-xl font-semibold mb-3">
          Why Check Your Life Path Number?
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Discover your hidden strengths</li>
          <li>Understand your destiny path</li>
          <li>Know compatibility traits</li>
          <li>Explore spiritual growth</li>
        </ul>
      </div>

    </div>
  );
}