"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/app/components/editor/RichEditor";

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

export default function CreateBlog() {

    const router = useRouter();
    const [categories, setCategories] = useState([]);


    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        status: "draft",
        categoryId: "",
        metaTitle: "",
        metaDescription: ""
    });

    async function fetchCategories() {

        const res = await fetch("/api/admin/blogs/categories/list");
        const data = await res.json();

        setCategories(data);

    }
    useEffect(() => {
        fetchCategories();
    }, []);

    const [uploading, setUploading] = useState(false);

    /* =========================
       Submit Blog
    ========================= */

    async function handleSubmit() {

        console.log("Submitting form:", form);

        const res = await fetch("/api/admin/blogs/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(form)
        });

        const data = await res.json();

        console.log(data);

        if (data.success) {
            router.push("/admin/blogs");
        } else {
            alert(data.error || "Something went wrong");
        }

    }

    /* =========================
       Upload Image
    ========================= */

    async function uploadImage(e: any) {

        const file = e.target.files?.[0];

        if (!file) {
            alert("Please select image");
            return;
        }

        console.log("Uploading file:", file);

        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/blogs/upload", {
            method: "POST",
            body: fd
        });

        const data = await res.json();

        console.log("Upload response:", data);

        setForm(prev => ({
            ...prev,
            featuredImage: data.url
        }));

    }

    return (

        <div className="max-w-3xl p-6 space-y-4">

            <h1 className="text-2xl font-bold">Create Blog</h1>

            <select
                className="border p-3 w-full"
                value={form.categoryId}
                onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                }
            >

                <option value="">
                    Select Category
                </option>

                {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}

            </select>

            {/* Title */}

            <input
                placeholder="Title"
                className="border p-3 w-full"
                value={form.title}
                onChange={(e) => {
                    const title = e.target.value;

                    setForm({
                        ...form,
                        title,
                        slug: slugify(title)
                    })
                }}
            />

            {/* Slug */}

            <input
                placeholder="Slug"
                className="border p-3 w-full"
                value={form.slug}
                onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                }
            />

            {/* Excerpt */}

            <textarea
                placeholder="Excerpt"
                className="border p-3 w-full"
                value={form.excerpt}
                onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                }
            />

            {/* Content */}

            <div className="space-y-2">

                <label className="font-medium">Content</label>

                <RichEditor
                    value={form.content}
                    onChange={(content) =>
                        setForm({ ...form, content })
                    }
                />

            </div>

            {/* Image Upload */}

            <div className="space-y-2">

                <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                />

                {uploading && (
                    <p className="text-sm text-gray-500">
                        Uploading image...
                    </p>
                )}


                {form.featuredImage && (
                    <img
                        src={form.featuredImage}
                        className="w-40 rounded"
                    />
                )}

            </div>

            {/* Status */}

            <select
                className="border p-3"
                value={form.status}
                onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                }
            >

                <option value="draft">Draft</option>
                <option value="published">Publish</option>

            </select>

            {/* Meta Title */}

            <input
                placeholder="Meta Title"
                className="border p-3 w-full"
                value={form.metaTitle}
                onChange={(e) =>
                    setForm({ ...form, metaTitle: e.target.value })
                }
            />

            {/* Meta Description */}

            <textarea
                placeholder="Meta Description"
                className="border p-3 w-full"
                value={form.metaDescription}
                onChange={(e) =>
                    setForm({ ...form, metaDescription: e.target.value })
                }
            />

            {/* Save Button */}

            <button
                disabled={uploading}
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-3 rounded disabled:opacity-50"
            >
                {uploading ? "Uploading Image..." : "Save Blog"}
            </button>

        </div>

    );
}