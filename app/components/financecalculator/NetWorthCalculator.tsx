"use client";
import { useState } from "react";
import { Wallet, Calculator, TrendingUp, CheckCircle, AlertTriangle, Settings, Sparkles, Lightbulb, HelpCircle } from "lucide-react";
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
        <div className="bg-white shadow-xl rounded-2xl p-6">
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
            <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

                {/* 🔷 INTRO */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
                        <Wallet className="text-indigo-600" size={22} />
                        What is Net Worth?
                    </h2>

                    <p className="mt-4 text-sm md:text-base">
                        <strong>Net Worth</strong> is a measure of your financial health. It represents the difference between your total assets and total liabilities. In simple terms, it shows how much you own versus how much you owe.
                    </p>

                    <p className="mt-3 text-sm md:text-base">
                        Your net worth can be positive or negative. A positive net worth means your assets exceed your liabilities, while a negative net worth indicates that your debts are higher than your assets.
                    </p>

                    <p className="mt-3 text-sm md:text-base">
                        Our <strong>Net Worth Calculator</strong> helps you calculate your financial position instantly and track your wealth growth over time.
                    </p>
                </div>

                {/* 🔷 FORMULA */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Calculator className="text-indigo-600" size={20} />
                        Net Worth Formula
                    </h3>

                    <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
                        Net Worth = Total Assets − Total Liabilities
                    </div>

                    <p className="mt-3 text-sm md:text-base">
                        Assets include everything you own, while liabilities include everything you owe. This simple formula provides a clear snapshot of your financial status.
                    </p>
                </div>

                {/* 🔷 ASSETS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="text-indigo-600" size={20} />
                        What Are Assets?
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        Assets are valuable items or investments that you own. These contribute positively to your net worth.
                    </p>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Cash and bank balance
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Investments (stocks, mutual funds, bonds)
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Real estate property
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Vehicles and valuable assets
                        </li>
                    </ul>
                </div>

                {/* 🔷 LIABILITIES */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={20} />
                        What Are Liabilities?
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        Liabilities are financial obligations or debts that reduce your net worth.
                    </p>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Home loans or mortgages
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Credit card debt
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Personal or education loans
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Other outstanding liabilities
                        </li>
                    </ul>
                </div>

                {/* 🔷 HOW TOOL WORKS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Settings className="text-purple-600" size={20} />
                        How to Use Net Worth Calculator?
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Enter total value of your assets
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Enter total liabilities or debts
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Click Calculate
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Get your net worth instantly
                        </li>
                    </ul>
                </div>

                {/* 🔷 BENEFITS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="text-pink-600" size={20} />
                        Benefits of Tracking Net Worth
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Understand your financial health clearly
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Track progress toward financial goals
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Identify areas to reduce debt
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Improve wealth-building strategies
                        </li>
                    </ul>
                </div>

                {/* 🔷 EXAMPLE */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="text-indigo-600" size={20} />
                        Example Net Worth Calculation
                    </h3>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4 space-y-2 text-sm md:text-base">
                        <p>Total Assets = ₹20,00,000</p>
                        <p>Total Liabilities = ₹8,00,000</p>
                        <p><strong>Net Worth = ₹12,00,000</strong></p>
                    </div>

                    <p className="mt-3 text-sm md:text-base">
                        This means your financial position is positive, and you are building wealth over time.
                    </p>
                </div>

                {/* 🔷 TIPS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" size={20} />
                        Tips to Increase Your Net Worth
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Increase your savings and investments
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Reduce high-interest debts
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Invest in appreciating assets
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Track your finances regularly
                        </li>
                    </ul>
                </div>

                {/* 🔷 SEO TEXT */}
                <div>
                    <p className="text-sm md:text-base">
                        Our <strong>Net Worth Calculator</strong> is one of the best tools to calculate your
                        <strong>personal net worth</strong>, track financial growth, and improve wealth management.
                        Whether you are planning for retirement, investments, or debt reduction, this tool helps you make smarter financial decisions.
                    </p>
                </div>

                {/* 🔷 FAQ */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <HelpCircle className="text-indigo-600" size={20} />
                        Frequently Asked Questions
                    </h3>

                    <div className="mt-4 space-y-5 text-sm md:text-base">

                        <div>
                            <h4 className="font-semibold">
                                1. What is a good net worth?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                It depends on age, income, and financial goals.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                2. Can net worth be negative?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Yes, if liabilities exceed assets.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                3. How often should I calculate net worth?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Ideally once every few months to track progress.
                            </p>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    );
}