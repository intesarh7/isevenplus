"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function ROIReturnOnInvestmentCalculator() {
  const [investment, setInvestment] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [roi, setRoi] = useState<number | null>(null);

  const calculateROI = () => {
    const invest = parseFloat(investment);
    const ret = parseFloat(returnAmount);

    if (!invest || invest <= 0) return;

    const roiValue = ((ret - invest) / invest) * 100;
    setRoi(roiValue);
  };

  const tryExample = () => {
    setInvestment("50000");
    setReturnAmount("75000");
    setTimeout(() => calculateROI(), 100);
  };

  const resetFields = () => {
    setInvestment("");
    setReturnAmount("");
    setRoi(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        ROI (Return on Investment) Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Total Investment (₹)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="Enter investment amount"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Return (₹)</label>
          <input
            type="number"
            value={returnAmount}
            onChange={(e) => setReturnAmount(e.target.value)}
            placeholder="Enter total return amount"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateROI}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate ROI
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

      {roi !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            ROI: <strong>{roi.toFixed(2)}%</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is ROI (Return on Investment)?
        </h2>
        <p>
          ROI (Return on Investment) measures the profitability of an
          investment. It shows how much return you earn compared to the amount
          invested.
        </p>

        <h2 className="text-2xl font-bold">
          ROI Formula
        </h2>
        <p>
          <strong>ROI = (Return - Investment) / Investment × 100</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use an ROI Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Compare multiple investment opportunities</li>
          <li>Measure marketing campaign performance</li>
          <li>Evaluate business growth strategies</li>
          <li>Financial planning and budgeting</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. What is a good ROI percentage?
          </p>
          <p>
            A good ROI depends on industry and risk level, but generally 10%+
            is considered a strong return.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Can ROI be negative?
          </p>
          <p>
            Yes. If your return is less than your investment, ROI will be
            negative, indicating a loss.
          </p>
        </div>
      </div>
    </div>
  );
}