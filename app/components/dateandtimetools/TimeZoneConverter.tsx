"use client";

import { useState, useEffect } from "react";
import { Globe, RotateCcw } from "lucide-react";

const timeZones = Intl.supportedValuesOf("timeZone");

function getOffset(zone: string) {
  const now = new Date();
  const tzDate = new Date(
    now.toLocaleString("en-US", { timeZone: zone })
  );
  return (tzDate.getTime() - now.getTime()) / 3600000;
}

export default function TimeZoneConverter() {
  const [fromZone, setFromZone] = useState("Asia/Kolkata");
  const [toZone, setToZone] = useState("America/New_York");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fromTime = new Date(
    now.toLocaleString("en-US", { timeZone: fromZone })
  );

  const toTime = new Date(
    now.toLocaleString("en-US", { timeZone: toZone })
  );

  const offsetDiff =
    getOffset(toZone) - getOffset(fromZone);

  const handleReset = () => {
    setFromZone("Asia/Kolkata");
    setToZone("America/New_York");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold">
          Global Time Zone Converter & Meeting Planner
        </h2>
      </div>

      {/* Time Zone Selectors */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold block mb-2">
            From Time Zone
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={fromZone}
            onChange={(e) => setFromZone(e.target.value)}
          >
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                🌍 {zone}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            To Time Zone
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={toZone}
            onChange={(e) => setToZone(e.target.value)}
          >
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                🌎 {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Offset Difference */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-blue-600">
          Time Difference: {offsetDiff > 0 ? "+" : ""}
          {offsetDiff} Hours
        </p>
      </div>

      {/* Dual Live Clocks */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 text-center">

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">{fromZone}</h3>
          <p className="text-3xl font-bold text-blue-600">
            {fromTime.toLocaleTimeString()}
          </p>
          <p>{fromTime.toDateString()}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">{toZone}</h3>
          <p className="text-3xl font-bold text-green-600">
            {toTime.toLocaleTimeString()}
          </p>
          <p>{toTime.toDateString()}</p>
        </div>
      </div>

      {/* Meeting Planner Grid */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">
          24-Hour Meeting Planner
        </h3>

        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 text-center text-sm">
          {[...Array(24)].map((_, hour) => {
            const testDate = new Date();
            testDate.setHours(hour, 0, 0);

            const fromHour = new Date(
              testDate.toLocaleString("en-US", {
                timeZone: fromZone,
              })
            ).getHours();

            const toHour = new Date(
              testDate.toLocaleString("en-US", {
                timeZone: toZone,
              })
            ).getHours();

            const goodTime =
              fromHour >= 9 &&
              fromHour <= 18 &&
              toHour >= 9 &&
              toHour <= 18;

            return (
              <div
                key={hour}
                className={`p-2 rounded ${
                  goodTime
                    ? "bg-green-200"
                    : "bg-gray-100"
                }`}
              >
                {hour}:00
              </div>
            );
          })}
        </div>

        <p className="text-sm mt-3 text-gray-600">
          Green blocks indicate overlapping business hours (9 AM – 6 PM).
        </p>
      </div>

      {/* Reset */}
      <div className="mt-8 text-center">
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* SEO Section */}
      <div className="mt-12 space-y-6 text-gray-700">
        <h3 className="text-2xl font-bold">
          Why Use Our Global Time Zone Converter?
        </h3>
        <p>
          Our advanced Time Zone Converter supports all official IANA
          time zones worldwide. It automatically handles daylight
          saving time (DST), calculates GMT offsets, and provides
          a real-time meeting planner grid.
        </p>

        <h3 className="text-2xl font-bold">
          Perfect For:
        </h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Remote teams</li>
          <li>Freelancers</li>
          <li>International businesses</li>
          <li>Event coordinators</li>
          <li>Global webinars</li>
        </ul>
      </div>

    </div>
  );
}