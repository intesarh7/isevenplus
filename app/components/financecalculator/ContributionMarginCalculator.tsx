"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function ContributionMarginCalculator() {
  const [sellingPrice, setSellingPrice] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [units, setUnits] = useState("");

  const [contributionPerUnit, setContributionPerUnit] = useState<number | null>(null);
  const [contributionMarginPercent, setContributionMarginPercent] = useState<number | null>(null);
  const [totalContribution, setTotalContribution] = useState<number | null>(null);

  const calculateContribution = () => {
    const price = parseFloat(sellingPrice);
    const cost = parseFloat(variableCost);
    const qty = parseFloat(units) || 0;

    if (!price || !cost || price <= 0) return;

    const contribution = price - cost;
    const marginPercent = (contribution / price) * 100;
    const total = qty > 0 ? contribution * qty : 0;

    setContributionPerUnit(contribution);
    setContributionMarginPercent(marginPercent);
    setTotalContribution(qty > 0 ? total : null);
  };

  const tryExample = () => {
    setSellingPrice("1500");
    setVariableCost("900");
    setUnits("100");
    setTimeout(() => calculateContribution(), 100);
  };

  const resetFields = () => {
    setSellingPrice("");
    setVariableCost("");
    setUnits("");
    setContributionPerUnit(null);
    setContributionMarginPercent(null);
    setTotalContribution(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Contribution Margin Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Selling Price per Unit (₹)</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Variable Cost per Unit (₹)</label>
          <input
            type="number"
            value={variableCost}
            onChange={(e) => setVariableCost(e.target.value)}
            placeholder="Enter variable cost"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Units Sold (Optional)</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="Enter units sold"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateContribution}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Contribution
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

      {contributionPerUnit !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Contribution Breakdown</h3>

          <p>
            Contribution Per Unit: <strong>₹{contributionPerUnit.toFixed(2)}</strong>
          </p>

          <p>
            Contribution Margin: <strong>{contributionMarginPercent?.toFixed(2)}%</strong>
          </p>

          {totalContribution !== null && (
            <p>
              Total Contribution: <strong>₹{totalContribution.toFixed(2)}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Contribution Margin?</h2>
        <p>
          Contribution margin represents the amount remaining from sales revenue 
          after deducting variable costs. It helps businesses cover fixed costs 
          and determine profitability.
        </p>

        <h2 className="text-2xl font-bold">Contribution Margin Formula</h2>
        <p>
          <strong>Contribution Per Unit = Selling Price - Variable Cost</strong>
        </p>
        <p>
          <strong>Contribution Margin % = (Contribution / Selling Price) × 100</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Break-even analysis</li>
          <li>Pricing decisions</li>
          <li>Profitability forecasting</li>
          <li>Cost management</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. How is contribution margin different from profit?
          </p>
          <p>
            Contribution margin excludes fixed costs, while profit includes both fixed and variable costs.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Why is contribution margin important?
          </p>
          <p>
            It helps determine how much revenue contributes to covering fixed costs and generating profit.
          </p>
        </div>
      </div>
    </div>
  );
}