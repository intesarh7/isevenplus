"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton() {
  const [showHint, setShowHint] = useState(false);

  const handleBookmark = () => {
    setShowHint(true);

    setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  return (
    <div className="relative">

      <button
        onClick={handleBookmark}
        className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        <Bookmark size={16} />
        <span className="hidden sm:inline">Bookmark</span>
      </button>

      {showHint && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl border p-4 rounded-xl text-sm z-50">
          <p className="font-semibold mb-2">How to Bookmark:</p>
          <ul className="space-y-1 text-gray-600">
            <li>💻 Windows: <strong>Ctrl + D</strong></li>
            <li>🍎 Mac: <strong>⌘ + D</strong></li>
            <li>📱 Mobile: Browser menu → Add to Home Screen</li>
          </ul>
        </div>
      )}
    </div>
  );
}