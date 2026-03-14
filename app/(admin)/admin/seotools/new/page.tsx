"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSeoTool() {

  const router = useRouter();

  const [tool, setTool] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_description: "",
    price: 0,
    isFree: 1,
    isPaid: 0,
    dailyLimit: 0,
    monthlyLimit: 0,
    isActive: 1
  });

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

    <div className="p-6 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">
        Add SEO Tool
      </h1>

      <form onSubmit={saveTool} className="space-y-4">

        {/* TOOL NAME */}

        <input
          name="name"
          value={tool.name}
          placeholder="Tool Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* SLUG */}

        <input
          name="slug"
          value={tool.slug}
          placeholder="Slug auto generated"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* DESCRIPTION */}

        <textarea
          name="description"
          placeholder="Tool Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* META TITLE */}

        <input
          name="meta_title"
          placeholder="Meta Title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* META DESCRIPTION */}

        <textarea
          name="meta_description"
          placeholder="Meta Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* PRICE */}

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* LIMITS */}

        <input
          type="number"
          name="dailyLimit"
          placeholder="Daily Limit"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="monthlyLimit"
          placeholder="Monthly Limit"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* FLAGS */}

        <div className="flex gap-4">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={tool.isFree == 1}
              onChange={(e) => setTool({ ...tool, isFree: e.target.checked ? 1 : 0 })}
            />

            Free Tool

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={tool.isPaid == 1}
              onChange={(e) => setTool({ ...tool, isPaid: e.target.checked ? 1 : 0 })}
            />

            Paid Tool

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={tool.isActive == 1}
              onChange={(e) => setTool({ ...tool, isActive: e.target.checked ? 1 : 0 })}
            />

            Active

          </label>

        </div>

        {/* SAVE */}

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save Tool
        </button>

      </form>

    </div>

  )

}