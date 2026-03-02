"use client";

import { useState } from "react";

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
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rent vs. Buy Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input type="number" placeholder="Monthly Rent ($)"
          value={monthlyRent}
          onChange={(e)=>setMonthlyRent(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Home Price ($)"
          value={homePrice}
          onChange={(e)=>setHomePrice(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Down Payment ($)"
          value={downPayment}
          onChange={(e)=>setDownPayment(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Loan Term (Years)"
          value={loanYears}
          onChange={(e)=>setLoanYears(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Property Tax (Yearly $)"
          value={propertyTaxYearly}
          onChange={(e)=>setPropertyTaxYearly(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Maintenance (Monthly $)"
          value={maintenanceMonthly}
          onChange={(e)=>setMaintenanceMonthly(e.target.value)}
          className="border p-3 rounded-lg"/>

        <input type="number" placeholder="Years You Plan to Stay"
          value={stayYears}
          onChange={(e)=>setStayYears(e.target.value)}
          className="border p-3 rounded-lg"/>
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

      <div className="mt-10 border-t pt-6 text-sm text-gray-700">
        <h3 className="font-semibold text-lg mb-2">
          Should You Rent or Buy?
        </h3>
        <p>
          This calculator compares total rental cost with total home ownership
          cost over a chosen period. Buying becomes more beneficial
          when staying long-term and building equity.
        </p>
      </div>
    </div>
  );
}