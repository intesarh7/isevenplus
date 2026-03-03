"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function formatSlug(text: string) {
  return text
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PincodeAutoSuggest({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const [query, setQuery] = useState(defaultValue || "");
  const [indiaResults, setIndiaResults] = useState<any[]>([]);
  const [worldResults, setWorldResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 2) {
        fetch(`/api/pincode-suggest?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setIndiaResults(data.india || []);
            setWorldResults(data.world || []);
            setShow(true);
          });
      } else {
        setIndiaResults([]);
        setWorldResults([]);
        setShow(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center border p-3 rounded-xl">
        <Search size={18} className="mr-2 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Pincode / City / State"
          className="w-full outline-none"
        />
      </div>

      {show && (indiaResults.length > 0 || worldResults.length > 0) && (
        <div className="absolute z-50 bg-white border w-full mt-2 rounded-xl shadow-lg max-h-80 overflow-y-auto">

          {/* 🇮🇳 INDIA SECTION */}
          {indiaResults.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100">
                🇮🇳 India Results
              </div>
              {indiaResults.map((item, index) => (
                <div
                  key={`india-${index}`}
                  onClick={() =>
                    router.push(`/pincode/${item.pincode}`)
                  }
                  className="p-3 hover:bg-indigo-50 cursor-pointer border-b"
                >
                  <p className="font-medium">{item.pincode}</p>
                  <p className="text-sm text-gray-500">
                    {item.district}, {item.state}
                  </p>
                </div>
              ))}
            </>
          )}

          {/* 🌍 WORLD SECTION */}
          {worldResults.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100">
                🌍 World Results
              </div>
              {worldResults.map((item, index) => {
                const country = formatSlug(item.country);
                const state = formatSlug(item.state || "");
                const city = formatSlug(item.placeName || "");
                const postal = item.postalCode;

                const parts = ["postalcode", country];

                if (state) parts.push(state);
                if (city) parts.push(city);

                parts.push(postal);

                const finalUrl = `/${parts.join("/")}`;

                return (
                  <div
                    key={`world-${index}`}
                    onClick={() => router.push(finalUrl)}
                    className="p-3 hover:bg-indigo-50 cursor-pointer border-b"
                  >
                    <p className="font-medium">{item.postalCode}</p>
                    <p className="text-sm text-gray-500">
                      {item.placeName}, {item.state} ({item.country})
                    </p>
                  </div>
                );
              })}
            </>
          )}

        </div>
      )}
    </div>
  );
}