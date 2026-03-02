"use client";

import { useState, useEffect } from "react";
import {
  Timer,
  PlayCircle,
  RotateCcw,
} from "lucide-react";

export default function CountdownTimerTool() {
  const [eventName, setEventName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isActive && targetDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const diff = target - now;

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft(null);
          setIsActive(false);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
          (diff / (1000 * 60)) % 60
        );
        const seconds = Math.floor(
          (diff / 1000) % 60
        );

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, targetDate]);

  const handleStart = () => {
    if (!targetDate) return;
    setIsActive(true);
  };

  const handleTryExample = () => {
    setEventName("New Year 2026");
    setTargetDate("2026-01-01T00:00");
    setIsActive(false);
    setTimeLeft(null);
  };

  const handleReset = () => {
    setEventName("");
    setTargetDate("");
    setIsActive(false);
    setTimeLeft(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Timer className="text-purple-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Countdown Timer Tool
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">
            Event Name (Optional)
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Target Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full border rounded-lg p-3"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleStart}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <PlayCircle size={20} />
          Start Countdown
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {timeLeft && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center space-y-4">
          {eventName && (
            <h3 className="text-xl font-semibold text-gray-700">
              Countdown to {eventName}
            </h3>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-purple-600 font-bold text-2xl">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          What is a Countdown Timer?
        </h3>
        <p>
          A countdown timer calculates the time remaining until
          a specific date and time. It is useful for tracking
          events, deadlines, launches, birthdays, and more.
        </p>

        <h3 className="text-2xl font-bold">
          Why Use a Countdown Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Event planning</li>
          <li>Product launches</li>
          <li>Exam preparation</li>
          <li>Holiday countdowns</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Does it update automatically?
            </h4>
            <p>
              Yes, the timer updates every second in real-time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Can I use it for past dates?
            </h4>
            <p>
              No, the timer only works for future dates.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is it mobile friendly?
            </h4>
            <p>
              Yes, it works perfectly on mobile and desktop devices.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}