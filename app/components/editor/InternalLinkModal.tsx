"use client";

import { useEffect, useState } from "react";

export default function InternalLinkModal({
  open,
  onClose,
  onSelect
}: any) {

  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    if (!open) return;

    fetch(`/api/admin/blogs/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs || []);
      });

  }, [query, open]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-125 p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Insert Internal Link
        </h2>

        <input
          placeholder="Search blog..."
          className="border p-2 w-full rounded"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />

        <div className="max-h-60 overflow-y-auto">

          {blogs.map((b:any)=>(
            <div
              key={b.id}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
              onClick={()=>{

                onSelect(`/blogs/${b.slug}`);
                onClose();

              }}
            >
              {b.title}
            </div>
          ))}

        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Close
        </button>

      </div>

    </div>

  );

}