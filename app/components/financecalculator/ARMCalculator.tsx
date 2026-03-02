"use client";
import { useState } from "react";

export default function ARMCalculator() {
    const [loan, setLoan] = useState("");
    const [initialRate, setInitialRate] = useState("");
    const [adjustedRate, setAdjustedRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<any>(null);

    const emi = (P: number, r: number, n: number) =>
        (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const calculate = () => {
        const P = parseFloat(loan);
        const r1 = parseFloat(initialRate) / 100 / 12;
        const r2 = parseFloat(adjustedRate) / 100 / 12;
        const n = parseFloat(years) * 12;
        if (!P || !r1 || !r2 || !n) return;

        setResult({
            initial: emi(P, r1, n).toFixed(2),
            adjusted: emi(P, r2, n).toFixed(2),
        });
    };

    const loadExample = () => {
        setLoan("300000");
        setInitialRate("5");
        setAdjustedRate("7");
        setYears("30");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">
                ARM Calculator
            </h2>

            <div className="space-y-4">
                <input type="number" placeholder="Loan Amount ($)"
                    value={loan} onChange={(e) => setLoan(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Initial Interest Rate (%)"
                    value={initialRate} onChange={(e) => setInitialRate(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Adjusted Rate (%)"
                    value={adjustedRate} onChange={(e) => setAdjustedRate(e.target.value)}
                    className="w-full border p-3 rounded-lg" />

                <input type="number" placeholder="Loan Term (Years)"
                    value={years} onChange={(e) => setYears(e.target.value)}
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
                    <p>Initial EMI: ${result.initial}</p>
                    <p>Adjusted EMI: ${result.adjusted}</p>
                </div>
            )}

            {/* ✅ SEO CONTENT SECTION */}
            <div className="mt-10 border-t pt-6 text-sm text-gray-700 leading-6 space-y-4">
                <h3 className="text-lg font-semibold">
                    What is an ARM (Adjustable Rate Mortgage)?
                </h3>
                <p>
                    An Adjustable Rate Mortgage (ARM) is a type of home loan where the
                    interest rate changes periodically after an initial fixed-rate period.
                    Unlike a fixed-rate mortgage, your monthly EMI can increase or decrease
                    depending on market interest rates.
                </p>

                <h3 className="text-lg font-semibold">
                    How ARM Mortgage Payments Change
                </h3>
                <p>
                    ARM loans usually start with a lower introductory interest rate for a
                    fixed number of years (for example, 5/1 ARM or 7/1 ARM). After that
                    period ends, the interest rate adjusts annually based on a benchmark
                    index plus a margin.
                </p>
                <p className="font-mono">
                    EMI = P × r × (1+r)^n / ((1+r)^n − 1)
                </p>
                <p>
                    Where P = Loan Amount, r = Monthly Interest Rate,
                    and n = Total Number of Payments.
                </p>

                <h3 className="text-lg font-semibold">
                    Example of ARM Rate Adjustment
                </h3>
                <p>
                    Suppose you take a $300,000 mortgage at 5% initial rate for 30 years.
                    If the rate later adjusts to 7%, your monthly EMI can increase
                    significantly. This calculator helps compare the initial payment and
                    adjusted payment side by side.
                </p>

                <h3 className="text-lg font-semibold">
                    Pros and Cons of Adjustable Rate Mortgages
                </h3>
                <p>
                    ARMs can be beneficial if you plan to sell or refinance before the
                    adjustment period. However, they carry the risk of rising interest rates,
                    which can increase your monthly housing costs over time.
                </p>

                <h3 className="text-lg font-semibold">
                    When Should You Choose an ARM?
                </h3>
                <p>
                    An ARM may be suitable if you expect interest rates to fall,
                    plan to move within a few years, or want lower initial payments.
                    Always compare ARM vs fixed-rate mortgage before making a decision.
                </p>
            </div>
        </div>
    );
}