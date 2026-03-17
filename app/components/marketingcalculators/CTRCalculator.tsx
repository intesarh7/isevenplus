"use client";

import { useState } from "react";
import { MousePointerClick, RotateCcw, PlayCircle, Rocket, CheckCircle, Scale, Search, PenTool, Target, BarChart3, TrendingUp } from "lucide-react";

export default function CTRCalculator() {
    const [clicks, setClicks] = useState("");
    const [impressions, setImpressions] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateCTR = () => {
        const totalClicks = parseFloat(clicks);
        const totalImpressions = parseFloat(impressions);

        if (!totalClicks || !totalImpressions || totalImpressions === 0) {
            setResult(null);
            return;
        }

        const ctr = (totalClicks / totalImpressions) * 100;
        setResult(parseFloat(ctr.toFixed(2)));
    };

    const tryExample = () => {
        setClicks("150");
        setImpressions("5000");
        setResult(3);
    };

    const resetFields = () => {
        setClicks("");
        setImpressions("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <MousePointerClick className="text-green-600" />
                CTR Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Clicks
                    </label>
                    <input
                        type="number"
                        value={clicks}
                        onChange={(e) => setClicks(e.target.value)}
                        placeholder="Enter total clicks"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Total Impressions
                    </label>
                    <input
                        type="number"
                        value={impressions}
                        onChange={(e) => setImpressions(e.target.value)}
                        placeholder="Enter total impressions"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateCTR}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                    <MousePointerClick size={18} />
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
                        Click Through Rate (CTR)
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {result} %
                    </p>
                </div>
            )}
            {/* SEO Content */}
            <div className="mt-16 space-y-10 text-gray-700 leading-relaxed">

                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <MousePointerClick className="w-6 h-6 text-indigo-600" />
                        What is CTR (Click Through Rate)?
                    </h2>

                    <p className="mb-4">
                        CTR (Click Through Rate) is one of the most important performance metrics in digital marketing.
                        It measures the percentage of users who click on your ad, link, or listing after seeing it.
                        CTR helps marketers understand how effective their content, ads, and campaigns are in attracting user attention.
                    </p>

                    <p className="mb-4">
                        Whether you are running Google Ads, Facebook Ads, email campaigns, or SEO campaigns,
                        CTR plays a crucial role in determining success. A higher CTR indicates that your content is relevant,
                        engaging, and appealing to your target audience.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                        CTR = (Total Clicks ÷ Total Impressions) × 100
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Why CTR Matters in Digital Marketing
                    </h3>

                    <p className="mb-4">
                        CTR is a direct indicator of how well your marketing efforts are performing.
                        It shows whether your ads and content are compelling enough for users to take action.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Measures ad and content performance</li>
                        <li>Improves Quality Score in Google Ads</li>
                        <li>Helps optimize campaigns for better results</li>
                        <li>Indicates audience engagement level</li>
                        <li>Supports better ROI tracking</li>
                    </ul>

                    <p className="mt-4">
                        A low CTR usually means your ad is not relevant or attractive, while a high CTR indicates strong performance.
                    </p>
                </div>

                {/* Section 3 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        How CTR Works
                    </h3>

                    <p className="mb-4">
                        CTR works by comparing the number of clicks your content receives to the number of times it is shown (impressions).
                        This ratio helps determine how effective your headlines, creatives, and targeting are.
                    </p>

                    <p className="mb-4">
                        For example, if your ad is shown 1000 times and receives 50 clicks, your CTR will be 5%.
                        This means 5% of viewers found your ad interesting enough to click.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold">
                        Example: (50 ÷ 1000) × 100 = 5% CTR
                    </div>
                </div>

                {/* Section 4 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Factors That Affect CTR
                    </h3>

                    <p className="mb-4">
                        Multiple factors influence CTR, and optimizing these can significantly improve your campaign performance.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Ad headline and copy quality</li>
                        <li>Visual creatives and design</li>
                        <li>Audience targeting accuracy</li>
                        <li>Keyword relevance</li>
                        <li>Ad placement and position</li>
                        <li>Device type (mobile or desktop)</li>
                    </ul>

                    <p className="mt-4">
                        Strong headlines and clear call-to-actions can drastically improve your CTR.
                    </p>
                </div>

                {/* Section 5 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <PenTool className="w-5 h-5 text-blue-600" />
                        How to Improve CTR
                    </h3>

                    <p className="mb-4">
                        Improving CTR requires continuous testing and optimization.
                        Small changes in your ad copy or design can lead to significant improvements.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Write compelling and clear headlines</li>
                        <li>Use strong call-to-actions (CTA)</li>
                        <li>Target the right audience</li>
                        <li>Use engaging images or videos</li>
                        <li>Test multiple ad variations (A/B testing)</li>
                        <li>Optimize for mobile users</li>
                    </ul>

                    <p className="mt-4">
                        Consistent optimization is key to maintaining a high CTR over time.
                    </p>
                </div>

                {/* Section 6 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-purple-600" />
                        CTR in SEO vs Paid Ads
                    </h3>

                    <p className="mb-4">
                        CTR is important in both SEO and paid advertising, but it works slightly differently in each.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>SEO CTR:</strong> Percentage of users clicking your organic search result</li>
                        <li><strong>Paid CTR:</strong> Percentage of users clicking your paid advertisement</li>
                    </ul>

                    <p className="mt-4">
                        In SEO, CTR depends heavily on title tags, meta descriptions, and rankings,
                        while in paid ads it depends on ad creatives and targeting.
                    </p>
                </div>

                {/* Section 7 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-yellow-600" />
                        CTR vs Conversion Rate
                    </h3>

                    <p className="mb-4">
                        CTR and Conversion Rate are both important metrics, but they measure different things.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>CTR:</strong> Measures clicks</li>
                        <li><strong>Conversion Rate:</strong> Measures completed actions (purchase, signup, etc.)</li>
                    </ul>

                    <p className="mt-4">
                        A high CTR with low conversions may indicate issues with your landing page,
                        while a low CTR means your ads need improvement.
                    </p>
                </div>

                {/* Section 8 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Benefits of Using a CTR Calculator
                    </h3>

                    <p className="mb-4">
                        A CTR calculator helps marketers quickly analyze performance without manual calculations.
                        It simplifies data interpretation and supports better decision-making.
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Instant results</li>
                        <li>Accurate calculations</li>
                        <li>Improves campaign analysis</li>
                        <li>Saves time and effort</li>
                    </ul>

                    <p className="mt-4">
                        Using a CTR calculator regularly helps maintain consistent campaign performance.
                    </p>
                </div>

                {/* Section 9 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-indigo-600" />
                        Final Thoughts on CTR
                    </h3>

                    <p>
                        CTR is a powerful metric that reflects how engaging and relevant your content is.
                        By understanding and optimizing CTR, you can significantly improve your marketing performance.
                        Whether you are focusing on SEO or paid advertising, CTR should always be a key part of your strategy.
                    </p>

                    <p className="mt-4">
                        Use this CTR calculator to analyze your campaigns, improve engagement,
                        and drive better results for your business.
                    </p>
                </div>

            </div>
        </div>
    );
}