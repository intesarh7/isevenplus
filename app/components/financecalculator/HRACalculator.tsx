"use client";

import { useState } from "react";
import CalculatorLayout from "../personalplanning/CalculatorLayout";
import {
  IndianRupee,
  Home,
  Building,
  Calculator,
} from "lucide-react";

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
    </>
  );
}