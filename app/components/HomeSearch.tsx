"use client";

import { useEffect, useRef, useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* FETCH DATA */
  useEffect(() => {
    const delay = setTimeout(() => {
      fetch(`/api/tools/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }, 250);

    return () => clearTimeout(delay);
  }, [query]);

  /* OUTSIDE CLICK CLOSE */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ESC KEY CLOSE */
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShow(false);
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  /* SPLIT TOP + OTHER */
  const topTools = results.slice(0, 3); // top 3 trending
  const otherTools = results.slice(3);

  return (
    <div
      ref={wrapperRef}
      className="mt-6 max-w-xl mx-auto relative"
    >
      {/* INPUT */}
      <div className="flex items-center border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
        <Search className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search any calculator (EMI, GST, Blinkit...)"
          className="w-full outline-none text-sm"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShow(true);
          }}
          onFocus={() => setShow(true)}
        />
      </div>

      {/* DROPDOWN */}
      {show && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border mt-2 rounded-xl shadow-lg z-50 text-left">

          {/* 🔥 TOP TOOLS */}
          {topTools.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-500 font-semibold flex items-center gap-1">
                <TrendingUp size={14} /> Top Tools
              </div>

              {topTools.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    router.push(`/tools/${item.slug}`);
                    setShow(false);
                  }}
                  className="px-4 py-3 text-sm hover:bg-indigo-50 cursor-pointer flex items-center gap-2"
                >
                  🔥 <span>{item.name}</span>
                </div>
              ))}
            </>
          )}

          {/* OTHER TOOLS */}
          {otherTools.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs text-gray-400 font-semibold border-t">
                More Tools
              </div>

              {otherTools.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    router.push(`/tools/${item.slug}`);
                    setShow(false);
                  }}
                  className="px-4 py-3 text-sm hover:bg-indigo-50 cursor-pointer flex items-center gap-2"
                >
                  <Search size={14} className="text-gray-400" />
                  <span>{item.name}</span>
                </div>
              ))}
            </>
          )}

        </div>
      )}
    </div>
  );
}