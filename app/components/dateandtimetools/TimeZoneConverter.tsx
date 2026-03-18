"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Globe, RefreshCcw, RotateCcw, Search, ShieldCheck, Star, Users, Zap } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMounted(true);
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (!mounted) return null;

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
          {(Math.round(offsetDiff * 2) / 2)} Hours
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
                className={`p-2 rounded ${goodTime
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
      <div className="mt-12 space-y-8 text-gray-700 leading-relaxed">

        {/* Section 1 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="text-blue-600" size={22} />
            Why Use Our Global Time Zone Converter?
          </h3>

          <p className="mt-3">
            Our <strong>Global Time Zone Converter</strong> is a powerful and accurate tool designed to help users convert time between different regions instantly. Whether you're managing remote teams, scheduling international meetings, or planning global events, this tool ensures you never miss a schedule due to time confusion.
          </p>

          <p className="mt-3">
            Unlike basic tools, our converter supports all official <strong>IANA time zones</strong>, automatically adjusts for <strong>Daylight Saving Time (DST)</strong>, and provides real-time updates every second. It also includes a smart <strong>24-hour meeting planner</strong> that highlights the best overlapping working hours across different countries.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="text-green-600" size={22} />
            Real-Time World Clock with Accuracy
          </h3>

          <p className="mt-3">
            Our tool works as a real-time <strong>world clock</strong>, displaying live time updates for selected time zones. This ensures accurate time conversion without needing to refresh the page. The system uses advanced browser-based APIs to fetch precise time data, making it reliable for professional and personal use.
          </p>

          <p className="mt-3">
            Whether you are converting <strong>IST to EST</strong>, <strong>PST to GMT</strong>, or any other global time combination, the results are instant and accurate. This makes it one of the best tools for <strong>time zone conversion online</strong>.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="text-purple-600" size={22} />
            Smart Meeting Planner for Global Teams
          </h3>

          <p className="mt-3">
            One of the standout features of our tool is the <strong>24-hour meeting planner</strong>. It visually displays overlapping working hours between two time zones, helping teams schedule meetings efficiently.
          </p>

          <p className="mt-3">
            Green highlighted slots represent ideal business hours (9 AM to 6 PM), making it easy to identify the best time for collaboration. This feature is especially useful for <strong>remote teams</strong>, <strong>freelancers</strong>, and <strong>international businesses</strong>.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <RefreshCcw className="text-orange-600" size={22} />
            Automatic GMT Offset & DST Handling
          </h3>

          <p className="mt-3">
            Our converter automatically calculates <strong>GMT offsets</strong> and adjusts for <strong>Daylight Saving Time (DST)</strong>. This eliminates manual calculations and reduces errors in scheduling.
          </p>

          <p className="mt-3">
            Many traditional tools fail to update DST changes correctly, but our system dynamically adapts to regional time changes, ensuring accurate results all year round.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-pink-600" size={22} />
            Perfect For Multiple Use Cases
          </h3>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li><strong>Remote teams</strong> working across multiple countries</li>
            <li><strong>Freelancers</strong> dealing with international clients</li>
            <li><strong>Business professionals</strong> scheduling global meetings</li>
            <li><strong>Event organizers</strong> planning webinars or conferences</li>
            <li><strong>Students</strong> attending online international classes</li>
            <li><strong>Travelers</strong> planning trips across time zones</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-500" size={22} />
            Fast, Lightweight & User-Friendly
          </h3>

          <p className="mt-3">
            This <strong>time zone converter tool</strong> is built with performance in mind. It loads instantly, works smoothly on mobile devices, and provides a clean user interface for effortless navigation.
          </p>

          <p className="mt-3">
            With no login required and instant results, users can quickly convert time zones without any hassle. The intuitive design ensures even beginners can use it easily.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Search className="text-indigo-600" size={22} />
            SEO Keywords & Search Relevance
          </h3>

          <p className="mt-3">
            Our tool is optimized for high-demand search queries such as:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Time Zone Converter</li>
            <li>World Clock</li>
            <li>Meeting Planner</li>
            <li>Convert Time Between Countries</li>
            <li>GMT to IST Converter</li>
            <li>EST to PST Time Conversion</li>
            <li>International Time Calculator</li>
            <li>Global Time Difference Tool</li>
          </ul>

          <p className="mt-3">
            By using this tool, you can easily handle all time conversion needs in one place without switching between multiple platforms.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-green-700" size={22} />
            Reliable & Secure Time Conversion
          </h3>

          <p className="mt-3">
            Our system runs entirely in your browser, ensuring <strong>privacy and security</strong>. No data is stored or shared, making it a safe tool for both personal and professional use.
          </p>

          <p className="mt-3">
            Whether you are a developer, business owner, or casual user, you can rely on this tool for accurate and secure time conversion anytime.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Star className="text-yellow-600" size={22} />
            Final Thoughts
          </h3>

          <p className="mt-3">
            The <strong>Global Time Zone Converter & Meeting Planner</strong> is an essential tool for anyone working across different time zones. With features like real-time clocks, DST handling, GMT offset calculation, and smart scheduling, it simplifies global communication like never before.
          </p>

          <p className="mt-3">
            Start using this free online tool today and make international scheduling faster, easier, and more efficient.
          </p>
        </div>

      </div>

    </div>
  );
}