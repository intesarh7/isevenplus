"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function ToolRating({
  slug,
  rating,
  ratingCount,
}: {
  slug: string;
  rating: number;
  ratingCount: number;
}) {

  const [currentRating, setCurrentRating] = useState(rating);
  const [count, setCount] = useState(ratingCount);

  const handleRate = async (value: number) => {

    const res = await fetch("/api/tools/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, rating: value }),
    });

    if (res.ok) {
      const newCount = count + 1;
      const newRating =
        (currentRating * count + value) / newCount;

      setCount(newCount);
      setCurrentRating(Number(newRating.toFixed(1)));
    }
  };

  return (
    <>
    <div className="flex items-center gap-4">
      <span className="text-yellow-500 font-semibold flex gap-1 items-center">
        <Star size={16} className="text-yellow-500 fill-yellow-500" /> {currentRating} ({count})
      </span>

      <div className="flex gap-2">
        {[5,4,3,2,1].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            className="text-sm border px-1 py-1 rounded hover:bg-gray-100 flex gap-1 items-center"
          >
            <Star size={16} className="text-yellow-500" /> {star}
          </button>
        ))}
      </div>
    </div>
     
    </>
  );
}