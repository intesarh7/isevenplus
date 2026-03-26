"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function LiveUsers() {
    const [count, setCount] = useState(0);

    useEffect(() => {
  const fetchUsers = () => {
    fetch("/api/online-users")
      .then((res) => res.json())
      .then((data) => {

        const real = data.total || 0;

        let displayCount;

        if (real === 0) {
          displayCount = 5 + Math.floor(Math.random() * 6);
        } else {
          displayCount = real + Math.floor(Math.random() * 3);
        }

        setCount(displayCount);
      });
  };

  fetchUsers();
  const interval = setInterval(fetchUsers, 10000);

  return () => clearInterval(interval);
}, []);

    return (
        <>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border">
                <Users size={14} className="text-green-600" />
                <span className="font-medium text-green-700">
                    {count} users online
                </span>
            </div>
        </>
    );
}