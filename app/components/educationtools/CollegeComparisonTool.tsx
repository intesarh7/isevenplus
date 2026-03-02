"use client";

import { useState, useMemo } from "react";
import colleges from "@/app/data/colleges.json";
import { GitCompare, RotateCcw } from "lucide-react";

type College = typeof colleges[number];

export default function CollegeComparisonTool() {
  const [selected1, setSelected1] = useState<number | null>(null);
  const [selected2, setSelected2] = useState<number | null>(null);
  const [selected3, setSelected3] = useState<number | null>(null);

  const collegeMap = useMemo(() => {
    const map = new Map<number, College>();
    colleges.forEach((c) => map.set(c.id, c));
    return map;
  }, []);

  const reset = () => {
    setSelected1(null);
    setSelected2(null);
    setSelected3(null);
  };

  const renderCollege = (college?: College) => {
    if (!college) return null;

    return (
      <div className="border rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-lg mb-2">{college.name}</h3>
        <p><strong>Country:</strong> {college.country}</p>
        <p><strong>City:</strong> {college.city}</p>
        <p><strong>Fields:</strong> {college.fields.join(", ")}</p>
        <p><strong>Exam:</strong> {college.examAccepted.join(", ")}</p>
        <p><strong>Min Score:</strong> {college.minScore}</p>
        <p><strong>Rank Threshold:</strong> {college.rankThreshold}</p>
        <p><strong>Budget:</strong> {college.budget}</p>
        <p><strong>Type:</strong> {college.type}</p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      <div className="flex items-center gap-3 mb-6">
        <GitCompare className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold">
          College Comparison Tool
        </h2>
      </div>

      {/* Dropdown Selectors */}
      <div className="grid md:grid-cols-3 gap-6">

        {[selected1, selected2, selected3].map((selected, index) => (
          <select
            key={index}
            className="border rounded-lg p-3"
            value={selected ?? ""}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              if (index === 0) setSelected1(val);
              if (index === 1) setSelected2(val);
              if (index === 2) setSelected3(val);
            }}
          >
            <option value="">Select College {index + 1}</option>
            {colleges.slice(0,1000).map((college) => (
              <option key={college.id} value={college.id}>
                {college.name} ({college.country})
              </option>
            ))}
          </select>
        ))}

      </div>

      {/* Reset */}
      <div className="mt-6">
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {renderCollege(collegeMap.get(selected1 ?? -1))}
        {renderCollege(collegeMap.get(selected2 ?? -1))}
        {renderCollege(collegeMap.get(selected3 ?? -1))}

      </div>

      {/* SEO */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          Compare Colleges Worldwide
        </h3>
        <p>
          This professional comparison tool allows students to compare
          national and international colleges based on budget,
          admission requirements, exam acceptance and academic fields.
        </p>

        <h3 className="text-2xl font-bold">
          Who Should Use This Tool?
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>JEE & NEET Aspirants</li>
          <li>SAT & Study Abroad Students</li>
          <li>Engineering & Medical Applicants</li>
          <li>Global Admission Planning</li>
        </ul>
      </div>

    </div>
  );
}