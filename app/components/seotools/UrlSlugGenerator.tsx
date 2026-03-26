"use client";

import { useState } from "react";
import {
  Wand2,
  RotateCcw,
  Copy,
  Download,
  AlertTriangle,
  Link2,
  Info,
  Settings,
  Sparkles,
  Hash,
  TrendingUp,
  Zap
} from "lucide-react";

export default function UrlSlugGenerator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"basic" | "seo">("seo");
  const [confirmed, setConfirmed] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter text");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/seotools/url-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data.slug);
      }
    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);

    if (!confirmed) {
      setError("Please confirm slug type first");
      return;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "slug.txt";
    a.click();
  };

  const handleReset = () => {
    setText("");
    setResult("");
    setError("");
  };



  return (
    <div className="space-y-6 w-full">

      {/* INPUT */}
      <div>
        <label className="font-semibold flex items-center gap-2 mb-2">
          <Link2 size={18} /> Enter Text / Title
        </label>
        <textarea
          className="w-full border rounded-xl p-3 h-32"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your blog title..."
        />
      </div>
      <div className="text-sm text-gray-600">
        Preview: {text.toLowerCase().replace(/\s+/g, "-")}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3">

        <button
          onClick={handleGenerate}
          disabled={!confirmed}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 
    ${!confirmed ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 text-white cursor-pointer"}`}
        >
          <Wand2 size={16} /> {loading ? "Generating..." : "Generate Slug"}
        </button>
        <button
          onClick={() => setMode("basic")}
          className={`flex-1 py-2 rounded-xl ${mode === "basic" ? "bg-indigo-600 text-white" : "bg-gray-200 cursor-pointer"}`}
        >
          Basic Slug
        </button>

        <button
          onClick={() => setMode("seo")}
          className={`flex-1 py-2 rounded-xl ${mode === "seo" ? "bg-green-600 text-white" : "bg-gray-200 cursor-pointer"}`}
        >
          SEO Optimized
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-xl flex gap-2 items-center">
          <AlertTriangle size={18} /> {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div>
          <label className="font-semibold mb-2 block">Generated Slug</label>
          <input
            className="w-full border rounded-xl p-3"
            value={result}
            readOnly
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={handleCopy}
              className="flex-1 bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy size={16} /> Copy
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      )}

      {!confirmed && text && (
        <div className="bg-yellow-100 p-3 rounded-xl text-sm">
          Do you want a fully SEO optimized URL slug or simple slug?
          <button
            onClick={() => setConfirmed(true)}
            className="ml-3 bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
        </div>
      )}

      {/* SEO CONTENT */}
      <div className="space-y-8 pt-8">

        {/* ABOUT */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Info size={20} /> About URL Slug Generator
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            URL Slug Generator is a powerful online tool that converts titles, phrases, and text into clean, readable, and SEO-friendly URL slugs. In modern SEO and web development, having optimized URLs is essential for improving search engine rankings, enhancing user experience, and increasing click-through rates. This tool helps you create structured and optimized slugs that are easy to read for both users and search engines.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            A well-structured URL slug improves website visibility and makes links more meaningful. Whether you are creating blog posts, product pages, or landing pages, using an SEO-friendly slug ensures that your content performs better in search results. This tool removes unnecessary characters, simplifies text, and generates clean URLs instantly.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            This URL slug generator works directly in your browser, providing instant results without any installation. It is fast, secure, and completely free, making it ideal for developers, bloggers, SEO professionals, and digital marketers.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings size={20} /> How Slug Generation Works
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            URL slug generation is the process of converting text into a URL-friendly format. This involves removing special characters, converting uppercase letters to lowercase, and replacing spaces with hyphens. The goal is to create a clean and readable URL structure that is easy to understand.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            When you enter text into this tool, it processes the input and applies multiple transformations. It removes punctuation, trims unnecessary spaces, converts the string to lowercase, and replaces spaces with hyphens. The result is a concise and optimized slug ready to be used in URLs.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Advanced slug generation also ensures that duplicate hyphens are removed and unnecessary words are minimized. This helps maintain clarity and improves SEO performance.
          </p>
        </section>

        {/* BENEFITS */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={20} /> Benefits of Using This Tool
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
            <li>Creates SEO-friendly and optimized URLs</li>
            <li>Improves website readability and user experience</li>
            <li>Enhances search engine rankings</li>
            <li>Removes unnecessary characters automatically</li>
            <li>Generates clean and professional links instantly</li>
            <li>Helps improve click-through rates (CTR)</li>
            <li>Supports better indexing and crawling</li>
          </ul>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Clean URLs are easier to share, remember, and understand. By using this URL Slug Generator Tool, you can ensure that your website links are optimized for both users and search engines.
          </p>
        </section>

        {/* FEATURES */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Link2 size={20} /> Key Features of URL Slug Generator
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
            <li>Instant slug generation with one click</li>
            <li>Converts text to lowercase automatically</li>
            <li>Removes special characters and symbols</li>
            <li>Replaces spaces with hyphens for clean URLs</li>
            <li>Prevents duplicate hyphens</li>
            <li>Copy and download options available</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* USE CASES */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap size={20} /> Use Cases of URL Slug Generator
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            URL Slug Generator is widely used in blogging, e-commerce, and web development. Bloggers use it to create SEO-friendly URLs for articles, while e-commerce platforms use it for product pages and category URLs.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Developers integrate slug generation into CMS systems, while SEO experts use it to optimize website structure. It is also useful for creating user-friendly links for social sharing and marketing campaigns.
          </p>
        </section>

        {/* SEO IMPORTANCE */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp size={20} /> Why URL Slugs are Important for SEO
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            URL structure is an important ranking factor in search engine optimization. Clean and descriptive slugs help search engines understand the content of a page, which improves indexing and ranking potential. SEO-friendly URLs also increase user trust and engagement.
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Using optimized slugs can improve click-through rates and make your website more accessible. Short, keyword-rich URLs are easier to read and share, which contributes to better overall SEO performance.
          </p>
        </section>

        {/* BEST PRACTICES */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings size={20} /> Best Practices for Creating SEO-Friendly URLs
          </h2>
          <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
            <li>Use lowercase letters in URLs</li>
            <li>Keep slugs short and descriptive</li>
            <li>Use hyphens instead of underscores</li>
            <li>Avoid special characters and unnecessary words</li>
            <li>Include relevant keywords in the slug</li>
          </ul>
        </section>

        {/* RELATED TAGS */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Hash size={20} /> Related Search Tags
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "url slug generator",
              "seo url generator",
              "slug maker online",
              "clean url generator",
              "create seo friendly url",
              "slug generator tool",
              "url cleaner tool",
              "best slug generator",
              "convert title to url",
              "seo friendly slug maker",
              "generate url slug online",
              "optimize url for seo",
              "url formatter tool",
              "slugify text online",
              "seo url structure generator"
            ].map(tag => (
              <span
                key={tag}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}