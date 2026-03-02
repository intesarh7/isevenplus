"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function TakeHomeSalaryCalculator() {

    const [ctc, setCtc] = useState("");
    const [basicPercent, setBasicPercent] = useState("40");
    const [hraPercent, setHraPercent] = useState("20");
    const [pfPercent, setPfPercent] = useState("12");
    const [professionalTax, setProfessionalTax] = useState("2500");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const annualCTC = parseFloat(ctc);
        const basic = (annualCTC * parseFloat(basicPercent)) / 100;
        const hra = (annualCTC * parseFloat(hraPercent)) / 100;
        const pf = (basic * parseFloat(pfPercent)) / 100;
        const profTax = parseFloat(professionalTax);

        if (!annualCTC) return;

        // Simplified income tax estimation (example slab logic)
        let incomeTax = 0;
        if (annualCTC > 1000000) incomeTax = annualCTC * 0.2;
        else if (annualCTC > 500000) incomeTax = annualCTC * 0.1;

        const totalDeductions = pf + profTax + incomeTax;
        const takeHomeAnnual = annualCTC - totalDeductions;
        const takeHomeMonthly = takeHomeAnnual / 12;

        setResult({
            basic: basic.toFixed(0),
            hra: hra.toFixed(0),
            pf: pf.toFixed(0),
            incomeTax: incomeTax.toFixed(0),
            takeHomeAnnual: takeHomeAnnual.toFixed(0),
            takeHomeMonthly: takeHomeMonthly.toFixed(0),
        });
    };

    const tryExample = () => {
        setCtc("800000");
        setBasicPercent("40");
        setHraPercent("20");
        setPfPercent("12");
        setProfessionalTax("2500");
    };

    const resetFields = () => {
        setCtc("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Take Home Salary Calculator (CTC to In-hand)
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input type="number"
                    placeholder="Annual CTC (₹)"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number"
                    placeholder="Basic Salary (%)"
                    value={basicPercent}
                    onChange={(e) => setBasicPercent(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number"
                    placeholder="HRA (%)"
                    value={hraPercent}
                    onChange={(e) => setHraPercent(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number"
                    placeholder="PF (%) of Basic"
                    value={pfPercent}
                    onChange={(e) => setPfPercent(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number"
                    placeholder="Professional Tax (Annual ₹)"
                    value={professionalTax}
                    onChange={(e) => setProfessionalTax(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

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
                    <p><strong>Basic Salary:</strong> ₹{result.basic}</p>
                    <p><strong>HRA:</strong> ₹{result.hra}</p>
                    <p><strong>PF Deduction:</strong> ₹{result.pf}</p>
                    <p><strong>Income Tax (Est.):</strong> ₹{result.incomeTax}</p>
                    <p className="text-green-600 font-semibold">
                        Annual In-hand Salary: ₹{result.takeHomeAnnual}
                    </p>
                    <p className="text-blue-600 font-semibold">
                        Monthly In-hand Salary: ₹{result.takeHomeMonthly}
                    </p>
                </div>
            )}
            <section className="mt-14">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Take Home Salary Calculator – CTC to In-hand Salary
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The iSevenPlus Take Home Salary Calculator helps employees understand
                    the difference between CTC (Cost to Company) and actual monthly in-hand salary.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    What is CTC?
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    CTC includes basic salary, HRA, allowances, bonuses, PF contribution and
                    other benefits provided by the employer.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Why Your In-hand Salary is Lower?
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Provident Fund deduction</li>
                    <li>Professional tax</li>
                    <li>Income tax</li>
                    <li>Insurance contributions</li>
                </ul>
            </section>
        </div>
    );
}