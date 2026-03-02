"use client";

import { useState, useRef } from "react";
import { Calculator, Printer, Download, RotateCcw } from "lucide-react";

export default function SalarySlipGenerator() {

    const printRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [basic, setBasic] = useState("");
    const [hra, setHra] = useState("");
    const [pf, setPf] = useState("");
    const [pt, setPt] = useState("");
    const [month, setMonth] = useState("");

    const [result, setResult] = useState<any>(null);

    const generateSlip = () => {

        const basicSalary = parseFloat(basic || "0");
        const hraAmount = parseFloat(hra || "0");
        const pfAmount = parseFloat(pf || "0");
        const ptAmount = parseFloat(pt || "0");

        const gross = basicSalary + hraAmount;
        const deductions = pfAmount + ptAmount;
        const net = gross - deductions;

        setResult({
            gross,
            deductions,
            net
        });
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const newWindow = window.open("", "", "width=900,height=650");
        newWindow?.document.write(printContent.innerHTML);
        newWindow?.document.close();
        newWindow?.print();
    };

    const resetFields = () => {
        setName("");
        setDesignation("");
        setBasic("");
        setHra("");
        setPf("");
        setPt("");
        setMonth("");
        setResult(null);
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Salary Slip Generator
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input placeholder="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input type="number" placeholder="Basic Salary (₹)"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input type="number" placeholder="HRA (₹)"
                    value={hra}
                    onChange={(e) => setHra(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input type="number" placeholder="PF Deduction (₹)"
                    value={pf}
                    onChange={(e) => setPf(e.target.value)}
                    className="border p-3 rounded-lg" />

                <input type="number" placeholder="Professional Tax (₹)"
                    value={pt}
                    onChange={(e) => setPt(e.target.value)}
                    className="border p-3 rounded-lg" />

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                    onClick={generateSlip}
                    className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calculator size={18} />
                    Generate
                </button>

                <button
                    onClick={handlePrint}
                    className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Printer size={18} />
                    Print
                </button>

                <button
                    onClick={() => window.print()}
                    className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Download size={18} />
                    Save as PDF
                </button>

                <button
                    onClick={resetFields}
                    className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <RotateCcw size={18} />
                    Reset
                </button>

            </div>

            {/* Salary Slip Preview */}
            {result && (
                <div ref={printRef} className="mt-10 border p-6 rounded-xl bg-green-50">

                    <h3 className="text-xl font-bold mb-4 text-center">
                        Salary Slip – {month}
                    </h3>

                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Designation:</strong> {designation}</p>

                    <hr className="my-4" />

                    <p><strong>Basic:</strong> ₹{basic}</p>
                    <p><strong>HRA:</strong> ₹{hra}</p>
                    <p><strong>Gross Salary:</strong> ₹{result.gross}</p>

                    <p><strong>PF:</strong> ₹{pf}</p>
                    <p><strong>Professional Tax:</strong> ₹{pt}</p>
                    <p><strong>Total Deductions:</strong> ₹{result.deductions}</p>

                    <h4 className="mt-4 text-green-600 font-bold">
                        Net Salary: ₹{result.net}
                    </h4>

                </div>
            )}

            <section className="mt-16">

                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Salary Slip Generator – Create Professional Payslip Online
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                    The iSevenPlus Salary Slip Generator helps employers, HR professionals
                    and employees create professional salary slips instantly. You can
                    generate a printable payslip and download it as PDF within seconds.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    What is a Salary Slip?
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    A salary slip (also called payslip) is an official document issued
                    by an employer that shows detailed salary breakdown including
                    earnings, deductions and net salary for a specific month.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    Components of a Salary Slip
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Basic Salary</li>
                    <li>House Rent Allowance (HRA)</li>
                    <li>Special Allowances</li>
                    <li>Provident Fund (PF) Deduction</li>
                    <li>Professional Tax</li>
                    <li>Income Tax Deduction (TDS)</li>
                    <li>Net Take Home Salary</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    Why Salary Slip is Important?
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Proof of income for loans and credit cards</li>
                    <li>Required for visa applications</li>
                    <li>Income tax filing</li>
                    <li>Job change documentation</li>
                    <li>Employment verification</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    Benefits of Using iSevenPlus Salary Slip Generator
                </h3>

                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Instant salary slip generation</li>
                    <li>Print-ready format</li>
                    <li>PDF download option</li>
                    <li>Professional layout</li>
                    <li>Free and secure usage</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    Who Can Use This Tool?
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    This salary slip maker is useful for small businesses, startups,
                    freelancers, HR managers, accountants and employees who need
                    quick and professional payslips.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
                    Frequently Asked Questions
                </h3>

                <p className="text-gray-600 leading-relaxed font-semibold mt-4">
                    Is this salary slip generator free?
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Yes, iSevenPlus Salary Slip Generator is completely free to use.
                </p>

                <p className="text-gray-600 leading-relaxed font-semibold mt-4">
                    Can I download the salary slip as PDF?
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Yes, you can print or save the salary slip as a PDF instantly.
                </p>

                <p className="text-gray-600 leading-relaxed font-semibold mt-4">
                    Is this salary slip legally valid?
                </p>
                <p className="text-gray-600 leading-relaxed">
                    The generated salary slip can be used for personal documentation,
                    but official company salary slips should include authorized signatures.
                </p>

            </section>

        </div>
    );
}