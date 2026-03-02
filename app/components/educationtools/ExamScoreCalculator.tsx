"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Calculator,
  RotateCcw,
  PlayCircle,
} from "lucide-react";

export default function ExamScoreCalculator() {
  const [totalQuestions, setTotalQuestions] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] =
    useState("1");
  const [negativeMarking, setNegativeMarking] =
    useState("0");

  const [result, setResult] = useState<{
    score: number;
    percentage: number;
    accuracy: number;
  } | null>(null);

  const calculateScore = () => {
    const totalQ = Number(totalQuestions);
    const correct = Number(correctAnswers);
    const wrong = Number(wrongAnswers);
    const mark = Number(marksPerQuestion);
    const negative = Number(negativeMarking);

    if (!totalQ || correct < 0 || wrong < 0) return;

    const positiveScore = correct * mark;
    const negativeScore = wrong * negative;

    const finalScore = positiveScore - negativeScore;

    const maxScore = totalQ * mark;
    const percentage =
      maxScore > 0
        ? (finalScore / maxScore) * 100
        : 0;

    const accuracy =
      totalQ > 0
        ? (correct / totalQ) * 100
        : 0;

    setResult({
      score: Number(finalScore.toFixed(2)),
      percentage: Number(percentage.toFixed(2)),
      accuracy: Number(accuracy.toFixed(2)),
    });
  };

  const handleTryExample = () => {
    setTotalQuestions("100");
    setCorrectAnswers("75");
    setWrongAnswers("15");
    setMarksPerQuestion("1");
    setNegativeMarking("0.25");
    setResult(null);
  };

  const handleReset = () => {
    setTotalQuestions("");
    setCorrectAnswers("");
    setWrongAnswers("");
    setMarksPerQuestion("1");
    setNegativeMarking("0");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          Exam Score Calculator
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Total Questions"
          className="border rounded-lg p-3"
          value={totalQuestions}
          onChange={(e) =>
            setTotalQuestions(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Correct Answers"
          className="border rounded-lg p-3"
          value={correctAnswers}
          onChange={(e) =>
            setCorrectAnswers(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Wrong Answers"
          className="border rounded-lg p-3"
          value={wrongAnswers}
          onChange={(e) =>
            setWrongAnswers(e.target.value)
          }
        />

        <input
          type="number"
          step="0.01"
          placeholder="Marks Per Question"
          className="border rounded-lg p-3"
          value={marksPerQuestion}
          onChange={(e) =>
            setMarksPerQuestion(e.target.value)
          }
        />

        <input
          type="number"
          step="0.01"
          placeholder="Negative Marking per Wrong"
          className="border rounded-lg p-3"
          value={negativeMarking}
          onChange={(e) =>
            setNegativeMarking(e.target.value)
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateScore}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate Score
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
            Exam Result
          </h3>

          <p className="text-3xl font-bold text-indigo-600">
            Final Score: {result.score}
          </p>

          <p>Percentage: {result.percentage}%</p>
          <p>Accuracy: {result.accuracy}%</p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Calculate Exam Score?
        </h3>
        <p>
          Final Score = (Correct × Marks per Question)
          − (Wrong × Negative Marking)
        </p>

        <h3 className="text-2xl font-bold">
          Why Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Competitive exam preparation</li>
          <li>Mock test evaluation</li>
          <li>Entrance exam analysis</li>
          <li>Instant performance check</li>
        </ul>
      </div>
    </div>
  );
}