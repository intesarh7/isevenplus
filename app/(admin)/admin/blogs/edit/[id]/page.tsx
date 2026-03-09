"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import RichEditor from "@/app/components/editor/RichEditor";

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

export default function EditBlog() {

    const router = useRouter();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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



    async function fetchBlog() {

        const res = await fetch("/api/admin/blogs/list");
        const data = await res.json();

        const blog = data.find((b: any) => b.id == params.id);

        if (blog) {

            setForm({
                title: blog.title || "",
                slug: blog.slug || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                featuredImage: blog.featuredImage || "",
                status: blog.status || "draft",
                categoryId: blog.categoryId?.toString() || "",
                metaTitle: blog.metaTitle || "",
                metaDescription: blog.metaDescription || ""
            });

        }

        setLoading(false);
    }

    useEffect(() => {
        fetchBlog();
    }, [params.id]);

    async function uploadImage(e: any) {

        const file = e.target.files?.[0];

        if (!file) return;

        console.log("Uploading image:", file);

        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/blogs/upload", {
            method: "POST",
            body: fd
        });

        const data = await res.json();

        console.log("Upload response:", data);

        if (data?.url) {
            setForm((prev) => ({
                ...prev,
                featuredImage: data.url
            }));
        } else {
            alert("Image upload failed");
        }



    }


    async function updateBlog() {

        console.log("Updating:", form);

        const res = await fetch("/api/admin/blogs/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: params.id,
                ...form
            })
        });

        const data = await res.json();

        if (!data.success) {
            alert("Update failed");
            return;
        }

        router.push("/admin/blogs");

    }


    if (loading) return <div className="p-6">Loading...</div>;


    return (

        <div className="max-w-3xl p-6 space-y-4">

            <h1 className="text-2xl font-bold">
                Edit Blog
            </h1>

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

            <input
                placeholder="Slug"
                className="border p-3 w-full"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />

            <textarea
                placeholder="Excerpt"
                className="border p-3 w-full"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />

            <div className="space-y-2">

                <label className="font-medium">Content</label>

                <RichEditor
                    value={form.content}
                    onChange={(content) =>
                        setForm({ ...form, content })
                    }
                />

            </div>

            <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
            />

            {form.featuredImage && (
                <img
                    src={form.featuredImage}
                    className="w-40 rounded mt-2"
                    alt="Blog image"
                />
            )}

            <select
                className="border p-3"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            >

                <option value="draft">Draft</option>
                <option value="published">Publish</option>

            </select>

            <input
                placeholder="Meta Title"
                className="border p-3 w-full"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            />

            <textarea
                placeholder="Meta Description"
                className="border p-3 w-full"
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            />

            <button
                onClick={updateBlog}
                className="bg-indigo-600 text-white px-6 py-3 rounded"
            >
                Update Blog
            </button>

        </div>

    )
}