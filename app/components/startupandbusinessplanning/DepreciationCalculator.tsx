"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle } from "lucide-react";

interface DepreciationRow {
  year: number;
  depreciation: number;
  bookValue: number;
}

export default function DepreciationCalculator() {
  const [assetCost, setAssetCost] = useState("");
  const [salvageValue, setSalvageValue] = useState("");
  const [usefulLife, setUsefulLife] = useState("");
  const [method, setMethod] = useState("slm");

  const [schedule, setSchedule] = useState<DepreciationRow[]>([]);

  const calculateDepreciation = () => {
    const cost = parseFloat(assetCost);
    const salvage = parseFloat(salvageValue);
    const life = parseFloat(usefulLife);

    if (!cost || !life) return;

    let rows: DepreciationRow[] = [];
    let bookValue = cost;

    if (method === "slm") {
      const annualDep = (cost - salvage) / life;

      for (let year = 1; year <= life; year++) {
        bookValue -= annualDep;
        rows.push({
          year,
          depreciation: annualDep,
          bookValue: bookValue > salvage ? bookValue : salvage,
        });
      }
    } else {
      const rate = 2 / life; // Double Declining Balance

      for (let year = 1; year <= life; year++) {
        const dep = bookValue * rate;
        bookValue -= dep;

        rows.push({
          year,
          depreciation: dep,
          bookValue: bookValue > salvage ? bookValue : salvage,
        });

        if (bookValue <= salvage) break;
      }
    }

    setSchedule(rows);
  };

  const tryExample = () => {
    setAssetCost("1000000");
    setSalvageValue("100000");
    setUsefulLife("5");
    setMethod("slm");
    setTimeout(() => calculateDepreciation(), 100);
  };

  const resetFields = () => {
    setAssetCost("");
    setSalvageValue("");
    setUsefulLife("");
    setMethod("slm");
    setSchedule([]);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Depreciation Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Asset Cost (₹)"
          value={assetCost}
          onChange={(e) => setAssetCost(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Salvage Value (₹)"
          value={salvageValue}
          onChange={(e) => setSalvageValue(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Useful Life (Years)"
          value={usefulLife}
          onChange={(e) => setUsefulLife(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="slm">Straight Line Method</option>
          <option value="dbm">Declining Balance Method</option>
        </select>

      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateDepreciation}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
          <Calculator size={18} />
          Calculate Depreciation
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

      {schedule.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Depreciation Schedule</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-2">Year</th>
                <th className="p-2">Depreciation</th>
                <th className="p-2">Book Value</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.year} className="border-t text-center">
                  <td className="p-2">{row.year}</td>
                  <td className="p-2">₹{row.depreciation.toFixed(2)}</td>
                  <td className="p-2">₹{row.bookValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">

        <h2 className="text-2xl font-bold">What is Depreciation?</h2>
        <p>
          Depreciation is the allocation of the cost of a tangible asset over its useful life.
          It helps businesses account for asset value reduction over time.
        </p>

        <h2 className="text-2xl font-bold">Depreciation Methods</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Straight Line Method (SLM)</li>
          <li>Declining Balance Method (DBM)</li>
        </ul>

        <h2 className="text-2xl font-bold">Why Use This Calculator?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Tax planning</li>
          <li>Asset valuation</li>
          <li>Accounting compliance</li>
          <li>Financial reporting</li>
        </ul>

      </div>

    </div>
  );
}