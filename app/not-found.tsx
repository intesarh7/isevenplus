// app/not-found.tsx

import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | iSevenPlus",
  description: "The requested page could not be found on iSevenPlus.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl w-full text-center bg-white shadow-xl rounded-2xl p-10">

        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            <Home size={18} />
            Go to Homepage
          </Link>

          <Link
            href="/tools"
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
          >
            <Search size={18} />
            Explore Tools
          </Link>
          <Link
            href="/pincode"
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
          >
            <Search size={18} />
            Search Pincode/Postal Code
          </Link>

        </div>

      </div>
    </div>
  );
}