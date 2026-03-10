"use client";

import { useState } from "react";

export default function WebsiteAdRevenueCalculator() {

    const [pageviews, setPageviews] = useState("");
    const [ctr, setCtr] = useState("");
    const [cpc, setCpc] = useState("");

    const [revenue, setRevenue] = useState<number | null>(null);

    const calculate = () => {

        const views = Number(pageviews);
        const clickRate = Number(ctr);
        const costPerClick = Number(cpc);

        if (!views || !clickRate || !costPerClick) {
            setRevenue(null);
            return;
        }

        const clicks = (views * clickRate) / 100;
        const earnings = clicks * costPerClick;

        setRevenue(Number(earnings.toFixed(2)));
    };

    const reset = () => {
        setPageviews("");
        setCtr("");
        setCpc("");
        setRevenue(null);
    };

    const example = () => {
        setPageviews("50000");
        setCtr("2");
        setCpc("0.40");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Website Ad Revenue Calculator
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
                        placeholder="e.g. 50000"
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
                        placeholder="e.g. 2"
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
                        placeholder="e.g. 0.40"
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

            {revenue !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Estimated Website Ad Revenue
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${revenue}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is a Website Ad Revenue Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    A Website Ad Revenue Calculator is an online tool designed to help
                    bloggers and website owners estimate how much income they can generate
                    from advertising on their website. By entering key metrics such as
                    pageviews, click-through rate (CTR), and cost per click (CPC), users
                    can quickly calculate their potential advertising revenue.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Website advertising is one of the most popular ways to monetize
                    online content. Platforms like Google AdSense allow publishers to
                    display ads on their websites and earn revenue whenever visitors
                    interact with those ads. However, estimating advertising income can
                    be difficult because earnings depend on multiple factors including
                    traffic volume, ad engagement, and advertiser competition.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Website Advertising Revenue is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The basic formula used to estimate website ad revenue involves three
                    key components: pageviews, CTR, and CPC. First, the number of clicks
                    is estimated by multiplying pageviews with the CTR percentage.
                    After that, the clicks are multiplied by the CPC value to determine
                    the total advertising income.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Website Ad Revenue Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Ad Revenue = Pageviews × CTR × CPC
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if a website receives 50,000 monthly visitors with
                    a CTR of 2% and an average CPC of $0.40, the estimated advertising
                    revenue would be around $400 per month. This simple calculation
                    helps website owners understand how traffic translates into income.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Website Ad Revenue
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Website Traffic:</strong> More traffic means more ad impressions.</li>
                    <li><strong>Click Through Rate:</strong> Higher CTR leads to more ad clicks.</li>
                    <li><strong>Cost Per Click:</strong> High CPC keywords generate better revenue.</li>
                    <li><strong>Website Niche:</strong> Finance and technology niches often produce higher ad income.</li>
                    <li><strong>User Location:</strong> Visitors from premium countries generate higher CPC.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use a Website Ad Revenue Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Using an ad revenue calculator helps website owners set realistic
                    income expectations and plan their monetization strategy more
                    effectively. It also helps publishers analyze how improving traffic,
                    CTR, or CPC can increase overall earnings.
                </p>

                <p className="text-gray-600 leading-7">
                    The Website Ad Revenue Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps bloggers and website owners quickly estimate advertising
                    income and understand how their website traffic converts into
                    revenue.
                </p>

            </div>
        </div>
    );
}