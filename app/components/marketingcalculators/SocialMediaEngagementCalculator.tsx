"use client";

import { useState } from "react";
import { Heart, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function SocialMediaEngagementCalculator() {
    const [followers, setFollowers] = useState("");
    const [likes, setLikes] = useState("");
    const [comments, setComments] = useState("");
    const [shares, setShares] = useState("");

    const [result, setResult] = useState<number | null>(null);

    const calculateEngagement = () => {
        const totalFollowers = parseFloat(followers);
        const totalLikes = parseFloat(likes);
        const totalComments = parseFloat(comments);
        const totalShares = parseFloat(shares);

        if (!totalFollowers) {
            setResult(null);
            return;
        }

        const totalEngagement =
            (totalLikes || 0) +
            (totalComments || 0) +
            (totalShares || 0);

        const engagementRate = (totalEngagement / totalFollowers) * 100;

        setResult(parseFloat(engagementRate.toFixed(2)));
    };

    const tryExample = () => {
        setFollowers("20000");
        setLikes("1200");
        setComments("150");
        setShares("50");

        const totalEngagement = 1200 + 150 + 50;
        const engagementRate = (totalEngagement / 20000) * 100;

        setResult(parseFloat(engagementRate.toFixed(2)));
    };

    const resetFields = () => {
        setFollowers("");
        setLikes("");
        setComments("");
        setShares("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Heart className="text-pink-600" />
                Social Media Engagement Rate Calculator
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block font-medium mb-2">Total Followers</label>
                    <input
                        type="number"
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Total Likes</label>
                    <input
                        type="number"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Total Comments</label>
                    <input
                        type="number"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Total Shares</label>
                    <input
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateEngagement}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} />
                    Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} />
                    Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {/* Result */}
            {result !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold">Engagement Rate</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {result} %
                    </p>
                </div>
            )}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-4">
                    How Engagement Rate is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Engagement Rate measures how actively your audience interacts with your content.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Engagement Rate (%) = (Total Engagements ÷ Total Followers) × 100
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Engagement Rate Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Measures content performance</li>
                    <li>Helps attract brand sponsorships</li>
                    <li>Improves algorithm visibility</li>
                    <li>Shows audience loyalty</li>
                </ul>

            </div>
        </div>
    );
}