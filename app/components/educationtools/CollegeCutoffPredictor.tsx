"use client";

import { useState } from "react";
import {
  GraduationCap,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

type ResultType = {
  predictedRank: number;
  percentile: number;
  status: string;
};

export default function CollegeCutoffPredictor() {
  const [examType, setExamType] = useState("JEE");
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [totalCandidates, setTotalCandidates] =
    useState("");
  const [category, setCategory] =
    useState("General");

  const [result, setResult] =
    useState<ResultType | null>(null);

  const calculate = () => {
    const userScore = Number(score);
    const highestScore = Number(maxScore);
    const total = Number(totalCandidates);

    if (!userScore || !highestScore || !total)
      return;

    const percentile =
      (userScore / highestScore) * 100;

    const predictedRank =
      Math.round(
        ((highestScore - userScore) /
          highestScore) *
          total
      ) + 1;

    let categoryRelaxation = 0;

    if (category === "OBC")
      categoryRelaxation = 5;
    if (category === "SC")
      categoryRelaxation = 10;
    if (category === "ST")
      categoryRelaxation = 12;
    if (category === "International")
      categoryRelaxation = 7;

    const adjustedPercentile =
      percentile + categoryRelaxation;

    let status = "Low Chance";

    if (adjustedPercentile >= 90)
      status = "High Chance (Safe)";
    else if (adjustedPercentile >= 75)
      status = "Moderate Chance";
    else if (adjustedPercentile >= 60)
      status = "Borderline";

    setResult({
      predictedRank,
      percentile: Number(
        percentile.toFixed(2)
      ),
      status,
    });
  };

  const handleTryExample = () => {
    setExamType("JEE");
    setScore("220");
    setMaxScore("300");
    setTotalCandidates("1000000");
    setCategory("General");
    setResult(null);
  };

  const handleReset = () => {
    setExamType("JEE");
    setScore("");
    setMaxScore("");
    setTotalCandidates("");
    setCategory("General");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      <div className="flex items-center gap-3 mb-6">
        <GraduationCap
          className="text-indigo-600"
          size={28}
        />
        <h2 className="text-2xl font-bold text-gray-800">
          College Cutoff Predictor (National & International)
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">

        <select
          className="border rounded-lg p-3"
          value={examType}
          onChange={(e) =>
            setExamType(e.target.value)
          }
        >
          <option>JEE</option>
          <option>NEET</option>
          <option>UPSC</option>
          <option>SAT</option>
          <option>Custom</option>
        </select>

        <select
          className="border rounded-lg p-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>General</option>
          <option>OBC</option>
          <option>SC</option>
          <option>ST</option>
          <option>International</option>
        </select>

        <input
          type="number"
          placeholder="Your Score"
          className="border rounded-lg p-3"
          value={score}
          onChange={(e) =>
            setScore(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Maximum Score"
          className="border rounded-lg p-3"
          value={maxScore}
          onChange={(e) =>
            setMaxScore(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Total Candidates"
          className="border rounded-lg p-3"
          value={totalCandidates}
          onChange={(e) =>
            setTotalCandidates(
              e.target.value
            )
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Predict Cutoff
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
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center space-y-3">
          <h3 className="text-xl font-semibold">
            Predicted Result
          </h3>

          <p className="text-2xl font-bold text-indigo-600">
            Estimated Rank: {result.predictedRank}
          </p>

          <p>
            Percentile: {result.percentile}%
          </p>

          <p className="font-semibold">
            Admission Status: {result.status}
          </p>

          <p className="text-sm text-gray-500">
            *Prediction based on linear score distribution.
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How College Cutoff Predictor Works?
        </h3>
        <p>
          This tool estimates your percentile,
          predicted rank, and admission chances
          based on exam performance and category.
        </p>

        <h3 className="text-2xl font-bold">
          Suitable For:
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>JEE & NEET Aspirants</li>
          <li>UPSC Candidates</li>
          <li>SAT & International Exams</li>
          <li>University Admission Planning</li>
        </ul>
      </div>
    </div>
  );
}