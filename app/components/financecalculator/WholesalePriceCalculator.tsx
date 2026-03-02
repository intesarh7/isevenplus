"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function WholesalePriceCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const [wholesalePrice, setWholesalePrice] = useState<number | null>(null);
  const [profitPerUnit, setProfitPerUnit] = useState<number | null>(null);

  const calculateWholesale = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercent) || 0;
    const discount = parseFloat(discountPercent) || 0;

    if (!cost || cost <= 0) return;

    // Add markup
    const priceWithMarkup = cost + (cost * markup) / 100;

    // Apply discount (if any)
    const finalWholesale =
      priceWithMarkup - (priceWithMarkup * discount) / 100;

    const profit = finalWholesale - cost;

    setWholesalePrice(finalWholesale);
    setProfitPerUnit(profit);
  };

  const tryExample = () => {
    setCostPrice("500");
    setMarkupPercent("30");
    setDiscountPercent("10");
    setTimeout(() => calculateWholesale(), 100);
  };

  const resetFields = () => {
    setCostPrice("");
    setMarkupPercent("");
    setDiscountPercent("");
    setWholesalePrice(null);
    setProfitPerUnit(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Wholesale Price Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

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
          <label className="font-medium">Markup Percentage (%)</label>
          <input
            type="number"
            value={markupPercent}
            onChange={(e) => setMarkupPercent(e.target.value)}
            placeholder="Enter markup percentage"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Discount Percentage (%) (Optional)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Enter discount percentage"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateWholesale}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Wholesale Price
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

      {wholesalePrice !== null && profitPerUnit !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Wholesale Pricing Breakdown</h3>
          <p>
            Wholesale Price: <strong>₹{wholesalePrice.toFixed(2)}</strong>
          </p>
          <p>
            Profit Per Unit: <strong>₹{profitPerUnit.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Wholesale Price?</h2>
        <p>
          Wholesale price is the price at which goods are sold in bulk to retailers.
          It includes cost price plus markup and may include discount adjustments.
        </p>

        <h2 className="text-2xl font-bold">Wholesale Price Formula</h2>
        <p>
          <strong>Wholesale Price = Cost + Markup - Discount</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Bulk pricing strategy</li>
          <li>Profit optimization</li>
          <li>Retailer margin planning</li>
          <li>Business pricing decisions</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Can I use this for retail pricing?
          </p>
          <p>
            Yes. You can adjust markup and discount percentages accordingly.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Does this include VAT or GST?
          </p>
          <p>
            No. Taxes should be calculated separately using VAT or GST calculator.
          </p>
        </div>
      </div>
    </div>
  );
}