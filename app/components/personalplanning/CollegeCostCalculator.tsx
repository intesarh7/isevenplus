"use client";
import { useState } from "react";

export default function CollegeCostCalculator() {
    const [tuition, setTuition] = useState("");
    const [years, setYears] = useState("");
    const [inflation, setInflation] = useState("5");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const cost = parseFloat(tuition);
        const yr = parseFloat(years);
        const r = parseFloat(inflation) / 100;
        if (!cost || !yr) return;

        let total = 0;
        for (let i = 0; i < yr; i++) {
            total += cost * Math.pow(1 + r, i);
        }

        setResult({ total: total.toFixed(2) });
    };

    const loadExample = () => {
        setTuition("20000");
        setYears("4");
        setInflation("5");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">
                College Cost Calculator
            </h2>

            <div className="space-y-4">
                <input type="number" placeholder="Annual Tuition ($)"
                    value={tuition} onChange={(e) => setTuition(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Years of Study"
                    value={years} onChange={(e) => setYears(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Inflation Rate (%)"
                    value={inflation} onChange={(e) => setInflation(e.target.value)}
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
                    <p>Total Estimated Cost: ${result.total}</p>
                </div>
            )}

            {/* ✅ SEO CONTENT SECTION */}
            <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6 space-y-4">
                <h3 className="text-lg font-semibold">
                    What is a College Cost Calculator?
                </h3>
                <p>
                    A College Cost Calculator helps students and parents estimate the total
                    cost of higher education over multiple years. It considers annual tuition,
                    number of study years, and expected inflation rate to calculate the future
                    total education expense.
                </p>

                <h3 className="text-lg font-semibold">
                    Why College Costs Increase Every Year
                </h3>
                <p>
                    College tuition typically increases due to inflation, administrative
                    expenses, infrastructure development, and rising demand for higher
                    education. On average, education inflation ranges between 4% to 8%
                    annually in many countries.
                </p>

                <h3 className="text-lg font-semibold">
                    How the Calculation Works
                </h3>
                <p>
                    This calculator uses compound inflation growth to estimate future
                    tuition costs:
                </p>
                <p className="font-mono">
                    Future Cost = Current Tuition × (1 + Inflation Rate)<sup>n</sup>
                </p>
                <p>
                    Where <strong>n</strong> is the number of years. The total estimated cost
                    is calculated by adding each year's inflated tuition amount.
                </p>

                <h3 className="text-lg font-semibold">
                    Example Calculation
                </h3>
                <p>
                    If annual tuition is $20,000 for 4 years and education inflation is 5%,
                    the total estimated college cost will be significantly higher than
                    $80,000 due to compounding increases each year.
                </p>

                <h3 className="text-lg font-semibold">
                    How to Plan for College Expenses
                </h3>
                <p>
                    Start saving early through education savings plans, SIP investments,
                    or dedicated college funds. The earlier you begin planning, the lower
                    the financial burden during admission time.
                </p>

                <h3 className="text-lg font-semibold">
                    Who Should Use This Calculator?
                </h3>
                <p>
                    This tool is useful for parents planning their child’s education,
                    students preparing for university expenses, and financial planners
                    estimating long-term education budgets.
                </p>
            </div>
        </div>
    );
}