"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  RotateCcw,
  Sparkles,
  Calculator,
  HelpCircle,
  BarChart3,
  Percent,
  CheckCircle,
  Zap,
  PieChart,
  Tag,
} from "lucide-react";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = Number(principal);
    const R = Number(rate) / 12 / 100;
    const N = Number(tenure) * 12;

    if (!P || !R || !N) return;

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPayment = EMI * N;
    const totalInterest = totalPayment - P;

    setResult({
      emi: EMI,
      yearlyEmi: EMI * 12,
      totalPayment,
      totalInterest,
    });
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResult(null);
  };

  const handleExample = () => {
    setPrincipal("500000");
    setRate("10");
    setTenure("5");
  };

  return (
    <>
      <CalculatorLayout
        title="EMI Calculator"
        result={
          result && (
            <div className="bg-white border rounded-2xl shadow-md overflow-hidden">

              {/* Header */}
              <div className="bg-linear-to-r from-indigo-500 to-indigo-600 text-white px-5 py-3 flex items-center gap-2">
                <TrendingUp size={18} />
                EMI Breakdown
              </div>

              {/* Content */}
              <div className="p-5 grid sm:grid-cols-2 gap-4">

                {/* Monthly EMI */}
                <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="text-indigo-600" size={18} />
                    <span className="text-sm">Monthly EMI</span>
                  </div>
                  <span className="font-bold text-indigo-600">
                    ₹ {result.emi.toFixed(2)}
                  </span>
                </div>

                {/* Yearly EMI */}
                <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-600" size={18} />
                    <span className="text-sm">Yearly EMI</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    ₹ {result.yearlyEmi.toFixed(2)}
                  </span>
                </div>

                {/* Total Payment */}
                <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-600" size={18} />
                    <span className="text-sm">Total Payment</span>
                  </div>
                  <span className="font-bold text-green-600">
                    ₹ {result.totalPayment.toFixed(2)}
                  </span>
                </div>

                {/* Interest */}
                <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="text-red-600" size={18} />
                    <span className="text-sm">Total Interest</span>
                  </div>
                  <span className="font-bold text-red-600">
                    ₹ {result.totalInterest.toFixed(2)}
                  </span>
                </div>

              </div>
            </div>
          )
        }
      >
        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="number"
            placeholder="Loan Amount (₹)"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="number"
            placeholder="Loan Tenure (Years)"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* BUTTON SECTION (iSevenPlus style) */}
          <div className="flex flex-col sm:flex-row gap-3 md:col-span-2">

            <button
              onClick={calculate}
              className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Calculate EMI
            </button>

            <button
              onClick={handleExample}
              className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              Try Example
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              Reset
            </button>

          </div>

        </div>
      </CalculatorLayout>
      <div className="mx-auto mt-10 space-y-10">

        {/* TOP CTA */}
        <section className="bg-linear-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border shadow-sm">
          <div className="grid sm:grid-cols-3 gap-4 text-sm font-medium">

            <div className="flex items-center gap-2 text-indigo-700">
              <Zap size={18} />
              Calculate EMI instantly with accurate results
            </div>

            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={18} />
              100% Free EMI Calculator – No Signup Required
            </div>

            <div className="flex items-center gap-2 text-blue-700">
              <BarChart3 size={18} />
              Monthly, Yearly & Total Payment Breakdown
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Calculator className="text-indigo-600" />
            EMI Calculator – Calculate Loan EMI Online in India
          </h2>

          <p className="text-gray-700 leading-relaxed">
            EMI Calculator ek powerful financial tool hai jo aapko kisi bhi loan ka monthly installment calculate karne me help karta hai. Chahe aap home loan, personal loan, car loan ya business loan lene wale ho — EMI calculation aapke financial planning ka sabse important part hota hai.
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            Is EMI calculator ki madad se aap easily monthly EMI, yearly payment, total interest aur total repayment amount calculate kar sakte hain. Ye tool specially India users ke liye optimized hai aur accurate results deta hai.
          </p>
        </section>

        {/* WHAT IS EMI */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <IndianRupee className="text-green-600" />
            What is EMI (Equated Monthly Installment)?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            EMI ka matlab hota hai Equated Monthly Installment. Ye ek fixed amount hota hai jo borrower har mahine bank ya financial institution ko repay karta hai jab tak loan poora clear na ho jaye.
          </p>

          <p className="text-gray-700 mt-3">
            EMI me do components hote hain:
          </p>

          <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
            <li>Principal Amount (loan amount)</li>
            <li>Interest Amount (bank charge)</li>
          </ul>
        </section>

        {/* FORMULA */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Percent className="text-purple-600" />
            EMI Calculation Formula
          </h2>

          <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm">
            EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
          </div>

          <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
            <li>P = Loan Amount</li>
            <li>R = Monthly Interest Rate</li>
            <li>N = Loan Duration (months)</li>
          </ul>
        </section>

        {/* BENEFITS */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <TrendingUp className="text-indigo-600" />
            Benefits of Using EMI Calculator
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Instant EMI calculation</li>
            <li>Better financial planning</li>
            <li>Compare loan options easily</li>
            <li>Understand total interest payable</li>
            <li>Avoid financial mistakes</li>
          </ul>
        </section>

        {/* USE CASE */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <PieChart className="text-indigo-600" />
            Where EMI Calculator is Used
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Home Loan EMI calculation</li>
            <li>Car Loan EMI calculation</li>
            <li>Personal Loan planning</li>
            <li>Education Loan calculation</li>
            <li>Business Loan estimation</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <HelpCircle className="text-indigo-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How to calculate EMI?",
                a: "Use EMI formula or online EMI calculator for instant results."
              },
              {
                q: "What affects EMI amount?",
                a: "Loan amount, interest rate, and tenure affect EMI."
              },
              {
                q: "Is EMI calculator free?",
                a: "Yes, it is 100% free."
              },
              {
                q: "Can I reduce EMI?",
                a: "Yes, by increasing tenure or reducing interest rate."
              }
            ].map((faq, i) => (
              <div key={i} className="border rounded-xl p-4">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="text-gray-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TAGS */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Tag className="text-indigo-600" />
            Related Keywords
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "emi calculator india",
              "loan emi calculator",
              "home loan emi calculator",
              "car loan emi calculator",
              "personal loan emi calculator",
              "emi calculation formula"
            ].map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}