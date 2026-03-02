"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function StartupCostCalculator() {
  const [equipmentCost, setEquipmentCost] = useState("");
  const [registrationCost, setRegistrationCost] = useState("");
  const [otherInitialCost, setOtherInitialCost] = useState("");

  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [monthlyMarketing, setMonthlyMarketing] = useState("");
  const [otherMonthlyCost, setOtherMonthlyCost] = useState("");

  const [totalInitial, setTotalInitial] = useState<number | null>(null);
  const [monthlyExpense, setMonthlyExpense] = useState<number | null>(null);
  const [sixMonthRunway, setSixMonthRunway] = useState<number | null>(null);
  const [oneYearRunway, setOneYearRunway] = useState<number | null>(null);

  const calculateStartupCost = () => {
    const initial =
      (parseFloat(equipmentCost) || 0) +
      (parseFloat(registrationCost) || 0) +
      (parseFloat(otherInitialCost) || 0);

    const monthly =
      (parseFloat(monthlyRent) || 0) +
      (parseFloat(monthlySalary) || 0) +
      (parseFloat(monthlyMarketing) || 0) +
      (parseFloat(otherMonthlyCost) || 0);

    setTotalInitial(initial);
    setMonthlyExpense(monthly);
    setSixMonthRunway(initial + monthly * 6);
    setOneYearRunway(initial + monthly * 12);
  };

  const tryExample = () => {
    setEquipmentCost("300000");
    setRegistrationCost("50000");
    setOtherInitialCost("100000");

    setMonthlyRent("40000");
    setMonthlySalary("150000");
    setMonthlyMarketing("30000");
    setOtherMonthlyCost("20000");

    setTimeout(() => calculateStartupCost(), 100);
  };

  const resetFields = () => {
    setEquipmentCost("");
    setRegistrationCost("");
    setOtherInitialCost("");
    setMonthlyRent("");
    setMonthlySalary("");
    setMonthlyMarketing("");
    setOtherMonthlyCost("");

    setTotalInitial(null);
    setMonthlyExpense(null);
    setSixMonthRunway(null);
    setOneYearRunway(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Startup Cost Calculator
      </h1>

      {/* Initial Costs */}
      <h2 className="text-xl font-semibold mb-4">One-Time Initial Costs</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <input type="number" placeholder="Equipment Cost (₹)" value={equipmentCost}
          onChange={(e) => setEquipmentCost(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Registration & Legal (₹)" value={registrationCost}
          onChange={(e) => setRegistrationCost(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Other Initial Cost (₹)" value={otherInitialCost}
          onChange={(e) => setOtherInitialCost(e.target.value)}
          className="border rounded-lg px-4 py-2" />
      </div>

      {/* Monthly Costs */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Monthly Recurring Costs</h2>
      <div className="grid md:grid-cols-4 gap-6">
        <input type="number" placeholder="Rent (₹)" value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Salaries (₹)" value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Marketing (₹)" value={monthlyMarketing}
          onChange={(e) => setMonthlyMarketing(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Other Monthly Cost (₹)" value={otherMonthlyCost}
          onChange={(e) => setOtherMonthlyCost(e.target.value)}
          className="border rounded-lg px-4 py-2" />
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={calculateStartupCost}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Startup Cost
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
      {totalInitial !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Startup Cost Breakdown</h3>

          <p>Total Initial Investment: <strong>₹{totalInitial.toFixed(2)}</strong></p>
          <p>Monthly Operating Expense: <strong>₹{monthlyExpense?.toFixed(2)}</strong></p>
          <p>6-Month Required Capital: <strong>₹{sixMonthRunway?.toFixed(2)}</strong></p>
          <p>12-Month Required Capital: <strong>₹{oneYearRunway?.toFixed(2)}</strong></p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Startup Cost?</h2>
        <p>
          Startup cost is the total investment required to launch a new business,
          including one-time setup costs and monthly operating expenses.
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Business funding planning</li>
          <li>Investor pitch preparation</li>
          <li>Financial runway estimation</li>
          <li>Cost structure analysis</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is working capital?</p>
          <p>
            Working capital is the money needed to manage day-to-day business operations.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. How many months runway is safe?</p>
          <p>
            Most startups aim for at least 6–12 months of operating runway.
          </p>
        </div>
      </div>
    </div>
  );
}