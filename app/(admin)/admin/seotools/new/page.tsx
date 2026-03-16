"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function NewSeoTool() {

  const router = useRouter();

  const [tool, setTool] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    categoryId: "",
    meta_description: "",
    price: 0,
    isFree: 1,
    isPaid: 0,
    dailyLimit: 0,
    monthlyLimit: 0,
    isActive: 1
  });


  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {

    const res = await fetch("/api/admin/seo-tools-categories")

    const data = await res.json()

    setCategories(data)

  }

  /* =========================
     SLUG GENERATOR
  ========================== */

  function generateSlug(text: string) {

    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")   // remove special chars
      .trim()
      .replace(/\s+/g, "-")       // space → dash
      .replace(/--+/g, "-");      // remove double dash
  }

  /* =========================
     INPUT CHANGE
  ========================== */

  function handleChange(e: any) {

    const { name, value } = e.target;

    if (name === "name") {

      const slug = generateSlug(value);

      setTool({
        ...tool,
        name: value,
        slug
      });

    } else {

      setTool({
        ...tool,
        [name]: value
      });

    }

  }

  /* =========================
     SAVE TOOL
  ========================== */

  async function saveTool(e: any) {

    e.preventDefault();

    await fetch("/api/admin/seotools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tool)
    });

    router.push("/admin/seotools");

  }

  return (

    <div className="p-4 sm:p-6 max-w-3xl mx-auto">

      <div className="bg-white shadow-md rounded-xl border p-6 sm:p-8">

        <div className="flex items-center justify-between mb-6">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Add SEO Tool
          </h1>

          <a
            href="/admin/seotools"
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            ← Back
          </a>

        </div>


        <form onSubmit={saveTool} className="space-y-5">

          {/* TOOL NAME */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Tool Name
            </label>

            <input
              name="name"
              value={tool.name}
              placeholder="Tool Name"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>


          {/* SLUG */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Slug
            </label>

            <input
              name="slug"
              value={tool.slug}
              placeholder="Slug auto generated"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="space-y-1">

            <label className="text-sm font-medium text-gray-600">
              Category
            </label>

            <select
              name="categoryId"
              value={tool.categoryId || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >

              <option value="">
                Select Category
              </option>

              {categories.map(cat => (

                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>

              ))}

            </select>

          </div>

          {/* META TITLE */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Meta Title
            </label>

            <input
              name="meta_title"
              placeholder="Meta Title"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* META DESCRIPTION */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Meta Description
            </label>

            <textarea
              name="meta_description"
              placeholder="Meta Description"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition min-h-22.5"
            />
          </div>


          {/* DESCRIPTION */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Tool Description
            </label>

            <textarea
              name="description"
              placeholder="Tool Description"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition min-h-25"
            />
          </div>


          {/* PRICE */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>


          {/* LIMITS */}

          <div className="grid sm:grid-cols-2 gap-4">

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Daily Limit
              </label>

              <input
                type="number"
                name="dailyLimit"
                placeholder="Daily Limit"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>


            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Monthly Limit
              </label>

              <input
                type="number"
                name="monthlyLimit"
                placeholder="Monthly Limit"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

          </div>


          {/* FLAGS */}

          <div className="border rounded-lg p-4 bg-gray-50">

            <p className="text-sm font-semibold text-gray-700 mb-3">
              Tool Settings
            </p>

            <div className="flex flex-wrap gap-6">

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">

                <input
                  type="checkbox"
                  checked={tool.isFree == 1}
                  onChange={(e) => setTool({ ...tool, isFree: e.target.checked ? 1 : 0 })}
                  className="accent-indigo-600"
                />

                Free Tool

              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">

                <input
                  type="checkbox"
                  checked={tool.isPaid == 1}
                  onChange={(e) => setTool({ ...tool, isPaid: e.target.checked ? 1 : 0 })}
                  className="accent-indigo-600"
                />

                Paid Tool

              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">

                <input
                  type="checkbox"
                  checked={tool.isActive == 1}
                  onChange={(e) => setTool({ ...tool, isActive: e.target.checked ? 1 : 0 })}
                  className="accent-indigo-600"
                />

                Active

              </label>

            </div>

          </div>


          {/* SAVE */}

          <button
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm"
          >
            Save Tool
          </button>

        </form>

      </div>

    </div>

  )

}