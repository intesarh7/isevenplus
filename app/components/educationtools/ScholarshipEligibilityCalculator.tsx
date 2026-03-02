"use client";

import { useState } from "react";
import {
  Award,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function ScholarshipEligibilityCalculator() {
  const [percentage, setPercentage] = useState("");
  const [familyIncome, setFamilyIncome] = useState("");
  const [category, setCategory] = useState("General");
  const [country, setCountry] = useState("India");
  const [field, setField] = useState("Engineering");

  const [result, setResult] = useState<{
    eligibility: string;
    matchScore: number;
  } | null>(null);

  const calculateEligibility = () => {
    const marks = Number(percentage);
    const income = Number(familyIncome);

    if (!marks || !income) return;

    let score = 0;

    // Merit Based
    if (marks >= 85) score += 40;
    else if (marks >= 75) score += 25;

    // Income Based
    if (income <= 300000) score += 30;
    else if (income <= 600000) score += 15;

    // Category Relaxation
    if (category === "OBC") score += 5;
    if (category === "SC") score += 10;
    if (category === "ST") score += 12;
    if (category === "International") score += 8;

    // Field Preference Bonus
    if (field === "Engineering" || field === "Medical") score += 5;

    let eligibility = "Low Chance";

    if (score >= 70) eligibility = "Highly Eligible";
    else if (score >= 50) eligibility = "Moderate Chance";
    else if (score >= 30) eligibility = "Possible";

    setResult({
      eligibility,
      matchScore: score,
    });
  };

  const handleTryExample = () => {
    setPercentage("88");
    setFamilyIncome("250000");
    setCategory("OBC");
    setCountry("India");
    setField("Engineering");
    setResult(null);
  };

  const handleReset = () => {
    setPercentage("");
    setFamilyIncome("");
    setCategory("General");
    setCountry("India");
    setField("Engineering");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold">
          Scholarship Eligibility Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">

        <input
          type="number"
          placeholder="Academic Percentage / GPA"
          className="border rounded-lg p-3"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />

        <input
          type="number"
          placeholder="Annual Family Income"
          className="border rounded-lg p-3"
          value={familyIncome}
          onChange={(e) => setFamilyIncome(e.target.value)}
        />

        <select
          className="border rounded-lg p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>OBC</option>
          <option>SC</option>
          <option>ST</option>
          <option>International</option>
        </select>

        <select
          className="border rounded-lg p-3"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>India</option>
          <option>USA</option>
          <option>Canada</option>
          <option>UK</option>
          <option>Australia</option>
        </select>

        <select
          className="border rounded-lg p-3"
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          <option>Engineering</option>
          <option>Medical</option>
          <option>Management</option>
          <option>Science</option>
          <option>Arts</option>
        </select>

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={calculateEligibility}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} /> Check Eligibility
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
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center space-y-3">
          <h3 className="text-xl font-semibold">
            Scholarship Result
          </h3>

          <p className="text-2xl font-bold text-indigo-600">
            {result.eligibility}
          </p>

          <p>Match Score: {result.matchScore} / 100</p>
        </div>
      )}

      {/* SEO */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Scholarship Eligibility Works?
        </h3>
        <p>
          Eligibility is calculated based on academic performance,
          financial background, category benefits and field preference.
        </p>

        <h3 className="text-2xl font-bold">
          Suitable For:
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Indian Government Scholarships</li>
          <li>Study Abroad Scholarships</li>
          <li>Merit-Based Awards</li>
          <li>Need-Based Financial Aid</li>
        </ul>
      </div>

    </div>
  );
}