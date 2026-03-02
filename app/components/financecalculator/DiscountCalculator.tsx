"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const percent = parseFloat(discountPercent);

    if (!price || price <= 0 || !percent) return;

    const discountValue = (price * percent) / 100;
    const final = price - discountValue;

    setDiscountAmount(discountValue);
    setFinalPrice(final);
  };

  const tryExample = () => {
    setOriginalPrice("5000");
    setDiscountPercent("20");
    setTimeout(() => calculateDiscount(), 100);
  };

  const resetFields = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setFinalPrice(null);
    setDiscountAmount(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Discount Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Original Price (₹)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter original price"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Discount Percentage (%)</label>
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
          onClick={calculateDiscount}
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

      {finalPrice !== null && discountAmount !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Result</h3>
          <p className="text-lg">
            Discount Amount: <strong>₹{discountAmount.toFixed(2)}</strong>
          </p>
          <p className="text-lg">
            Final Price: <strong>₹{finalPrice.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">
          What is a Discount Calculator?
        </h2>
        <p>
          A Discount Calculator helps you calculate the discount amount and
          final price after applying a percentage discount on the original price.
        </p>

        <h2 className="text-2xl font-bold">
          Discount Formula
        </h2>
        <p>
          <strong>Discount Amount = (Original Price × Discount %) / 100</strong>
        </p>
        <p>
          <strong>Final Price = Original Price - Discount Amount</strong>
        </p>

        <h2 className="text-2xl font-bold">
          Why Use This Calculator?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Quick shopping discount calculation</li>
          <li>Pricing strategy for businesses</li>
          <li>Festival sale planning</li>
          <li>Retail and wholesale discount management</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Can this calculator handle multiple discounts?
          </p>
          <p>
            This version calculates a single percentage discount.
            Multiple discounts can be calculated step-by-step.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Is this useful for GST-inclusive prices?
          </p>
          <p>
            Yes, but make sure you apply GST calculations separately if required.
          </p>
        </div>
      </div>
    </div>
  );
}