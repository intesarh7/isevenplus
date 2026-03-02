"use client";

import { useState } from "react";
import {
  CalendarDays,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function StudyPlannerCalculator() {
  const [subjects, setSubjects] = useState("5");
  const [chaptersPerSubject, setChaptersPerSubject] =
    useState("10");
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState("4");
  const [revisionDays, setRevisionDays] =
    useState("5");
  const [bufferDays, setBufferDays] =
    useState("2");

  const [result, setResult] = useState<{
    totalDays: number;
    effectiveDays: number;
    totalChapters: number;
    chaptersPerDay: number;
    hoursPerSubject: number;
  } | null>(null);

  const calculatePlan = () => {
    if (!examDate) return;

    const today = new Date();
    const exam = new Date(examDate);

    const totalDays = Math.ceil(
      (exam.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (totalDays <= 0) return;

    const effectiveDays =
      totalDays -
      Number(revisionDays) -
      Number(bufferDays);

    const totalChapters =
      Number(subjects) *
      Number(chaptersPerSubject);

    const chaptersPerDay =
      totalChapters / effectiveDays;

    const hoursPerSubject =
      Number(dailyHours) / Number(subjects);

    setResult({
      totalDays,
      effectiveDays,
      totalChapters,
      chaptersPerDay: Number(
        chaptersPerDay.toFixed(2)
      ),
      hoursPerSubject: Number(
        hoursPerSubject.toFixed(2)
      ),
    });
  };

  const handleTryExample = () => {
    setSubjects("4");
    setChaptersPerSubject("12");
    setDailyHours("6");
    setRevisionDays("7");
    setBufferDays("3");

    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 60);
    setExamDate(
      nextMonth.toISOString().split("T")[0]
    );

    setResult(null);
  };

  const handleReset = () => {
    setSubjects("5");
    setChaptersPerSubject("10");
    setDailyHours("4");
    setRevisionDays("5");
    setBufferDays("2");
    setExamDate("");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays
          className="text-indigo-600"
          size={28}
        />
        <h2 className="text-2xl font-bold text-gray-800">
          Study Planner Calculator (National & International)
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">

        <input
          type="number"
          placeholder="Total Subjects"
          className="border rounded-lg p-3"
          value={subjects}
          onChange={(e) =>
            setSubjects(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Chapters per Subject"
          className="border rounded-lg p-3"
          value={chaptersPerSubject}
          onChange={(e) =>
            setChaptersPerSubject(
              e.target.value
            )
          }
        />

        <input
          type="date"
          className="border rounded-lg p-3"
          value={examDate}
          onChange={(e) =>
            setExamDate(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Daily Study Hours"
          className="border rounded-lg p-3"
          value={dailyHours}
          onChange={(e) =>
            setDailyHours(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Revision Days"
          className="border rounded-lg p-3"
          value={revisionDays}
          onChange={(e) =>
            setRevisionDays(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Buffer / Break Days"
          className="border rounded-lg p-3"
          value={bufferDays}
          onChange={(e) =>
            setBufferDays(e.target.value)
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculatePlan}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Generate Study Plan
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl space-y-3 text-center">
          <h3 className="text-xl font-semibold">
            Your Study Plan Summary
          </h3>

          <p>Total Days Left: {result.totalDays}</p>
          <p>
            Effective Study Days:{" "}
            {result.effectiveDays}
          </p>
          <p>
            Total Chapters:{" "}
            {result.totalChapters}
          </p>

          <p className="text-2xl font-bold text-indigo-600">
            Study {result.chaptersPerDay} chapters per day
          </p>

          <p>
            Hours per Subject Daily:{" "}
            {result.hoursPerSubject}
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How This Study Planner Works?
        </h3>
        <p>
          This planner distributes chapters across available
          days before exam, while reserving revision and
          buffer days for strategic preparation.
        </p>

        <h3 className="text-2xl font-bold">
          Suitable For:
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>JEE & NEET Preparation</li>
          <li>UPSC & SSC Exams</li>
          <li>SAT & IELTS Exams</li>
          <li>University Semester Exams</li>
          <li>International Admission Tests</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Pro Strategy
        </h3>
        <p>
          Always keep 5–10% days as buffer for
          unexpected delays.
        </p>
      </div>
    </div>
  );
}