"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({
  baseUrl,
  state,
  district,
  pincode,
}: any) {

  function formatSlug(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <nav className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-1">

      <Link
        href="/"
        className="flex items-center gap-1 text-indigo-600 hover:underline"
      >
        <Home size={16} />
        Home
      </Link>

      <ChevronRight size={16} />

      <Link
        href="/india-pincode"
        className="text-indigo-600 hover:underline"
      >
        India Pincode
      </Link>

      <ChevronRight size={16} />

      <Link
        href={`/state/${formatSlug(state)}`}
        className="text-indigo-600 hover:underline"
      >
        {state}
      </Link>

      <ChevronRight size={16} />

      <Link
        href={`/city/${formatSlug(district)}`}
        className="text-indigo-600 hover:underline"
      >
        {district}
      </Link>

      <ChevronRight size={16} />

      <span className="text-gray-900 font-semibold">
        {pincode}
      </span>

    </nav>
  );
}