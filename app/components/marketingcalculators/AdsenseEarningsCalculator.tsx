"use client";

import { useState } from "react";

export default function AdsenseEarningCalculator() {

    const [pageviews, setPageviews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [earnings, setEarnings] = useState<number | null>(null);

    const calculate = () => {

        const pv = Number(pageviews);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!pv || !clickRate || !costPerClick) {
            setEarnings(null);
            return;
        }

        const clicks = (pv * clickRate) / 100;
        const revenue = clicks * costPerClick;

        setEarnings(Number(revenue.toFixed(2)));
    };

    const reset = () => {
        setPageviews("");
        setCtr("");
        setCpc("");
        setEarnings(null);
    };

    const example = () => {
        setPageviews("10000");
        setCtr("2");
        setCpc("0.25");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4 text-center">
                Adsense Earnings Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium">
                        Monthly Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="e.g. 10000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        CTR (%)
                    </label>
                    <input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="e.g. 2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        CPC ($)
                    </label>
                    <input
                        type="number"
                        value={cpc}
                        onChange={(e) => setCpc(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="e.g. 0.25"
                    />
                </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                    onClick={calculate}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Calculate
                </button>

                <button
                    onClick={example}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Try Example
                </button>

                <button
                    onClick={reset}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
                >
                    Reset
                </button>

            </div>

            {earnings !== null && (
                <div className="mt-6 text-center bg-gray-100 p-4 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Monthly Earnings
                    </p>

                    <p className="text-3xl font-bold text-indigo-600">
                        ${earnings}
                    </p>

                </div>
            )}

            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Earnings Calculator is an online tool that helps website owners,
                    bloggers, and digital publishers estimate how much revenue they can generate
                    from Google AdSense. By entering values such as monthly pageviews,
                    click-through rate (CTR), and cost per click (CPC), users can quickly calculate
                    an estimated earning potential from their website traffic.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense is one of the most popular advertising programs in the world.
                    Website owners place ads on their pages and earn money whenever visitors click
                    on those ads. However, estimating potential earnings can be confusing because
                    income depends on several factors such as traffic volume, niche, user location,
                    and advertiser competition. This is where an Adsense Earnings Calculator becomes
                    extremely useful.
                </p>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense Earnings Are Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The formula used to estimate AdSense earnings is fairly simple. The calculator
                    multiplies the number of pageviews with the click-through rate to estimate the
                    number of ad clicks. After that, the clicks are multiplied by the average CPC
                    (cost per click) to determine the total revenue.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <p className="text-indigo-700 font-semibold">
                        Basic Formula:
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Estimated Earnings = Pageviews × CTR × CPC
                    </p>
                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if a website receives 10,000 monthly pageviews with a CTR of 2%
                    and an average CPC of $0.25, the estimated revenue would be approximately $50.
                    This simple calculation helps publishers understand how traffic growth can
                    directly impact their advertising income.
                </p>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Adsense Revenue
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Several important factors influence your actual AdSense earnings:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Website Traffic:</strong> More visitors generally mean more ad impressions and clicks.</li>
                    <li><strong>CTR (Click Through Rate):</strong> The percentage of visitors who click on ads.</li>
                    <li><strong>CPC (Cost Per Click):</strong> The amount advertisers pay per click.</li>
                    <li><strong>Website Niche:</strong> Finance, insurance, and technology niches usually have higher CPC.</li>
                    <li><strong>User Location:</strong> Traffic from countries like the US, UK, and Canada usually generates higher revenue.</li>
                </ul>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use an Adsense Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense calculator helps website owners understand their revenue potential
                    before scaling their traffic strategy. Bloggers, YouTubers, affiliate marketers,
                    and content creators often use this tool to set realistic income goals and plan
                    their monetization strategy.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if you know your average CPC and CTR, you can calculate how much
                    traffic you need to earn $100, $500, or even $1000 per month from AdSense.
                    This insight is extremely valuable when planning SEO strategies, content
                    marketing, and audience growth.
                </p>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Improve Your Adsense Earnings
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    If you want to increase your AdSense revenue, focus on improving your website
                    traffic, creating high-quality content, optimizing ad placement, and targeting
                    high CPC keywords. SEO optimization and user engagement also play a major role
                    in increasing ad performance.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Earnings Calculator provided by <span className="font-semibold text-indigo-600">iSevenPlus</span> allows you to quickly
                    estimate your potential advertising income and understand how small changes in
                    traffic or CPC can significantly affect your overall revenue.
                </p>

            </div>

        </div>
    );
}