"use client";

import { useState } from "react";
import { Home, Settings, CheckCircle, BarChart3, TrendingUp, Sparkles, Lightbulb, HelpCircle } from "lucide-react";

export default function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [propertyTaxYearly, setPropertyTaxYearly] = useState("");
  const [maintenanceMonthly, setMaintenanceMonthly] = useState("");
  const [stayYears, setStayYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateEMI = (P: number, annualRate: number, years: number) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    return (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
  };

  const calculate = () => {
    const rent = parseFloat(monthlyRent);
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const loanTerm = parseFloat(loanYears);
    const tax = parseFloat(propertyTaxYearly) || 0;
    const maintenance = parseFloat(maintenanceMonthly) || 0;
    const years = parseFloat(stayYears);

    if (!rent || !price || !down || !rate || !loanTerm || !years) return;

    const totalRentCost = rent * 12 * years;

    const loanAmount = price - down;
    const emi = calculateEMI(loanAmount, rate, loanTerm);

    const totalEMIPaid = emi * 12 * years;
    const totalTax = tax * years;
    const totalMaintenance = maintenance * 12 * years;

    const totalBuyCost =
      down + totalEMIPaid + totalTax + totalMaintenance;

    const recommendation =
      totalRentCost < totalBuyCost
        ? "Renting is financially cheaper."
        : "Buying is financially better long-term.";

    setResult({
      totalRentCost: totalRentCost.toFixed(2),
      totalBuyCost: totalBuyCost.toFixed(2),
      recommendation,
    });
  };

  const loadExample = () => {
    setMonthlyRent("2000");
    setHomePrice("400000");
    setDownPayment("80000");
    setInterestRate("6.5");
    setLoanYears("30");
    setPropertyTaxYearly("4000");
    setMaintenanceMonthly("300");
    setStayYears("7");
    setResult(null);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rent vs. Buy Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Monthly Rent ($)"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Home Price ($)"
          value={homePrice}
          onChange={(e) => setHomePrice(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Down Payment ($)"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Property Tax (Yearly $)"
          value={propertyTaxYearly}
          onChange={(e) => setPropertyTaxYearly(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Maintenance (Monthly $)"
          value={maintenanceMonthly}
          onChange={(e) => setMaintenanceMonthly(e.target.value)}
          className="border p-3 rounded-lg" />

        <input type="number" placeholder="Years You Plan to Stay"
          value={stayYears}
          onChange={(e) => setStayYears(e.target.value)}
          className="border p-3 rounded-lg" />
      </div>

      <div className="mt-4 space-y-3">
        <button onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold transition">
          Compare
        </button>

        <button onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg font-medium">
          Try Example
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg text-center space-y-3">
          <p>Total Rent Cost: ${result.totalRentCost}</p>
          <p>Total Buying Cost: ${result.totalBuyCost}</p>
          <p className="text-xl font-bold">
            {result.recommendation}
          </p>
        </div>
      )}

      <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

        {/* 🔷 INTRO */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
            <Home className="text-indigo-600" size={22} />
            What is Rent vs Buy Calculator?
          </h2>

          <p className="mt-4 text-sm md:text-base">
            A <strong>Rent vs Buy Calculator</strong> is a financial tool that helps you decide whether it is better to rent a home or buy a property. It compares the total cost of renting versus buying over a period of time and helps you make a smart financial decision.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Buying a home involves costs like down payment, home loan EMI, interest, maintenance, and taxes. Renting, on the other hand, involves monthly rent and periodic increases. This calculator evaluates both scenarios to determine which option is more cost-effective.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Our <strong>Rent vs Buy Calculator (India)</strong> provides accurate insights into long-term financial impact, helping you choose the best option based on your income and lifestyle.
          </p>
        </div>

        {/* 🔷 HOW IT WORKS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="text-purple-600" size={20} />
            How Does Rent vs Buy Calculator Work?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            The calculator compares total expenses incurred in renting vs buying a home over a specific period.
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter property price and down payment
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter loan interest rate and tenure
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter monthly rent and yearly increase
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Click Calculate to compare results
            </li>
          </ul>
        </div>

        {/* 🔷 BUY VS RENT */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={20} />
            Renting vs Buying – Key Differences
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <strong>Renting:</strong> Lower upfront cost, flexibility, no maintenance burden
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              <strong>Buying:</strong> Asset creation, tax benefits, long-term investment
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Renting offers flexibility but no ownership
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Buying builds equity over time
            </li>
          </ul>
        </div>

        {/* 🔷 FACTORS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={20} />
            Key Factors to Consider
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Property price and location
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Home loan interest rate
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Rent increase percentage
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Investment returns on savings
            </li>
          </ul>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-pink-600" size={20} />
            Benefits of Using This Calculator
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Helps you make better financial decisions
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Compares long-term cost of renting vs buying
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Easy to use with instant results
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              100% free online tool
            </li>
          </ul>
        </div>

        {/* 🔷 TIPS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={20} />
            Tips: When to Rent vs When to Buy?
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Rent if you move frequently
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Buy if you plan to stay long-term
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Buy if EMI is similar to rent
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Rent if property prices are too high
            </li>
          </ul>
        </div>

        {/* 🔷 SEO TEXT */}
        <div>
          <p className="text-sm md:text-base">
            Our <strong>Rent vs Buy Calculator</strong> is one of the best tools to compare housing decisions. Whether you are planning to buy your first home or continue renting, this tool provides accurate insights to help you make a smart financial choice.
          </p>
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
                1. Is it better to rent or buy in India?
              </h4>
              <p className="text-gray-600 mt-1">
                It depends on your financial condition, job stability, and long-term goals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                2. Does buying a house save tax?
              </h4>
              <p className="text-gray-600 mt-1">
                Yes, you can claim tax benefits on home loan interest and principal.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                3. Is renting cheaper than buying?
              </h4>
              <p className="text-gray-600 mt-1">
                In short term yes, but long term buying may be beneficial.
              </p>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}