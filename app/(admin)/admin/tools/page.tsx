"use client";

import { slugify } from "@/app/lib/slugify";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function AdminTools() {
  const [tools, setTools] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    categoryId: "",
    isActive: true,
  });

  // 🔥 Load Tools
  const fetchTools = async () => {
    const res = await fetch("/api/admin/tools/list");
    const data = await res.json();
    setTools(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories/list");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  // 🔥 Filter + Search Logic
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? tool.isActive === 1
          : tool.isActive === 0;

      return matchesSearch && matchesStatus;
    });
  }, [tools, search, statusFilter]);

  // 🔥 Pagination
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);

  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔥 Create / Update
  const handleSubmit = async () => {
    const url = editingId
      ? "/api/admin/tools/update"
      : "/api/admin/tools";

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(
        editingId ? { ...form, id: editingId } : form
      ),
    });

    setForm({
      name: "",
      slug: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      categoryId: "",
      isActive: true,
    });

    setEditingId(null);
    fetchTools();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/tools/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    fetchTools();
  };

  const handleToggle = async (tool: any) => {
    await fetch("/api/admin/tools/toggle", {
      method: "POST",
      body: JSON.stringify({
        id: tool.id,
        isActive: !tool.isActive,
      }),
    });
    fetchTools();
  };

  const handleEdit = (tool: any) => {
    setForm({
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      metaTitle: tool.metaTitle,
      metaDescription: tool.metaDescription,
      categoryId: tool.categoryId,
      isActive: tool.isActive === 1,
    });
    setEditingId(tool.id);
  };

  return (
    <div className="p-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 w-full">
        <h1 className="text-xl font-bold mb-4">
          {editingId ? "Edit Tool" : "Add Tool"}
        </h1>

        <div className="space-y-4 grid md:grid-cols-3 gap-4 mb-10">

          <input
            placeholder="Tool Name"
            value={form.name}
            className="w-full border p-3 rounded"
            onChange={(e) => {
              const name = e.target.value;
              setForm({
                ...form,
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

          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
            className="w-full border p-3 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          

          <input
            placeholder="Meta Title"
            value={form.metaTitle}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, metaTitle: e.target.value })
            }
          />

          <textarea
            placeholder="Meta Description"
            value={form.metaDescription}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                metaDescription: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Description"
            value={form.description}
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingId ? "Update Tool" : "Save Tool"}
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search tools..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Views</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTools.map((tool) => (
              <tr key={tool.id} className="border-t">
                <td className="p-3">{tool.name}</td>
                <td>{tool.usageCount}</td>
                <td className="p-3">{tool.slug}</td>
                <td className="p-3 max-w-xs truncate">
                  {tool.description}
                </td>

                <td>
                  <button
                    onClick={() => handleToggle(tool)}
                    className={`px-3 py-1 rounded text-white ${
                      tool.isActive
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {tool.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(tool)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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