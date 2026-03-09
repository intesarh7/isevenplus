"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function ConversionRateCalculator() {

    const [totalVisitors, setTotalVisitors] = useState("");
    const [totalConversions, setTotalConversions] = useState("");

    const [conversionRate, setConversionRate] = useState<number | null>(null);

    const calculateConversionRate = () => {
        const visitors = parseFloat(totalVisitors);
        const conversions = parseFloat(totalConversions);

        if (!visitors || !conversions || visitors <= 0) return;

        const rate = (conversions / visitors) * 100;
        setConversionRate(rate);
    };

    const tryExample = () => {
        setTotalVisitors("10000");
        setTotalConversions("450");
    };

    const resetFields = () => {
        setTotalVisitors("");
        setTotalConversions("");
        setConversionRate(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-indigo-600" size={28} />
                Conversion Rate Calculator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div>
                    <label className="font-medium">Total Visitors</label>
                    <input
                        type="number"
                        value={totalVisitors}
                        onChange={(e) => setTotalVisitors(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="font-medium">Total Conversions</label>
                    <input
                        type="number"
                        value={totalConversions}
                        onChange={(e) => setTotalConversions(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mt-2"
                    />
                </div>

            </div>

            {/* Buttons - iSevenPlus Standard */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateConversionRate}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Rate
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

            {conversionRate !== null && (
                <div className="mt-8 bg-gray-100 p-6 rounded-xl space-y-2">
                    <h3 className="text-xl font-semibold">
                        Conversion Result
                    </h3>

                    <p>
                        Conversion Rate:
                        <strong> {conversionRate.toFixed(2)}%</strong>
                    </p>
                </div>
            )}

            <section className="mt-12">

                {/* What is Conversion Rate */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        What is Conversion Rate?
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        Conversion rate is the percentage of visitors who complete a desired
                        action on your website. This action could include making a purchase,
                        signing up for a newsletter, downloading a file, or filling out a
                        contact form.
                    </p>

                    <p className="text-gray-600 mt-3 leading-relaxed">
                        For example, if 100 people visit your website and 5 of them complete a
                        purchase, your conversion rate becomes <strong>5%</strong>.
                    </p>
                </div>

                {/* Formula */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Conversion Rate Formula
                    </h2>

                    <p className="text-gray-600 mb-4">
                        The formula to calculate conversion rate is simple:
                    </p>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-indigo-700 font-medium">
                        Conversion Rate = (Total Conversions ÷ Total Visitors) × 100
                    </div>

                    <p className="text-gray-600 mt-4">
                        This formula helps businesses measure how effectively their website
                        converts visitors into customers.
                    </p>
                </div>

                {/* Example Table */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Example of Conversion Rate Calculation
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700">
                                        Total Visitors
                                    </th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700">
                                        Total Conversions
                                    </th>
                                    <th className="p-3 text-left text-sm font-semibold text-gray-700">
                                        Conversion Rate
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-600">
                                <tr className="border-t">
                                    <td className="p-3">1000</td>
                                    <td className="p-3">50</td>
                                    <td className="p-3 font-semibold text-indigo-600">5%</td>
                                </tr>

                                <tr className="border-t">
                                    <td className="p-3">500</td>
                                    <td className="p-3">20</td>
                                    <td className="p-3 font-semibold text-indigo-600">4%</td>
                                </tr>

                                <tr className="border-t">
                                    <td className="p-3">2000</td>
                                    <td className="p-3">60</td>
                                    <td className="p-3 font-semibold text-indigo-600">3%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Importance */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Why Conversion Rate is Important?
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Measures the effectiveness of marketing campaigns</li>
                        <li>Helps optimize website performance</li>
                        <li>Improves sales funnel efficiency</li>
                        <li>Identifies user behavior patterns</li>
                        <li>Helps increase revenue without increasing traffic</li>
                    </ul>
                </div>

                {/* Benchmark */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Good Conversion Rate Benchmark
                    </h2>

                    <p className="text-gray-600 mb-4">
                        A good conversion rate depends on the industry and type of website.
                        However, general benchmarks are:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Ecommerce websites: 2% – 5%</li>
                        <li>Landing pages: 5% – 10%</li>
                        <li>Email campaigns: 1% – 3%</li>
                        <li>SaaS products: 3% – 7%</li>
                    </ul>
                </div>

                {/* Improve Conversion */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        How to Improve Conversion Rate
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Improve website loading speed</li>
                        <li>Use clear call-to-action buttons</li>
                        <li>Optimize landing pages</li>
                        <li>Improve product descriptions</li>
                        <li>Add trust signals such as reviews and testimonials</li>
                        <li>Simplify checkout or signup process</li>
                    </ul>
                </div>

                {/* Conversion Types */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Common Conversion Types
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Product purchases</li>
                        <li>Newsletter subscriptions</li>
                        <li>Account registrations</li>
                        <li>App downloads</li>
                        <li>Lead form submissions</li>
                    </ul>
                </div>

                {/* FAQ */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">

                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800">
                                What is a good conversion rate?
                            </h3>
                            <p className="text-gray-600 mt-1">
                                A good conversion rate typically ranges between 2% and 5% depending
                                on the industry and traffic quality.
                            </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800">
                                How do I calculate conversion rate?
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Divide the number of conversions by total visitors and multiply the
                                result by 100.
                            </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800">
                                Why is conversion rate important?
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Conversion rate helps businesses understand how effectively their
                                website converts visitors into customers.
                            </p>
                        </div>

                        <div className="bg-gray-50 border rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800">
                                Can conversion rate be improved?
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Yes. Improving user experience, speed, and call-to-action placement
                                can significantly increase conversions.
                            </p>
                        </div>

                    </div>
                </div>

            </section>


            {/* Related Tools */}

            <section className="mt-10 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Related Marketing Calculators
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <a href="/tools/roi-calculator" className="border p-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                        ROI Calculator
                    </a>

                    <a href="/tools/profit-margin-calculator" className="border p-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                        Profit Margin Calculator
                    </a>

                    <a href="/tools/break-even-calculator" className="border p-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                        Break Even Calculator
                    </a>

                    <a href="/tools/cpm-calculator" className="border p-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                        CPM Calculator
                    </a>

                    <a href="/tools/cpc-calculator" className="border p-4 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                        CPC Calculator
                    </a>

                </div>
            </section>

        </div>
    );
}