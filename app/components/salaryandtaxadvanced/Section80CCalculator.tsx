"use client";

import { useState } from "react";
import { Calculator, PlayCircle, RotateCcw } from "lucide-react";

export default function Section80CCalculator() {

    const [epf, setEpf] = useState("");
    const [ppf, setPpf] = useState("");
    const [elss, setElss] = useState("");
    const [insurance, setInsurance] = useState("");
    const [homeLoan, setHomeLoan] = useState("");
    const [tuition, setTuition] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {

        const total =
            parseFloat(epf || "0") +
            parseFloat(ppf || "0") +
            parseFloat(elss || "0") +
            parseFloat(insurance || "0") +
            parseFloat(homeLoan || "0") +
            parseFloat(tuition || "0");

        const maxDeduction = Math.min(total, 150000);

        setResult({
            totalInvestment: total.toFixed(0),
            eligibleDeduction: maxDeduction.toFixed(0),
            excess: total > 150000 ? (total - 150000).toFixed(0) : "0"
        });
    };

    const tryExample = () => {
        setEpf("60000");
        setPpf("30000");
        setElss("25000");
        setInsurance("20000");
        setHomeLoan("30000");
        setTuition("15000");
    };

    const resetFields = () => {
        setEpf("");
        setPpf("");
        setElss("");
        setInsurance("");
        setHomeLoan("");
        setTuition("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Section 80C Deduction Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input type="number" placeholder="EPF Contribution (₹)"
                    value={epf}
                    onChange={(e) => setEpf(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="PPF Investment (₹)"
                    value={ppf}
                    onChange={(e) => setPpf(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="ELSS Investment (₹)"
                    value={elss}
                    onChange={(e) => setElss(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Life Insurance Premium (₹)"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Home Loan Principal (₹)"
                    value={homeLoan}
                    onChange={(e) => setHomeLoan(e.target.value)}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />

                <input type="number" placeholder="Tuition Fees (₹)"
                    value={tuition}
                    onChange={(e) => setTuition(e.target.value)}
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
                    <p><strong>Total Investment:</strong> ₹{result.totalInvestment}</p>
                    <p className="text-green-600 font-semibold">
                        Eligible Deduction (Max ₹1.5L): ₹{result.eligibleDeduction}
                    </p>
                    {result.excess !== "0" && (
                        <p className="text-red-600">
                            Excess Investment (Not Eligible): ₹{result.excess}
                        </p>
                    )}
                </div>
            )}

            <section className="mt-14">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Section 80C Calculator – Maximize Your Tax Savings
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The Section 80C Calculator is a powerful financial planning tool that helps
                    taxpayers estimate how much tax they can save under Section 80C of the
                    Income Tax Act. Section 80C is one of the most popular tax-saving provisions
                    in India and allows individuals and Hindu Undivided Families (HUFs) to claim
                    deductions up to ₹1,50,000 per financial year by investing in approved
                    instruments. Using a calculator simplifies tax planning by showing how
                    different investments contribute to your total deduction and how they reduce
                    your taxable income.
                </p>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    Many taxpayers invest in various savings schemes without fully understanding
                    how these investments affect their tax liability. A Section 80C Calculator
                    solves this problem by quickly calculating the total eligible deduction and
                    the resulting tax savings. By entering the amounts invested in different
                    instruments, you can instantly see whether you have reached the ₹1,50,000
                    deduction limit and how much additional investment may still be required to
                    maximize your tax benefits.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    What is Section 80C?
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    Section 80C of the Income Tax Act provides deductions from your gross total
                    income when you invest in specific financial instruments or spend on certain
                    eligible expenses. The maximum deduction allowed under this section is
                    ₹1,50,000 in a financial year. By reducing your taxable income, these
                    deductions directly lower the total income tax you have to pay. This makes
                    Section 80C an essential component of financial planning for salaried
                    individuals and professionals.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Eligible Investments Under Section 80C
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                    A variety of investments and expenses qualify for deductions under Section
                    80C. These options allow taxpayers to combine tax savings with long-term
                    financial security and wealth creation.
                </p>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>EPF (Employee Provident Fund)</li>
                    <li>PPF (Public Provident Fund)</li>
                    <li>ELSS Mutual Funds</li>
                    <li>Life Insurance Premium</li>
                    <li>Home Loan Principal Repayment</li>
                    <li>Children’s Tuition Fees</li>
                    <li>Tax Saving Fixed Deposits (5-year lock-in)</li>
                    <li>National Savings Certificate (NSC)</li>
                    <li>Sukanya Samriddhi Yojana (SSY)</li>
                    <li>Senior Citizens Savings Scheme (SCSS)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    How the Section 80C Calculator Works
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    The Section 80C Calculator works by adding up all eligible investments made
                    during a financial year and applying the maximum deduction limit of
                    ₹1,50,000. Once the total eligible deduction is calculated, the tool shows
                    how much your taxable income will be reduced. This helps you estimate your
                    tax liability and understand whether your current investments are sufficient
                    to take full advantage of the deduction limit.
                </p>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    For example, if your taxable income before deductions is ₹8,00,000 and you
                    invest ₹1,50,000 in eligible Section 80C instruments, your taxable income
                    becomes ₹6,50,000. This reduction in taxable income can significantly lower
                    your total tax payable depending on your income tax slab.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Benefits of Using a Section 80C Calculator
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Quickly estimate your total tax deduction.</li>
                    <li>Understand how investments reduce taxable income.</li>
                    <li>Plan investments efficiently before the financial year ends.</li>
                    <li>Ensure you fully utilize the ₹1,50,000 deduction limit.</li>
                    <li>Compare different tax-saving investment options.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                    Tips to Maximize Your Section 80C Benefits
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    To get the maximum benefit from Section 80C, start planning your investments
                    early in the financial year instead of rushing at the end. Diversify your
                    investments across instruments such as PPF, ELSS, and life insurance to
                    balance risk and long-term returns. If you have a home loan, ensure that the
                    principal repayment is properly accounted for under Section 80C deductions.
                    Parents can also include tuition fees paid for their children as part of the
                    deduction.
                </p>

                <p className="text-gray-600 leading-relaxed">
                    Using a Section 80C Calculator regularly helps you stay on track with your
                    tax planning goals. By monitoring your investments and deductions throughout
                    the year, you can optimize your savings, reduce tax liability, and build a
                    stronger financial future.
                </p>
            </section>

        </div>
    );
}