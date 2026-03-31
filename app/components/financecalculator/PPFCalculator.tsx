"use client";

import { useState } from "react";
import { Calculator, CheckCircle, TrendingUp, ShieldCheck, Sparkles, BarChart3, Lightbulb } from "lucide-react";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState("");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(yearlyInvestment);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    if (!P || !r || !t) return;

    let totalAmount = 0;

    for (let i = 1; i <= t; i++) {
      totalAmount = (totalAmount + P) * (1 + r);
    }

    const totalInvested = P * t;
    const totalInterest = totalAmount - totalInvested;

    setResult({
      totalInvested: totalInvested.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      maturityAmount: totalAmount.toFixed(2),
    });
  };

  const loadExample = () => {
    setYearlyInvestment("100000");
    setRate("7.1");
    setYears("15");
    setResult(null);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        PPF Calculator
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Yearly Investment (₹)"
          value={yearlyInvestment}
          onChange={(e) => setYearlyInvestment(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Investment Period (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold transition"
        >
          Calculate
        </button>

        <button
          onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-medium"
        >
          Try Example (₹1,00,000 yearly for 15 years @7.1%)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-semibold">
            Total Invested: ₹{result.totalInvested}
          </p>
          <p>
            Total Interest Earned: ₹{result.totalInterest}
          </p>
          <p className="text-lg font-bold">
            Maturity Amount: ₹{result.maturityAmount}
          </p>
        </div>
      )}

      {/* SEO Explanation Section */}
      <div className="mt-10 border-t pt-8 space-y-8 text-gray-700 leading-relaxed">

        {/* 🔷 HEADER */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Calculator className="text-indigo-600" size={20} />
            PPF Calculator Example
          </h3>

          <p className="text-sm md:text-base mt-2 text-gray-600">
            Let’s understand how a <strong>PPF Calculator</strong> works with a real-life investment example.
          </p>
        </div>

        {/* 🔷 EXAMPLE BOX */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-2 text-sm md:text-base">

          <p>
            Suppose you invest <strong>₹1,00,000 every year</strong> in a Public Provident Fund (PPF) account
            for <strong>15 years</strong> at an interest rate of <strong>7.1% per annum</strong>.
          </p>

          <p className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={16} />
            <strong>Total Investment:</strong> ₹15,00,000
          </p>

          <p className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={16} />
            <strong>Estimated Interest Earned:</strong> ₹12,12,000+
          </p>

          <p className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={16} />
            <strong>Maturity Amount:</strong> ₹27,12,000+
          </p>

        </div>

        {/* 🔷 EXPLANATION */}
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={18} />
            How PPF Returns are Calculated
          </h4>

          <p className="mt-2 text-sm md:text-base">
            The <strong>PPF (Public Provident Fund)</strong> uses compound interest, which means your interest
            earns additional interest over time. This is why long-term investments in PPF grow significantly.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Interest in PPF is calculated annually and compounded yearly. The longer you stay invested,
            the higher your total returns due to the power of compounding.
          </p>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <ShieldCheck className="text-green-600" size={18} />
            Benefits of Investing in PPF
          </h4>

          <ul className="mt-3 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Tax deduction under Section 80C
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Completely tax-free returns (EEE category)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Safe government-backed investment
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Ideal for long-term wealth creation
            </li>
          </ul>
        </div>

        {/* 🔷 WHY USE */}
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="text-pink-600" size={18} />
            Why Use a PPF Calculator?
          </h4>

          <p className="mt-2 text-sm md:text-base">
            A <strong>PPF Calculator</strong> helps you estimate your maturity amount, total investment,
            and interest earned without doing complex calculations manually.
          </p>

          <ul className="mt-3 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Plan long-term savings efficiently
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Compare different investment amounts
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Understand compounding benefits
            </li>
          </ul>
        </div>

        {/* 🔷 EXTRA CONTENT */}
        <div className="space-y-8">

          {/* FACTORS */}
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={18} />
              Key Factors That Affect PPF Returns
            </h4>

            <p className="mt-2 text-sm md:text-base">
              The final maturity amount of your <strong>PPF investment</strong> depends on several important factors. Understanding these factors can help you maximize your returns:
            </p>

            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Annual Investment Amount:</strong> Higher yearly investment leads to higher maturity value.</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Interest Rate:</strong> PPF interest is set by the government and may change quarterly.</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Investment Duration:</strong> Longer duration increases compounding benefits.</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                <span><strong>Deposit Timing:</strong> Investing before the 5th of every month can maximize interest.</span>
              </li>
            </ul>
          </div>

          {/* TIPS */}
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={18} />
              Tips to Maximize PPF Returns
            </h4>

            <p className="mt-2 text-sm md:text-base">
              If you want to get the best returns from your <strong>Public Provident Fund</strong>, follow these smart investment strategies:
            </p>

            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                Invest the maximum limit (₹1.5 lakh per year)
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                Invest early in the financial year (April)
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                Continue investment even after 15 years (extension option)
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-1" />
                Avoid partial withdrawals to maintain compounding
              </li>
            </ul>
          </div>

          {/* COMPARISON */}
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={18} />
              PPF vs Other Investment Options
            </h4>

            <p className="mt-2 text-sm md:text-base">
              Compared to other investment options like Fixed Deposits (FD), Mutual Funds, and National Savings Certificate (NSC), PPF offers a unique combination of safety and tax benefits.
            </p>

            <p className="mt-3 text-sm md:text-base">
              While mutual funds may provide higher returns, they come with market risk. Fixed deposits are safer but taxable. PPF stands out because it offers <strong>tax-free returns, guaranteed interest, and government security</strong>.
            </p>

            <p className="mt-3 text-sm md:text-base">
              This makes PPF an ideal choice for conservative investors who want stable long-term growth without risk.
            </p>
          </div>

          {/* IMPORTANCE */}
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              Why PPF is a Must-Have Investment
            </h4>

            <p className="mt-2 text-sm md:text-base">
              A <strong>PPF account</strong> is one of the best long-term investment options in India, especially for salaried individuals and risk-averse investors. It helps in building a retirement corpus while saving taxes.
            </p>

            <p className="mt-3 text-sm md:text-base">
              Since PPF falls under the <strong>EEE (Exempt-Exempt-Exempt)</strong> category, your investment, interest earned, and maturity amount are all tax-free. This makes it more attractive compared to many other financial instruments.
            </p>

            <p className="mt-3 text-sm md:text-base">
              By using our <strong>PPF Calculator</strong>, you can plan your investments better and achieve your long-term financial goals with confidence.
            </p>
          </div>

        </div>

        {/* 🔷 SEO PARAGRAPH */}
        <div>
          <p className="text-sm md:text-base">
            Our <strong>PPF Calculator</strong> is one of the best tools to calculate your
            <strong> PPF maturity amount</strong>, <strong>interest earned</strong>, and
            <strong> total investment</strong>. It is perfect for investors looking for
            <strong> safe tax-saving investments in India</strong>.
          </p>
        </div>

      </div>
    </div >
  );
}