"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function StepUpSIPCalculator() {
    const [monthlySip, setMonthlySip] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [stepUp, setStepUp] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateSIP = () => {
        const P = parseFloat(monthlySip);
        const r = parseFloat(rate) / 100 / 12;
        const t = parseFloat(years);
        const step = parseFloat(stepUp) / 100;

        if (!P || !r || !t || step < 0) return;

        let totalInvestment = 0;
        let futureValue = 0;
        let currentSip = P;

        for (let year = 1; year <= t; year++) {
            for (let month = 1; month <= 12; month++) {
                futureValue = (futureValue + currentSip) * (1 + r);
                totalInvestment += currentSip;
            }
            currentSip = currentSip * (1 + step);
        }

        setResult({
            invested: totalInvestment.toFixed(0),
            value: futureValue.toFixed(0),
            returns: (futureValue - totalInvestment).toFixed(0),
        });
    };

    const tryExample = () => {
        setMonthlySip("5000");
        setRate("12");
        setYears("10");
        setStepUp("10");
    };

    const resetFields = () => {
        setMonthlySip("");
        setRate("");
        setYears("");
        setStepUp("");
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Step-Up SIP Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">
                        Monthly SIP Amount (₹)
                    </label>
                    <input
                        type="number"
                        value={monthlySip}
                        onChange={(e) => setMonthlySip(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter monthly investment"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Expected Annual Return (%)
                    </label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter return rate"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Investment Duration (Years)
                    </label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter years"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Annual Step-Up (% Increase in SIP)
                    </label>
                    <input
                        type="number"
                        value={stepUp}
                        onChange={(e) => setStepUp(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter step-up %"
                    />
                </div>

            </div>

            {/* BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateSIP}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Check Returns
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
                    <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>

                    <div className="space-y-2 text-gray-800">
                        <p>Total Investment: ₹ {Number(result.invested).toLocaleString()}</p>
                        <p>Total Returns: ₹ {Number(result.returns).toLocaleString()}</p>
                        <p className="font-bold text-lg">
                            Future Value: ₹ {Number(result.value).toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
            {/* SEO CONTENT SECTION */}
            <div className="max-w-5xl mx-auto mt-14 px-2">

                <h2 className="text-2xl font-bold mb-4">
                    What is a Step-Up SIP?
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    A Step-Up SIP (Systematic Investment Plan) allows you to increase your SIP
                    amount every year by a fixed percentage. Instead of investing the same
                    amount throughout the investment period, you gradually increase your
                    contribution as your income grows. This strategy helps build wealth faster
                    through the power of compounding and disciplined investing.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    How Does Step-Up SIP Work?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    In a regular SIP, you invest a fixed amount every month. In a Step-Up SIP,
                    your monthly investment increases annually by a predefined percentage.
                    For example, if you start with ₹5,000 per month and choose a 10% annual
                    step-up, your SIP will increase to ₹5,500 next year, ₹6,050 the following year,
                    and so on.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Step-Up SIP Formula
                </h3>

                <p className="text-gray-700 mb-6">
                    The future value of Step-Up SIP is calculated using compound interest where
                    each year's increased investment grows over time. The calculation considers:
                </p>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Monthly Investment Amount</li>
                    <li>Expected Annual Return Rate</li>
                    <li>Investment Duration</li>
                    <li>Annual Step-Up Percentage</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Benefits of Step-Up SIP
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Accelerated wealth creation</li>
                    <li>Better utilization of rising income</li>
                    <li>Higher corpus compared to regular SIP</li>
                    <li>Improved financial discipline</li>
                    <li>Long-term compounding advantage</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">
                    Why Use iSevenPlus Step-Up SIP Calculator?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    Our Step-Up SIP Calculator helps you estimate your future investment value
                    instantly. It shows total invested amount, total returns earned, and final
                    wealth accumulated. This tool is ideal for retirement planning, long-term
                    goals, child education planning, and financial growth strategies.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                    Frequently Asked Questions (FAQs)
                </h3>

                <div className="space-y-4 text-gray-700">

                    <div>
                        <p className="font-semibold">
                            Is Step-Up SIP better than regular SIP?
                        </p>
                        <p>
                            Yes, if your income increases annually, a Step-Up SIP can significantly
                            increase your final investment corpus compared to a fixed SIP.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            What is a good step-up percentage?
                        </p>
                        <p>
                            A 5% to 15% annual increase is commonly recommended, depending on
                            your salary growth and financial capacity.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Can I change my step-up percentage later?
                        </p>
                        <p>
                            Yes, most mutual fund platforms allow you to modify your SIP amount
                            and step-up percentage.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}