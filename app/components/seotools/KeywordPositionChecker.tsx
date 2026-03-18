"use client";

import { useState, useEffect } from "react";
import {
  Search,
  BarChart3,
  RefreshCcw,
  Tag,
  Clock,
  Globe,
} from "lucide-react";

type Result = {
  keyword: string;
  position: number | null;
  url: string | null;
  cached?: boolean;
  updatedAt?: string;
};

export default function KeywordPositionChecker() {
  const [domain, setDomain] = useState("");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW STATES (ADD ONLY)
  const [country, setCountry] = useState("IN");
  const [device, setDevice] = useState("desktop");
  const [history, setHistory] = useState<any[]>([]);

  // ✅ SEO SCORE FUNCTION (ADD)
  const calculateScore = (position: number | null) => {
    if (!position) return 0;
    if (position <= 3) return 100;
    if (position <= 10) return 80;
    if (position <= 20) return 60;
    if (position <= 50) return 40;
    return 10;
  };

  // ✅ FIXED (forceRefresh + country + device)
  const handleCheck = async (forceRefresh = false) => {
    if (!domain || !keywords) {
      setError("Please enter domain and keywords");
      return;
    }

    setError("");
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/seotools/keyword-position-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain,
          keywords,
          forceRefresh,
          country,
          device,
        }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON Response:", text);
        throw new Error("Server error (Invalid JSON)");
      }

      if (!res.ok) throw new Error(data.error || "Request failed");

      setResults(data.results);

      // ✅ FETCH HISTORY (ADD)
      if (data.results.length > 0) {
        const res2 = await fetch("/api/seotools/keyword-position-checker/rank-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain,
            keyword: data.results[0].keyword,
          }),
        });

        const hist = await res2.json();
        setHistory(hist.history || []);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDomain("");
    setKeywords("");
    setResults([]);
    setError("");
    setHistory([]);
  };

  // ✅ ADD THIS FUNCTION (top me ya component ke andar)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const timeAgo = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins} min ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)} hrs ago`;

  return `${Math.floor(mins / 1440)} days ago`;
};

  return (
    <div className="w-full p-4 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 p-2 rounded-xl">
          <BarChart3 className="text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold">
          Keyword Position Checker
        </h1>
      </div>

      {/* INPUT CARD */}
      <div className="space-y-5">

        {/* 🌍 Country + Device */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border rounded-xl p-2"
          >
            <option value="IN">🇮🇳 India</option>
            <option value="US">🇺🇸 USA</option>
          </select>

          <select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="border rounded-xl p-2"
          >
            <option value="desktop">🖥 Desktop</option>
            <option value="mobile">📱 Mobile</option>
          </select>
        </div>

        {/* Domain */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2">
            <Globe size={16} /> Domain
          </label>
          <input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="text-sm font-semibold">
            Keywords (comma separated)
          </label>
          <textarea
            rows={3}
            placeholder="seo tools, keyword checker"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleCheck(false)}
            className="w-full sm:flex-1 bg-indigo-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Search size={16} /> Check
          </button>

          <button
            onClick={() => handleCheck(true)}
            className="w-full sm:flex-1 bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} /> Refresh
          </button>

          <button
            onClick={handleReset}
            className="w-full sm:flex-1 bg-gray-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            Reset
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* LOADER */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 text-center shadow animate-pulse">
          🔍 Checking rankings...
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="space-y-6">

          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Tag size={16} /> Results
          </h2>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-2">Keyword</th>
                  <th className="text-center">Position</th>
                  <th>URL</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">

                    <td className="py-3 px-2">{r.keyword}</td>

                    <td className="text-center">
                      {r.position ? (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                          #{r.position}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded text-xs">
                          Not Ranked
                        </span>
                      )}
                    </td>

                    <td className="text-blue-600 truncate max-w-50">
                      {r.url || "-"}
                    </td>

                    <td className="text-center text-xs">
                      {r.cached ? (
                        <span className="flex items-center justify-center gap-1 text-gray-500">
                          <Clock size={12} /> Cached
                        </span>
                      ) : (
                        <span className="text-green-600">Live</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📊 SEO SCORE */}
          <div>
            <h3 className="font-semibold mb-2">SEO Score</h3>
            {results.map((r, i) => {
              const score = calculateScore(r.position);
              return (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span>{r.keyword}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded">
                    <div
                      className="bg-indigo-600 h-2 rounded"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 📈 SIMPLE HISTORY */}
          {history.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Rank History</h3>
              <div className="text-xs text-gray-600 space-y-1">
                {history.map((h: any, i: number) => (
                  <div key={i}>
                    {formatDate(h.updatedAt)} ({timeAgo(h.updatedAt)}) → #{h.position || "NA"}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}