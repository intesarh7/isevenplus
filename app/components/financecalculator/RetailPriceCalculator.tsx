"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function RetailPriceCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [taxPercent, setTaxPercent] = useState("");

  const [retailPrice, setRetailPrice] = useState<number | null>(null);
  const [profitPerUnit, setProfitPerUnit] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);

  const calculateRetail = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercent) || 0;
    const tax = parseFloat(taxPercent) || 0;

    if (!cost || cost <= 0) return;

    // Add markup
    const priceAfterMarkup = cost + (cost * markup) / 100;

    // Calculate tax
    const taxValue = (priceAfterMarkup * tax) / 100;

    const finalRetail = priceAfterMarkup + taxValue;
    const profit = priceAfterMarkup - cost;

    setRetailPrice(finalRetail);
    setProfitPerUnit(profit);
    setTaxAmount(taxValue);
  };

  const tryExample = () => {
    setCostPrice("1000");
    setMarkupPercent("40");
    setTaxPercent("18");
    setTimeout(() => calculateRetail(), 100);
  };

  const resetFields = () => {
    setCostPrice("");
    setMarkupPercent("");
    setTaxPercent("");
    setRetailPrice(null);
    setProfitPerUnit(null);
    setTaxAmount(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Retail Price Calculator
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
          <label className="font-medium">Tax Percentage (%) (Optional)</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            placeholder="Enter tax percentage"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateRetail}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Retail Price
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

      {retailPrice !== null && profitPerUnit !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Retail Pricing Breakdown</h3>
          <p>
            Retail Price (Including Tax): <strong>₹{retailPrice.toFixed(2)}</strong>
          </p>
          <p>
            Profit Per Unit: <strong>₹{profitPerUnit.toFixed(2)}</strong>
          </p>
          {taxAmount !== null && (
            <p>
              Tax Amount: <strong>₹{taxAmount.toFixed(2)}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Retail Price?</h2>
        <p>
          Retail price is the final price at which goods are sold to customers.
          It includes cost price, markup, and applicable taxes.
        </p>

        <h2 className="text-2xl font-bold">Retail Price Formula</h2>
        <p>
          <strong>Retail Price = Cost + Markup + Tax</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Retail pricing strategy</li>
          <li>Margin planning</li>
          <li>Tax-inclusive pricing</li>
          <li>Small business profit optimization</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Does this include VAT or GST?
          </p>
          <p>
            Yes, if you enter the tax percentage, it will be added to the retail price.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. What is a good retail markup?
          </p>
          <p>
            It depends on industry, but common retail markup ranges from 30% to 100%.
          </p>
        </div>
      </div>
    </div>
  );
}