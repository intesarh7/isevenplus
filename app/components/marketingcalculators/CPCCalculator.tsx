"use client";

import { useState } from "react";
import { Calculator, RotateCcw, PlayCircle, Rocket, CheckCircle, Globe, Lightbulb, Target, BarChart3, TrendingUp, DollarSign } from "lucide-react";

export default function CPCCalculator() {
    const [totalCost, setTotalCost] = useState("");
    const [totalClicks, setTotalClicks] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateCPC = () => {
        const cost = parseFloat(totalCost);
        const clicks = parseFloat(totalClicks);

        if (!cost || !clicks || clicks === 0) {
            setResult(null);
            return;
        }

        const cpc = cost / clicks;
        setResult(parseFloat(cpc.toFixed(4)));
    };

    const tryExample = () => {
        setTotalCost("5000");
        setTotalClicks("250");
        setResult(20);
    };

    const resetFields = () => {
        setTotalCost("");
        setTotalClicks("");
        setResult(null);
    };

    return (
        <div className="mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Calculator className="text-green-600" />
                CPC Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Advertising Cost (₹)
                    </label>
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(e.target.value)}
                        placeholder="Enter total cost"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Total Clicks
                    </label>
                    <input
                        type="number"
                        value={totalClicks}
                        onChange={(e) => setTotalClicks(e.target.value)}
                        placeholder="Enter total clicks"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCPC}
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
                        Cost Per Click (CPC)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}

            {/* SEO Content */}
            {/* SEO Content */}
            <div className="mt-16 space-y-10 text-gray-700 leading-relaxed">

                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-indigo-600" />
                        What is CPC (Cost Per Click)?
                    </h2>

                    <p className="mb-4">
                        CPC (Cost Per Click) is one of the most important digital advertising metrics used in online marketing.
                        It represents the amount of money advertisers pay each time a user clicks on their ad.
                        Whether you are running campaigns on Google Ads, Facebook Ads, Instagram, or any other paid platform,
                        CPC helps you understand how efficiently your advertising budget is being used.
                    </p>

                    <p className="mb-4">
                        In simple terms, CPC tells you how much each visitor to your website is costing you.
                        The lower your CPC, the more traffic you can generate within the same budget.
                        This makes CPC a key performance indicator (KPI) for businesses of all sizes.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                        CPC = Total Advertising Cost ÷ Total Clicks
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Why CPC is Important?
                    </h3>

                    <p className="mb-4">
                        CPC is crucial because it directly impacts your marketing ROI (Return on Investment).
                        By monitoring CPC, businesses can evaluate how effective their campaigns are and make better decisions.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Helps measure advertising efficiency</li>
                        <li>Allows better budget allocation</li>
                        <li>Improves ROI tracking and profitability</li>
                        <li>Helps compare performance across platforms</li>
                        <li>Supports scaling profitable campaigns</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        How CPC Works in Digital Advertising
                    </h3>

                    <p className="mb-4">
                        CPC works on a bidding system where advertisers compete for ad placements.
                        Platforms like Google Ads use an auction model to decide which ads are shown.
                        The advertiser who offers a higher bid and has better ad quality usually gets the top position.
                    </p>

                    <p className="mb-4">
                        However, CPC is not only about bidding more money. Platforms also consider factors like:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Ad relevance</li>
                        <li>Click-through rate (CTR)</li>
                        <li>Landing page experience</li>
                        <li>Quality Score</li>
                    </ul>

                    <p className="mt-4">
                        This means even with a lower bid, you can achieve a better CPC if your ads are highly optimized.
                    </p>
                </div>

                {/* Section 4 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Factors Affecting CPC
                    </h3>

                    <p className="mb-4">
                        Several factors influence CPC, and understanding them can help you reduce costs and improve performance.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Keyword competition</li>
                        <li>Industry type</li>
                        <li>Ad quality and relevance</li>
                        <li>Audience targeting</li>
                        <li>Geographic location</li>
                        <li>Device type (mobile vs desktop)</li>
                    </ul>

                    <p className="mt-4">
                        Highly competitive industries like finance and insurance often have higher CPC compared to niche markets.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        How to Calculate CPC Easily
                    </h3>

                    <p className="mb-4">
                        Calculating CPC is simple and helps you quickly analyze your campaign performance.
                        You just need two values: total ad spend and total number of clicks.
                    </p>

                    <p className="mb-4">
                        For example, if you spend ₹1000 on ads and receive 200 clicks, your CPC will be ₹5.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold">
                        Example: ₹1000 ÷ 200 = ₹5 CPC
                    </div>
                </div>

                {/* Section 6 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Tips to Reduce CPC
                    </h3>

                    <p className="mb-4">
                        Reducing CPC is one of the main goals of every advertiser.
                        Lower CPC means more clicks and better results for the same budget.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Use long-tail keywords</li>
                        <li>Improve ad copy and relevance</li>
                        <li>Optimize landing pages</li>
                        <li>Focus on high-performing audiences</li>
                        <li>Use negative keywords to filter unwanted traffic</li>
                        <li>Improve Quality Score</li>
                    </ul>

                    <p className="mt-4">
                        Consistent optimization and testing are key to achieving a lower CPC.
                    </p>
                </div>

                {/* Section 7 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        CPC vs Other Advertising Metrics
                    </h3>

                    <p className="mb-4">
                        CPC is often compared with other important metrics like CPM (Cost Per Thousand Impressions)
                        and CPA (Cost Per Acquisition).
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>CPC:</strong> Pay per click</li>
                        <li><strong>CPM:</strong> Pay per 1000 impressions</li>
                        <li><strong>CPA:</strong> Pay per conversion</li>
                    </ul>

                    <p className="mt-4">
                        Each metric serves a different purpose, but CPC is ideal for driving traffic and engagement.
                    </p>
                </div>

                {/* Section 8 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Benefits of Using a CPC Calculator
                    </h3>

                    <p className="mb-4">
                        A CPC calculator helps you quickly determine your advertising cost efficiency without manual calculations.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Instant and accurate results</li>
                        <li>Saves time</li>
                        <li>Helps in campaign planning</li>
                        <li>Improves decision-making</li>
                    </ul>

                    <p className="mt-4">
                        By using a CPC calculator regularly, marketers can optimize campaigns and maximize profits.
                    </p>
                </div>

                {/* Section 9 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-purple-600" />
                        Final Thoughts
                    </h3>

                    <p>
                        CPC is a fundamental metric in digital marketing that directly affects your campaign performance.
                        Understanding how CPC works and how to optimize it can significantly improve your advertising results.
                        Whether you are a beginner or an experienced marketer, keeping track of CPC will help you make
                        smarter decisions and achieve better ROI.
                    </p>

                    <p className="mt-4">
                        Use this CPC calculator to simplify your workflow, analyze campaigns effectively,
                        and grow your online business with confidence.
                    </p>
                </div>

            </div>
        </div>
    );
}