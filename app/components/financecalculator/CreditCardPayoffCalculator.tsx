"use client";
import { useState } from "react";
import { CreditCard, Settings, CheckCircle, Calculator, TrendingUp, Sparkles, Lightbulb, BarChart3, HelpCircle } from "lucide-react";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const P = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const m = parseFloat(payment);
    if (!P || !r || !m) return;

    let months = 0;
    let totalInterest = 0;
    let remaining = P;

    while (remaining > 0 && months < 600) {
      const interest = remaining * r;
      remaining = remaining + interest - m;
      totalInterest += interest;
      months++;
    }

    setResult({
      months,
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const loadExample = () => {
    setBalance("5000");
    setRate("18");
    setPayment("200");
    setResult(null);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Credit Card Payoff Calculator
      </h2>

      <div className="space-y-4">
        <input type="number" placeholder="Credit Card Balance ($)"
          value={balance} onChange={(e) => setBalance(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <input type="number" placeholder="Interest Rate (%)"
          value={rate} onChange={(e) => setRate(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <input type="number" placeholder="Monthly Payment ($)"
          value={payment} onChange={(e) => setPayment(e.target.value)}
          className="w-full border p-3 rounded-lg" />

        <button onClick={calculate}
          className="w-full bg-blue-600 hover:bg-red-500 text-white p-3 rounded-lg font-semibold">
          Calculate
        </button>

        <button onClick={loadExample}
          className="w-full bg-gray-200 hover:bg-gray-300 p-3 rounded-lg">
          Try Example ($5,000 at 18% with $200/month)
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
          <p>Payoff Time: {result.months} months</p>
          <p>Total Interest Paid: ${result.totalInterest}</p>
        </div>
      )}

      {/* ✅ SEO CONTENT SECTION */}
      <section className="mt-14 space-y-10 text-gray-700 leading-relaxed">

        {/* 🔷 INTRO */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-gray-900">
            <CreditCard className="text-indigo-600" size={22} />
            What is a Credit Card Payoff Calculator?
          </h2>

          <p className="mt-4 text-sm md:text-base">
            A <strong>Credit Card Payoff Calculator</strong> is a powerful financial tool that helps you calculate how long it will take to pay off your credit card debt and how much interest you will pay over time. It is especially useful for individuals managing multiple credit cards or high-interest debt.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Credit cards often come with high interest rates, and if you only pay the minimum amount due, your debt can take years to clear. This calculator helps you understand the real cost of your debt and plan faster repayment strategies.
          </p>

          <p className="mt-3 text-sm md:text-base">
            Our <strong>Credit Card Payoff Calculator</strong> provides instant insights into monthly payments, total interest, and payoff time so you can take control of your finances.
          </p>
        </div>

        {/* 🔷 HOW IT WORKS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="text-purple-600" size={20} />
            How Does Credit Card Payoff Calculator Work?
          </h3>

          <p className="mt-3 text-sm md:text-base">
            The calculator estimates your repayment schedule based on your balance, interest rate, and monthly payment amount.
          </p>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter your total credit card balance
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter annual interest rate (APR)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Enter your monthly payment amount
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Get payoff time and total interest instantly
            </li>
          </ul>
        </div>

        {/* 🔷 FORMULA */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="text-indigo-600" size={20} />
            Credit Card Interest Formula
          </h3>

          <p className="mt-3 text-sm md:text-base">
            Credit card interest is calculated using the following formula:
          </p>

          <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-center font-semibold">
            Interest = Balance × (APR ÷ 12)
          </div>

          <p className="mt-3 text-sm md:text-base">
            The interest is added monthly, which increases your total outstanding balance if not paid fully.
          </p>
        </div>

        {/* 🔷 EXAMPLE */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="text-indigo-600" size={20} />
            Example Credit Card Payoff Calculation
          </h3>

          <p className="mt-3 text-sm md:text-base">
            Suppose you have a credit card balance of <strong>₹1,00,000</strong> at an interest rate of
            <strong> 24% per year</strong>, and you pay ₹5,000 per month.
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mt-4 space-y-2 text-sm md:text-base">
            <p>Monthly Interest ≈ ₹2,000</p>
            <p>Estimated Payoff Time ≈ 2–3 years</p>
            <p>Total Interest Paid ≈ ₹40,000+</p>
          </div>

          <p className="mt-3 text-sm md:text-base">
            This example shows how high interest can increase your repayment cost significantly.
          </p>
        </div>

        {/* 🔷 BENEFITS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-pink-600" size={20} />
            Benefits of Using Credit Card Payoff Calculator
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Helps you plan debt repayment strategy
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Shows total interest cost clearly
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Encourages faster debt payoff
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Free and easy to use
            </li>
          </ul>
        </div>

        {/* 🔷 STRATEGIES */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={20} />
            Best Strategies to Pay Off Credit Card Debt
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Pay more than minimum due
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Use debt snowball or avalanche method
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Transfer balance to lower interest card
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Avoid new purchases on credit card
            </li>
          </ul>
        </div>

        {/* 🔷 FACTORS */}
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={20} />
            Factors Affecting Credit Card Payoff
          </h3>

          <ul className="mt-4 space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Interest rate (APR)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Monthly payment amount
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Outstanding balance
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-1" />
              Additional charges and fees
            </li>
          </ul>
        </div>

        {/* 🔷 SEO PARAGRAPH */}
        <div>
          <p className="text-sm md:text-base">
            Our <strong>Credit Card Payoff Calculator</strong> is one of the best tools to calculate
            your <strong>credit card repayment time</strong>, <strong>interest cost</strong>, and
            <strong>monthly payment plan</strong>. It helps you become debt-free faster and manage your finances effectively.
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
                1. How long will it take to pay off my credit card?
              </h4>
              <p className="text-gray-600 mt-1">
                It depends on your balance, interest rate, and monthly payment.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                2. What happens if I pay only minimum due?
              </h4>
              <p className="text-gray-600 mt-1">
                It will take longer to repay and increase total interest significantly.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                3. Is this calculator accurate?
              </h4>
              <p className="text-gray-600 mt-1">
                It provides close estimates based on your inputs.
              </p>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}