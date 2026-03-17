"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SeoToolSearch({ tools = [] }: any) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      setOpen(false);
      return;
    }

    const filtered = tools.filter((t: any) =>
      t.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered.slice(0, 6));
    setOpen(true);
  };

  /* 🔥 OUTSIDE CLICK CLOSE */
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* 🔥 ESC KEY CLOSE */
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>

      <div className="flex items-center border rounded-xl px-3 py-2 bg-white shadow-sm">
        <Search size={18} className="text-gray-400" />

        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search SEO tools..."
          className="w-full ml-2 outline-none"
        />
      </div>

      {/* 🔥 DROPDOWN */}
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50">

          {results.map((item) => (
            <a
              key={item.slug}
              href={`/seotools/${item.slug}`}
              className="block px-4 py-2 text-sm hover:bg-indigo-50"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}

        </div>
      )}

    </div>
  );
}