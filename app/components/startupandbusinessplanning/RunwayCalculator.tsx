"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function RunwayCalculator() {
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const [netBurn, setNetBurn] = useState<number | null>(null);
  const [runwayMonths, setRunwayMonths] = useState<number | null>(null);
  const [runwayYears, setRunwayYears] = useState<number | null>(null);

  const calculateRunway = () => {
    const cash = parseFloat(cashBalance) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;

    if (!cash || expenses <= 0) return;

    const burn = expenses - revenue;
    setNetBurn(burn);

    if (burn <= 0) {
      setRunwayMonths(Infinity);
      setRunwayYears(Infinity);
      return;
    }

    const months = cash / burn;
    const years = months / 12;

    setRunwayMonths(months);
    setRunwayYears(years);
  };

  const tryExample = () => {
    setCashBalance("1500000");
    setMonthlyRevenue("200000");
    setMonthlyExpenses("400000");
    setTimeout(() => calculateRunway(), 100);
  };

  const resetFields = () => {
    setCashBalance("");
    setMonthlyRevenue("");
    setMonthlyExpenses("");
    setNetBurn(null);
    setRunwayMonths(null);
    setRunwayYears(null);
  };

  const runwayStatus =
    runwayMonths !== null && runwayMonths !== Infinity
      ? runwayMonths >= 18
        ? "Strong Runway"
        : runwayMonths >= 9
        ? "Moderate Runway"
        : "High Risk"
      : null;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Runway Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Current Cash Balance (₹)</label>
          <input
            type="number"
            value={cashBalance}
            onChange={(e) => setCashBalance(e.target.value)}
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
          onClick={calculateRunway}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Runway
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

      {netBurn !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Runway Analysis</h3>

          <p>
            Net Burn Rate:{" "}
            <strong className={netBurn > 0 ? "text-red-600" : "text-green-600"}>
              ₹{netBurn.toFixed(2)}
            </strong>
          </p>

          {runwayMonths === Infinity ? (
            <p>
              Runway: <strong>Profitable (No Cash Burn)</strong>
            </p>
          ) : (
            <>
              <p>
                Runway: <strong>{runwayMonths?.toFixed(1)} Months</strong>
              </p>
              <p>
                Equivalent: <strong>{runwayYears?.toFixed(2)} Years</strong>
              </p>
            </>
          )}

          {runwayStatus && (
            <p>
              Status: <strong>{runwayStatus}</strong>
            </p>
          )}
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Runway?</h2>
        <p>
          Runway refers to the amount of time a business can continue operating
          before running out of cash, based on current burn rate.
        </p>

        <h2 className="text-2xl font-bold">Runway Formula</h2>
        <p>
          <strong>Runway = Cash Balance / Net Monthly Burn</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Startup financial planning</li>
          <li>Investor readiness check</li>
          <li>Funding round timing</li>
          <li>Cash management strategy</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is a healthy runway?</p>
          <p>
            Most startups aim for at least 12–18 months of runway.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. What if net burn is negative?</p>
          <p>
            If revenue exceeds expenses, the company is profitable and runway is unlimited.
          </p>
        </div>
      </div>
    </div>
  );
}