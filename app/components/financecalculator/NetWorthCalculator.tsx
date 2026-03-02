"use client";
import { useState } from "react";

export default function NetWorthCalculator() {
    const [assets, setAssets] = useState("");
    const [liabilities, setLiabilities] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const a = parseFloat(assets);
        const l = parseFloat(liabilities);
        if (!a || !l) return;
        setResult({ net: (a - l).toFixed(2) });
    };

    const loadExample = () => {
        setAssets("150000");
        setLiabilities("50000");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">
                Net Worth Calculator
            </h2>

            <div className="space-y-4">
                <input type="number" placeholder="Total Assets ($)"
                    value={assets} onChange={(e) => setAssets(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Total Liabilities ($)"
                    value={liabilities} onChange={(e) => setLiabilities(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <button onClick={calculate}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
                    Calculate
                </button>

                <button onClick={loadExample}
                    className="w-full bg-gray-200 p-3 rounded-lg">
                    Try Example
                </button>
            </div>

            {result && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
                    <p>Your Net Worth: ${result.net}</p>
                </div>
            )}

            {/* ✅ SEO CONTENT SECTION */}
            <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6 space-y-4">
                <h3 className="text-lg font-semibold">
                    What is Net Worth?
                </h3>
                <p>
                    Net worth represents your overall financial position. It is calculated
                    by subtracting your total liabilities (debts) from your total assets
                    (everything you own).
                </p>

                <h3 className="text-lg font-semibold">
                    Net Worth Formula
                </h3>
                <p className="font-mono">
                    Net Worth = Total Assets − Total Liabilities
                </p>
                <p>
                    Assets may include cash, savings, investments, real estate, vehicles,
                    retirement accounts, and business ownership. Liabilities include loans,
                    credit card balances, mortgages, and other outstanding debts.
                </p>

                <h3 className="text-lg font-semibold">
                    Why Tracking Net Worth is Important
                </h3>
                <p>
                    Monitoring your net worth helps you understand your financial growth
                    over time. It shows whether you are building wealth or accumulating
                    more debt. Financial advisors often use net worth as a key indicator
                    of long-term financial health.
                </p>

                <h3 className="text-lg font-semibold">
                    Example Calculation
                </h3>
                <p>
                    If your total assets are $150,000 and total liabilities are $50,000,
                    your net worth would be $100,000. A positive net worth indicates
                    financial stability, while a negative net worth means debts exceed assets.
                </p>

                <h3 className="text-lg font-semibold">
                    How to Improve Your Net Worth
                </h3>
                <p>
                    You can increase your net worth by reducing high-interest debt,
                    investing consistently, building emergency savings, and growing
                    income sources. Long-term disciplined financial planning plays a
                    crucial role in wealth creation.
                </p>

                <h3 className="text-lg font-semibold">
                    Who Should Use This Calculator?
                </h3>
                <p>
                    Anyone interested in personal finance, wealth tracking, retirement
                    planning, or financial independence can use this calculator to
                    evaluate their current financial standing.
                </p>
            </div>
        </div>
    );
}