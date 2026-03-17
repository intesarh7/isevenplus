"use client";

import { useState, useEffect, useRef } from "react";
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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  /* ===============================
     SEARCH API CALL
  =============================== */

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 2) {
        setLoading(true);

        fetch(`/api/pincode-suggest?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setIndiaResults(data.india || []);
            setWorldResults(data.world || []);
            setShow(true);
          })
          .catch(() => {
            setIndiaResults([]);
            setWorldResults([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setIndiaResults([]);
        setWorldResults([]);
        setShow(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  /* ===============================
     OUTSIDE CLICK CLOSE
  =============================== */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ===============================
     ESC KEY CLOSE
  =============================== */

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShow(false);
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const noResults =
    !loading &&
    query.length >= 2 &&
    indiaResults.length === 0 &&
    worldResults.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">

      {/* SEARCH BOX */}

      <div className="flex items-center border p-3 rounded-xl">
        <Search size={18} className="mr-2 text-gray-500" />

        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Pincode / Post Office / District / State"
          className="w-full outline-none"
        />
      </div>

      {/* RESULT DROPDOWN */}

      {show && (
        <div className="absolute z-50 bg-white border w-full mt-2 rounded-xl shadow-lg max-h-96 overflow-y-auto">

          {/* LOADING */}

          {loading && (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          )}

          {/* 🇮🇳 INDIA RESULTS */}

          {!loading && indiaResults.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100">
                🇮🇳 India Results
              </div>

              {indiaResults.map((item, index) => {
                const state = formatSlug(item.state);
                const district = formatSlug(item.district);
                const taluk = formatSlug(item.taluk || "");
                const office = formatSlug(item.office_name || "");
                const pincode = item.pincode;

                const parts = ["pincode", state];

if (district) parts.push(district);
if (taluk) parts.push(taluk);
if (office) parts.push(office);

parts.push(pincode);

const finalUrl = `/${parts.join("/")}`;

                return (
                  <div
                    key={`india-${index}`}
                    onClick={() => {
                      router.push(finalUrl);
                      setShow(false);
                    }}
                    className="p-3 hover:bg-indigo-50 cursor-pointer border-b"
                  >
                    <p className="font-semibold">{item.office_name}</p>

                    <p className="text-sm text-gray-500">
                      {item.district}, {item.state}
                    </p>

                    {/* <p className="text-xs text-indigo-600">
                      PIN: {item.pincode}
                    </p> */}
                  </div>
                );
              })}
            </>
          )}

          {/* 🌍 WORLD RESULTS */}

          {!loading && worldResults.length > 0 && (
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
                    onClick={() => {
                      router.push(finalUrl);
                      setShow(false);
                    }}
                    className="p-3 hover:bg-indigo-50 cursor-pointer border-b"
                  >
                    <p className="font-semibold">{item.postalCode}</p>

                    <p className="text-sm text-gray-500">
                      {item.placeName}, {item.state} ({item.country})
                    </p>
                  </div>
                );
              })}
            </>
          )}

          {/* ❌ NO RESULT */}

          {noResults && (
            <div className="p-6 text-center text-gray-500">
              No Pincode or Post Office found for "{query}"
            </div>
          )}

        </div>
      )}
    </div>
  );
}