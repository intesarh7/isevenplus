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

        <div className="p-4 sm:p-6 max-w-3xl mx-auto">

            <div className="bg-white border shadow-md rounded-xl p-6 sm:p-8">

                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Edit SEO Tool
                    </h1>

                    <a
                        href="/admin/seotools"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                    >
                        ← Back
                    </a>

                </div>

                <form onSubmit={saveTool} className="space-y-5">

                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Tool Name
                        </label>

                        <input
                            name="name"
                            value={tool.name}
                            onChange={handleChange}
                            placeholder="Tool Name"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Slug
                        </label>

                        <input
                            name="slug"
                            value={tool.slug}
                            onChange={handleChange}
                            placeholder="Slug"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Meta Title
                        </label>

                        <input
                            name="meta_title"
                            value={tool.meta_title}
                            onChange={handleChange}
                            placeholder="Meta Title"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Meta Description
                        </label>

                        <textarea
                            name="meta_description"
                            value={tool.meta_description}
                            onChange={handleChange}
                            placeholder="Meta Description"
                            className="w-full border border-gray-300 p-3 rounded-lg min-h-22.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={tool.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border border-gray-300 p-3 rounded-lg min-h-27.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="grid sm:grid-cols-2 gap-4">

                        <div className="space-y-1">

                            <label className="text-sm font-medium text-gray-600">
                                Tool Price
                            </label>

                            <input
                                name="price"
                                type="number"
                                value={tool.price}
                                onChange={handleChange}
                                placeholder="Tool Price"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />

                        </div>

                        <div className="space-y-1">

                            <label className="text-sm font-medium text-gray-600">
                                Daily Limit
                            </label>

                            <input
                                name="dailyLimit"
                                type="number"
                                value={tool.dailyLimit}
                                onChange={handleChange}
                                placeholder="Daily Limit"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />

                        </div>

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            Monthly Limit
                        </label>

                        <input
                            name="monthlyLimit"
                            type="number"
                            value={tool.monthlyLimit}
                            onChange={handleChange}
                            placeholder="Monthly Limit"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            API Provider
                        </label>

                        <input
                            name="apiProvider"
                            value={tool.apiProvider}
                            onChange={handleChange}
                            placeholder="API Provider"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


                    <div className="space-y-1">

                        <label className="text-sm font-medium text-gray-600">
                            API Endpoint
                        </label>

                        <input
                            name="apiEndpoint"
                            value={tool.apiEndpoint}
                            onChange={handleChange}
                            placeholder="API Endpoint"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />

                    </div>


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
                                    checked={tool.isActive == 1}
                                    onChange={(e) => setTool({ ...tool, isActive: e.target.checked ? 1 : 0 })}
                                    className="accent-indigo-600"
                                />

                                Active

                            </label>

                        </div>

                    </div>


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