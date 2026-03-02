"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function CashFlowCalculator() {
  const [openingBalance, setOpeningBalance] = useState("");
  const [cashInflows, setCashInflows] = useState("");
  const [cashOutflows, setCashOutflows] = useState("");

  const [netCashFlow, setNetCashFlow] = useState<number | null>(null);
  const [closingBalance, setClosingBalance] = useState<number | null>(null);

  const calculateCashFlow = () => {
    const opening = parseFloat(openingBalance) || 0;
    const inflow = parseFloat(cashInflows) || 0;
    const outflow = parseFloat(cashOutflows) || 0;

    const net = inflow - outflow;
    const closing = opening + net;

    setNetCashFlow(net);
    setClosingBalance(closing);
  };

  const tryExample = () => {
    setOpeningBalance("100000");
    setCashInflows("50000");
    setCashOutflows("30000");
    setTimeout(() => calculateCashFlow(), 100);
  };

  const resetFields = () => {
    setOpeningBalance("");
    setCashInflows("");
    setCashOutflows("");
    setNetCashFlow(null);
    setClosingBalance(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Cash Flow Calculator
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <label className="font-medium">Opening Balance (₹)</label>
          <input
            type="number"
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            placeholder="Enter opening balance"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Cash Inflows (₹)</label>
          <input
            type="number"
            value={cashInflows}
            onChange={(e) => setCashInflows(e.target.value)}
            placeholder="Enter total inflows"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Cash Outflows (₹)</label>
          <input
            type="number"
            value={cashOutflows}
            onChange={(e) => setCashOutflows(e.target.value)}
            placeholder="Enter total outflows"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateCashFlow}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Cash Flow
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

      {netCashFlow !== null && closingBalance !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Cash Flow Breakdown</h3>

          <p>
            Net Cash Flow:{" "}
            <strong className={netCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
              ₹{netCashFlow.toFixed(2)}
            </strong>
          </p>

          <p>
            Closing Balance: <strong>₹{closingBalance.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Cash Flow?</h2>
        <p>
          Cash flow represents the movement of money in and out of a business.
          Positive cash flow means more money is coming in than going out.
        </p>

        <h2 className="text-2xl font-bold">Cash Flow Formula</h2>
        <p>
          <strong>Net Cash Flow = Cash Inflows - Cash Outflows</strong>
        </p>
        <p>
          <strong>Closing Balance = Opening Balance + Net Cash Flow</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Business liquidity planning</li>
          <li>Financial forecasting</li>
          <li>Startup runway estimation</li>
          <li>Investment analysis</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">
            1. Why is positive cash flow important?
          </p>
          <p>
            Positive cash flow ensures that a business can pay its expenses and grow sustainably.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            2. Is cash flow same as profit?
          </p>
          <p>
            No. Profit includes accounting adjustments, while cash flow tracks actual cash movement.
          </p>
        </div>
      </div>
    </div>
  );
}