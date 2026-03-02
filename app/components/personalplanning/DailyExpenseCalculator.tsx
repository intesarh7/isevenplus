"use client";

import { useState, useRef } from "react";
import { PlusCircle, Download, Share2, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";

export default function DailyExpenseCalculator() {

  const [expenses, setExpenses] = useState<any[]>([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [fullscreen, setFullscreen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const addExpense = () => {
    if (!item || !amount) return;

    setExpenses([
      ...expenses,
      { item, amount: Number(amount), category }
    ]);

    setItem("");
    setAmount("");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyEstimate = total * 30;
  const yearlyEstimate = total * 365;

  const downloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "daily-expense-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadStory = async () => {
    if (!storyRef.current) return;
    const canvas = await html2canvas(storyRef.current);
    const link = document.createElement("a");
    link.download = "expense-story-iSevenPlus.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareWhatsApp = () => {
    const text = `💸 My Daily Expenses: ₹${total} | Monthly Estimate: ₹${monthlyEstimate}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className={`max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 ${fullscreen ? "fixed inset-0 z-50 bg-white overflow-auto" : ""}`}>

      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        💸 Daily Expense Calculator
      </h2>

      {/* INPUT SECTION */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Expense Item
          </label>
          <input
            type="text"
            placeholder="e.g. Coffee, Transport"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border-2 border-indigo-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400"
          />
          <span className="text-sm text-gray-500 mt-1">
            Enter expense name
          </span>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 150"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-indigo-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400"
          />
          <span className="text-sm text-gray-500 mt-1">
            Enter expense amount
          </span>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-indigo-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400"
          >
            <option>General</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Entertainment</option>
          </select>
          <span className="text-sm text-gray-500 mt-1">
            Select expense category
          </span>
        </div>

      </div>

      <button
        onClick={addExpense}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center gap-2"
      >
        <PlusCircle size={18}/> Add Expense
      </button>

      {/* EXPENSE LIST */}
      <div className="mt-8 space-y-3">
        {expenses.map((e, index) => (
          <div key={index} className="flex justify-between bg-gray-100 p-3 rounded-lg">
            <span>{e.item} ({e.category})</span>
            <span>₹{e.amount}</span>
          </div>
        ))}
      </div>

      {/* RESULT CARD */}
      {expenses.length > 0 && (
        <>
          <div
            ref={cardRef}
            className="mt-10 p-8 rounded-2xl text-white text-center shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #4f46e5, #6366f1, #818cf8)"
            }}
          >
            <h3 className="text-3xl font-bold mb-4">Expense Summary</h3>

            <p className="text-4xl font-extrabold mb-2">
              ₹{total}
            </p>

            <p className="mb-2">Estimated Monthly: ₹{monthlyEstimate}</p>
            <p>Estimated Yearly: ₹{yearlyEstimate}</p>

            <p className="text-sm mt-4 opacity-90">
              Generated by iSevenPlus 💸
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={downloadImage} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2">
              <Download size={18}/> Download
            </button>
            <button onClick={downloadStory} className="flex-1 bg-purple-600 text-white py-3 rounded-xl flex justify-center gap-2">
              <Download size={18}/> Instagram Story
            </button>
            <button onClick={shareWhatsApp} className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2">
              <Share2 size={18}/> Share
            </button>
            <button onClick={() => setFullscreen(!fullscreen)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl flex justify-center gap-2">
              <Maximize2 size={18}/> Fullscreen
            </button>
          </div>

          {/* Hidden Story Layout */}
          <div
            ref={storyRef}
            style={{
              position:"fixed",
              top:"-9999px",
              left:"-9999px",
              width:"1080px",
              height:"1920px",
              background:"linear-gradient(180deg,#4f46e5,#6366f1,#818cf8)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column",
              color:"white",
              textAlign:"center",
              padding:"120px"
            }}
          >
            <h1 style={{fontSize:"80px"}}>Daily Expenses</h1>
            <p style={{fontSize:"120px", fontWeight:"bold", marginTop:"40px"}}>
              ₹{total}
            </p>
            <p style={{position:"absolute", bottom:"120px", fontSize:"40px", opacity:0.8}}>
              iSevenPlus 💸
            </p>
          </div>
        </>
      )}

      {/* SEO */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          What is Daily Expense Calculator?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Daily Expense Calculator helps you track daily spending,
          estimate monthly and yearly expenses and manage personal budget efficiently.
        </p>
      </div>

    </div>
  );
}