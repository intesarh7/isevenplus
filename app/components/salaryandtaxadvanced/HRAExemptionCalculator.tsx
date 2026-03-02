"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function HRAExemptionCalculator() {

    const [basic, setBasic] = useState("");
    const [hraReceived, setHraReceived] = useState("");
    const [rentPaid, setRentPaid] = useState("");
    const [isMetro, setIsMetro] = useState("yes");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const basicSalary = parseFloat(basic);
        const hra = parseFloat(hraReceived);
        const rent = parseFloat(rentPaid);

        if (!basicSalary || !hra || !rent) return;

        const percentLimit = isMetro === "yes" ? 0.5 : 0.4;

        const option1 = hra;
        const option2 = basicSalary * percentLimit;
        const option3 = rent - (basicSalary * 0.1);

        const exemption = Math.min(option1, option2, option3);
        const taxableHRA = hra - exemption;

        setResult({
            exemption: exemption > 0 ? exemption.toFixed(0) : 0,
            taxableHRA: taxableHRA > 0 ? taxableHRA.toFixed(0) : 0
        });
    };

    const tryExample = () => {
        setBasic("600000");
        setHraReceived("240000");
        setRentPaid("300000");
        setIsMetro("yes");
    };

    const resetFields = () => {
        setBasic("");
        setHraReceived("");
        setRentPaid("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                HRA Exemption Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    placeholder="Annual Basic Salary (₹)"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Annual HRA Received (₹)"
                    value={hraReceived}
                    onChange={(e) => setHraReceived(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                    type="number"
                    placeholder="Annual Rent Paid (₹)"
                    value={rentPaid}
                    onChange={(e) => setRentPaid(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <select
                    value={isMetro}
                    onChange={(e) => setIsMetro(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="yes">Metro City (Delhi, Mumbai, Chennai, Kolkata)</option>
                    <option value="no">Non-Metro City</option>
                </select>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculate}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate
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

            {result && (
                <div className="mt-8 bg-gray-50 border rounded-xl p-6 space-y-3 text-gray-800">
                    <p className="text-green-600 font-semibold">
                        HRA Exemption Allowed: ₹{result.exemption}
                    </p>
                    <p className="text-red-600 font-semibold">
                        Taxable HRA: ₹{result.taxableHRA}
                    </p>
                </div>
            )}
            <section className="mt-14">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    HRA Exemption Calculator – Calculate Your Tax Savings
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus HRA Exemption Calculator helps salaried employees calculate
                    how much House Rent Allowance (HRA) is exempt from income tax under Section 10(13A).
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    HRA Exemption Formula
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Actual HRA received</li>
                    <li>50% of Basic Salary (Metro) or 40% (Non-Metro)</li>
                    <li>Rent paid minus 10% of Basic Salary</li>
                </ul>

                <p className="text-gray-600 mt-4">
                    The lowest of the above three values is allowed as tax exemption.
                </p>
            </section>
        </div>
    );
}