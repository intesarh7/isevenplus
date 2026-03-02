"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, Download, Share2, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

export default function HabitTrackerCalculator() {

  const [habitName, setHabitName] = useState("");
  const [days, setDays] = useState(7);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [fullscreen, setFullscreen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCompleted(Array(days).fill(false));
  }, [days]);

  const toggleDay = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  const completedCount = completed.filter(Boolean).length;
  const percentage = Math.round((completedCount / days) * 100);

  useEffect(() => {
    if (percentage === 100 && days > 0) {
      confetti({ particleCount: 200, spread: 120 });
    }
  }, [percentage, days]);

  const getStreak = () => {
    let streak = 0;
    for (let i = completed.length - 1; i >= 0; i--) {
      if (completed[i]) streak++;
      else break;
    }
    return streak;
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "habit-tracker-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadStory = async () => {
    if (!storyRef.current) return;
    const canvas = await html2canvas(storyRef.current);
    const link = document.createElement("a");
    link.download = "habit-tracker-story-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareWhatsApp = () => {
    const text = `🔥 I completed ${percentage}% of my habit "${habitName}" on iSevenPlus!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className={`max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 ${fullscreen ? "fixed inset-0 z-50 bg-white overflow-auto" : ""}`}>

      <h2 className="text-3xl font-bold text-center text-green-600 mb-8 flex justify-center gap-2">
        <CheckCircle className="animate-pulse"/>
        Habit Tracker Calculator
      </h2>

      {/* INPUT SECTION */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="e.g., Exercise, Reading, Meditation"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="border-2 border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
          />
          <span className="text-sm text-gray-500 mt-1">
            Enter the habit you want to track
          </span>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Select Tracking Period
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border-2 border-green-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400"
          >
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={30}>30 Days</option>
          </select>
          <span className="text-sm text-gray-500 mt-1">
            Choose how many days you want to track
          </span>
        </div>

      </div>

      {/* TRACKER GRID */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {completed.map((day, index) => (
          <button
            key={index}
            onClick={() => toggleDay(index)}
            className={`h-12 rounded-lg font-bold transition ${
              day ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* RESULT CARD */}
      <div
        ref={cardRef}
        className="p-8 rounded-2xl text-white text-center shadow-2xl"
        style={{
          background: "linear-gradient(180deg, #16a34a, #22c55e, #4ade80)"
        }}
      >
        <h3 className="text-3xl font-bold mb-4">
          {habitName || "Your Habit Progress"}
        </h3>

        <p className="text-5xl font-extrabold mb-4">
          {percentage}%
        </p>

        <p className="text-xl mb-2">
          Completed: {completedCount} / {days} Days
        </p>

        <p className="text-lg">
          Current Streak: {getStreak()} Days 🔥
        </p>

        <p className="text-sm mt-4 opacity-90">
          Powered by iSevenPlus 🚀
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button onClick={downloadImage} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2">
          <Download size={18}/> Download
        </button>
        <button onClick={downloadStory} className="flex-1 bg-purple-600 text-white py-3 rounded-xl flex justify-center gap-2">
          <Download size={18}/> Instagram Story
        </button>
        <button onClick={shareWhatsApp} className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2">
          <Share2 size={18}/> Share
        </button>
        <button onClick={() => setFullscreen(!fullscreen)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl flex justify-center gap-2">
          <Maximize2 size={18}/> Fullscreen
        </button>
      </div>

      {/* Hidden Story Layout */}
      <div
        ref={storyRef}
        style={{
          position:"fixed",
          top:"-9999px",
          left:"-9999px",
          width:"1080px",
          height:"1920px",
          background:"linear-gradient(180deg,#16a34a,#22c55e,#4ade80)",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column",
          color:"white",
          textAlign:"center",
          padding:"120px"
        }}
      >
        <h1 style={{fontSize:"100px"}}>{habitName}</h1>
        <p style={{fontSize:"150px", fontWeight:"bold", marginTop:"40px"}}>
          {percentage}%
        </p>
        <p style={{position:"absolute", bottom:"120px", fontSize:"40px", opacity:0.8}}>
          iSevenPlus Habit Tracker 🔥
        </p>
      </div>

      {/* SEO SECTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          What is Habit Tracker Calculator?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Habit Tracker Calculator helps you track daily habits, measure success rate,
          calculate streaks and stay consistent in your goals.
        </p>
      </div>

    </div>
  );
}