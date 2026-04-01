"use client";

import { useState } from "react";
import {
  Calculator, RotateCcw, PlayCircle,
  Tag,
  TrendingDown,
  HelpCircle,
  BarChart3,
  IndianRupee,
  Percent,
  CheckCircle,
  Zap,
  ShoppingBag,
  BadgePercent,
} from "lucide-react";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const percent = parseFloat(discountPercent);

    if (!price || price <= 0 || !percent) return;

    const discountValue = (price * percent) / 100;
    const final = price - discountValue;

    setDiscountAmount(discountValue);
    setFinalPrice(final);
  };

  const tryExample = () => {
    setOriginalPrice("5000");
    setDiscountPercent("20");
    setTimeout(() => calculateDiscount(), 100);
  };

  const resetFields = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setFinalPrice(null);
    setDiscountAmount(null);
  };

  return (
    <div className=" bg-white shadow-lg rounded-2xl p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-indigo-600" size={28} />
        Discount Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Original Price (₹)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter original price"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Discount Percentage (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Enter discount percentage"
            className="w-full border rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Buttons - iSevenPlus Standard */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button
          onClick={calculateDiscount}
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

      {finalPrice !== null && discountAmount !== null && (
        <div className="mt-8 bg-white border rounded-2xl shadow-md overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 flex items-center gap-2">
            <Tag size={18} />
            <span className="font-semibold">Discount Result With </span>
            <span className="text-sm text-white">
              ({((discountAmount / (finalPrice + discountAmount)) * 100).toFixed(1)}% OFF)
            </span>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">

            {/* Discount Amount */}
            <div className="flex items-center justify-between bg-red-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-700">
                <TrendingDown size={18} className="text-red-500" />
                <span className="font-medium">You Save</span>
              </div>

              <span className="text-lg font-bold text-red-600">
                ₹ {discountAmount.toFixed(2)}
              </span>
            </div>

            {/* Final Price */}
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-700">
                <IndianRupee size={18} className="text-green-600" />
                <span className="font-medium">Final Price</span>
              </div>

              <span className="text-lg font-bold text-green-600">
                ₹ {finalPrice.toFixed(2)}
              </span>
            </div>

          </div>
        </div>
      )}

      {/* SEO Section */}
      <div className="mx-auto mt-10 space-y-10">

        {/* TOP CTA STRIP */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border shadow-sm">
          <div className="grid sm:grid-cols-3 gap-4 text-sm font-medium">

            <div className="flex items-center gap-2 text-green-700">
              <Zap size={18} />
              Calculate discount instantly (Flat & %)
            </div>

            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle size={18} />
              100% Free Tool – No Login Required
            </div>

            <div className="flex items-center gap-2 text-green-800">
              <BarChart3 size={18} />
              Final Price & Total Savings in seconds
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Calculator className="text-green-600" />
            Discount Calculator – Calculate Sale Price & Savings Instantly
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Discount Calculator ek powerful online tool hai jo aapko kisi bhi product ya service par milne wale discount ko instantly calculate karne me help karta hai. Chahe aap online shopping kar rahe ho, retail store me purchase kar rahe ho, ya business pricing plan kar rahe ho — ye tool aapko exact final price aur savings batata hai.
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            Aaj ke time me Amazon, Flipkart, Myntra jaise platforms par heavy discounts milte hain. Lekin real saving kitni ho rahi hai, ye samajhna thoda confusing ho sakta hai. Isi problem ko solve karne ke liye ye Discount Calculator banaya gaya hai.
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            Ye tool aapko discount percentage, flat discount aur final payable amount dono calculate karne ki facility deta hai — wo bhi bilkul free aur instantly.
          </p>
        </section>

        {/* WHAT IS DISCOUNT */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Tag className="text-green-600" />
            What is Discount?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Discount ka matlab hota hai original price par diya gaya price reduction. Jab kisi product ka MRP kam karke usse lower price par sell kiya jata hai, to usse discount kehte hain.
          </p>

          <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
            <li>Percentage Discount (e.g. 20% OFF)</li>
            <li>Flat Discount (e.g. ₹200 OFF)</li>
          </ul>

          <p className="text-gray-700 mt-3">
            Discount ka main purpose hota hai customers ko attract karna aur sales increase karna.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Percent className="text-purple-600" />
            How Discount Calculator Works
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Discount Calculator simple math formula par based hota hai jo original price aur discount percentage ka use karke final price calculate karta hai.
          </p>

          <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 mt-4">
            <p className="font-semibold">Formula:</p>
            <p>Discount = (Original Price × Discount %) / 100</p>
            <p>Final Price = Original Price - Discount</p>
          </div>
        </section>

        {/* EXAMPLES */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <ShoppingBag className="text-indigo-600" />
            Real Life Discount Examples
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>₹1000 ka product par 20% discount → Final price ₹800</li>
            <li>₹2000 par ₹500 flat discount → Final price ₹1500</li>
            <li>Buy 1 Get 1 → Effective 50% discount</li>
          </ul>
        </section>

        {/* BENEFITS */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <TrendingDown className="text-red-500" />
            Benefits of Using Discount Calculator
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Instant discount calculation</li>
            <li>Better shopping decisions</li>
            <li>Compare deals easily</li>
            <li>Save more money</li>
            <li>No manual calculation needed</li>
          </ul>
        </section>

        {/* USE CASE */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <BadgePercent className="text-indigo-600" />
            Where Discount Calculator is Used
          </h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Online shopping (Amazon, Flipkart)</li>
            <li>Retail stores</li>
            <li>E-commerce pricing</li>
            <li>Season sale offers</li>
            <li>Business pricing strategy</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <HelpCircle className="text-green-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How to calculate discount percentage?",
                a: "Divide discount amount by original price and multiply by 100."
              },
              {
                q: "How to find final price after discount?",
                a: "Subtract discount from original price."
              },
              {
                q: "Is this discount calculator free?",
                a: "Yes, it is completely free."
              },
              {
                q: "Can I calculate flat discount?",
                a: "Yes, both flat and percentage discount supported."
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
            <Tag className="text-green-600" />
            Related Keywords
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "discount calculator",
              "sale price calculator",
              "discount percentage calculator",
              "price after discount",
              "online discount calculator",
              "how to calculate discount"
            ].map((tag, i) => (
              <span
                key={i}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}