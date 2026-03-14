"use client";

import { useState } from "react";
import { RotateCcw, Copy, Sparkles } from "lucide-react";

export default function MetaDescriptionChecker() {

  const [description, setDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const length = description.length;

  let status = "";
  let color = "";
  let score = 0;

  if (length === 0) {
    status = "";
    score = 0;
  } else if (length < 120) {
    status = "Too Short";
    color = "text-yellow-600";
    score = 60;
  } else if (length <= 160) {
    status = "Perfect Length";
    color = "text-green-600";
    score = 100;
  } else {
    status = "Too Long";
    color = "text-red-600";
    score = 50;
  }

  /* =========================
     RESET
  ========================== */

  function reset() {
    setDescription("");
  }

  /* =========================
     COPY
  ========================== */

  function copyText() {
    navigator.clipboard.writeText(description);
  }

  /* =========================
     AI GENERATE
  ========================== */

  async function generateAI() {

    if (!description) return;

    try {

      setAiLoading(true);

      const res = await fetch("/api/seotools/generate-meta-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: description
        })
      });

      const data = await res.json();

      if (data.result) {
        setDescription(data.result.trim());
      }

    } catch (err) {
      console.error(err);
    }

    setAiLoading(false);

  }

  /* =========================
     PROGRESS BAR
  ========================== */

  const progress = Math.min((length / 160) * 100, 100);

  return (

    <div className="max-w-3xl mx-auto">

      {/* TEXTAREA */}

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter your meta description..."
        className="w-full border rounded-xl p-4 h-40"
      />


      {/* CHARACTER COUNT */}

      <div className="flex justify-between mt-3 text-sm">

        <span className="text-gray-500">
          Characters: {length} / 160
        </span>

        {status && (
          <span className={`font-medium ${color}`}>
            {status}
          </span>
        )}

      </div>


      {/* PROGRESS BAR */}

      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">

        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />

      </div>


      {/* SEO SCORE */}

      {length > 0 && (

        <div className="text-sm mt-2 text-gray-600">
          SEO Score: <span className="font-semibold">{score}/100</span>
        </div>

      )}


      {/* SERP PREVIEW */}

      <div className="border rounded-xl p-4 mt-6 bg-gray-50">

        <div className="text-blue-700 text-lg">
          Example Title Tag
        </div>

        <div className="text-green-700 text-sm">
          https://example.com
        </div>

        <p className="text-gray-700 text-sm mt-1">
          {description || "Your meta description preview will appear here..."}
        </p>

      </div>


      {/* BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        {/* AI GENERATE */}

        <button
          onClick={generateAI}
          disabled={aiLoading}
          className="w-full sm:flex-1 bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          {aiLoading ? "Generating..." : "Generate AI Description"}
        </button>


        {/* COPY */}

        <button
          onClick={copyText}
          className="w-full sm:flex-1 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          Copy
        </button>


        {/* RESET */}

        <button
          onClick={reset}
          className="w-full sm:flex-1 bg-gray-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>

  );
}