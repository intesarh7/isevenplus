"use client";

import { useState } from "react";
import { RotateCcw, PlayCircle, DollarSign, Calculator, BarChart3, CheckCircle, TrendingUp, Sparkles, Lightbulb, HelpCircle  } from "lucide-react";

export default function AdsenseRevenueCalculator() {
    const [pageViews, setPageViews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateRevenue = () => {
        const views = parseFloat(pageViews);
        const clickRate = parseFloat(ctr);
        const costPerClick = parseFloat(cpc);

        if (!views || !clickRate || !costPerClick) {
            setResult(null);
            return;
        }

        const revenue = (views * (clickRate / 100)) * costPerClick;
        setResult(parseFloat(revenue.toFixed(2)));
    };

    const tryExample = () => {
        setPageViews("10000");
        setCtr("2");
        setCpc("10");
        setResult(2000);
    };

    const resetFields = () => {
        setPageViews("");
        setCtr("");
        setCpc("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <DollarSign className="text-green-600" />
                AdSense Revenue Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Monthly Page Views
                    </label>
                    <input
                        type="number"
                        value={pageViews}
                        onChange={(e) => setPageViews(e.target.value)}
                        placeholder="Enter page views"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Average CTR (%)
                    </label>
                    <input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(e.target.value)}
                        placeholder="Enter CTR percentage"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium mb-2">
                        Average CPC (₹)
                    </label>
                    <input
                        type="number"
                        value={cpc}
                        onChange={(e) => setCpc(e.target.value)}
                        placeholder="Enter CPC"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateRevenue}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <Calculator size={18} />
                    Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>
            </div>

            {/* Result */}
            {result !== null && (
                <div className="mt-8 bg-indigo-50 p-5 rounded-lg text-center">
                    <p className="text-lg font-semibold">
                        Estimated Monthly Revenue
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <section className="mt-16 space-y-10 text-gray-700 leading-relaxed">

                {/* 🔷 INTRO */}
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                        <DollarSign className="text-green-600" size={22} />
                        How AdSense Revenue is Calculated?
                    </h2>

                    <p className="mt-4 text-sm md:text-base">
                        Google AdSense revenue is calculated based on multiple factors including
                        <strong> page views, click-through rate (CTR), and cost per click (CPC)</strong>.
                        These metrics determine how much money you earn from displaying ads on your website or blog.
                    </p>

                    <p className="mt-3 text-sm md:text-base">
                        Whether you are a beginner blogger or an experienced publisher, understanding how AdSense earnings work
                        is essential for increasing your revenue. Our <strong>AdSense Revenue Calculator</strong> helps you estimate
                        your potential income quickly and accurately.
                    </p>
                </div>

                {/* 🔷 FORMULA */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Calculator className="text-indigo-600" size={20} />
                        AdSense Revenue Formula
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        The basic formula used to calculate AdSense earnings is:
                    </p>

                    <div className="bg-gray-50 border rounded-xl p-4 text-center font-semibold mt-4">
                        Revenue = Page Views × (CTR ÷ 100) × CPC
                    </div>

                    <p className="mt-3 text-sm md:text-base">
                        This formula gives you an estimate of how much you can earn based on your website traffic and ad performance.
                    </p>
                </div>

                {/* 🔷 FACTORS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <BarChart3 className="text-indigo-600" size={20} />
                        Key Factors That Affect AdSense Earnings
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            <span><strong>Page Views:</strong> More traffic means more earning potential.</span>
                        </li>

                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            <span><strong>CTR (Click Through Rate):</strong> Percentage of users clicking ads.</span>
                        </li>

                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            <span><strong>CPC (Cost Per Click):</strong> Amount advertisers pay per click.</span>
                        </li>

                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            <span><strong>Niche:</strong> Finance, insurance, and tech niches have higher CPC.</span>
                        </li>
                    </ul>
                </div>

                {/* 🔷 EXAMPLE */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="text-indigo-600" size={20} />
                        Example AdSense Earnings Calculation
                    </h3>

                    <p className="mt-3 text-sm md:text-base">
                        Suppose your website gets <strong>10,000 page views</strong> per day with a CTR of
                        <strong> 2%</strong> and an average CPC of <strong>$0.20</strong>.
                    </p>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4 space-y-2 text-sm md:text-base">
                        <p>Estimated Clicks = 200</p>
                        <p>Estimated Earnings = $40/day</p>
                        <p>Monthly Earnings ≈ $1,200</p>
                    </div>
                </div>

                {/* 🔷 BENEFITS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="text-pink-600" size={20} />
                        Why Use AdSense Revenue Calculator?
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Estimate your potential income easily
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Plan your blogging and SEO strategy
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Understand how traffic affects earnings
                        </li>
                    </ul>
                </div>

                {/* 🔷 TIPS */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" size={20} />
                        Tips to Increase AdSense Earnings
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm md:text-base">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Improve website traffic with SEO
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Target high CPC keywords (finance, loans, insurance)
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Optimize ad placement for better CTR
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1" />
                            Improve content quality and engagement
                        </li>
                    </ul>
                </div>

                {/* 🔷 SEO PARAGRAPH */}
                <div>
                    <p className="text-sm md:text-base">
                        Our <strong>AdSense Revenue Calculator</strong> is one of the best tools to estimate
                        your online earning potential. Whether you are running a blog, niche site, or tool-based website,
                        this calculator helps you understand how much you can earn from Google AdSense.
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
                                1. How much can I earn from AdSense?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Earnings depend on traffic, niche, CTR, and CPC. High traffic + high CPC = more revenue.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                2. Which niche has highest CPC?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                Finance, insurance, loans, and technology niches usually have the highest CPC.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">
                                3. Is this calculator accurate?
                            </h4>
                            <p className="text-gray-600 mt-1">
                                It provides an estimate based on input values and industry averages.
                            </p>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    );
}