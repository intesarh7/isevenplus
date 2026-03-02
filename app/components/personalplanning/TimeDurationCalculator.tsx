"use client";

import { useState, useRef, useEffect } from "react";
import { Clock, Download, Share2, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";

export default function TimeDurationCalculator() {

    const [mode, setMode] = useState("time");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [addHours, setAddHours] = useState("");
    const [addMinutes, setAddMinutes] = useState("");
    const [result, setResult] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    const cardRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const calculate = () => {

        if (mode === "time") {
            if (!startTime || !endTime) return;

            const [sh, sm] = startTime.split(":").map(Number);
            const [eh, em] = endTime.split(":").map(Number);

            const start = new Date();
            start.setHours(sh, sm, 0);

            const end = new Date();
            end.setHours(eh, em, 0);

            if (end < start) end.setDate(end.getDate() + 1);

            const diff = end.getTime() - start.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);

            setResult(`${hours} Hours ${minutes} Minutes`);
        }

        if (mode === "date") {
            if (!startDate || !endDate) return;

            const s = new Date(startDate);
            const e = new Date(endDate);

            let years = e.getFullYear() - s.getFullYear();
            let months = e.getMonth() - s.getMonth();
            let days = e.getDate() - s.getDate();

            if (days < 0) {
                months--;
                days += new Date(e.getFullYear(), e.getMonth(), 0).getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            setResult(`${years} Years ${months} Months ${days} Days`);
        }

        if (mode === "add") {
            if (!startTime) return;

            const [sh, sm] = startTime.split(":").map(Number);
            const base = new Date();
            base.setHours(sh, sm, 0);

            const newTime = new Date(
                base.getTime() +
                (Number(addHours) * 60 * 60 * 1000) +
                (Number(addMinutes) * 60 * 1000)
            );

            setResult(`New Time: ${newTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
        }
    };

    const downloadImage = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current);
        const link = document.createElement("a");
        link.download = "time-duration-iSevenPlus.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const downloadStory = async () => {
        if (!storyRef.current) return;
        const canvas = await html2canvas(storyRef.current);
        const link = document.createElement("a");
        link.download = "time-duration-story-iSevenPlus.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent("⏱ Time Duration Result: " + result)}`, "_blank");
    };

    return (
        <div className={`max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 ${fullscreen ? "fixed inset-0 z-50" : ""}`}>

            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4 flex justify-center gap-2">
                <Clock className="animate-pulse" />
                Time Duration Calculator
            </h2>

            <p className="text-center text-gray-500 mb-6">
                Current Time: {currentTime}
            </p>

            <p className="text-center text-gray-600 mb-4">
                Select calculation type and fill required fields below ⏱
            </p>
            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => setMode("time")} className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Time Difference</button>
                <button onClick={() => setMode("date")} className="bg-purple-500 text-white px-4 py-2 rounded-lg">Date Difference</button>
                <button onClick={() => setMode("add")} className="bg-pink-500 text-white px-4 py-2 rounded-lg">Add Time</button>
            </div>

            {/* Inputs */}
            {mode === "time" && (
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            Start Time
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            className="border-2 border-indigo-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Enter starting time (e.g., 09:00 AM)
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            End Time
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            className="border-2 border-indigo-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Enter ending time (e.g., 05:30 PM)
                        </span>
                    </div>

                </div>
            )}

            {mode === "date" && (
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="border-2 border-purple-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Select beginning date
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="border-2 border-purple-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Select ending date
                        </span>
                    </div>

                </div>
            )}

            {mode === "add" && (
                <div className="grid md:grid-cols-3 gap-6">

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            Base Time
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            className="border-2 border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Enter starting time
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            Hours to Add
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 2"
                            value={addHours}
                            onChange={e => setAddHours(e.target.value)}
                            className="border-2 border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Add extra hours
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">
                            Minutes to Add
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 30"
                            value={addMinutes}
                            onChange={e => setAddMinutes(e.target.value)}
                            className="border-2 border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
                        />
                        <span className="text-sm text-gray-500 mt-1">
                            Add extra minutes
                        </span>
                    </div>

                </div>
            )}

            <button onClick={calculate} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl">
                Calculate
            </button>

            {result && (
                <>
                    <div
                        ref={cardRef}
                        className="mt-10 p-8 rounded-2xl text-white text-center shadow-2xl"
                        style={{
                            background: "linear-gradient(180deg, #4f46e5, #6366f1, #818cf8)"
                        }}
                    >
                        <h3 className="text-4xl font-bold mb-4">Result</h3>
                        <p className="text-3xl font-extrabold">{result}</p>
                        <p className="text-sm mt-4 opacity-90">Generated by iSevenPlus ⏱</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button onClick={downloadImage} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2">
                            <Download size={18} /> Download
                        </button>
                        <button onClick={downloadStory} className="flex-1 bg-purple-600 text-white py-3 rounded-xl flex justify-center gap-2">
                            <Download size={18} /> Instagram Story
                        </button>
                        <button onClick={shareWhatsApp} className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2">
                            <Share2 size={18} /> Share
                        </button>
                        <button onClick={() => setFullscreen(!fullscreen)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl flex justify-center gap-2">
                            <Maximize2 size={18} /> Fullscreen
                        </button>
                    </div>

                    {/* Hidden Story Layout */}
                    <div
                        ref={storyRef}
                        style={{
                            position: "fixed",
                            top: "-9999px",
                            left: "-9999px",
                            width: "1080px",
                            height: "1920px",
                            background: "linear-gradient(180deg,#4f46e5,#6366f1,#818cf8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            color: "white",
                            textAlign: "center",
                            padding: "120px"
                        }}
                    >
                        <h1 style={{ fontSize: "100px" }}>Time Duration</h1>
                        <p style={{ fontSize: "60px", marginTop: "40px" }}>{result}</p>
                        <p style={{ position: "absolute", bottom: "120px", fontSize: "40px", opacity: 0.8 }}>
                            iSevenPlus ⏱
                        </p>
                    </div>
                </>
            )}

            {/* SEO */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-4">
                    What is Time Duration Calculator?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Time Duration Calculator helps you calculate time difference between two times,
                    difference between dates, and add time easily.
                </p>
            </div>

        </div>
    );
}