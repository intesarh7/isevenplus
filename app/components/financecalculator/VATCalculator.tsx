"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function VATCalculator() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("20");
  const [mode, setMode] = useState("add"); // add or remove

  const [vatAmount, setVatAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateVAT = () => {
    const base = parseFloat(amount);
    const rate = parseFloat(vatRate);

    if (!base || base <= 0 || !rate) return;

    if (mode === "add") {
      const vat = (base * rate) / 100;
      const total = base + vat;
      setVatAmount(vat);
      setTotalAmount(total);
    } else {
      const vat = base - base / (1 + rate / 100);
      const original = base - vat;
      setVatAmount(vat);
      setTotalAmount(original);
    }
  };

  const tryExample = () => {
    setAmount("10000");
    setVatRate("20");
    setMode("add");
    setTimeout(() => calculateVAT(), 100);
  };

  const resetFields = () => {
    setAmount("");
    setVatRate("20");
    setMode("add");
    setVatAmount(null);
    setTotalAmount(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        VAT Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">VAT Rate (%)</label>
          <input
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Calculation Type</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mt-2"
          >
            <option value="add">Add VAT</option>
            <option value="remove">Remove VAT</option>
          </select>
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateVAT}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate VAT
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

      {vatAmount !== null && totalAmount !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">VAT Breakdown</h3>
          <p>
            VAT Amount: <strong>₹{vatAmount.toFixed(2)}</strong>
          </p>
          {mode === "add" ? (
            <p>
              Total Amount (Including VAT): <strong>₹{totalAmount.toFixed(2)}</strong>
            </p>
          ) : (
            <p>
              Original Amount (Excluding VAT): <strong>₹{totalAmount.toFixed(2)}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is VAT?</h2>
        <p>
          VAT (Value Added Tax) is a consumption tax applied at each stage of the
          supply chain. Businesses collect VAT on behalf of the government.
        </p>

        <h2 className="text-2xl font-bold">VAT Formula</h2>
        <p>
          <strong>VAT Amount = Amount × VAT Rate / 100</strong>
        </p>
        <p>
          <strong>Total Including VAT = Amount + VAT</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This VAT Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Quick VAT inclusion & exclusion calculation</li>
          <li>Business invoicing support</li>
          <li>Retail & wholesale billing</li>
          <li>Tax compliance estimation</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. Can I remove VAT from a price?</p>
          <p>
            Yes. Select "Remove VAT" and the calculator will extract VAT from
            the total amount.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Is VAT same as GST?</p>
          <p>
            VAT is used in many countries, while GST is a similar tax structure
            used in countries like India, Australia, and Canada.
          </p>
        </div>
      </div>
    </div>
  );
}