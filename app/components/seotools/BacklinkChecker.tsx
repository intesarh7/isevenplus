"use client";

import { useState } from "react";
import { Search, Link2, Globe, BarChart3, RefreshCw } from "lucide-react";

type Backlink = {
  source: string;
  anchor: string;
  type: "dofollow" | "nofollow";
};

export default function BacklinkChecker() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Backlink[]>([]);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    dofollow: 0,
    nofollow: 0,
    domains: 0
  });

const handleCheck = async () => {
  if (!url) {
    setError("Please enter a valid URL");
    return;
  }

  setLoading(true);
  setError("");
  setData([]);

  try {
    const res = await fetch(`/api/seotools/backlink-checker?url=${encodeURIComponent(url)}`);
    const result = await res.json();

    console.log("API RESULT:", result); // ✅ DEBUG

    if (!res.ok) {
      throw new Error(result.message || "API Error");
    }

    if (!result.links || result.links.length === 0) {
      setError("No backlinks found or website blocked request.");
      setStats({ total: 0, dofollow: 0, nofollow: 0, domains: 0 });
      return;
    }

    setData(result.links);
    setStats(result.stats);

  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4 md:p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Link2 className="text-indigo-600" /> Backlink Checker Tool
      </h1>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter domain (e.g. example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleCheck}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Search size={16} /> Check Backlinks
        </button>

        <button
          onClick={() => {
            setUrl("");
            setData([]);
            setStats({ total: 0, dofollow: 0, nofollow: 0, domains: 0 });
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <RefreshCw size={16} /> Reset
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center py-6 animate-pulse">
          🔍 Analyzing backlinks...
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Stats */}
      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white shadow p-4 rounded">
            <p>Total Links</p>
            <h2 className="text-xl font-bold">{stats.total}</h2>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <p>Dofollow</p>
            <h2 className="text-xl font-bold">{stats.dofollow}</h2>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <p>Nofollow</p>
            <h2 className="text-xl font-bold">{stats.nofollow}</h2>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <p>Ref Domains</p>
            <h2 className="text-xl font-bold">{stats.domains}</h2>
          </div>
        </div>
      )}

      {/* Table */}
      {data.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Source</th>
                <th className="p-2 border">Anchor</th>
                <th className="p-2 border">Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border text-blue-600">{item.source}</td>
                  <td className="p-2 border">{item.anchor}</td>
                  <td className="p-2 border">
                    {item.type === "dofollow" ? "✅ DoFollow" : "❌ NoFollow"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO CONTENT */}
      <div className="mt-10 space-y-6">

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe size={18} /> About Backlink Checker Tool
          </h2>
          <p>
            Backlink Checker helps you analyze inbound links pointing to your website.
            It shows dofollow, nofollow links and referring domains just like Ahrefs or SEMrush.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 size={18} /> How Backlink Analysis Works
          </h2>
          <p>
            The tool scans your domain and extracts backlinks using web crawling and link indexing logic.
            It categorizes links into dofollow and nofollow and calculates domain diversity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Benefits of Using This Tool
          </h2>
          <ul className="list-disc pl-5">
            <li>Improve SEO rankings</li>
            <li>Analyze competitor backlinks</li>
            <li>Detect spam links</li>
            <li>Track link growth</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Related Search Tags
          </h2>
          <p className="text-sm text-gray-600">
            backlink checker free, check backlinks online, seo backlink tool,
            domain authority checker, ahrefs alternative free
          </p>
        </section>

      </div>

    </div>
  );
}