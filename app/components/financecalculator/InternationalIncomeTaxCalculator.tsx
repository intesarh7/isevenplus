"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function InternationalIncomeTaxCalculator() {
    const [country, setCountry] = useState<string>("india");
    const [income, setIncome] = useState<string>("");
    const [result, setResult] = useState<any>(null);

    const calculateTax = () => {
        const annualIncome = parseFloat(income) || 0;
        if (!annualIncome) return;

        let tax = 0;

        if (country === "india") {
            if (annualIncome > 1000000) {
                tax += (annualIncome - 1000000) * 0.30;
                tax += 500000 * 0.20;
                tax += 250000 * 0.05;
            } else if (annualIncome > 500000) {
                tax += (annualIncome - 500000) * 0.20;
                tax += 250000 * 0.05;
            } else if (annualIncome > 250000) {
                tax += (annualIncome - 250000) * 0.05;
            }
        }

        else if (country === "usa") {
            if (annualIncome > 95375) {
                tax += (annualIncome - 95375) * 0.24;
                tax += (95375 - 44725) * 0.22;
                tax += (44725 - 11000) * 0.12;
                tax += 11000 * 0.10;
            } else if (annualIncome > 44725) {
                tax += (annualIncome - 44725) * 0.22;
                tax += (44725 - 11000) * 0.12;
                tax += 11000 * 0.10;
            } else if (annualIncome > 11000) {
                tax += (annualIncome - 11000) * 0.12;
                tax += 11000 * 0.10;
            } else {
                tax += annualIncome * 0.10;
            }
        }

        else if (country === "uk") {
            if (annualIncome > 125140) {
                tax += (annualIncome - 125140) * 0.45;
                tax += (125140 - 50270) * 0.40;
                tax += (50270 - 12570) * 0.20;
            } else if (annualIncome > 50270) {
                tax += (annualIncome - 50270) * 0.40;
                tax += (50270 - 12570) * 0.20;
            } else if (annualIncome > 12570) {
                tax += (annualIncome - 12570) * 0.20;
            }
        }

        else if (country === "uae") {
            tax = 0;
        }

        const netIncome = annualIncome - tax;

        setResult({
            tax: tax.toFixed(2),
            netIncome: netIncome.toFixed(2),
        });
    };

    const tryExample = () => {
        setCountry("usa");
        setIncome("85000");
    };

    const resetFields = () => {
        setCountry("india");
        setIncome("");
        setResult(null);
    };

    return (
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">

            <h2 className="text-3xl font-bold text-center mb-8">
                International Income Tax Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium">Select Country</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2"
                    >
                        <option value="india">India</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="uae">UAE</option>
                    </select>
                </div>

                <Input label="Annual Income" value={income} onChange={setIncome} />

            </div>

            {/* Buttons */}
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

            {result && (
                <div className="mt-10 p-6 bg-green-50 border rounded-xl text-center">
                    <h3 className="text-xl font-semibold">
                        Estimated Tax: {result.tax}
                    </h3>
                    <p className="text-lg mt-2">
                        Net Income After Tax: {result.netIncome}
                    </p>
                </div>
            )}

            {/* SEO CONTENT SECTION */}
            <div className="max-w-7xl mx-auto mt-16 px-2">

                <h2 className="text-3xl font-bold mb-6">
                    International Income Tax Calculator – Compare Global Tax Rates Easily
                </h2>

                <p className="text-gray-700 leading-7 mb-6">
                    The International Income Tax Calculator helps individuals estimate income tax
                    across multiple countries including India, United States, United Kingdom,
                    and UAE. Tax rules vary significantly between countries, and understanding
                    your tax liability is essential for financial planning, relocation decisions,
                    and global income management.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Why International Tax Comparison is Important
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    With remote work and global employment opportunities increasing, many
                    professionals earn income across borders. Comparing tax systems helps
                    individuals understand take-home salary differences, effective tax rates,
                    and long-term savings potential.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Income Tax in India
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    India follows a progressive tax system with slab-based taxation. Tax rates
                    increase as income rises. Individuals can choose between old and new tax
                    regimes depending on eligibility for deductions and exemptions.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Income Tax in the United States
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The United States uses a federal progressive tax system with multiple tax brackets.
                    In addition to federal tax, individuals may also be subject to state taxes,
                    depending on their residence.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Income Tax in the United Kingdom
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The UK provides a personal allowance threshold. Income above that is taxed
                    at basic, higher, and additional rates depending on annual earnings.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Income Tax in UAE
                </h3>

                <p className="text-gray-700 leading-7 mb-6">
                    The UAE does not impose personal income tax on salaries, making it
                    attractive for expatriates and professionals seeking tax-efficient income.
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                    Benefits of Using iSevenPlus International Tax Calculator
                </h3>

                <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                    <li>Instant global income tax estimation</li>
                    <li>Country-wise tax comparison</li>
                    <li>Helpful for expatriates and remote workers</li>
                    <li>Supports better relocation planning</li>
                    <li>Mobile-friendly and easy to use</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">
                    Frequently Asked Questions (FAQs)
                </h3>

                <div className="space-y-6 text-gray-700">

                    <div>
                        <p className="font-semibold">
                            Which country has the lowest income tax?
                        </p>
                        <p>
                            Countries like the UAE do not impose personal income tax on salary,
                            making them attractive for professionals.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Does this calculator include state or local taxes?
                        </p>
                        <p>
                            The calculator provides simplified national tax estimation.
                            State or local taxes may vary by region.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">
                            Can I use this for expatriate tax planning?
                        </p>
                        <p>
                            Yes, this tool helps compare estimated tax liabilities across countries
                            before making relocation decisions.
                        </p>
                    </div>

                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">
                    Plan Your Global Income Smartly
                </h3>

                <p className="text-gray-700 leading-7">
                    Whether you are a freelancer, remote worker, expatriate, or multinational
                    professional, understanding international tax differences can significantly
                    impact your net income. Use the iSevenPlus International Income Tax Calculator
                    to make informed financial decisions and optimize your global earnings.
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