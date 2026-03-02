"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function CompleteIncomeTaxCalculator() {
    const [income, setIncome] = useState<string>("");
    const [deduction80C, setDeduction80C] = useState<string>("");
    const [otherDeduction, setOtherDeduction] = useState<string>("");
    const [regime, setRegime] = useState<string>("old");

    const [result, setResult] = useState<number | null>(null);

    const calculateOldTax = (taxableIncome: number) => {
        let tax = 0;

        if (taxableIncome > 1000000) {
            tax += (taxableIncome - 1000000) * 0.30;
            taxableIncome = 1000000;
        }
        if (taxableIncome > 500000) {
            tax += (taxableIncome - 500000) * 0.20;
            taxableIncome = 500000;
        }
        if (taxableIncome > 250000) {
            tax += (taxableIncome - 250000) * 0.05;
        }

        return tax;
    };

    const calculateNewTax = (taxableIncome: number) => {
        let tax = 0;

        if (taxableIncome > 1500000) {
            tax += (taxableIncome - 1500000) * 0.30;
            taxableIncome = 1500000;
        }
        if (taxableIncome > 1200000) {
            tax += (taxableIncome - 1200000) * 0.20;
            taxableIncome = 1200000;
        }
        if (taxableIncome > 900000) {
            tax += (taxableIncome - 900000) * 0.15;
            taxableIncome = 900000;
        }
        if (taxableIncome > 600000) {
            tax += (taxableIncome - 600000) * 0.10;
            taxableIncome = 600000;
        }
        if (taxableIncome > 300000) {
            tax += (taxableIncome - 300000) * 0.05;
        }

        return tax;
    };

    const calculateTax = () => {
        const annualIncome = parseFloat(income) || 0;
        const d80c = parseFloat(deduction80C) || 0;
        const other = parseFloat(otherDeduction) || 0;

        let taxableIncome = annualIncome;

        if (regime === "old") {
            taxableIncome = annualIncome - d80c - other - 50000; // standard deduction
            if (taxableIncome < 0) taxableIncome = 0;
            setResult(calculateOldTax(taxableIncome));
        } else {
            taxableIncome = annualIncome - 50000; // standard deduction
            if (taxableIncome < 0) taxableIncome = 0;
            setResult(calculateNewTax(taxableIncome));
        }
    };

    const tryExample = () => {
        setIncome("1200000");
        setDeduction80C("150000");
        setOtherDeduction("50000");
        setRegime("old");
    };

    const resetFields = () => {
        setIncome("");
        setDeduction80C("");
        setOtherDeduction("");
        setRegime("old");
        setResult(null);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                Complete Income Tax Calculator (Old vs New Regime)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Input label="Annual Income (₹)" value={income} onChange={setIncome} />
                <Input label="Section 80C Deduction (₹)" value={deduction80C} onChange={setDeduction80C} />
                <Input label="Other Deductions (₹)" value={otherDeduction} onChange={setOtherDeduction} />

                <div>
                    <label className="block text-sm font-medium">Select Tax Regime</label>
                    <select
                        value={regime}
                        onChange={(e) => setRegime(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2"
                    >
                        <option value="old">Old Regime</option>
                        <option value="new">New Regime</option>
                    </select>
                </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={calculateTax}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Calculate Tax
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

            {result !== null && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl text-center">
                    <h3 className="text-2xl font-bold">
                        Total Income Tax: ₹ {result.toLocaleString()}
                    </h3>
                </div>
            )}
            {/* SEO CONTENT SECTION */}
            <div className="max-w-7xl mx-auto mt-16 px-2">

                <h2 className="text-3xl font-bold mb-6">
                    Income Tax Calculator – Compare Old vs New Tax Regime in India
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    The Income Tax Calculator helps individuals estimate their annual tax liability
                    under both the old and new tax regimes in India. With changing tax slabs and
                    deduction rules, choosing the right regime can significantly impact your tax savings.
                    Our iSevenPlus Income Tax Calculator provides instant comparison and accurate
                    tax estimation based on your annual income and deductions.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    What is the Old Tax Regime?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The old tax regime allows taxpayers to claim various deductions such as
                    Section 80C (up to ₹1.5 lakh), Section 80D (health insurance), HRA,
                    home loan interest, and other exemptions. Although tax rates are higher,
                    deductions can significantly reduce taxable income.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    What is the New Tax Regime?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The new tax regime offers lower tax rates but removes most deductions
                    and exemptions. It simplifies tax calculation and is beneficial for
                    individuals who do not claim many deductions.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Old vs New Regime – Which is Better?
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The better regime depends on your income level and eligible deductions.
                    If you invest heavily in tax-saving instruments like PPF, ELSS,
                    life insurance, or pay home loan interest, the old regime may offer
                    better savings. Otherwise, the new regime might result in lower tax.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    How Income Tax is Calculated
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    Income tax is calculated using progressive slab rates. As income increases,
                    higher portions of income are taxed at higher rates. Our calculator automatically
                    applies slab-wise calculation and deducts eligible deductions to give accurate results.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why Use iSevenPlus Income Tax Calculator?
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Instant old vs new regime comparison</li>
                    <li>Automatic slab-based tax calculation</li>
                    <li>Standard deduction included</li>
                    <li>User-friendly and mobile responsive interface</li>
                    <li>Accurate and updated India tax structure</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">
                    Frequently Asked Questions (FAQs)
                </h3>

                <div className="space-y-6 text-gray-700">

                    <div>
                        <p className="font-semibold">
                            Is standard deduction available in both regimes?
                        </p>
                        <p>
                            Yes, the standard deduction is available under both the old and new regimes.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Can I switch between tax regimes every year?
                        </p>
                        <p>
                            Salaried individuals can choose between regimes every financial year,
                            but business owners may have restrictions.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Does this calculator include cess and surcharge?
                        </p>
                        <p>
                            Basic calculation is provided. You can extend it to include
                            4% health & education cess and surcharge if applicable.
                        </p>
                    </div>

                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">
                    Plan Your Taxes Smartly
                </h3>

                <p className="text-gray-700 leading-7">
                    Understanding your tax liability helps in better financial planning.
                    Use the iSevenPlus Income Tax Calculator to compare regimes,
                    optimize deductions, and maximize savings legally and efficiently.
                </p>

            </div>
        </div>
    );
}

type InputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

function Input({ label, value, onChange }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg p-3 mt-2"
            />
        </div>
    );
}