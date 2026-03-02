"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function BurnRateCalculator() {
  const [startingCash, setStartingCash] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const [grossBurn, setGrossBurn] = useState<number | null>(null);
  const [netBurn, setNetBurn] = useState<number | null>(null);
  const [runway, setRunway] = useState<number | null>(null);

  const calculateBurnRate = () => {
    const cash = parseFloat(startingCash) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;

    if (!cash || expenses <= 0) return;

    const gross = expenses;
    const net = expenses - revenue;

    const monthsRunway =
      net > 0 ? cash / net : Infinity;

    setGrossBurn(gross);
    setNetBurn(net);
    setRunway(monthsRunway);
  };

  const tryExample = () => {
    setStartingCash("2000000");
    setMonthlyRevenue("300000");
    setMonthlyExpenses("500000");
    setTimeout(() => calculateBurnRate(), 100);
  };

  const resetFields = () => {
    setStartingCash("");
    setMonthlyRevenue("");
    setMonthlyExpenses("");
    setGrossBurn(null);
    setNetBurn(null);
    setRunway(null);
  };

  const runwayStatus =
    runway !== null
      ? runway >= 12
        ? "Healthy Runway"
        : runway >= 6
        ? "Moderate Runway"
        : "High Risk"
      : null;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Burn Rate Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Starting Cash Balance (₹)</label>
          <input
            type="number"
            value={startingCash}
            onChange={(e) => setStartingCash(e.target.value)}
            placeholder="Enter available cash"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Monthly Revenue (₹)</label>
          <input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
            placeholder="Enter monthly revenue"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Monthly Expenses (₹)</label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            placeholder="Enter monthly expenses"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateBurnRate}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Burn Rate
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

      {/* Results */}
      {grossBurn !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Burn Rate Analysis</h3>

          <p>
            Gross Burn Rate: <strong>₹{grossBurn.toFixed(2)}</strong>
          </p>

          <p>
            Net Burn Rate:{" "}
            <strong className={netBurn && netBurn > 0 ? "text-red-600" : "text-green-600"}>
              ₹{netBurn?.toFixed(2)}
            </strong>
          </p>

          {runway !== null && (
            <p>
              Runway:{" "}
              <strong>
                {runway === Infinity
                  ? "Profitable (No Burn)"
                  : `${runway.toFixed(1)} Months`}
              </strong>
            </p>
          )}

          {runwayStatus && runway !== Infinity && (
            <p>
              Status: <strong>{runwayStatus}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Burn Rate?</h2>
        <p>
          Burn rate measures how quickly a company is spending its cash reserves.
          It is commonly used by startups to estimate financial runway.
        </p>

        <h2 className="text-2xl font-bold">Burn Rate Formula</h2>
        <p>
          <strong>Net Burn = Monthly Expenses - Monthly Revenue</strong>
        </p>
        <p>
          <strong>Runway = Cash Balance / Net Burn</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Startup runway estimation</li>
          <li>Investor reporting</li>
          <li>Cash management strategy</li>
          <li>Funding planning</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is a healthy runway?</p>
          <p>
            Most startups aim for 12–18 months of runway for stability.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. What is gross vs net burn?</p>
          <p>
            Gross burn is total monthly expenses. Net burn subtracts revenue from expenses.
          </p>
        </div>
      </div>
    </div>
  );
}