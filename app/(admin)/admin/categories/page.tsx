"use client";

import { slugify } from "@/app/lib/slugify";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    slug: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories/list");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Create / Update
  const handleSubmit = async () => {
    const url = editingId
      ? "/api/admin/categories/update"
      : "/api/admin/categories";

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(
        editingId ? { ...form, id: editingId } : form
      ),
    });

    setForm({ name: "", slug: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/categories/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  const handleEdit = (cat: any) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
    });
    setEditingId(cat.id);
  };

  return (
    <div className="p-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-xl">
        <h1 className="text-xl font-bold mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Category Name"
            value={form.name}
            className="w-full border p-3 rounded"
            onChange={(e) => {
              const name = e.target.value;
              setForm({
                name,
                slug: slugify(name),
              });
            }}
          />

          <input
            value={form.slug}
            className="w-full border p-3 rounded bg-gray-100"
            readOnly
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingId ? "Update Category" : "Save Category"}
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          placeholder="Search category..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.slug}</td>
                <td className="space-x-2 p-3">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}