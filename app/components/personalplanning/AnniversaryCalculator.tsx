"use client";

import { useState, useRef } from "react";
import { Heart, Calculator, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";

export default function AnniversaryCalculator() {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<any>(null);

  const storyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const calculateAnniversary = () => {
    if (!startDate) return;

    const start = new Date(startDate);
    const today = new Date();

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const nextAnniversary = new Date(today.getFullYear(), start.getMonth(), start.getDate());
    if (nextAnniversary < today) {
      nextAnniversary.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextAnniversary.getTime() - today.getTime();
    const countdownDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, countdownDays });
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "anniversary-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadStory = async () => {
    if (!storyRef.current) return;
    const canvas = await html2canvas(storyRef.current);
    const link = document.createElement("a");
    link.download = "anniversary-story-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareWhatsApp = () => {
    if (!result) return;
    const text = `💖 We have been together for ${result.years} Years, ${result.months} Months & ${result.days} Days!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">

      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 flex items-center justify-center gap-2">
        <Heart className="animate-pulse" />
        Anniversary Calculator
      </h2>

      {/* INPUT SECTION */}
      <div className="flex flex-col gap-6">

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">
            Relationship Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-2 border-pink-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400"
          />
          <span className="text-sm text-gray-500 mt-1">
            Enter the date when your love story began 💕
          </span>
        </div>

        <button
          onClick={calculateAnniversary}
          className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Calculator size={18} /> Calculate Anniversary
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <>
          <div
            ref={cardRef}
            className="mt-10 p-10 rounded-2xl text-white text-center shadow-2xl relative"
            style={{
              background: "linear-gradient(180deg, #ec4899, #ef4444, #db2777)"
            }}
          >
            <h3 className="text-4xl font-bold mb-6">
              💖 Your Love Journey 💖
            </h3>

            <p className="text-2xl mb-4">
              Together for
            </p>

            <div className="text-5xl font-extrabold mb-6">
              {result.years} Years <br />
              {result.months} Months <br />
              {result.days} Days
            </div>

            <p className="text-xl mb-4">
              🎉 Next Anniversary in {result.countdownDays} days
            </p>

            <p className="opacity-90 text-sm">
              Generated on iSevenPlus 💍
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">

            <button
              onClick={downloadImage}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Image
            </button>

            <button
              onClick={downloadStory}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Download size={18} /> Instagram Story
            </button>

            <button
              onClick={shareWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Share WhatsApp
            </button>

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
            }}
          >
            <h1 style={{ fontSize: "100px", marginBottom: "60px" }}>
              💖 Anniversary 💖
            </h1>

            <div style={{ fontSize: "80px", fontWeight: "bold", marginBottom: "40px" }}>
              {result.years} Years
            </div>

            <div style={{ fontSize: "60px", marginBottom: "20px" }}>
              {result.months} Months
            </div>

            <div style={{ fontSize: "60px", marginBottom: "60px" }}>
              {result.days} Days
            </div>

            <p style={{ fontSize: "50px" }}>
              Next Anniversary in {result.countdownDays} Days 🎉
            </p>

            <p style={{ position: "absolute", bottom: "120px", fontSize: "40px", opacity: 0.8 }}>
              iSevenPlus 💍
            </p>
          </div>
        </>
      )}

      {/* SEO CONTENT */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Anniversary Calculator Meaning
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Anniversary Calculator helps couples calculate how long they have been together.
          It shows total years, months, days and countdown to next anniversary.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          Why Use Anniversary Calculator?
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Celebrate your relationship milestones</li>
          <li>Track your love journey</li>
          <li>Share beautiful anniversary posts</li>
          <li>Create Instagram-ready anniversary stories</li>
        </ul>
      </div>

    </div>
  );
}