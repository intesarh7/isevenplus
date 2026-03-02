"use client";

import { useState } from "react";
import {
    BookOpen,
    Calculator,
    RotateCcw,
    PlusCircle,
    PlayCircle,
} from "lucide-react";

type Subject = {
    obtained: string;
    total: string;
};

export default function MarksPercentageCalculator() {
    const [subjects, setSubjects] = useState<Subject[]>([
        { obtained: "", total: "" },
    ]);

    const [result, setResult] = useState<{
        totalObtained: number;
        totalMarks: number;
        percentage: string;
        grade: string;
    } | null>(null);

    const addSubject = () => {
        setSubjects([...subjects, { obtained: "", total: "" }]);
    };

    // ✅ Properly typed field
    const handleChange = (
        index: number,
        field: keyof Subject,
        value: string
    ) => {
        const updated = [...subjects];
        updated[index][field] = value;
        setSubjects(updated);
    };

    const calculatePercentage = () => {
        let totalObtained = 0;
        let totalMarks = 0;

        subjects.forEach((sub) => {
            totalObtained += Number(sub.obtained || 0);
            totalMarks += Number(sub.total || 0);
        });

        if (totalMarks === 0) return;

        const percentage =
            (totalObtained / totalMarks) * 100;

        let grade = "";
        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 50) grade = "D";
        else grade = "F";

        setResult({
            totalObtained,
            totalMarks,
            percentage: percentage.toFixed(2),
            grade,
        });
    };

    const handleTryExample = () => {
        setSubjects([
            { obtained: "85", total: "100" },
            { obtained: "78", total: "100" },
            { obtained: "92", total: "100" },
            { obtained: "88", total: "100" },
        ]);
        setResult(null);
    };

    const handleReset = () => {
        setSubjects([{ obtained: "", total: "" }]);
        setResult(null);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-indigo-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">
                    Marks Percentage Calculator
                </h2>
            </div>

            <div className="space-y-4">
                {subjects.map((sub, index) => (
                    <div
                        key={index}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        <input
                            type="number"
                            placeholder="Obtained Marks"
                            className="border rounded-lg p-3"
                            value={sub.obtained}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "obtained",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            placeholder="Total Marks"
                            className="border rounded-lg p-3"
                            value={sub.total}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "total",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <button
                    onClick={addSubject}
                    className="text-indigo-600 flex items-center gap-2 font-semibold"
                >
                    <PlusCircle size={18} />
                    Add Subject
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
                <button
                    onClick={calculatePercentage}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                    <Calculator size={20} />
                    Calculate
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

            {result && (
                <div className="mt-8 bg-gray-50 p-6 rounded-xl text-center space-y-2">
                    <h3 className="text-xl font-semibold">
                        Result Summary
                    </h3>

                    <p>Total Obtained: {result.totalObtained}</p>
                    <p>Total Marks: {result.totalMarks}</p>

                    <p className="text-3xl font-bold text-indigo-600">
                        {result.percentage}%
                    </p>

                    <p className="text-lg font-semibold">
                        Grade: {result.grade}
                    </p>
                </div>
            )}
            {/* SEO Content */}
            <div className="mt-12 space-y-6 text-gray-700">
                <h3 className="text-2xl font-bold">
                    How to Calculate Marks Percentage?
                </h3>
                <p>
                    Percentage is calculated using the formula:
                </p>

                <p className="font-semibold text-indigo-600">
                    (Total Obtained Marks ÷ Total Marks) × 100
                </p>

                <h3 className="text-2xl font-bold">
                    Why Use This Calculator?
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                    <li>School & board exam results</li>
                    <li>College semester calculation</li>
                    <li>Competitive exam analysis</li>
                    <li>Quick grade evaluation</li>
                </ul>

                <h3 className="text-2xl font-bold">
                    FAQs
                </h3>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">
                            1. Can I calculate multiple subjects?
                        </h4>
                        <p>
                            Yes, you can add unlimited subjects.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold">
                            2. Is this calculator accurate?
                        </h4>
                        <p>
                            Yes, it uses the standard percentage formula.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold">
                            3. Does it give grades?
                        </h4>
                        <p>
                            Yes, it provides grade estimation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}