"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import { IndianRupee, Percent, FileText } from "lucide-react";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    const annualIncome = Number(income);
    let calculatedTax = 0;

    if (regime === "new") {
      if (annualIncome <= 300000) calculatedTax = 0;
      else if (annualIncome <= 600000)
        calculatedTax = (annualIncome - 300000) * 0.05;
      else if (annualIncome <= 900000)
        calculatedTax =
          15000 + (annualIncome - 600000) * 0.1;
      else if (annualIncome <= 1200000)
        calculatedTax =
          45000 + (annualIncome - 900000) * 0.15;
      else if (annualIncome <= 1500000)
        calculatedTax =
          90000 + (annualIncome - 1200000) * 0.2;
      else
        calculatedTax =
          150000 + (annualIncome - 1500000) * 0.3;
    }

    if (regime === "old") {
      if (annualIncome <= 250000) calculatedTax = 0;
      else if (annualIncome <= 500000)
        calculatedTax = (annualIncome - 250000) * 0.05;
      else if (annualIncome <= 1000000)
        calculatedTax =
          12500 + (annualIncome - 500000) * 0.2;
      else
        calculatedTax =
          112500 + (annualIncome - 1000000) * 0.3;
    }

    setTax(calculatedTax);
  };

  return (
    <>
      <CalculatorLayout
        title="Income Tax Calculator (India)"
        result={
          tax !== null && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                Total Tax: ₹ {tax.toFixed(2)}
              </div>
            </div>
          )
        }
      >
        <div className="flex items-center gap-2">
          <IndianRupee size={18} />
          <input
            type="number"
            placeholder="Enter Annual Income"
            className="input"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setRegime("new")}
            className={`flex-1 py-2 rounded-xl ${regime === "new"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
              }`}
          >
            New Regime
          </button>

          <button
            onClick={() => setRegime("old")}
            className={`flex-1 py-2 rounded-xl ${regime === "old"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
              }`}
          >
            Old Regime
          </button>
        </div>

        <button
          onClick={calculateTax}
          className="btn flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          Calculate Tax
        </button>

      </CalculatorLayout>

      <section className="mt-14">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Income Tax Calculator (India) – Calculate Your Tax Liability Instantly
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The <strong>Income Tax Calculator (India)</strong> is a powerful online tool designed to help
          individuals estimate their income tax liability quickly and accurately.
          Understanding how much tax you need to pay each financial year is essential
          for proper financial planning and compliance with Indian tax laws. By using
          an Income Tax Calculator, taxpayers can easily calculate their tax based on
          income, deductions, and applicable tax slabs under the Indian Income Tax
          Act.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Instead of manually calculating complex tax slabs and deductions, this
          calculator simplifies the entire process. It allows users to enter their
          annual income, deductions such as Section 80C, 80D, and other tax-saving
          investments, and instantly shows the estimated tax payable. Whether you are
          a salaried employee, freelancer, or business owner, the Income Tax
          Calculator helps you plan your finances more effectively.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          What is an Income Tax Calculator?
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          An Income Tax Calculator is an online financial tool that calculates the
          total tax payable based on your annual income and deductions according to
          the current income tax slabs in India. It helps taxpayers understand their
          tax liability under both the <strong>old tax regime</strong> and the
          <strong>new tax regime</strong>. By comparing these regimes, individuals can
          choose the most beneficial option for minimizing their tax payments.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The calculator automatically applies the latest tax rates, standard
          deductions, and exemptions to give you an accurate estimate of your tax
          burden. This makes it extremely useful during financial planning,
          investment decisions, and tax filing preparation.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          Latest Income Tax Slabs in India
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Income tax in India is calculated based on different income slabs. These
          slabs vary depending on whether you choose the old tax regime or the new
          tax regime introduced to simplify taxation.
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
          <li>Up to ₹3,00,000 – No tax</li>
          <li>₹3,00,001 to ₹6,00,000 – 5% tax</li>
          <li>₹6,00,001 to ₹9,00,000 – 10% tax</li>
          <li>₹9,00,001 to ₹12,00,000 – 15% tax</li>
          <li>₹12,00,001 to ₹15,00,000 – 20% tax</li>
          <li>Above ₹15,00,000 – 30% tax</li>
        </ul>

        <p className="text-gray-600 mb-6 leading-relaxed">
          These slabs are applied progressively, meaning different portions of your
          income are taxed at different rates. An Income Tax Calculator automatically
          applies these slab rates to calculate the correct tax amount.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          How the Income Tax Calculator Works
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The Income Tax Calculator works by analyzing your total annual income and
          applying eligible deductions and exemptions. Once the deductions are
          applied, the calculator determines your taxable income and then calculates
          the tax based on the applicable tax slabs. The final result shows the total
          tax payable along with the breakdown of how the tax was calculated.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          The tool simplifies complex tax calculations and removes the chances of
          manual errors. Within seconds, you can determine how much tax you owe and
          adjust your investments to reduce your tax liability legally.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          Benefits of Using an Income Tax Calculator
        </h3>

        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
          <li>Quick and accurate income tax estimation</li>
          <li>Helps compare old and new tax regimes</li>
          <li>Improves financial and tax planning</li>
          <li>Reduces calculation errors</li>
          <li>Helps identify tax-saving opportunities</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          Key Deductions That Reduce Income Tax
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Several deductions are available under the Income Tax Act that help reduce
          your taxable income. By including these deductions in the calculator, you
          can estimate the exact tax savings you may achieve.
        </p>

        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
          <li>Section 80C – Investments up to ₹1,50,000</li>
          <li>Section 80D – Health insurance premium deductions</li>
          <li>Section 80E – Education loan interest deduction</li>
          <li>Section 24 – Home loan interest deduction</li>
          <li>Standard deduction for salaried individuals</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          Tips to Reduce Your Income Tax
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          To minimize your tax burden, it is important to plan your investments and
          expenses wisely. Start by maximizing deductions under Section 80C through
          instruments like PPF, ELSS, and life insurance policies. Investing in health
          insurance can provide additional deductions under Section 80D. If you have
          a home loan, both principal repayment and interest payments can reduce your
          taxable income.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Using an Income Tax Calculator throughout the year helps you track your tax
          liability and adjust investments before the financial year ends. This
          proactive approach ensures that you make the most of available tax-saving
          opportunities.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
          Why Use an Online Income Tax Calculator?
        </h3>

        <p className="text-gray-600 leading-relaxed">
          An online Income Tax Calculator provides instant results, eliminates manual
          errors, and helps taxpayers make informed financial decisions. Whether you
          are filing your tax return, planning investments, or estimating your
          take-home salary, this tool makes tax calculations simple and transparent.
          By understanding your tax obligations in advance, you can manage your
          finances better and achieve long-term financial stability.
        </p>

      </section>
    </>
  );
}