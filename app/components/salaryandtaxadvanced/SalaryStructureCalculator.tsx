"use client";

import { useState } from "react";
import { Briefcase, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function SalaryStructureCalculator() {
    const [ctc, setCtc] = useState("");
    const [basicPercent, setBasicPercent] = useState("40");
    const [hraPercent, setHraPercent] = useState("50");
    const [employerPercent, setEmployerPercent] = useState("12");

    const [basic, setBasic] = useState<number | null>(null);
    const [hra, setHra] = useState<number | null>(null);
    const [employerContribution, setEmployerContribution] = useState<number | null>(null);
    const [otherAllowances, setOtherAllowances] = useState<number | null>(null);

    const calculateStructure = () => {
        const totalCtc = parseFloat(ctc);
        const basicRate = parseFloat(basicPercent);
        const hraRate = parseFloat(hraPercent);
        const employerRate = parseFloat(employerPercent);

        if (isNaN(totalCtc) || isNaN(basicRate) || isNaN(hraRate) || isNaN(employerRate)) {
            setBasic(null);
            return;
        }

        const basicSalary = (totalCtc * basicRate) / 100;
        const hraAmount = (basicSalary * hraRate) / 100;
        const employerAmount = (basicSalary * employerRate) / 100;

        const remaining = totalCtc - (basicSalary + hraAmount + employerAmount);

        setBasic(parseFloat(basicSalary.toFixed(2)));
        setHra(parseFloat(hraAmount.toFixed(2)));
        setEmployerContribution(parseFloat(employerAmount.toFixed(2)));
        setOtherAllowances(parseFloat(remaining.toFixed(2)));
    };

    const tryExample = () => {
        setCtc("600000");
        setBasicPercent("40");
        setHraPercent("50");
        setEmployerPercent("12");

        const basicSalary = (600000 * 40) / 100;
        const hraAmount = (basicSalary * 50) / 100;
        const employerAmount = (basicSalary * 12) / 100;
        const remaining = 600000 - (basicSalary + hraAmount + employerAmount);

        setBasic(basicSalary);
        setHra(hraAmount);
        setEmployerContribution(employerAmount);
        setOtherAllowances(remaining);
    };

    const resetFields = () => {
        setCtc("");
        setBasicPercent("40");
        setHraPercent("50");
        setEmployerPercent("12");
        setBasic(null);
        setHra(null);
        setEmployerContribution(null);
        setOtherAllowances(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Briefcase className="text-green-600" />
                Salary Structure Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input
                    type="number"
                    placeholder="Annual CTC (₹)"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Basic Salary % of CTC"
                    value={basicPercent}
                    onChange={(e) => setBasicPercent(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="HRA % of Basic"
                    value={hraPercent}
                    onChange={(e) => setHraPercent(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Employer Contribution % of Basic"
                    value={employerPercent}
                    onChange={(e) => setEmployerPercent(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateStructure}
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

            {basic !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg space-y-2">
                    <p className="font-semibold">Basic Salary: ₹ {basic}</p>
                    <p className="font-semibold">HRA: ₹ {hra}</p>
                    <p className="font-semibold">Employer Contribution: ₹ {employerContribution}</p>
                    <p className="font-semibold">Other Allowances: ₹ {otherAllowances}</p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    What is Salary Structure?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Salary structure refers to the breakdown of total compensation (CTC)
                    into components like basic salary, HRA, allowances and employer contributions.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    CTC = Basic + HRA + Allowances + Employer Contribution
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Salary Structure Planning Matters?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Optimizes tax planning</li>
                    <li>Improves employee satisfaction</li>
                    <li>Ensures compliance</li>
                    <li>Helps in offer letter preparation</li>
                </ul>

            </div>
        </div>
    );
}