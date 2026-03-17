"use client";

import { useState } from "react";
import { BarChart3, Calculator, CheckCircle, Eye, Lightbulb, PlayCircle, Rocket, RotateCcw, Scale, Target, TrendingUp } from "lucide-react";

export default function CPMCalculator() {

    const [totalCost, setTotalCost] = useState("");
    const [totalImpressions, setTotalImpressions] = useState("");

    const [cpm, setCpm] = useState<number | null>(null);

    const calculateCPM = () => {
        const cost = parseFloat(totalCost);
        const impressions = parseFloat(totalImpressions);

        if (!cost || !impressions || impressions <= 0) return;

        const result = (cost / impressions) * 1000;
        setCpm(result);
    };

    const tryExample = () => {
        setTotalCost("5000");
        setTotalImpressions("100000");
    };

    const resetFields = () => {
        setTotalCost("");
        setTotalImpressions("");
        setCpm(null);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                CPM (Cost Per Mille) Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">Total Advertising Cost (₹)</label>
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">Total Impressions</label>
                    <input
                        type="number"
                        value={totalImpressions}
                        onChange={(e) => setTotalImpressions(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateCPM}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate CPM
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

            {cpm !== null && (
                <div className="mt-8 bg-green-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">
                        CPM Result
                    </h3>

                    <p>
                        Cost Per 1,000 Impressions (CPM):
                        <strong> ₹{cpm.toFixed(2)}</strong>
                    </p>
                </div>
            )}

            {/* SEO Section */}
            {/* SEO Content */}
            <div className="mt-12 space-y-10 text-gray-700 leading-relaxed">

                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Eye className="w-6 h-6 text-indigo-600" />
                        What is CPM (Cost Per Mille)?
                    </h2>

                    <p className="mt-4">
                        CPM (Cost Per Mille) is a widely used digital advertising metric that represents the cost an advertiser pays for 1,000 impressions of an ad.
                        The word "Mille" comes from Latin, meaning one thousand. In simple terms, CPM helps you understand how much it costs to show your advertisement
                        to one thousand users.
                    </p>

                    <p className="mt-4">
                        CPM is commonly used in display advertising, brand awareness campaigns, and social media marketing where the goal is to reach a large audience
                        rather than generate immediate clicks or conversions. Platforms like Google Display Network, Facebook Ads, and YouTube Ads heavily rely on CPM
                        for pricing and performance measurement.
                    </p>
                </div>

                {/* Section 2 */}
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-blue-600" />
                        CPM Formula
                    </h2>

                    <p className="mt-4">
                        CPM is calculated using a simple formula that helps advertisers determine the cost efficiency of their campaigns.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold mt-4">
                        CPM = (Total Advertising Cost ÷ Total Impressions) × 1000
                    </div>

                    <p className="mt-4">
                        For example, if you spend ₹2000 on an advertising campaign and receive 100,000 impressions,
                        your CPM would be ₹20. This means you are paying ₹20 for every 1,000 impressions.
                    </p>
                </div>

                {/* Section 3 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Why CPM is Important?
                    </h3>

                    <p className="mt-4">
                        CPM plays a crucial role in digital marketing strategies, especially for campaigns focused on brand visibility and reach.
                        It helps advertisers understand how efficiently their ads are being delivered to a large audience.
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Measures brand awareness campaign effectiveness</li>
                        <li>Helps compare advertising costs across platforms</li>
                        <li>Useful for large-scale audience targeting</li>
                        <li>Improves budget planning and allocation</li>
                        <li>Provides insights into ad reach efficiency</li>
                    </ul>
                </div>

                {/* Section 4 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        How CPM Works in Advertising
                    </h3>

                    <p className="mt-4">
                        CPM works by charging advertisers based on the number of impressions their ads receive.
                        Unlike CPC (Cost Per Click), where you pay for each click, CPM focuses purely on visibility.
                        This makes it ideal for campaigns where the goal is exposure rather than direct engagement.
                    </p>

                    <p className="mt-4">
                        Advertisers bid for ad placements, and the platform determines which ads to show based on factors like bid amount,
                        targeting, and ad quality. The more competitive your target audience is, the higher your CPM may be.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Factors Affecting CPM
                    </h3>

                    <p className="mt-4">
                        Several factors can influence CPM rates, and understanding them can help you optimize your campaigns effectively.
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Audience targeting (age, location, interests)</li>
                        <li>Industry competition</li>
                        <li>Ad placement (feed, stories, display network)</li>
                        <li>Seasonality and demand (festivals, sales events)</li>
                        <li>Ad quality and engagement levels</li>
                        <li>Device type (mobile vs desktop)</li>
                    </ul>

                    <p className="mt-4">
                        High-demand periods like holidays or major sales events often lead to higher CPM due to increased competition.
                    </p>
                </div>

                {/* Section 6 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Tips to Reduce CPM
                    </h3>

                    <p className="mt-4">
                        Reducing CPM can help you reach more people within the same budget. Here are some proven strategies:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Improve ad creatives and visuals</li>
                        <li>Refine audience targeting</li>
                        <li>Test multiple ad formats</li>
                        <li>Run campaigns during low-competition periods</li>
                        <li>Optimize ad frequency</li>
                        <li>Use engaging video content</li>
                    </ul>

                    <p className="mt-4">
                        Continuous testing and optimization are key to achieving lower CPM and better reach.
                    </p>
                </div>

                {/* Section 7 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Scale className="w-5 h-5 text-purple-600" />
                        CPM vs CPC vs CPA
                    </h3>

                    <p className="mt-4">
                        CPM is often compared with other digital advertising metrics such as CPC (Cost Per Click) and CPA (Cost Per Acquisition).
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>CPM:</strong> Pay for impressions (visibility)</li>
                        <li><strong>CPC:</strong> Pay for clicks (traffic)</li>
                        <li><strong>CPA:</strong> Pay for conversions (results)</li>
                    </ul>

                    <p className="mt-4">
                        Each metric serves a different purpose, and choosing the right one depends on your campaign goals.
                    </p>
                </div>

                {/* Section 8 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Benefits of Using a CPM Calculator
                    </h3>

                    <p className="mt-4">
                        A CPM calculator helps advertisers quickly determine the cost efficiency of their campaigns without manual calculations.
                    </p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Instant and accurate calculations</li>
                        <li>Saves time and effort</li>
                        <li>Improves campaign planning</li>
                        <li>Helps compare multiple campaigns</li>
                    </ul>

                    <p className="mt-4">
                        Using a CPM calculator regularly ensures better decision-making and optimized marketing strategies.
                    </p>
                </div>

                {/* Section 9 */}
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-indigo-600" />
                        Final Thoughts on CPM
                    </h3>

                    <p>
                        CPM is an essential metric for advertisers focusing on brand awareness and large-scale audience reach.
                        Understanding how CPM works and how to optimize it can significantly improve your advertising performance.
                    </p>

                    <p className="mt-4">
                        By using this CPM calculator, you can easily analyze your campaigns, control your budget,
                        and achieve better results in your digital marketing efforts.
                    </p>
                </div>

            </div>

        </div>
    );
}