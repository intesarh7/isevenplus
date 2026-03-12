"use client";

import { useState } from "react";
import { Calculator, RotateCcw, FlaskConical } from "lucide-react";
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

          <div className="bg-gray-50 border rounded-xl p-6 space-y-3 text-lg">

            <div className="flex justify-between">
              <span>GST Amount</span>
              <span className="font-semibold text-indigo-600">
                ₹ {gstAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                {mode === "add" ? "Total Price (Including GST)" : "Price Without GST"}
              </span>
              <span className="font-semibold">
                ₹ {total?.toFixed(2)}
              </span>
            </div>

          </div>

        )}


        {/* SEO CONTENT */}

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">

          <h2 className="text-2xl font-semibold">
            GST Calculator – Calculate GST Amount Instantly
          </h2>

          <p>
            The GST Calculator is a simple online tool that helps you calculate the Goods and Services Tax (GST) on any amount. In India, GST is applied on most goods and services at different tax rates such as 5%, 12%, 18%, and 28%. With this calculator, you can easily determine the GST amount and the final price including or excluding GST.
          </p>

          <p>
            This tool is useful for business owners, freelancers, shopkeepers, and consumers who want to quickly calculate GST without doing manual calculations. By entering the amount and selecting the GST rate, the calculator instantly shows the GST amount and the total payable value.
          </p>

          <h3 className="text-xl font-semibold">
            How to Use the GST Calculator
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            <li>Enter the original amount of the product or service.</li>

            <li>Select the GST rate (5%, 12%, 18%, or 28%).</li>

            <li>Choose whether you want to add GST or remove GST.</li>

            <li>Click the Calculate GST button to see the result.</li>

          </ul>

          <h3 className="text-xl font-semibold">
            Example GST Calculation
          </h3>

          <p>
            Suppose the product price is ₹1000 and the GST rate is 18%.
          </p>

          <ul className="list-disc pl-6 space-y-2">

            <li>GST Amount = ₹180</li>

            <li>Total Price Including GST = ₹1180</li>

          </ul>

          <h3 className="text-xl font-semibold">
            Benefits of Using a GST Calculator
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            <li>Instant GST calculation</li>

            <li>Accurate tax estimation</li>

            <li>Saves time and effort</li>

            <li>Useful for business invoices</li>

          </ul>

          <p>
            Using a GST Calculator makes it easy to understand how GST affects the price of goods and services. It helps businesses maintain accurate tax records and helps customers know the exact tax amount they are paying.
          </p>

        </div>

      </div>

    </CalculatorLayout>

  );
}