"use client";

import { useState } from "react";
import { Repeat, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function SubscriptionRevenueCalculator() {
    const [subscribers, setSubscribers] = useState("");
    const [price, setPrice] = useState("");

    const [monthlyRevenue, setMonthlyRevenue] = useState<number | null>(null);
    const [yearlyRevenue, setYearlyRevenue] = useState<number | null>(null);

    const calculateRevenue = () => {
        const subs = parseFloat(subscribers);
        const subscriptionPrice = parseFloat(price);

        if (isNaN(subs) || isNaN(subscriptionPrice)) {
            setMonthlyRevenue(null);
            return;
        }

        const mrr = subs * subscriptionPrice;
        const arr = mrr * 12;

        setMonthlyRevenue(parseFloat(mrr.toFixed(2)));
        setYearlyRevenue(parseFloat(arr.toFixed(2)));
    };

    const tryExample = () => {
        setSubscribers("500");
        setPrice("999");

        const mrr = 500 * 999;
        const arr = mrr * 12;

        setMonthlyRevenue(mrr);
        setYearlyRevenue(arr);
    };

    const resetFields = () => {
        setSubscribers("");
        setPrice("");
        setMonthlyRevenue(null);
        setYearlyRevenue(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Repeat className="text-green-600" />
                Subscription Revenue Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Number of Subscribers"
                    value={subscribers}
                    onChange={(e) => setSubscribers(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Subscription Price (₹)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateRevenue}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} /> Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {monthlyRevenue !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Monthly Recurring Revenue (MRR): ₹ {monthlyRevenue}
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Annual Revenue (ARR): ₹ {yearlyRevenue}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Subscription Revenue?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Subscription revenue is recurring income generated from customers
                    who pay regularly for a product or service.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    MRR = Subscribers × Subscription Price
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why MRR & ARR Are Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Measures predictable revenue</li>
                    <li>Helps in business valuation</li>
                    <li>Improves financial forecasting</li>
                    <li>Tracks SaaS growth performance</li>
                </ul>

            </div>
        </div>
    );
}