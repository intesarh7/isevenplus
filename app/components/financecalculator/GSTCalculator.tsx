"use client";

import { useState } from "react";
import { Calculator, RotateCcw, FlaskConical, PieChart, BadgeIndianRupee, TrendingUp, BarChart3, HelpCircle, Tag, Zap, CheckCircle, Percent, Receipt, IndianRupee } from "lucide-react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";

export default function GSTCalculator() {

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState("add");

  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const calculateGST = () => {

    if (!amount || !rate) return;

    const amt = Number(amount);
    const gstRate = Number(rate);

    if (mode === "add") {

      const gst = (amt * gstRate) / 100;
      const totalPrice = amt + gst;

      setGstAmount(gst);
      setTotal(totalPrice);

    } else {

      const basePrice = amt / (1 + gstRate / 100);
      const gst = amt - basePrice;

      setGstAmount(gst);
      setTotal(basePrice);

    }

  };

  const exampleFill = () => {
    setAmount("1000");
    setRate("18");
    setMode("add");
  };

  const resetForm = () => {
    setAmount("");
    setRate("18");
    setMode("add");
    setGstAmount(null);
    setTotal(null);
  };

  return (

    <CalculatorLayout title="GST Calculator">

      <div className="space-y-6">

        {/* INPUTS */}

        <div className="grid md:grid-cols-3 gap-6">

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="5">5% GST</option>
            <option value="12">12% GST</option>
            <option value="18">18% GST</option>
            <option value="28">28% GST</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="add">Add GST</option>
            <option value="remove">Remove GST</option>
          </select>

        </div>


        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={calculateGST}
            className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            <Calculator size={18} />
            Calculate GST
          </button>

          <button
            onClick={exampleFill}
            className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            <FlaskConical size={18} />
            Try Example
          </button>

          <button
            onClick={resetForm}
            className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>


        {/* RESULT */}

        {gstAmount !== null && (

          <div className="bg-white border rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="bg-linear-to-r from-indigo-500 to-indigo-600 text-white px-5 py-3 flex items-center gap-2">
              <Receipt size={18} />
              <span className="font-semibold">GST Calculation Result</span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">

              {/* GST Amount */}
              <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-700">
                  <IndianRupee size={18} className="text-indigo-600" />
                  <span className="font-medium">GST Amount</span>
                </div>

                <span className="text-lg font-bold text-indigo-600">
                  ₹ {gstAmount.toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp size={18} className="text-green-600" />
                  <span className="font-medium">
                    {mode === "add"
                      ? "Total Price (Including GST)"
                      : "Price Without GST"}
                  </span>
                </div>

                <span className="text-lg font-bold text-green-600">
                  ₹ {total?.toFixed(2)}
                </span>
              </div>

            </div>

          </div>

        )}


        {/* SEO CONTENT */}

        <div className="mx-auto mt-10 space-y-10">

          {/* TOP CTA STRIP */}
          <section className="bg-linear-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4 text-sm font-medium">

              <div className="flex items-center gap-2 text-indigo-700">
                <Zap size={18} />
                Calculate GST in 1 click (5%, 12%, 18%, 28%)
              </div>

              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle size={18} />
                100% Free GST Tool – No Login Required
              </div>

              <div className="flex items-center gap-2 text-blue-700">
                <BarChart3 size={18} />
                Accurate GST Amount & Final Price Instantly
              </div>

            </div>
          </section>

          {/* ABOUT */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <Calculator className="text-indigo-600" />
              About GST Calculator India
            </h2>

            <p className="text-gray-700 leading-relaxed">
              GST Calculator ek powerful online tool hai jo India me GST (Goods and Services Tax) calculate karne ke liye use hota hai. Ye tool aapko quickly aur accurately GST amount, final price, aur tax breakdown calculate karne me help karta hai.
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              Chahe aap business owner ho, seller ho, ya customer — ye calculator aapko GST add karne aur remove karne dono ka option deta hai. Isse aap apni pricing strategy aur billing ko better bana sakte ho.
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              India me GST system multiple tax slabs me divided hai jaise 5%, 12%, 18% aur 28%. Ye calculator sabhi slabs ke liye kaam karta hai aur instantly result deta hai.
            </p>
          </section>

          {/* WHAT IS GST */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <Percent className="text-green-600" />
              What is GST (Goods and Services Tax)?
            </h2>

            <p className="text-gray-700 leading-relaxed">
              GST (Goods and Services Tax) ek indirect tax system hai jo India me 2017 me implement kiya gaya tha. Iska main goal tha multiple taxes ko replace karna aur ek unified tax system banana.
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              GST ke andar alag-alag types hote hain:
            </p>

            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-1">
              <li>CGST (Central GST)</li>
              <li>SGST (State GST)</li>
              <li>IGST (Integrated GST)</li>
            </ul>

            <p className="text-gray-700 mt-3 leading-relaxed">
              Ye taxes goods aur services ke supply par lagte hain aur har transaction me applicable hote hain.
            </p>
          </section>

          {/* HOW GST CALCULATOR WORKS */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <PieChart className="text-purple-600" />
              How GST Calculator Works
            </h2>

            <p className="text-gray-700 leading-relaxed">
              GST calculator do tarah se kaam karta hai:
            </p>

            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>GST Add karna (Net price → Final price)</li>
              <li>GST Remove karna (Final price → Base price)</li>
            </ul>

            <div className="mt-5 bg-gray-50 p-4 rounded-xl text-gray-700 text-sm">
              <p className="font-semibold mb-2">Formula:</p>
              <p>GST Amount = (Original Price × GST%) / 100</p>
              <p>Total Price = Original Price + GST</p>
            </div>
          </section>

          {/* GST SLABS */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <BadgeIndianRupee className="text-yellow-600" />
              GST Slabs in India
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>5% GST - Essential items</li>
              <li>12% GST - Processed food items</li>
              <li>18% GST - Most goods & services</li>
              <li>28% GST - Luxury items</li>
            </ul>
          </section>

          {/* BENEFITS */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <TrendingUp className="text-indigo-600" />
              Benefits of Using GST Calculator
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Instant GST calculation</li>
              <li>Accurate pricing</li>
              <li>Time-saving tool</li>
              <li>Useful for billing & invoicing</li>
              <li>No manual errors</li>
            </ul>
          </section>

          {/* USE CASES */}
          <section className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <BarChart3 className="text-indigo-600" />
              Who Can Use This GST Calculator?
            </h2>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Business owners</li>
              <li>E-commerce sellers</li>
              <li>Freelancers</li>
              <li>Accountants</li>
              <li>General consumers</li>
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
                  q: "How to calculate GST?",
                  a: "Multiply the price with GST rate and divide by 100."
                },
                {
                  q: "What are GST slabs?",
                  a: "5%, 12%, 18%, and 28% are standard GST rates in India."
                },
                {
                  q: "Is this GST calculator free?",
                  a: "Yes, it is completely free and easy to use."
                },
                {
                  q: "Can I remove GST using this tool?",
                  a: "Yes, you can both add and remove GST."
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
                "gst calculator india",
                "gst calculate online",
                "add gst calculator",
                "remove gst calculator",
                "gst tax calculator india",
                "gst price calculator"
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

      </div>

    </CalculatorLayout>

  );
}