"use client";

import { useState } from "react";

export default function AdsenseClickEarningsCalculator() {

    const [clicks, setClicks] = useState("");
    const [cpc, setCpc] = useState("");

    const [earnings, setEarnings] = useState<number | null>(null);

    const calculate = () => {

        const totalClicks = Number(clicks);
        const costPerClick = Number(cpc);

        if (!totalClicks || !costPerClick) {
            setEarnings(null);
            return;
        }

        const result = totalClicks * costPerClick;

        setEarnings(Number(result.toFixed(2)));
    };

    const reset = () => {
        setClicks("");
        setCpc("");
        setEarnings(null);
    };

    const example = () => {
        setClicks("350");
        setCpc("0.45");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Click Earnings Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Total Clicks
                    </label>
                    <input
                        type="number"
                        value={clicks}
                        onChange={(e) => setClicks(e.target.value)}
                        placeholder="e.g. 350"
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
                        placeholder="e.g. 0.45"
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

            {earnings !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Total Adsense Earnings
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${earnings}
                    </p>

                </div>
            )}

            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Click Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Click Earnings Calculator is an online tool that helps
                    bloggers and website publishers estimate how much revenue they can
                    generate from Google AdSense clicks. Since AdSense earnings are
                    primarily based on cost per click (CPC), this calculator allows users
                    to quickly determine their potential earnings by multiplying the
                    number of ad clicks with the CPC value.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    Google AdSense is one of the most widely used advertising platforms
                    for websites. When visitors click on ads displayed on a website,
                    the publisher earns money based on the advertiser’s bid price.
                    However, understanding how much revenue those clicks generate can
                    sometimes be confusing. This calculator simplifies that process by
                    providing instant results.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense Click Earnings Are Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    The calculation for AdSense click earnings is very simple. It multiplies
                    the total number of ad clicks by the cost per click (CPC). The CPC
                    represents the amount advertisers are willing to pay for each click.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Adsense Click Earnings Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Total Earnings = Clicks × CPC
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website receives 350 ad clicks and the average
                    CPC is $0.45, the total earnings would be approximately $157.50.
                    This estimate helps publishers understand the relationship between
                    ad clicks and their total advertising revenue.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Factors That Affect Adsense Click Earnings
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Cost Per Click (CPC):</strong> Higher CPC keywords generate more revenue per click.</li>
                    <li><strong>Ad Placement:</strong> Better ad placement can increase click rates.</li>
                    <li><strong>Website Niche:</strong> Finance, technology, and insurance niches usually have higher CPC.</li>
                    <li><strong>User Location:</strong> Traffic from premium countries often produces higher ad payouts.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Use an Adsense Click Earnings Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Using an Adsense Click Earnings Calculator helps publishers quickly
                    estimate potential revenue without manually calculating each click’s
                    value. This tool is particularly useful for bloggers, affiliate
                    marketers, and digital publishers who want to analyze their
                    advertising performance.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Click Earnings Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    allows website owners to instantly calculate earnings from ad clicks
                    and better understand how ad engagement translates into revenue.
                </p>

            </div>
        </div>
    );
}