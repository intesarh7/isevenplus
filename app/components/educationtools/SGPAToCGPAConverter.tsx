"use client";

import { useState } from "react";
import {
  GraduationCap,
  Calculator,
  RotateCcw,
  PlusCircle,
  PlayCircle,
} from "lucide-react";

type Semester = {
  sgpa: string;
  credits: string;
};

export default function SGPAToCGPAConverter() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { sgpa: "", credits: "" },
  ]);

  const [useCredits, setUseCredits] = useState(false);

  const [result, setResult] = useState<number | null>(
    null
  );

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { sgpa: "", credits: "" },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof Semester,
    value: string
  ) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    let total = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      const sgpa = Number(sem.sgpa);

      if (useCredits) {
        const credits = Number(sem.credits);
        total += sgpa * credits;
        totalCredits += credits;
      } else {
        total += sgpa;
      }
    });

    let cgpa;

    if (useCredits) {
      if (totalCredits === 0) return;
      cgpa = total / totalCredits;
    } else {
      cgpa = total / semesters.length;
    }

    setResult(Number(cgpa.toFixed(2)));
  };

  const handleTryExample = () => {
    setSemesters([
      { sgpa: "8.2", credits: "20" },
      { sgpa: "8.5", credits: "22" },
      { sgpa: "8.8", credits: "18" },
    ]);
    setUseCredits(true);
    setResult(null);
  };

  const handleReset = () => {
    setSemesters([{ sgpa: "", credits: "" }]);
    setUseCredits(false);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          SGPA to CGPA Converter
        </h2>
      </div>

      {/* Credit Mode Toggle */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={useCredits}
          onChange={(e) =>
            setUseCredits(e.target.checked)
          }
        />
        <label className="font-medium">
          Use Credit-Based Calculation
        </label>
      </div>

      {/* Semester Inputs */}
      <div className="space-y-4">
        {semesters.map((sem, index) => (
          <div
            key={index}
            className={`grid ${
              useCredits
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
            } gap-4`}
          >
            <input
              type="number"
              step="0.01"
              placeholder={`Semester ${
                index + 1
              } SGPA`}
              className="border rounded-lg p-3"
              value={sem.sgpa}
              onChange={(e) =>
                handleChange(
                  index,
                  "sgpa",
                  e.target.value
                )
              }
            />

            {useCredits && (
              <input
                type="number"
                placeholder="Credits"
                className="border rounded-lg p-3"
                value={sem.credits}
                onChange={(e) =>
                  handleChange(
                    index,
                    "credits",
                    e.target.value
                  )
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Add Semester */}
      <div className="mt-4">
        <button
          onClick={addSemester}
          className="text-indigo-600 flex items-center gap-2 font-semibold"
        >
          <PlusCircle size={18} />
          Add Semester
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={calculateCGPA}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calculate CGPA
        </button>

        <button
          onClick={handleTryExample}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <PlayCircle size={20} />
          Try Example
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold">
            Final CGPA
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {result}
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          How to Convert SGPA to CGPA?
        </h3>
        <p>
          CGPA is calculated by averaging all semester
          SGPAs. If credits are considered, then:
        </p>

        <p className="font-semibold text-indigo-600">
          CGPA = (Σ SGPA × Credits) ÷ Total Credits
        </p>

        <h3 className="text-2xl font-bold">
          Who Should Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Engineering students</li>
          <li>University semester students</li>
          <li>Graduation applicants</li>
          <li>Scholarship candidates</li>
        </ul>

        <h3 className="text-2xl font-bold">
          FAQs
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Is credit calculation necessary?
            </h4>
            <p>
              Some universities require credit-based CGPA.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Is this accurate?
            </h4>
            <p>
              Yes, it follows standard university formula.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}