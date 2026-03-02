"use client";

import { useState } from "react";
import { Receipt, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function PayrollTaxCalculator() {
    const [grossSalary, setGrossSalary] = useState("");
    const [taxRate, setTaxRate] = useState("");
    const [otherDeductions, setOtherDeductions] = useState("");

    const [taxAmount, setTaxAmount] = useState<number | null>(null);
    const [netSalary, setNetSalary] = useState<number | null>(null);

    const calculatePayroll = () => {
        const salary = parseFloat(grossSalary);
        const tax = parseFloat(taxRate);
        const deductions = parseFloat(otherDeductions) || 0;

        if (isNaN(salary) || isNaN(tax)) {
            setTaxAmount(null);
            return;
        }

        const calculatedTax = (salary * tax) / 100;
        const net = salary - calculatedTax - deductions;

        setTaxAmount(parseFloat(calculatedTax.toFixed(2)));
        setNetSalary(parseFloat(net.toFixed(2)));
    };

    const tryExample = () => {
        setGrossSalary("50000");
        setTaxRate("10");
        setOtherDeductions("2000");

        const calculatedTax = (50000 * 10) / 100;
        const net = 50000 - calculatedTax - 2000;

        setTaxAmount(calculatedTax);
        setNetSalary(net);
    };

    const resetFields = () => {
        setGrossSalary("");
        setTaxRate("");
        setOtherDeductions("");
        setTaxAmount(null);
        setNetSalary(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Receipt className="text-green-600" />
                Payroll Tax Calculator
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <input
                    type="number"
                    placeholder="Gross Salary (₹)"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Tax Rate (%)"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Other Deductions (₹)"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculatePayroll}
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

            {taxAmount !== null && (
                <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">
                        Tax Amount: ₹ {taxAmount}
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        Net Salary: ₹ {netSalary}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Payroll Tax is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Payroll tax is calculated as a percentage of gross salary.
                    Additional deductions may also apply depending on company policy.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Net Salary = Gross Salary − Tax − Other Deductions
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Payroll Calculation is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Ensures accurate salary processing</li>
                    <li>Maintains tax compliance</li>
                    <li>Improves financial transparency</li>
                    <li>Helps employees understand deductions</li>
                </ul>

            </div>
        </div>
    );
}