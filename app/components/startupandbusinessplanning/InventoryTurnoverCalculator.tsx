"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function InventoryTurnoverCalculator() {
  const [cogs, setCogs] = useState("");
  const [beginningInventory, setBeginningInventory] = useState("");
  const [endingInventory, setEndingInventory] = useState("");

  const [averageInventory, setAverageInventory] = useState<number | null>(null);
  const [turnoverRatio, setTurnoverRatio] = useState<number | null>(null);
  const [daysInInventory, setDaysInInventory] = useState<number | null>(null);

  const calculateTurnover = () => {
    const cost = parseFloat(cogs);
    const begin = parseFloat(beginningInventory);
    const end = parseFloat(endingInventory);

    if (!cost || !begin || !end) return;

    const avgInventory = (begin + end) / 2;

    if (avgInventory <= 0) return;

    const turnover = cost / avgInventory;
    const days = 365 / turnover;

    setAverageInventory(avgInventory);
    setTurnoverRatio(turnover);
    setDaysInInventory(days);
  };

  const tryExample = () => {
    setCogs("2000000");
    setBeginningInventory("300000");
    setEndingInventory("500000");
    setTimeout(() => calculateTurnover(), 100);
  };

  const resetFields = () => {
    setCogs("");
    setBeginningInventory("");
    setEndingInventory("");
    setAverageInventory(null);
    setTurnoverRatio(null);
    setDaysInInventory(null);
  };

  const performanceStatus =
    turnoverRatio !== null
      ? turnoverRatio >= 6
        ? "Fast Moving Inventory"
        : turnoverRatio >= 3
        ? "Moderate Turnover"
        : "Slow Moving Inventory"
      : null;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Inventory Turnover Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Cost of Goods Sold (₹)</label>
          <input
            type="number"
            value={cogs}
            onChange={(e) => setCogs(e.target.value)}
            placeholder="Enter COGS"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Beginning Inventory (₹)</label>
          <input
            type="number"
            value={beginningInventory}
            onChange={(e) => setBeginningInventory(e.target.value)}
            placeholder="Enter beginning inventory"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Ending Inventory (₹)</label>
          <input
            type="number"
            value={endingInventory}
            onChange={(e) => setEndingInventory(e.target.value)}
            placeholder="Enter ending inventory"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateTurnover}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Turnover
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

      {/* Results */}
      {turnoverRatio !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Inventory Analysis</h3>

          <p>
            Average Inventory: <strong>₹{averageInventory?.toFixed(2)}</strong>
          </p>

          <p>
            Inventory Turnover Ratio: <strong>{turnoverRatio.toFixed(2)} times</strong>
          </p>

          <p>
            Days in Inventory: <strong>{daysInInventory?.toFixed(0)} days</strong>
          </p>

          <p>
            Performance Status: <strong>{performanceStatus}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Inventory Turnover?</h2>
        <p>
          Inventory turnover measures how many times a business sells and replaces
          its inventory during a specific period.
        </p>

        <h2 className="text-2xl font-bold">Inventory Turnover Formula</h2>
        <p>
          <strong>
            Inventory Turnover = Cost of Goods Sold / Average Inventory
          </strong>
        </p>
        <p>
          <strong>
            Average Inventory = (Beginning Inventory + Ending Inventory) / 2
          </strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Inventory management optimization</li>
          <li>Cash flow improvement</li>
          <li>Retail performance analysis</li>
          <li>Supply chain efficiency check</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is a good inventory turnover ratio?</p>
          <p>
            It depends on industry, but generally 5–10 times per year is considered healthy for retail.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Is higher turnover always better?</p>
          <p>
            Higher turnover usually indicates strong sales, but extremely high turnover may indicate understocking.
          </p>
        </div>
      </div>
    </div>
  );
}