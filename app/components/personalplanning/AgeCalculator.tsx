"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "./CalculatorLayout";
import {
  Cake,
  Clock,
  CalendarDays,
  Share2,
  Printer,
  Mail,
  CheckCircle,
  Twitter,
} from "lucide-react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const zodiacDescriptions: any = {
    Aries: "Bold and ambitious personality.",
    Taurus: "Reliable and patient nature.",
    Gemini: "Expressive and curious.",
    Cancer: "Emotional and intuitive.",
    Leo: "Confident and charismatic.",
    Virgo: "Analytical and kind.",
    Libra: "Diplomatic and fair-minded.",
    Scorpio: "Passionate and determined.",
    Sagittarius: "Adventurous and optimistic.",
    Capricorn: "Disciplined and responsible.",
    Aquarius: "Innovative and independent.",
    Pisces: "Compassionate and artistic.",
  };

  const getZodiac = (day: number, month: number) => {
    const signs = [
      "Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini",
      "Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"
    ];
    const lastDay = [19,18,20,19,20,20,22,22,22,22,21,21];
    return day > lastDay[month - 1]
      ? signs[month]
      : signs[month - 1];
  };

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = today.getTime() - birthDate.getTime();
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const zodiac = getZodiac(
      birthDate.getDate(),
      birthDate.getMonth() + 1
    );

    setResult({
      years,
      months,
      days,
      totalHours,
      totalMinutes,
      nextBirthday,
      zodiac,
    });

    setCountdown(
      Math.floor((nextBirthday.getTime() - today.getTime()) / 1000)
    );
  };

  // 🎂 Countdown animation
  useEffect(() => {
    if (!countdown) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleShare = (type: string) => {
    const text = `I am ${result.years} years old! 🎉`;
    const url = window.location.href;

    if (type === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
        "_blank"
      );
    }

    if (type === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + url)}`,
        "_blank"
      );
    }
  };

  const handleReminder = () => {
    setToast("Birthday reminder saved successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const milestone =
    result?.years >= 100
      ? "Century Achieved! 🏆"
      : result?.years >= 50
      ? "Golden Age! ✨"
      : result?.years >= 18
      ? "Adult Milestone 🎯"
      : "Young Achiever 🌟";

  const formattedCountdown = () => {
    if (!countdown) return "";
    const days = Math.floor(countdown / (60 * 60 * 24));
    const hours = Math.floor((countdown % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle size={18} />
          {toast}
        </div>
      )}

      <CalculatorLayout
        title="Advanced Age Calculator"
        result={
          result && (
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Cake size={20} />
                {result.years} Years {result.months} Months {result.days} Days
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                Zodiac: {result.zodiac}
              </div>

              <p className="text-sm text-gray-600">
                {zodiacDescriptions[result.zodiac]}
              </p>

              <div className="flex items-center gap-2">
                <Clock size={20} />
                {result.totalHours} Hours | {result.totalMinutes} Minutes
              </div>

              <div className="text-blue-600 font-semibold">
                🎉 Next Birthday In: {formattedCountdown()}
              </div>

              <div className="bg-yellow-100 p-3 rounded-xl text-center font-semibold">
                {milestone}
              </div>

              {/* Share */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Share2 size={18} /> WhatsApp
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Twitter size={18} /> Twitter
                </button>

                <button
                  onClick={() => window.print()}
                  className="bg-gray-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Printer size={18} /> Print
                </button>
              </div>

              {/* Email Reminder */}
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email for reminder"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleReminder}
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Mail size={18} /> Save
                </button>
              </div>
            </div>
          )
        }
      >
        <input
          type="date"
          className="input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <button onClick={calculateAge} className="btn">
          Calculate Age
        </button>
      </CalculatorLayout>
    </>
  );
}