"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchBlogs() {

    const res = await fetch("/api/admin/blogs/list");
    const data = await res.json();

    setBlogs(data);

  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function deleteBlog(id:number){

    if(!confirm("Are you sure you want to delete this blog?")) return;

    await fetch("/api/admin/blogs/delete",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    });

    fetchBlogs();
  }

  const filtered = blogs.filter((b:any)=>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-6 space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            Blog Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage blog articles, categories and content.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <Link
            href="/admin/blogs/categories"
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            Categories
          </Link>

          <Link
            href="/admin/blogs/trash"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Trash
          </Link>

          <Link
            href="/admin/blogs/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            + Create Blog
          </Link>

        </div>

      </div>

      {/* Search */}

      <div className="flex justify-between items-center">

        <input
          placeholder="Search blog..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm w-64"
        />

        <p className="text-sm text-gray-500">
          {filtered.length} blogs
        </p>

      </div>

      {/* Table */}

      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">

            <tr>

              <th className="p-3 text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Status</th>
              <th className="text-left">Date</th>
              <th className="text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 && (

              <tr>
                <td colSpan={5} className="text-center p-10 text-gray-400">
                  No blogs found
                </td>
              </tr>

            )}

            {filtered.map((b:any)=>(

              <tr key={b.id} className="border-t hover:bg-gray-50">

                {/* Image */}

                <td className="p-3">

                  <img
                    src={b.featuredImage || "/no-image.png"}
                    alt={b.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />

                </td>

                {/* Title */}

                <td className="font-medium max-w-sm">

                  <div className="line-clamp-1">
                    {b.title}
                  </div>

                </td>

                {/* Status */}

                <td>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    b.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>

                    {b.status}

                  </span>

                </td>

                {/* Date */}

                <td className="text-gray-500">

                  {new Date(b.createdAt).toLocaleDateString()}

                </td>

                {/* Actions */}

                <td className="flex gap-2">

                  <Link
                    href={`/admin/blogs/edit/${b.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={()=>deleteBlog(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}