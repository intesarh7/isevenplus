"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function CostPerUnitCalculator() {
  const [totalCost, setTotalCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPerUnit, setCostPerUnit] = useState<number | null>(null);

  const calculateCost = () => {
    const cost = parseFloat(totalCost);
    const qty = parseFloat(quantity);

    if (!cost || !qty || qty <= 0) return;

    const result = cost / qty;
    setCostPerUnit(result);
  };

  const tryExample = () => {
    setTotalCost("50000");
    setQuantity("1000");
    setTimeout(() => calculateCost(), 100);
  };

  const resetFields = () => {
    setTotalCost("");
    setQuantity("");
    setCostPerUnit(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Cost Per Unit Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Total Production Cost (₹)</label>
          <input
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            placeholder="Enter total cost"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Units Produced</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter total units"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateCost}
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

      {costPerUnit !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            Cost Per Unit: <strong>₹{costPerUnit.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is Cost Per Unit?
        </h2>
        <p>
          Cost per unit is the average cost incurred to produce one unit of a product.
          It helps businesses determine pricing, profitability, and cost efficiency.
        </p>

        <h2 className="text-2xl font-bold">
          Cost Per Unit Formula
        </h2>
        <p>
          <strong>Cost Per Unit = Total Production Cost / Total Units Produced</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use This Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Set correct product pricing</li>
          <li>Improve profit margins</li>
          <li>Track production efficiency</li>
          <li>Reduce operational costs</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Why is cost per unit important?
          </p>
          <p>
            It helps businesses determine whether they are producing efficiently
            and pricing products correctly.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Does this include fixed and variable costs?
          </p>
          <p>
            Yes. Total production cost can include both fixed and variable costs.
          </p>
        </div>
      </div>
    </div>
  );
}