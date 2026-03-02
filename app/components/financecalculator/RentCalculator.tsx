"use client";

import { useState } from "react";

export default function RentCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const rent = parseFloat(monthlyRent);
    const deposit = parseFloat(securityDeposit) || 0;
    const maint = parseFloat(maintenance) || 0;

    if (!rent) return;

    const yearlyRent = rent * 12;
    const yearlyMaintenance = maint * 12;
    const totalYearlyCost = yearlyRent + yearlyMaintenance;

    setResult({
      yearlyRent: yearlyRent.toFixed(2),
      yearlyMaintenance: yearlyMaintenance.toFixed(2),
      totalYearlyCost: totalYearlyCost.toFixed(2),
      deposit: deposit.toFixed(2),
    });
  };

  const loadExample = () => {
    setMonthlyRent("20000");
    setSecurityDeposit("40000");
    setMaintenance("2000");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rent Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Monthly Rent (₹)"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Security Deposit (₹)"
          value={securityDeposit}
          onChange={(e) => setSecurityDeposit(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Monthly Maintenance (₹)"
          value={maintenance}
          onChange={(e) => setMaintenance(e.target.value)}
          className="border p-3 rounded-lg md:col-span-2"
        />
      </div>

      <div className="mt-4 space-y-3">
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
          Try Example (₹20k rent, ₹2k maintenance)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold text-lg">
            Annual Rent: ₹{result.yearlyRent}
          </p>
          <p>Annual Maintenance: ₹{result.yearlyMaintenance}</p>
          <p>Total Yearly Cost: ₹{result.totalYearlyCost}</p>
          <p>Security Deposit (One-time): ₹{result.deposit}</p>
        </div>
      )}

      {/* SEO Explanation */}
      <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6">
        <h3 className="font-semibold text-lg mb-2">
          Rent Cost Breakdown
        </h3>
        <p>
          This calculator helps estimate your total yearly rental expense,
          including monthly rent and maintenance. Security deposit is shown
          separately as a refundable one-time payment.
        </p>
      </div>
    </div>
  );
}