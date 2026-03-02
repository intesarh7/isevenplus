"use client";

import { useState } from "react";
import { Instagram, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function InstagramEarningsCalculator() {
    const [followers, setFollowers] = useState("");
    const [engagementRate, setEngagementRate] = useState("");
    const [earningPerEngagement, setEarningPerEngagement] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculateEarnings = () => {
        const totalFollowers = parseFloat(followers);
        const rate = parseFloat(engagementRate);
        const earning = parseFloat(earningPerEngagement);

        if (!totalFollowers || !rate || !earning) {
            setResult(null);
            return;
        }

        const estimated =
            totalFollowers * (rate / 100) * earning;

        setResult(parseFloat(estimated.toFixed(2)));
    };

    const tryExample = () => {
        setFollowers("50000");
        setEngagementRate("5");
        setEarningPerEngagement("2");
        setResult(5000);
    };

    const resetFields = () => {
        setFollowers("");
        setEngagementRate("");
        setEarningPerEngagement("");
        setResult(null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Instagram className="text-pink-600" />
                Instagram Earnings Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">
                        Total Followers
                    </label>
                    <input
                        type="number"
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value)}
                        placeholder="Enter followers"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Engagement Rate (%)
                    </label>
                    <input
                        type="number"
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                        placeholder="Enter engagement rate"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium mb-2">
                        Avg Earning Per Engagement (₹)
                    </label>
                    <input
                        type="number"
                        value={earningPerEngagement}
                        onChange={(e) => setEarningPerEngagement(e.target.value)}
                        placeholder="Enter earning per engagement"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateEarnings}
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
                        Estimated Instagram Earnings
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        ₹ {result}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Instagram Earnings Are Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Instagram influencer earnings depend on follower count,
                    engagement rate and brand deal value per engagement.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Earnings = Followers × (Engagement Rate ÷ 100) × Avg Earning Per Engagement
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Tips to Increase Instagram Earnings
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Grow targeted followers</li>
                    <li>Improve engagement rate</li>
                    <li>Work with high paying brands</li>
                    <li>Focus on niche authority</li>
                </ul>

            </div>
        </div>
    );
}