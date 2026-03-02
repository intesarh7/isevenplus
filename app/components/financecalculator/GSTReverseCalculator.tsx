"use client";

import { useState } from "react";

export default function GSTReverseCalculator() {
  const [inclusivePrice, setInclusivePrice] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(inclusivePrice);
    const rate = parseFloat(gstRate);

    if (!price || !rate) return;

    const basePrice = price / (1 + rate / 100);
    const gstAmount = price - basePrice;

    setResult({
      basePrice: basePrice.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
    });
  };

  const loadExample = () => {
    setInclusivePrice("1180");
    setGstRate("18");
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        GST Reverse Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="GST Inclusive Price (₹)"
          value={inclusivePrice}
          onChange={(e) => setInclusivePrice(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={gstRate}
          onChange={(e) => setGstRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold transition"
        >
          Calculate
        </button>

        <button
          onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-medium"
        >
          Try Example (₹1,180 @18%)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Base Price (Without GST): ₹{result.basePrice}
          </p>
          <p>
            GST Amount: ₹{result.gstAmount}
          </p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Example Calculation
        </h3>

        <p>
          If a product costs ₹1,180 including 18% GST:
        </p>

        <p className="mt-2">
          Base Price = ₹1,000 <br />
          GST Amount = ₹180
        </p>

        <p className="mt-4">
          Reverse GST calculation helps you find the original price before tax.
          Formula used: Base Price = Inclusive Price ÷ (1 + GST%).
        </p>
      </div>
    </div>
  );
}