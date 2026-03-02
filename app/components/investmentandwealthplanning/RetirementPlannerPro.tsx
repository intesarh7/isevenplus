"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function RetirementPlannerPro() {
    const [currentAge, setCurrentAge] = useState<string>("");
    const [retirementAge, setRetirementAge] = useState<string>("");
    const [lifeExpectancy, setLifeExpectancy] = useState<string>("");
    const [monthlyExpense, setMonthlyExpense] = useState<string>("");
    const [inflation, setInflation] = useState<string>("");
    const [returnRate, setReturnRate] = useState<string>("");
    const [existingSavings, setExistingSavings] = useState<string>("");

    const [result, setResult] = useState<any>(null);

    const calculateRetirement = () => {
        const age = parseFloat(currentAge);
        const retireAge = parseFloat(retirementAge);
        const life = parseFloat(lifeExpectancy);
        const expense = parseFloat(monthlyExpense);
        const infl = parseFloat(inflation) / 100;
        const ret = parseFloat(returnRate) / 100;
        const savings = parseFloat(existingSavings);

        if (!age || !retireAge || !life || !expense || !infl || !ret) return;

        const yearsToRetirement = retireAge - age;
        const retirementYears = life - retireAge;

        // Inflate expense till retirement
        const futureMonthlyExpense =
            expense * Math.pow(1 + infl, yearsToRetirement);

        const annualExpense = futureMonthlyExpense * 12;

        // Required corpus (simplified annuity formula)
        const corpus =
            (annualExpense *
                (1 - Math.pow(1 + ret, -retirementYears))) /
            ret;

        // Future value of existing savings
        const futureSavings =
            savings * Math.pow(1 + ret, yearsToRetirement);

        const gap = corpus - futureSavings;

        setResult({
            futureExpense: futureMonthlyExpense.toFixed(0),
            corpus: corpus.toFixed(0),
            futureSavings: futureSavings.toFixed(0),
            gap: gap.toFixed(0),
        });
    };

    const tryExample = () => {
        setCurrentAge("30");
        setRetirementAge("60");
        setLifeExpectancy("85");
        setMonthlyExpense("50000");
        setInflation("6");
        setReturnRate("10");
        setExistingSavings("1000000");
    };

    const resetFields = () => {
        setCurrentAge("");
        setRetirementAge("");
        setLifeExpectancy("");
        setMonthlyExpense("");
        setInflation("");
        setReturnRate("");
        setExistingSavings("");
        setResult(null);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Complete Retirement Planner (Pro)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Current Age" value={currentAge} onChange={setCurrentAge} />
                <Input label="Retirement Age" value={retirementAge} onChange={setRetirementAge} />
                <Input label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} />
                <Input label="Current Monthly Expense (₹)" value={monthlyExpense} onChange={setMonthlyExpense} />
                <Input label="Expected Inflation Rate (%)" value={inflation} onChange={setInflation} />
                <Input label="Expected Return Rate (%)" value={returnRate} onChange={setReturnRate} />
                <Input label="Existing Savings (₹)" value={existingSavings} onChange={setExistingSavings} />

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateRetirement}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Plan
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

            {result && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Retirement Summary</h3>

                    <p>Future Monthly Expense at Retirement: ₹ {Number(result.futureExpense).toLocaleString()}</p>
                    <p>Required Retirement Corpus: ₹ {Number(result.corpus).toLocaleString()}</p>
                    <p>Future Value of Existing Savings: ₹ {Number(result.futureSavings).toLocaleString()}</p>
                    <p className={`font-bold text-lg ${Number(result.gap) > 0 ? "text-red-600" : "text-green-600"}`}>
                        Retirement Gap: ₹ {Number(result.gap).toLocaleString()}
                    </p>
                </div>
            )}

            {/* SEO CONTENT SECTION */}
            <div className="max-w-7xl mx-auto mt-16 px-2">

                <h2 className="text-3xl font-bold mb-6">
                    Complete Retirement Planning Guide – Calculate Your Retirement Corpus Smartly
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    Retirement planning is one of the most important financial decisions in life.
                    A proper retirement plan ensures that you can maintain your lifestyle
                    even after your regular income stops. The iSevenPlus Complete Retirement
                    Planner (Pro) helps you calculate the retirement corpus required by
                    considering inflation, life expectancy, expected returns, and existing savings.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    What is Retirement Corpus?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    Retirement corpus is the total amount of money you need to accumulate
                    before retirement to sustain your lifestyle throughout your retirement years.
                    It covers living expenses, medical costs, emergencies, and lifestyle needs
                    without depending on active income.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why Inflation Matters in Retirement Planning?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    Inflation reduces the purchasing power of money over time. A monthly expense
                    of ₹50,000 today may require more than ₹1,00,000 in the next 20–30 years.
                    That’s why retirement planning must include inflation-adjusted expense projections.
                    Our calculator automatically adjusts your future expenses based on expected inflation rate.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    How Retirement Corpus is Calculated
                </h3>

                <p className="text-gray-700 leading-7 mb-4">
                    The retirement planner uses three major financial calculations:
                </p>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Future value of monthly expenses adjusted for inflation</li>
                    <li>Total retirement duration (life expectancy – retirement age)</li>
                    <li>Annuity-based corpus calculation using expected return rate</li>
                </ul>

                <p className="text-gray-700 leading-7 mb-6">
                    It also calculates the future value of your existing savings and identifies
                    the retirement gap — the additional amount you need to accumulate before retirement.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    How Much Retirement Corpus Do You Need in India?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The required retirement corpus depends on lifestyle, inflation, healthcare costs,
                    and post-retirement return expectations. In India, many financial planners
                    recommend building a corpus that can generate enough passive income to cover
                    20–30 years of retirement expenses.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Benefits of Using iSevenPlus Retirement Planner Pro
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Inflation-adjusted retirement expense projection</li>
                    <li>Future value calculation of existing savings</li>
                    <li>Retirement gap analysis</li>
                    <li>Easy-to-use professional interface</li>
                    <li>Instant calculation with accurate financial formulas</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">
                    Frequently Asked Questions (FAQs)
                </h3>

                <div className="space-y-6 text-gray-700">

                    <div>
                        <p className="font-semibold">
                            When should I start retirement planning?
                        </p>
                        <p>
                            The earlier you start, the better. Starting in your 20s or 30s
                            gives compounding more time to grow your investments.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            What is a safe return rate for retirement planning?
                        </p>
                        <p>
                            A conservative expected return of 8%–10% annually is commonly
                            used for long-term retirement projections.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            How can I reduce my retirement gap?
                        </p>
                        <p>
                            Increase investments, start SIP early, invest in diversified
                            equity funds, and regularly review your financial plan.
                        </p>
                    </div>

                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">
                    Plan Your Retirement with Confidence
                </h3>

                <p className="text-gray-700 leading-7">
                    The iSevenPlus Complete Retirement Planner (Pro) empowers you to take control
                    of your financial future. By understanding inflation impact, investment returns,
                    and retirement gap, you can build a strong financial foundation for a stress-free retirement.
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