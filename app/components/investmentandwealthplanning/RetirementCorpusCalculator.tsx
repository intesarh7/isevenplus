"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function RetirementCorpusCalculator() {
    const [monthlyExpense, setMonthlyExpense] = useState<string>("");
    const [yearsToRetirement, setYearsToRetirement] = useState<string>("");
    const [retirementYears, setRetirementYears] = useState<string>("");
    const [inflation, setInflation] = useState<string>("");
    const [returnRate, setReturnRate] = useState<string>("");

    const [result, setResult] = useState<number | null>(null);

    const calculateCorpus = () => {
        const expense = parseFloat(monthlyExpense);
        const yrsToRet = parseFloat(yearsToRetirement);
        const yrsRet = parseFloat(retirementYears);
        const infl = parseFloat(inflation) / 100;
        const ret = parseFloat(returnRate) / 100;

        if (!expense || !yrsToRet || !yrsRet || !infl || !ret) return;

        const futureMonthlyExpense =
            expense * Math.pow(1 + infl, yrsToRet);

        const annualExpense = futureMonthlyExpense * 12;

        const corpus =
            (annualExpense *
                (1 - Math.pow(1 + ret, -yrsRet))) /
            ret;

        setResult(parseFloat(corpus.toFixed(0)));
    };

    const tryExample = () => {
        setMonthlyExpense("50000");
        setYearsToRetirement("25");
        setRetirementYears("25");
        setInflation("6");
        setReturnRate("8");
    };

    const resetFields = () => {
        setMonthlyExpense("");
        setYearsToRetirement("");
        setRetirementYears("");
        setInflation("");
        setReturnRate("");
        setResult(null);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Retirement Corpus Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Current Monthly Expense (₹)" value={monthlyExpense} onChange={setMonthlyExpense} />
                <Input label="Years to Retirement" value={yearsToRetirement} onChange={setYearsToRetirement} />
                <Input label="Years After Retirement" value={retirementYears} onChange={setRetirementYears} />
                <Input label="Expected Inflation Rate (%)" value={inflation} onChange={setInflation} />
                <Input label="Expected Return Rate (%)" value={returnRate} onChange={setReturnRate} />

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateCorpus}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Corpus
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
                        Required Retirement Corpus: ₹ {result.toLocaleString()}
                    </h3>
                </div>
            )}

            <div className="max-w-6xl mx-auto mt-16 px-2">

                <h2 className="text-3xl font-bold mb-6">
                    How Much Retirement Corpus Do You Need?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Retirement corpus is the total fund required to sustain your lifestyle
                    after you stop earning active income. The required amount depends on
                    inflation, life expectancy, and post-retirement returns.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why Inflation is Important
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    Inflation increases living costs every year. A retirement plan without
                    inflation adjustment may underestimate the required corpus significantly.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Retirement Corpus Formula
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The corpus is calculated using inflation-adjusted annual expenses and
                    an annuity-based financial formula to sustain income during retirement.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why Use iSevenPlus Retirement Corpus Calculator?
                </h3>

                <p className="text-gray-700 leading-7">
                    Our calculator gives an accurate estimate of the required retirement fund
                    in seconds, helping you plan investments efficiently for a financially
                    secure future.
                </p>

            </div>

        </div>
    );
}

type InputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function Input({ label, value, onChange }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value)
                }
                className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
        </div>
    );
}