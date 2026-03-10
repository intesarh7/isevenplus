"use client";

import { useState } from "react";

export default function AdsensePageRPMCalculator() {

    const [earnings, setEarnings] = useState("");
    const [pageviews, setPageviews] = useState("");
    const [rpm, setRpm] = useState<number | null>(null);

    const calculate = () => {

        const rev = Number(earnings);
        const views = Number(pageviews);

        if (!rev || !views) {
            setRpm(null);
            return;
        }

        const result = (rev / views) * 1000;

        setRpm(Number(result.toFixed(2)));
    };

    const reset = () => {
        setEarnings("");
        setPageviews("");
        setRpm(null);
    };

    const example = () => {
        setEarnings("150");
        setPageviews("40000");
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Adsense Page RPM Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Estimated Earnings ($)
                    </label>
                    <input
                        type="number"
                        value={earnings}
                        onChange={(e) => setEarnings(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Total Pageviews
                    </label>
                    <input
                        type="number"
                        value={pageviews}
                        onChange={(e) => setPageviews(e.target.value)}
                        placeholder="e.g. 40000"
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

            {rpm !== null && (
                <div className="mt-6 text-center bg-gray-100 p-5 rounded-lg">

                    <p className="text-lg font-semibold">
                        Page RPM
                    </p>

                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ${rpm}
                    </p>

                </div>
            )}
            <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What is an Adsense Page RPM Calculator?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    An Adsense Page RPM Calculator is a simple online tool that helps website
                    owners estimate how much revenue they generate per 1000 pageviews using
                    Google AdSense advertisements. RPM stands for “Revenue Per Mille,” where
                    mille means one thousand impressions.
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                    For bloggers and publishers who monetize their websites with Google
                    AdSense, RPM is one of the most important performance metrics. Instead
                    of looking only at total earnings, RPM helps understand how efficiently
                    your website traffic is converting into advertising revenue.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How Adsense Page RPM is Calculated
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Page RPM measures the amount of revenue earned for every 1000 pageviews.
                    The calculation divides the total earnings by the number of pageviews
                    and multiplies the result by 1000.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">

                    <p className="text-indigo-700 font-semibold">
                        Page RPM Formula
                    </p>

                    <p className="text-lg font-bold text-indigo-800 mt-2">
                        Page RPM = (Estimated Earnings / Pageviews) × 1000
                    </p>

                </div>

                <p className="text-gray-600 leading-7 mb-6">
                    For example, if your website earns $150 from 40,000 pageviews,
                    the Page RPM would be calculated as:
                    (150 / 40000) × 1000 = $3.75 RPM.
                    This means your website earns approximately $3.75
                    for every 1000 page impressions.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Page RPM is Important
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Page RPM is a powerful metric for measuring advertising performance.
                    It allows publishers to compare different websites, pages, or traffic
                    sources to determine which ones generate the highest advertising
                    revenue.
                </p>

                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Performance Measurement:</strong> Helps analyze monetization efficiency.</li>
                    <li><strong>Traffic Quality Analysis:</strong> Higher RPM often indicates better audience quality.</li>
                    <li><strong>Ad Placement Optimization:</strong> Proper ad placement can increase RPM significantly.</li>
                    <li><strong>Keyword Targeting:</strong> High CPC keywords improve advertising revenue.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    How to Increase Adsense Page RPM
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                    Improving Page RPM is one of the best ways to increase website income
                    without necessarily increasing traffic. Website owners can improve RPM
                    by focusing on better ad placement, high-quality SEO content, and
                    targeting profitable niches.
                </p>

                <p className="text-gray-600 leading-7">
                    The Adsense Page RPM Calculator available on
                    <span className="font-semibold text-indigo-600"> iSevenPlus </span>
                    helps bloggers and website owners quickly estimate their revenue per
                    1000 pageviews and better understand how website traffic converts
                    into advertising income.
                </p>

            </div>
        </div>
    );
}