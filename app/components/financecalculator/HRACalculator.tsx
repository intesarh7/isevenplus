"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import { IndianRupee, Building, Home, Calculator, Settings, CheckCircle, TrendingUp, Sparkles, Lightbulb, HelpCircle } from "lucide-react";

export default function HRACalculator() {
  const [basic, setBasic] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rent, setRent] = useState("");
  const [metro, setMetro] = useState(true);
  const [result, setResult] = useState<any>(null);

  const calculateHRA = () => {
    const basicSalary = Number(basic);
    const hra = Number(hraReceived);
    const rentPaid = Number(rent);

    if (!basicSalary || !hra || !rentPaid) return;

    const percentSalary = metro
      ? basicSalary * 0.5
      : basicSalary * 0.4;

    const rentMinus10Percent =
      rentPaid - basicSalary * 0.1;

    const exemption = Math.min(
      hra,
      percentSalary,
      rentMinus10Percent
    );

    setResult({
      exemption,
      taxableHRA: hra - exemption,
    });
  };

  return (
    <>
      <CalculatorLayout
        title="HRA Calculator (India)"
        result={
          result && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                HRA Exemption: ₹{" "}
                {result.exemption.toFixed(2)}
              </div>

              <div className="flex items-center gap-2 text-red-600">
                <IndianRupee size={18} />
                Taxable HRA: ₹{" "}
                {result.taxableHRA.toFixed(2)}
              </div>
            </div>
          )
        }
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <IndianRupee size={18} />
            <input
              type="number"
              placeholder="Basic Salary (Annual)"
              className="input"
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee size={18} />
            <input
              type="number"
              placeholder="HRA Received (Annual)"
              className="input"
              value={hraReceived}
              onChange={(e) =>
                setHraReceived(e.target.value)
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Home size={18} />
            <input
              type="number"
              placeholder="Rent Paid (Annual)"
              className="input"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setMetro(true)}
              className={`flex-1 py-2 rounded-xl ${metro
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              <Building size={16} className="inline mr-1" />
              Metro City
            </button>

            <button
              onClick={() => setMetro(false)}
              className={`flex-1 py-2 rounded-xl ${!metro
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              Non-Metro
            </button>
          </div>

          <button
            onClick={calculateHRA}
            className="btn flex items-center justify-center gap-2"
          >
            <Calculator size={18} />
            Calculate HRA
          </button>
        </div>
      </CalculatorLayout>

      <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

        {/* 🔷 INTRO */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
            <Home className="text-indigo-600" size={22} />
            What is HRA (House Rent Allowance)?
          </h2>

          <p className="mt-4 text-sm md:text-base">
            <strong>House Rent Allowance (HRA)</strong> is a component of salary provided by employers to employees to help cover the cost of rented accommodation. It is partially or fully exempt from income tax under Section 10(13A) of the Income Tax Act, making it an important tax-saving benefit for salaried individuals in India.
          </p>

          <p className="mt-3 text-sm md:text-base">
            If you live in a rented house and receive HRA as part of your salary, you can claim tax exemption on it. The exemption amount depends on multiple factors such as your salary, rent paid, and city of residence.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Our <strong>HRA Calculator (India)</strong> helps you calculate your HRA exemption instantly and accurately, making tax planning easier.
          </p>
        </div>

        {/* 🔷 FORMULA */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="text-indigo-600" size={20} />
            HRA Calculation Formula
          </h3>

          <p className="mt-3 text-sm md:text-base">
            The HRA exemption is calculated as the minimum of the following three values:
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Actual HRA received from employer
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              50% of salary (for metro cities) or 40% (for non-metro)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-600 mt-1" size={16} />
              Rent paid minus 10% of salary
            </li>
          </ul>

          <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
            HRA Exemption = Minimum of above three values
          </div>
        </div>

        {/* 🔷 HOW IT WORKS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="text-purple-600" size={20} />
            How to Use HRA Calculator?
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter your basic salary
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter HRA received from employer
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter rent paid monthly
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Select your city (metro / non-metro)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Click Calculate to get exemption instantly
            </li>
          </ul>
        </div>

        {/* 🔷 EXAMPLE */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={20} />
            Example of HRA Calculation
          </h3>

          <p className="mt-3 text-sm md:text-base">
            Suppose your salary details are:
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4 text-sm md:text-base space-y-1">
            <p>Basic Salary: ₹40,000/month</p>
            <p>HRA Received: ₹20,000/month</p>
            <p>Rent Paid: ₹18,000/month</p>
            <p>City: Metro</p>
          </div>

          <p className="mt-3 text-sm md:text-base">
            Based on the formula, the minimum value will be considered as HRA exemption. The remaining amount will be taxable.
          </p>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-pink-600" size={20} />
            Benefits of HRA Calculator
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Accurate tax saving calculation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Helps in financial planning
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Easy to use and instant results
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              100% free tool
            </li>
          </ul>
        </div>

        {/* 🔷 TIPS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={20} />
            Tips to Maximize HRA Tax Benefits
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Pay rent through bank transfer for proof
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Keep rent receipts and agreement
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Claim maximum exemption based on city type
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Combine with other deductions like 80C
            </li>
          </ul>
        </div>

        {/* 🔷 FAQ */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="text-indigo-600" size={20} />
            Frequently Asked Questions
          </h3>

          <div className="mt-4 space-y-5 text-sm md:text-base">

            <div>
              <h4 className="font-semibold">
                1. Can I claim HRA without paying rent?
              </h4>
              <p className="text-gray-600 mt-1">
                No, HRA exemption is only available if you actually pay rent.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                2. Is HRA taxable?
              </h4>
              <p className="text-gray-600 mt-1">
                Partially. The exempt portion is tax-free, and the rest is taxable.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                3. Can I claim both HRA and home loan?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, under certain conditions you can claim both benefits.
              </p>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}