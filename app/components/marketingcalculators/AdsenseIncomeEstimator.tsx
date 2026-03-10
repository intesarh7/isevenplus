"use client";

import { useState } from "react";

export default function AdsenseIncomeEstimator() {

    const [pageviews, setPageviews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [income, setIncome] = useState<number | null>(null);

    const calculate = () => {

        const pv = Number(pageviews);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!pv || !clickRate || !costPerClick) {
            setIncome(null);
            return;
        }

        const clicks = (pv * clickRate) / 100;
        const revenue = clicks * costPerClick;

        setIncome(Number(revenue.toFixed(2)));
    };

    const reset = () => {
        setPageviews("");
        setCtr("");
        setCpc("");
        setIncome(null);
    };

    const example = () => {
        setPageviews("25000");
        setCtr("2.5");
        setCpc("0.30");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Income Estimator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Monthly Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        placeholder="e.g. 25000"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        CTR (%)
                    </label>
                    <input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(e.target.value)}
                        placeholder="e.g. 2.5"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        CPC ($)
                    </label>
                    <input
                        type="number"
                        value={cpc}
                        onChange={(e) => setCpc(e.target.value)}
                        placeholder="e.g. 0.30"
                        className="w-full border rounded-lg p-2"
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

            {income !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Monthly Adsense Income
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${income}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Income Estimator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Income Estimator is an online tool that helps bloggers, website owners,
                    and digital publishers estimate how much income they can potentially earn from
                    Google AdSense advertising. By entering basic metrics such as monthly pageviews,
                    click-through rate (CTR), and cost per click (CPC), users can quickly calculate
                    their estimated advertising income.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense is one of the most widely used monetization platforms for websites.
                    Publishers place ads on their website and earn revenue whenever visitors click
                    on those ads. However, calculating potential earnings manually can be confusing
                    because revenue depends on multiple variables such as traffic volume, ad
                    placement, niche competition, and advertiser demand. An Adsense Income Estimator
                    simplifies this process and provides an instant income estimate.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense Income Is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The estimated AdSense income is calculated using three main metrics: pageviews,
                    CTR (Click Through Rate), and CPC (Cost Per Click). The calculator first
                    estimates how many visitors will click on ads based on the CTR percentage.
                    Then, it multiplies the number of clicks by the CPC to determine the final
                    advertising revenue.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <p className="text-indigo-700 font-semibold">
                        Basic Adsense Income Formula:
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Estimated Income = Pageviews × CTR × CPC
                    </p>
                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website receives 25,000 monthly pageviews with an average
                    CTR of 2.5% and a CPC of $0.30, the estimated AdSense income would be around
                    $187.50. While the actual earnings may vary depending on several factors,
                    this estimator provides a helpful approximation of your revenue potential.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Key Factors That Affect Adsense Earnings
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Your real AdSense income may differ from the estimated value because many
                    different factors influence advertising performance. Understanding these
                    factors can help you increase your overall earnings.
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Website Traffic:</strong> Higher traffic generally results in more ad impressions and clicks.</li>
                    <li><strong>CTR (Click Through Rate):</strong> The percentage of visitors who click on ads displayed on your website.</li>
                    <li><strong>CPC (Cost Per Click):</strong> The amount advertisers are willing to pay for each ad click.</li>
                    <li><strong>Website Niche:</strong> Finance, insurance, and technology niches typically have higher CPC rates.</li>
                    <li><strong>User Location:</strong> Visitors from countries like the United States, Canada, and the United Kingdom often generate higher ad revenue.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use an Adsense Income Estimator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Income Estimator helps website owners understand how much money
                    their website traffic could generate before implementing a full monetization
                    strategy. It is particularly useful for bloggers, affiliate marketers,
                    content creators, and SEO professionals who want to estimate their potential
                    advertising income.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if you want to earn $500 per month from Google AdSense, you can
                    use this calculator to estimate how much traffic you need based on your
                    expected CTR and CPC values. This allows you to create better SEO strategies,
                    content plans, and traffic growth targets.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Tips to Increase Your Adsense Income
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    If you want to increase your AdSense earnings, focus on improving both traffic
                    quality and ad performance. High-quality content, strong SEO optimization,
                    and strategic ad placements can significantly improve your CTR and CPC.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Income Estimator provided by <span className="font-semibold text-indigo-600">iSevenPlus </span> 
                     helps you quickly estimate your potential earnings and understand how small
                    changes in traffic, CTR, or CPC can impact your overall advertising revenue.
                    This tool is especially useful for bloggers and website owners who want to
                    plan their monetization strategy effectively.
                </p>

            </div>
        </div>
    );
}