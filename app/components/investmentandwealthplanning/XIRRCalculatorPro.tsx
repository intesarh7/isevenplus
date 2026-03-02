"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw, Plus } from "lucide-react";

type Cashflow = {
    date: string;
    amount: string;
};

export default function XIRRCalculatorPro() {
    const [cashflows, setCashflows] = useState<Cashflow[]>([
        { date: "", amount: "" },
        { date: "", amount: "" },
    ]);

    const [result, setResult] = useState<number | null>(null);

    const handleChange = (
        index: number,
        field: keyof Cashflow,
        value: string
    ) => {
        const updated = [...cashflows];
        updated[index][field] = value;
        setCashflows(updated);
    };

    const addRow = () => {
        setCashflows([...cashflows, { date: "", amount: "" }]);
    };

    const calculateXIRR = () => {
        const flows = cashflows
            .map((cf) => ({
                date: new Date(cf.date),
                amount: parseFloat(cf.amount),
            }))
            .filter((cf) => !isNaN(cf.amount) && cf.date.toString() !== "Invalid Date");

        if (flows.length < 2) return;

        const firstDate = flows[0].date;

        const days = flows.map(
            (cf) => (cf.date.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        const amounts = flows.map((cf) => cf.amount);

        const xirr = (guess = 0.1) => {
            let rate = guess;
            for (let i = 0; i < 100; i++) {
                let f = 0;
                let df = 0;

                for (let j = 0; j < amounts.length; j++) {
                    const t = days[j] / 365;
                    f += amounts[j] / Math.pow(1 + rate, t);
                    df -=
                        (t * amounts[j]) /
                        Math.pow(1 + rate, t + 1);
                }

                const newRate = rate - f / df;
                if (Math.abs(newRate - rate) < 1e-6) return newRate;
                rate = newRate;
            }
            return rate;
        };

        const rate = xirr();
        setResult(parseFloat((rate * 100).toFixed(2)));
    };

    const tryExample = () => {
        setCashflows([
            { date: "2020-01-01", amount: "-100000" },
            { date: "2021-01-01", amount: "-100000" },
            { date: "2023-01-01", amount: "300000" },
        ]);
    };

    const resetFields = () => {
        setCashflows([
            { date: "", amount: "" },
            { date: "", amount: "" },
        ]);
        setResult(null);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                XIRR Calculator (Pro Level)
            </h2>

            <div className="space-y-6">
                {cashflows.map((cf, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <input
                                type="date"
                                value={cf.date}
                                onChange={(e) =>
                                    handleChange(index, "date", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 mt-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Cashflow Amount (₹)
                            </label>
                            <input
                                type="number"
                                value={cf.amount}
                                onChange={(e) =>
                                    handleChange(index, "amount", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 mt-2"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addRow}
                className="mt-6 flex items-center gap-2 text-indigo-600 font-medium"
            >
                <Plus size={16} /> Add Cashflow
            </button>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateXIRR}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate XIRR
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

            {result !== null && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl text-center">
                    <h3 className="text-2xl font-bold">
                        Annualized Return (XIRR): {result}%
                    </h3>
                </div>
            )}

            {/* SEO CONTENT SECTION */}
            <div className="max-w-7xl mx-auto mt-16 px-2">

                <h2 className="text-3xl font-bold mb-6">
                    XIRR Calculator – Calculate Accurate Annualized Investment Returns
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    XIRR (Extended Internal Rate of Return) is a powerful financial metric
                    used to calculate annualized returns for investments with irregular cashflows.
                    Unlike CAGR, which assumes a single investment and fixed time period,
                    XIRR accounts for multiple investments made on different dates.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    What is XIRR?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    XIRR calculates the annual rate of return for investments where cashflows
                    occur at irregular intervals. It is widely used for:
                </p>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Mutual fund SIP return calculation</li>
                    <li>Stock portfolio analysis</li>
                    <li>Real estate cashflow return</li>
                    <li>Private equity investments</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">
                    XIRR vs CAGR – What’s the Difference?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    CAGR works when you invest once and withdraw once. XIRR works when you
                    invest multiple times and withdraw at different dates. For SIP investors,
                    XIRR provides the most accurate measure of performance.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    How XIRR is Calculated
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    XIRR is calculated using an iterative financial formula that solves
                    for the discount rate where the net present value (NPV) of all cashflows equals zero.
                    It uses the time difference between each investment and redemption date.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why Use iSevenPlus XIRR Calculator?
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Handles multiple irregular cashflows</li>
                    <li>Accurate annualized return calculation</li>
                    <li>Useful for SIP and lump sum investments</li>
                    <li>Professional-grade financial logic</li>
                    <li>Instant result with easy-to-use interface</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">
                    Frequently Asked Questions (FAQs)
                </h3>

                <div className="space-y-6 text-gray-700">

                    <div>
                        <p className="font-semibold">
                            Is XIRR better than CAGR?
                        </p>
                        <p>
                            Yes, for investments involving multiple cashflows such as SIPs
                            or staggered investments, XIRR provides more accurate returns.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Can XIRR be negative?
                        </p>
                        <p>
                            Yes, if the investment has generated losses, XIRR will show a negative return.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Why is XIRR important for mutual fund investors?
                        </p>
                        <p>
                            Since SIP investments happen monthly, returns are not uniform.
                            XIRR captures real performance based on actual investment dates.
                        </p>
                    </div>

                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">
                    Make Data-Driven Investment Decisions
                </h3>

                <p className="text-gray-700 leading-7">
                    With the iSevenPlus Pro XIRR Calculator, investors can analyze their
                    true investment performance and make informed financial decisions.
                    Whether you invest in SIPs, stocks, or real estate, XIRR gives a
                    realistic annualized return percentage.
                </p>

            </div>

        </div>
    );
}