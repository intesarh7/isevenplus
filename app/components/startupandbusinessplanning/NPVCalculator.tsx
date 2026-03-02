"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

interface CashFlowItem {
  year: number;
  cashFlow: number;
  discountedValue: number;
}

export default function NPVCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [years, setYears] = useState("");
  const [annualCashFlow, setAnnualCashFlow] = useState("");

  const [npv, setNpv] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<CashFlowItem[]>([]);

  const calculateNPV = () => {
    const investment = parseFloat(initialInvestment);
    const rate = parseFloat(discountRate) / 100;
    const totalYears = parseFloat(years);
    const cashFlow = parseFloat(annualCashFlow);

    if (!investment || !rate || !totalYears || !cashFlow) return;

    let totalPV = 0;
    const discountedFlows: CashFlowItem[] = [];

    for (let year = 1; year <= totalYears; year++) {
      const discounted = cashFlow / Math.pow(1 + rate, year);
      totalPV += discounted;

      discountedFlows.push({
        year,
        cashFlow,
        discountedValue: discounted,
      });
    }

    const finalNPV = totalPV - investment;

    setNpv(finalNPV);
    setSchedule(discountedFlows);
  };

  const tryExample = () => {
    setInitialInvestment("500000");
    setDiscountRate("10");
    setYears("5");
    setAnnualCashFlow("150000");
    setTimeout(() => calculateNPV(), 100);
  };

  const resetFields = () => {
    setInitialInvestment("");
    setDiscountRate("");
    setYears("");
    setAnnualCashFlow("");
    setNpv(null);
    setSchedule([]);
  };

  const decision =
    npv !== null
      ? npv > 0
        ? "Accept Project (Profitable)"
        : "Reject Project (Not Profitable)"
      : null;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        NPV Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Initial Investment (₹)"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Discount Rate (%)"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Project Duration (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Annual Cash Inflow (₹)"
          value={annualCashFlow}
          onChange={(e) => setAnnualCashFlow(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateNPV}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate NPV
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

      {npv !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold">NPV Result</h3>

          <p>
            Net Present Value:{" "}
            <strong className={npv > 0 ? "text-green-600" : "text-red-600"}>
              ₹{npv.toFixed(2)}
            </strong>
          </p>

          <p>
            Decision: <strong>{decision}</strong>
          </p>
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Discounted Cash Flow Table</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-2">Year</th>
                <th className="p-2">Cash Flow</th>
                <th className="p-2">Discounted Value</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.year} className="border-t text-center">
                  <td className="p-2">{row.year}</td>
                  <td className="p-2">₹{row.cashFlow.toFixed(2)}</td>
                  <td className="p-2">₹{row.discountedValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">

        <h2 className="text-2xl font-bold">What is NPV?</h2>
        <p>
          Net Present Value (NPV) measures the profitability of an investment
          by calculating the present value of future cash flows minus initial investment.
        </p>

        <h2 className="text-2xl font-bold">NPV Formula</h2>
        <p>
          <strong>
            NPV = Σ [Cash Flow / (1 + r)^t] − Initial Investment
          </strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Capital budgeting decisions</li>
          <li>Investment profitability analysis</li>
          <li>Startup funding evaluation</li>
          <li>Risk assessment</li>
        </ul>

      </div>
    </div>
  );
}