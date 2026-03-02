"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function MarkupCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [markup, setMarkup] = useState<number | null>(null);

  const calculateMarkup = () => {
    const cost = parseFloat(costPrice);
    const sell = parseFloat(sellingPrice);

    if (!cost || cost <= 0 || !sell) return;

    const markupValue = ((sell - cost) / cost) * 100;
    setMarkup(markupValue);
  };

  const tryExample = () => {
    setCostPrice("1000");
    setSellingPrice("1500");
    setTimeout(() => calculateMarkup(), 100);
  };

  const resetFields = () => {
    setCostPrice("");
    setSellingPrice("");
    setMarkup(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Markup Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Cost Price (₹)</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Enter cost price"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Selling Price (₹)</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateMarkup}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate
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

      {markup !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            Markup: <strong>{markup.toFixed(2)}%</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is Markup?
        </h2>
        <p>
          Markup is the percentage added to the cost price of a product to determine
          its selling price. It ensures businesses make a profit.
        </p>

        <h2 className="text-2xl font-bold">
          Markup Formula
        </h2>
        <p>
          <strong>Markup = (Selling Price - Cost Price) / Cost Price × 100</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use a Markup Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Set profitable pricing</li>
          <li>Understand pricing strategy</li>
          <li>Improve business margins</li>
          <li>Quick profit estimation</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. What is the difference between markup and margin?
          </p>
          <p>
            Markup is based on cost price, while margin is based on selling price.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Can markup be negative?
          </p>
          <p>
            Yes. If selling price is lower than cost price, it results in a negative markup (loss).
          </p>
        </div>
      </div>
    </div>
  );
}