"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function ROASCalculator() {
  const [adSpend, setAdSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [roas, setRoas] = useState<number | null>(null);

  const calculateROAS = () => {
    const spend = parseFloat(adSpend);
    const rev = parseFloat(revenue);

    if (!spend || spend <= 0) return;

    const roasValue = rev / spend;
    setRoas(roasValue);
  };

  const tryExample = () => {
    setAdSpend("20000");
    setRevenue("80000");
    setTimeout(() => calculateROAS(), 100);
  };

  const resetFields = () => {
    setAdSpend("");
    setRevenue("");
    setRoas(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        ROAS (Return on Ad Spend) Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Ad Spend (₹)</label>
          <input
            type="number"
            value={adSpend}
            onChange={(e) => setAdSpend(e.target.value)}
            placeholder="Enter total ad spend"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Revenue Generated (₹)</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="Enter revenue from ads"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateROAS}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate ROAS
        </button>

        <button
          onClick={tryExample}
          className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={resetFields}
          className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

      {roas !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            ROAS: <strong>{roas.toFixed(2)}x</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This means you earn ₹{roas.toFixed(2)} for every ₹1 spent on ads.
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is ROAS (Return on Ad Spend)?
        </h2>
        <p>
          ROAS measures how much revenue is generated for every rupee spent on advertising.
          It helps businesses evaluate marketing campaign performance.
        </p>

        <h2 className="text-2xl font-bold">
          ROAS Formula
        </h2>
        <p>
          <strong>ROAS = Revenue from Ads / Ad Spend</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use a ROAS Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Measure ad campaign effectiveness</li>
          <li>Compare multiple marketing channels</li>
          <li>Optimize advertising budget</li>
          <li>Improve profitability</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. What is a good ROAS?
          </p>
          <p>
            A ROAS of 4x or higher is generally considered good, but it depends on your industry and profit margins.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Is ROAS the same as ROI?
          </p>
          <p>
            No. ROAS measures advertising efficiency only, while ROI measures overall investment profitability.
          </p>
        </div>
      </div>
    </div>
  );
}