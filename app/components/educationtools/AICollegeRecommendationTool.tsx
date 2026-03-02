"use client";

import { useState, useMemo } from "react";
import colleges from "@/app/data/colleges.json";
import {
  Brain,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

type College = typeof colleges[number];

export default function AICollegeRecommendationTool() {
  const [examType, setExamType] = useState("All");
  const [score, setScore] = useState("");
  const [rank, setRank] = useState("");
  const [country, setCountry] = useState("All");
  const [budget, setBudget] = useState("All");
  const [field, setField] = useState("All");

  const [result, setResult] = useState<College[] | null>(null);

  /* ---------------- Dynamic Filters From JSON ---------------- */

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(colleges.map((c) => c.country)))],
    []
  );

  const fields = useMemo(
    () =>
      [
        "All",
        ...Array.from(
          new Set(colleges.flatMap((c) => c.fields))
        ),
      ],
    []
  );

  const exams = useMemo(
    () =>
      [
        "All",
        ...Array.from(
          new Set(colleges.flatMap((c) => c.examAccepted))
        ),
      ],
    []
  );

  const budgets = useMemo(
    () =>
      [
        "All",
        ...Array.from(
          new Set(colleges.map((c) => c.budget))
        ),
      ],
    []
  );

  /* ---------------- Recommendation Logic ---------------- */

  const recommendColleges = () => {
    const userScore = Number(score);
    const userRank = Number(rank);

    let filtered = colleges.filter((college) => {
      const examMatch =
        examType === "All" ||
        college.examAccepted.includes(examType);

      const fieldMatch =
        field === "All" ||
        college.fields.includes(field);

      const countryMatch =
        country === "All" ||
        college.country === country;

      const budgetMatch =
        budget === "All" ||
        college.budget === budget;

      const scoreMatch =
        !isNaN(userScore) && score !== ""
          ? userScore >= college.minScore
          : true;

      const rankMatch =
        !isNaN(userRank) && rank !== ""
          ? userRank <= college.rankThreshold
          : true;

      return (
        examMatch &&
        fieldMatch &&
        countryMatch &&
        budgetMatch &&
        (scoreMatch || rankMatch)
      );
    });

    /* ---- Smart Ranking Score ---- */
    filtered.sort((a, b) => {
      const scoreA =
        (score !== "" && userScore >= a.minScore ? 2 : 0) +
        (rank !== "" && userRank <= a.rankThreshold ? 2 : 0);

      const scoreB =
        (score !== "" && userScore >= b.minScore ? 2 : 0) +
        (rank !== "" && userRank <= b.rankThreshold ? 2 : 0);

      return scoreB - scoreA;
    });

    setResult(filtered.slice(0, 10));
  };

  const handleTryExample = () => {
    setExamType("JEE");
    setScore("220");
    setRank("4500");
    setCountry("India");
    setBudget("All");
    setField("Engineering");
    setResult(null);
  };

  const handleReset = () => {
    setExamType("All");
    setScore("");
    setRank("");
    setCountry("All");
    setBudget("All");
    setField("All");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          AI College Recommendation Tool
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">

        <select
          className="border rounded-lg p-3"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        >
          {exams.map((ex, i) => (
            <option key={i}>{ex}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Your Score"
          className="border rounded-lg p-3"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <input
          type="number"
          placeholder="Your Rank"
          className="border rounded-lg p-3"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
        />

        <select
          className="border rounded-lg p-3"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <select
          className="border rounded-lg p-3"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          {budgets.map((b, i) => (
            <option key={i}>{b}</option>
          ))}
        </select>

        <select
          className="border rounded-lg p-3"
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          {fields.map((f, i) => (
            <option key={i}>{f}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={recommendColleges}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} /> Recommend
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} /> Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 space-y-4">
          {result.length === 0 && (
            <p className="text-center text-gray-600">
              No matches found.
            </p>
          )}

          {result.map((col, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow-sm"
            >
              <p className="font-bold text-lg">{col.name}</p>
              <p>{col.city}, {col.country}</p>
              <p>Fields: {col.fields.join(", ")}</p>
              <p>Budget: {col.budget}</p>
              <p>Type: {col.type}</p>
            </div>
          ))}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How AI College Recommendation Works?
        </h3>
        <p>
          This intelligent tool filters colleges dynamically
          from a global dataset and ranks them based on
          score, rank, exam type, budget, and preferred field.
        </p>

        <h3 className="text-2xl font-bold">
          Who Should Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>National Exam Aspirants (JEE, NEET)</li>
          <li>International Students (SAT)</li>
          <li>Engineering & Medical Applicants</li>
          <li>Study Abroad Planning</li>
        </ul>
      </div>

    </div>
  );
}