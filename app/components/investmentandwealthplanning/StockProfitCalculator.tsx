"use client";

import { useState } from "react";
import { TrendingUp, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function StockProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [profit, setProfit] = useState<number | null>(null);
  const [profitPercent, setProfitPercent] = useState<number | null>(null);

  const calculateProfit = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const qty = parseFloat(quantity);

    if (isNaN(buy) || isNaN(sell) || isNaN(qty) || buy === 0) {
      setProfit(null);
      return;
    }

    const investment = buy * qty;
    const sellingValue = sell * qty;
    const netProfit = sellingValue - investment;
    const percent = (netProfit / investment) * 100;

    setProfit(parseFloat(netProfit.toFixed(2)));
    setProfitPercent(parseFloat(percent.toFixed(2)));
  };

  const tryExample = () => {
    setBuyPrice("500");
    setSellPrice("650");
    setQuantity("100");

    const investment = 500 * 100;
    const sellingValue = 650 * 100;
    const netProfit = sellingValue - investment;
    const percent = (netProfit / investment) * 100;

    setProfit(netProfit);
    setProfitPercent(parseFloat(percent.toFixed(2)));
  };

  const resetFields = () => {
    setBuyPrice("");
    setSellPrice("");
    setQuantity("");
    setProfit(null);
    setProfitPercent(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <TrendingUp className="text-green-600" />
        Stock Profit Calculator
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <input
          type="number"
          placeholder="Buy Price Per Share (₹)"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Sell Price Per Share (₹)"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Quantity of Shares"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">

        <button
          onClick={calculateProfit}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Calculator size={18} /> Calculate
        </button>

        <button
          onClick={tryExample}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <PlayCircle size={18} /> Try Example
        </button>

        <button
          onClick={resetFields}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Reset
        </button>

      </div>

      {profit !== null && (
        <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
          <p className="text-lg font-semibold">
            Net Profit / Loss: ₹ {profit}
          </p>
          <p className="text-2xl font-bold text-indigo-600">
            Profit Percentage: {profitPercent}%
          </p>
        </div>
      )}

    </div>
  );
}