"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function RevenueCalculator() {
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [taxPercent, setTaxPercent] = useState("");

  const [revenue, setRevenue] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [totalWithTax, setTotalWithTax] = useState<number | null>(null);

  const calculateRevenue = () => {
    const price = parseFloat(pricePerUnit);
    const qty = parseFloat(quantity);
    const tax = parseFloat(taxPercent) || 0;

    if (!price || !qty || price <= 0 || qty <= 0) return;

    const baseRevenue = price * qty;
    const taxValue = (baseRevenue * tax) / 100;
    const finalRevenue = baseRevenue + taxValue;

    setRevenue(baseRevenue);
    setTaxAmount(taxValue);
    setTotalWithTax(finalRevenue);
  };

  const tryExample = () => {
    setPricePerUnit("1500");
    setQuantity("50");
    setTaxPercent("18");
    setTimeout(() => calculateRevenue(), 100);
  };

  const resetFields = () => {
    setPricePerUnit("");
    setQuantity("");
    setTaxPercent("");
    setRevenue(null);
    setTaxAmount(null);
    setTotalWithTax(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Revenue Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Price Per Unit (₹)</label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="Enter price per unit"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Quantity Sold</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity sold"
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
          onClick={calculateRevenue}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Revenue
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

      {revenue !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Revenue Breakdown</h3>
          <p>
            Base Revenue: <strong>₹{revenue.toFixed(2)}</strong>
          </p>
          {taxAmount !== null && taxAmount > 0 && (
            <p>
              Tax Amount: <strong>₹{taxAmount.toFixed(2)}</strong>
            </p>
          )}
          {totalWithTax !== null && taxAmount !== null && taxAmount > 0 && (
            <p>
              Total Revenue (Including Tax): <strong>₹{totalWithTax.toFixed(2)}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Revenue?</h2>
        <p>
          Revenue is the total income generated from the sale of goods or services
          before deducting expenses. It is also known as total sales.
        </p>

        <h2 className="text-2xl font-bold">Revenue Formula</h2>
        <p>
          <strong>Revenue = Price Per Unit × Quantity Sold</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Sales forecasting</li>
          <li>Business performance tracking</li>
          <li>Pricing strategy analysis</li>
          <li>Financial reporting support</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Is revenue the same as profit?
          </p>
          <p>
            No. Revenue is total income before expenses, while profit is what remains
            after deducting costs and taxes.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Can this include tax?
          </p>
          <p>
            Yes. Enter tax percentage to calculate revenue including tax.
          </p>
        </div>
      </div>
    </div>
  );
}