"use client";

import { useState } from "react";
import {
  Sparkles,
  Search,
  Wand2,
  Loader2,
  Copy,
  CheckCircle,
} from "lucide-react";

export default function SeoTitleGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

const generateTitles = async () => {
  if (!keyword.trim()) return;

  setLoading(true);
  setTitles([]);

  try {
    const res = await fetch("/api/seotools/seo-title-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ IMPORTANT FIX
      },
      body: JSON.stringify({ keyword, tone }),
    });

    const data = await res.json();
    console.log("API RESPONSE:", data);

    // ✅ STRONG HANDLING
    if (data?.titles && data.titles.length > 0) {
      setTitles(data.titles);
    } 
    else if (data?.result) {
      // fallback agar titles nahi aaye
      const fallbackTitles = data.result
        .split(/\n|\r/)
        .map((t: string) => t.replace(/^\d+[\).\s-]*/, "").trim())
        .filter(Boolean);

      setTitles(fallbackTitles.length > 0 ? fallbackTitles : ["No titles generated"]);
    } 
    else {
      setTitles(["No titles generated. Try different keyword."]);
    }

  } catch (err) {
    console.error(err);
    setTitles(["Something went wrong"]);
  }

  setLoading(false);
};

  

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="text-indigo-600" />
          AI SEO Title Generator
        </h1>
        <p className="text-gray-500 text-sm">
          Generate high-converting SEO titles using AI (Ahrefs-level quality)
        </p>
      </div>

      {/* INPUT */}
      <div className="bg-white shadow rounded-2xl p-4 space-y-4">

        <div>
          <label className="text-sm font-medium">Enter Keyword</label>
          <input
            type="text"
            placeholder="e.g. best shoes for running"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Select Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            <option value="professional">Professional</option>
            <option value="clickbait">Clickbait</option>
            <option value="emotional">Emotional</option>
            <option value="seo">SEO Optimized</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={generateTitles}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            Generate Titles
          </button>

          <button
            onClick={() => {
              setKeyword("");
              setTitles([]);
            }}
            className="flex-1 bg-gray-200 py-2 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {titles.length > 0 && (
        <div className="bg-white shadow rounded-2xl p-4 space-y-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Search className="text-green-600" />
            Generated Titles
          </h2>

          {titles.map((title, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <p className="text-sm">{title}</p>

              <button
                onClick={() => copyToClipboard(title, i)}
                className="text-indigo-600"
              >
                {copiedIndex === i ? <CheckCircle /> : <Copy />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SEO CONTENT */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-6 text-sm leading-relaxed">

        <section>
          <h2 className="font-bold text-lg">
            About SEO Title Generator
          </h2>
          <p>
            This AI-powered SEO Title Generator helps you create high-ranking,
            click-worthy titles optimized for search engines like Google.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg">
            How SEO Title Generator Works
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Enter your main keyword</li>
            <li>Select tone (SEO, emotional, clickbait)</li>
            <li>AI generates optimized titles</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-lg">
            Benefits of Using This Tool
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Improve CTR</li>
            <li>Boost rankings</li>
            <li>Save time</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-lg">
            Related Search Tags
          </h2>
          <p>
            SEO title generator, AI title creator, blog title generator,
            YouTube title generator, meta title generator
          </p>
        </section>

      </div>
    </div>
  );
}