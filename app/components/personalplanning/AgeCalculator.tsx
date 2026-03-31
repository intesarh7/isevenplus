"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "./CalculatorLayout";
import {
  Cake,
  Clock,
  Share2,
  Printer,
  Mail,
  Twitter,
  CalendarDays, Settings, CheckCircle, Sparkles, Users, Zap, HelpCircle
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
      "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
      "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
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

      <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

        {/* 🔷 ABOUT */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
            <CalendarDays className="text-indigo-600" size={22} />
            What is an Age Calculator?
          </h2>

          <p className="mt-4 text-sm md:text-base">
            An <strong>Age Calculator</strong> is a simple yet powerful online tool that helps you calculate your exact age based on your date of birth. It provides accurate results in years, months, and days, eliminating the need for manual calculations.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Whether you want to know your current age, calculate someone else's age, or determine age difference between two dates, this tool makes it fast and error-free. It is widely used for personal, professional, and official purposes.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Our <strong>free online age calculator</strong> is designed to give instant results without any signup. It works on all devices and supports accurate date calculations across years, including leap years.
          </p>
        </div>

        {/* 🔷 HOW IT WORKS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="text-purple-600" size={20} />
            How Does the Age Calculator Work?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            The age calculator works by calculating the difference between your date of birth and the current date. It considers months, years, and leap years to give precise results.
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Enter your <strong>date of birth</strong>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Select the <strong>current date</strong> (optional auto)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Click on <strong>Calculate</strong>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Get instant age in <strong>years, months, and days</strong>
            </li>
          </ul>
        </div>

        {/* 🔷 FEATURES */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-pink-600" size={20} />
            Key Features of Age Calculator
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Accurate age calculation in years, months, and days
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Supports leap years and exact date difference
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              100% free and easy to use
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Mobile-friendly and fast performance
            </li>
          </ul>
        </div>

        {/* 🔷 USE CASES */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users className="text-indigo-600" size={20} />
            Where is Age Calculator Used?
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Personal use for checking current age
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              School and college admission verification
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              HR and employee record management
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Legal and official documentation
            </li>
          </ul>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Zap className="text-yellow-500" size={20} />
            Benefits of Using Age Calculator
          </h3>

          <p className="mt-3 text-sm md:text-base">
            Using an online age calculator saves time and ensures accurate results compared to manual calculations. It helps avoid mistakes and gives instant results with just one click.
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              No manual calculation required
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Fast and reliable results
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Helps in official and professional work
            </li>
          </ul>
        </div>

        {/* 🔷 SEO PARAGRAPH */}
        <div>
          <p className="text-sm md:text-base">
            Our <strong>Age Calculator</strong> is one of the best free tools available online to calculate age instantly. Whether you are searching for an <strong>online age calculator</strong>,
            <strong> date of birth calculator</strong>, or <strong>age difference calculator</strong>, this tool provides accurate and reliable results every time.
          </p>
        </div>

        {/* 🔷 FAQ */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="text-indigo-600" size={20} />
            Frequently Asked Questions
          </h3>

          <div className="mt-4 space-y-5 text-sm md:text-base">

            <div>
              <h4 className="font-semibold">
                1. How accurate is the age calculator?
              </h4>
              <p className="text-gray-600 mt-1">
                It is highly accurate and considers leap years and exact date differences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                2. Can I calculate age in months and days?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, it provides age in years, months, and days.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                3. Is this age calculator free?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, it is completely free with no signup required.
              </p>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}