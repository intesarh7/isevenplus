"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Download, Share2, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

export default function CountdownCalculator() {
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        confetti({ particleCount: 200, spread: 120 });
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "countdown-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadStory = async () => {
    if (!storyRef.current) return;
    const canvas = await html2canvas(storyRef.current);
    const link = document.createElement("a");
    link.download = "countdown-story-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareWhatsApp = () => {
    if (!timeLeft) return;
    const text = `⏳ Countdown to ${eventName}: ${timeLeft.days} Days left!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className={`max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 ${fullscreen ? "fixed inset-0 z-50" : ""}`}>

      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8 flex items-center justify-center gap-2">
        <Timer className="animate-pulse" />
        Countdown Calculator
      </h2>

      {/* INPUT SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            placeholder="e.g. Wedding, Birthday, New Year"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border-2 border-indigo-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">
            Select Target Date & Time
          </label>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="border-2 border-indigo-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

      </div>

      {/* COUNTDOWN DISPLAY */}
      {timeLeft && !timeLeft.expired && (
        <>
          <div
            ref={cardRef}
            className="mt-10 p-10 rounded-2xl text-white text-center shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #4f46e5, #6366f1, #818cf8)"
            }}
          >
            <h3 className="text-4xl font-bold mb-6">
              ⏳ Countdown to {eventName || "Your Event"}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-4xl font-extrabold">
              <div>{timeLeft.days} <div className="text-lg">Days</div></div>
              <div>{timeLeft.hours} <div className="text-lg">Hours</div></div>
              <div>{timeLeft.minutes} <div className="text-lg">Minutes</div></div>
              <div>{timeLeft.seconds} <div className="text-lg">Seconds</div></div>
            </div>

            <p className="mt-6 text-sm opacity-90">
              Live Countdown powered by iSevenPlus 🚀
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
              <Share2 size={18} /> Share
            </button>

            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Maximize2 size={18} /> Fullscreen
            </button>

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
              background: "linear-gradient(180deg, #4f46e5, #6366f1, #818cf8)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "120px",
              color: "white",
            }}
          >
            <h1 style={{ fontSize: "80px", marginBottom: "60px" }}>
              {eventName}
            </h1>

            <div style={{ fontSize: "120px", fontWeight: "bold" }}>
              {timeLeft.days} Days
            </div>

            <p style={{ position: "absolute", bottom: "120px", fontSize: "40px", opacity: 0.8 }}>
              iSevenPlus ⏳
            </p>
          </div>
        </>
      )}

      {timeLeft?.expired && (
        <div className="mt-10 text-center text-3xl font-bold text-green-600">
          🎉 Event Started!
        </div>
      )}

      {/* SEO SECTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Countdown Calculator Features
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Countdown Calculator helps you track time remaining until any event like birthday,
          wedding, exam, new year or custom celebration.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Live second-by-second countdown</li>
          <li>Custom event timer</li>
          <li>Instagram-ready export</li>
          <li>Fullscreen presentation mode</li>
        </ul>
      </div>

    </div>
  );
}