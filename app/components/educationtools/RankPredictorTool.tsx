"use client";

import { useState } from "react";
import {
  Trophy,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function RankPredictorTool() {
  const [totalCandidates, setTotalCandidates] =
    useState("");
  const [yourScore, setYourScore] = useState("");
  const [highestScore, setHighestScore] =
    useState("");

  const [result, setResult] = useState<{
    predictedRank: number;
    percentile: number;
  } | null>(null);

  const calculateRank = () => {
    const total = Number(totalCandidates);
    const score = Number(yourScore);
    const maxScore = Number(highestScore);

    if (!total || !score || !maxScore) return;

    if (score > maxScore) return;

    // Percentile formula
    const percentile = (score / maxScore) * 100;

    // Approx rank prediction (linear distribution assumption)
    const predictedRank =
      Math.round(
        ((maxScore - score) / maxScore) * total
      ) + 1;

    setResult({
      predictedRank,
      percentile: Number(percentile.toFixed(2)),
    });
  };

  const handleTryExample = () => {
    setTotalCandidates("100000");
    setYourScore("720");
    setHighestScore("800");
    setResult(null);
  };

  const handleReset = () => {
    setTotalCandidates("");
    setYourScore("");
    setHighestScore("");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Rank Predictor Tool
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Total Candidates Appeared"
          className="border rounded-lg p-3"
          value={totalCandidates}
          onChange={(e) =>
            setTotalCandidates(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Your Score"
          className="border rounded-lg p-3"
          value={yourScore}
          onChange={(e) =>
            setYourScore(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Highest Score"
          className="border rounded-lg p-3"
          value={highestScore}
          onChange={(e) =>
            setHighestScore(e.target.value)
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateRank}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Predict Rank
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

          <p className="text-3xl font-bold text-yellow-600">
            Estimated Rank: {result.predictedRank}
          </p>

          <p>Percentile: {result.percentile}%</p>

          <p className="text-sm text-gray-500">
            *Rank is estimated based on linear distribution assumption.
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How Does Rank Prediction Work?
        </h3>
        <p>
          This tool estimates your rank based on total candidates,
          your score, and highest score. It assumes linear score
          distribution among candidates.
        </p>

        <h3 className="text-2xl font-bold">
          Who Should Use This?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>JEE aspirants</li>
          <li>NEET students</li>
          <li>SSC & Banking candidates</li>
          <li>University entrance exams</li>
        </ul>

        <h3 className="text-2xl font-bold">
          Important Note
        </h3>
        <p>
          Actual ranks may vary based on normalization and
          exam difficulty.
        </p>
      </div>
    </div>
  );
}