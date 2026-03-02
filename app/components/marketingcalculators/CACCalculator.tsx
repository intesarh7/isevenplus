"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function CACCalculator() {
  const [marketingCost, setMarketingCost] = useState("");
  const [salesCost, setSalesCost] = useState("");
  const [newCustomers, setNewCustomers] = useState("");

  const [cac, setCac] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const calculateCAC = () => {
    const marketing = parseFloat(marketingCost);
    const sales = parseFloat(salesCost);
    const customers = parseFloat(newCustomers);

    if (!marketing || !sales || !customers || customers <= 0) return;

    const total = marketing + sales;
    const result = total / customers;

    setTotalCost(total);
    setCac(parseFloat(result.toFixed(2)));
  };

  const handleExample = () => {
    setMarketingCost("50000");
    setSalesCost("20000");
    setNewCustomers("350");
  };

  const handleReset = () => {
    setMarketingCost("");
    setSalesCost("");
    setNewCustomers("");
    setCac(null);
    setTotalCost(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-600 p-3 rounded-xl text-white">
          <Calculator size={22} />
        </div>
        <h1 className="text-3xl font-bold">
          Customer Acquisition Cost (CAC) Calculator
        </h1>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block font-medium mb-2">
            Marketing Cost (₹)
          </label>
          <input
            type="number"
            value={marketingCost}
            onChange={(e) => setMarketingCost(e.target.value)}
            className="w-full border rounded-xl p-2 text-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Sales Cost (₹)
          </label>
          <input
            type="number"
            value={salesCost}
            onChange={(e) => setSalesCost(e.target.value)}
            className="w-full border rounded-xl p-2 text-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Number of New Customers
          </label>
          <input
            type="number"
            value={newCustomers}
            onChange={(e) => setNewCustomers(e.target.value)}
            className="w-full border rounded-xl p-2 text-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={calculateCAC}
         className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate CAC
        </button>

        <button
          onClick={handleExample}
          className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-lg"
        >
          <PlayCircle size={18} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="w-full sm:flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-lg"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Result Card */}
      {cac !== null && (
        <div className="bg-gray-100 rounded-2xl p-8 shadow-inner">
          <h2 className="text-2xl font-bold mb-6">
            CAC Breakdown
          </h2>

          <div className="space-y-3 text-lg">
            <p>
              Total Marketing + Sales Cost:{" "}
              <strong>₹{totalCost?.toFixed(2)}</strong>
            </p>
            <p>
              Customer Acquisition Cost (CAC):{" "}
              <strong>₹{cac}</strong>
            </p>
          </div>
        </div>
      )}

      {/* SEO Section */}
      <section className="mt-14 space-y-6">
        <h2 className="text-2xl font-bold">
          What is Customer Acquisition Cost (CAC)?
        </h2>
        <p>
          Customer Acquisition Cost (CAC) measures the total expense required
          to acquire a new customer. It includes marketing costs, advertising
          spend, and sales team expenses divided by the number of new
          customers gained.
        </p>

        <h3 className="text-xl font-semibold">
          CAC Formula
        </h3>
        <p className="bg-gray-100 p-4 rounded-xl">
          CAC = (Marketing Cost + Sales Cost) ÷ Number of New Customers
        </p>

        <h3 className="text-xl font-semibold">
          Why CAC is Important?
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Measures marketing efficiency</li>
          <li>Helps determine business profitability</li>
          <li>Important for SaaS and startup metrics</li>
          <li>Used in LTV vs CAC analysis</li>
        </ul>
      </section>
    </div>
  );
}