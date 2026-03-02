"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

export default function WorkingCapitalCalculator() {
  const [cash, setCash] = useState("");
  const [receivables, setReceivables] = useState("");
  const [inventory, setInventory] = useState("");
  const [otherAssets, setOtherAssets] = useState("");

  const [payables, setPayables] = useState("");
  const [shortTermLoans, setShortTermLoans] = useState("");
  const [otherLiabilities, setOtherLiabilities] = useState("");

  const [workingCapital, setWorkingCapital] = useState<number | null>(null);
  const [currentRatio, setCurrentRatio] = useState<number | null>(null);

  const calculateWorkingCapital = () => {
    const totalAssets =
      (parseFloat(cash) || 0) +
      (parseFloat(receivables) || 0) +
      (parseFloat(inventory) || 0) +
      (parseFloat(otherAssets) || 0);

    const totalLiabilities =
      (parseFloat(payables) || 0) +
      (parseFloat(shortTermLoans) || 0) +
      (parseFloat(otherLiabilities) || 0);

    const wc = totalAssets - totalLiabilities;
    const ratio =
      totalLiabilities !== 0 ? totalAssets / totalLiabilities : 0;

    setWorkingCapital(wc);
    setCurrentRatio(ratio);
  };

  const tryExample = () => {
    setCash("200000");
    setReceivables("150000");
    setInventory("100000");
    setOtherAssets("50000");

    setPayables("120000");
    setShortTermLoans("80000");
    setOtherLiabilities("20000");

    setTimeout(() => calculateWorkingCapital(), 100);
  };

  const resetFields = () => {
    setCash("");
    setReceivables("");
    setInventory("");
    setOtherAssets("");
    setPayables("");
    setShortTermLoans("");
    setOtherLiabilities("");
    setWorkingCapital(null);
    setCurrentRatio(null);
  };

  const liquidityStatus =
    currentRatio !== null
      ? currentRatio >= 1.5
        ? "Healthy"
        : currentRatio >= 1
        ? "Moderate"
        : "Risky"
      : null;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Working Capital Calculator
      </h1>

      {/* Current Assets */}
      <h2 className="text-xl font-semibold mb-4">Current Assets</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <input type="number" placeholder="Cash (₹)" value={cash}
          onChange={(e) => setCash(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Accounts Receivable (₹)" value={receivables}
          onChange={(e) => setReceivables(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Inventory (₹)" value={inventory}
          onChange={(e) => setInventory(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Other Current Assets (₹)" value={otherAssets}
          onChange={(e) => setOtherAssets(e.target.value)}
          className="border rounded-lg px-4 py-2" />
      </div>

      {/* Current Liabilities */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Current Liabilities</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <input type="number" placeholder="Accounts Payable (₹)" value={payables}
          onChange={(e) => setPayables(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Short-Term Loans (₹)" value={shortTermLoans}
          onChange={(e) => setShortTermLoans(e.target.value)}
          className="border rounded-lg px-4 py-2" />

        <input type="number" placeholder="Other Current Liabilities (₹)" value={otherLiabilities}
          onChange={(e) => setOtherLiabilities(e.target.value)}
          className="border rounded-lg px-4 py-2" />
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={calculateWorkingCapital}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Working Capital
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
      {workingCapital !== null && (
        <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
          <h3 className="text-xl font-semibold mb-2">Working Capital Analysis</h3>

          <p>
            Working Capital:{" "}
            <strong className={workingCapital >= 0 ? "text-green-600" : "text-red-600"}>
              ₹{workingCapital.toFixed(2)}
            </strong>
          </p>

          <p>
            Current Ratio: <strong>{currentRatio?.toFixed(2)}</strong>
          </p>

          <p>
            Liquidity Status:{" "}
            <strong>
              {liquidityStatus}
            </strong>
          </p>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold">What is Working Capital?</h2>
        <p>
          Working capital is the difference between a company's current assets 
          and current liabilities. It measures short-term financial health.
        </p>

        <h2 className="text-2xl font-bold">Working Capital Formula</h2>
        <p>
          <strong>Working Capital = Current Assets - Current Liabilities</strong>
        </p>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Liquidity assessment</li>
          <li>Cash management planning</li>
          <li>Investor financial review</li>
          <li>Short-term solvency check</li>
        </ul>

        <h2 className="text-2xl font-bold">FAQs</h2>

        <div>
          <p className="font-semibold">1. What is a good current ratio?</p>
          <p>
            A current ratio between 1.5 and 2 is generally considered healthy.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Can working capital be negative?</p>
          <p>
            Yes. Negative working capital indicates potential liquidity issues.
          </p>
        </div>
      </div>
    </div>
  );
}