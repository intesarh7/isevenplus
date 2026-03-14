"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditSeoTool() {

    const { id } = useParams()
    const router = useRouter()


    const [tool, setTool] = useState<any>({
        name: "",
        slug: "",
        categoryId: "",
        meta_title: "",
        meta_description: "",
        description: "",
        price: 0,
        dailyLimit: 0,
        monthlyLimit: 0,
        apiProvider: "",
        apiEndpoint: "",
        isFree: 1,
        isActive: 1
    })

    const [categories, setCategories] = useState<any[]>([])

    useEffect(() => {
        loadTool()
        loadCategories()
    }, [])

    async function loadCategories() {

        const res = await fetch("/api/admin/seo-tools-categories")

        const data = await res.json()

        setCategories(data)

    }

    async function loadTool() {

        const res = await fetch(`/api/admin/seotools/${id}`)
        const data = await res.json()

        setTool(data)

    }

    async function saveTool(e: any) {

        e.preventDefault()

        await fetch(`/api/admin/seotools/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tool)
        })

        alert("Tool Updated")

        router.push("/admin/seotools")

    }

    function handleChange(e: any) {

        setTool({
            ...tool,
            [e.target.name]: e.target.value
        })

    }

    return (

        <div className="p-6 max-w-3xl">

            <h1 className="text-2xl font-bold mb-6">
                Edit SEO Tool
            </h1>

            <form onSubmit={saveTool} className="space-y-4">

                <input
                    name="name"
                    value={tool.name}
                    onChange={handleChange}
                    placeholder="Tool Name"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="slug"
                    value={tool.slug}
                    onChange={handleChange}
                    placeholder="Slug"
                    className="w-full border p-2 rounded"
                />
                <select
    name="categoryId"
    value={tool.categoryId || ""}
    onChange={handleChange}
    className="w-full border p-2 rounded"
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

                <input
                    name="meta_title"
                    value={tool.meta_title}
                    onChange={handleChange}
                    placeholder="Meta Title"
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="meta_description"
                    value={tool.meta_description}
                    onChange={handleChange}
                    placeholder="Meta Description"
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="description"
                    value={tool.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="price"
                    type="number"
                    value={tool.price}
                    onChange={handleChange}
                    placeholder="Tool Price"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="dailyLimit"
                    type="number"
                    value={tool.dailyLimit}
                    onChange={handleChange}
                    placeholder="Daily Limit"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="monthlyLimit"
                    type="number"
                    value={tool.monthlyLimit}
                    onChange={handleChange}
                    placeholder="Monthly Limit"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="apiProvider"
                    value={tool.apiProvider}
                    onChange={handleChange}
                    placeholder="API Provider"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="apiEndpoint"
                    value={tool.apiEndpoint}
                    onChange={handleChange}
                    placeholder="API Endpoint"
                    className="w-full border p-2 rounded"
                />

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
                            checked={tool.isActive == 1}
                            onChange={(e) => setTool({ ...tool, isActive: e.target.checked ? 1 : 0 })}
                        />

                        Active

                    </label>

                </div>

                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Save Tool
                </button>

            </form>

        </div>

    )

}