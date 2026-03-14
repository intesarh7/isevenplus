"use client";

import { useEffect, useState } from "react";

interface Tool {
    id: number
    name: string
    slug: string
    categoryName: string
    isActive: number
    isFree: number
    isPaid: number
    dailyLimit: number
    monthlyLimit: number
    price: number
    usageCount: number
}

export default function SeoToolsAdminPage() {

    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTools()
    }, [])

    async function loadTools() {
        const res = await fetch("/api/admin/seotools")
        const data = await res.json()
        setTools(data)
        setLoading(false)
    }

    async function toggleActive(id: number) {

        await fetch(`/api/admin/seotools/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: "active" })
        })

        loadTools()
    }

    async function togglePaid(id: number) {

        await fetch(`/api/admin/seotools/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: "paid" })
        })

        loadTools()
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                SEO Tools Management
            </h1>
            <a
                href="/admin/seotools/new"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
                Add Tool
            </a>

            <div className="overflow-x-auto">

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">Tool</th>
                            <th>Category</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Daily Limit</th>
                            <th>Monthly Limit</th>
                            <th>Usage</th>
                            <th>Price</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {tools.map(tool => (

                            <tr key={tool.id} className="border-t">

                                <td className="p-3 font-medium">
                                    {tool.name}
                                </td>

                                <td className="text-gray-700">
                                    {tool.categoryName || "—"}
                                </td>

                                <td>
                                    {tool.slug}
                                </td>

                                <td>

                                    <span className={`px-2 py-1 rounded text-white text-xs
${tool.isActive ? "bg-green-600" : "bg-red-500"}
`}>

                                        {tool.isActive ? "Active" : "Inactive"}

                                    </span>

                                </td>

                                <td>

                                    <span className={`px-2 py-1 text-xs rounded text-white
${tool.isFree ? "bg-blue-500" : "bg-purple-600"}
`}>

                                        {tool.isFree ? "Free" : "Paid"}

                                    </span>

                                </td>

                                <td>{tool.dailyLimit}</td>

                                <td>{tool.monthlyLimit}</td>

                                <td>{tool.usageCount}</td>

                                <td>₹{tool.price}</td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() => toggleActive(tool.id)}
                                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                                    >
                                        Toggle Active
                                    </button>

                                    <button
                                        onClick={() => togglePaid(tool.id)}
                                        className="px-3 py-1 bg-yellow-600 text-white rounded"
                                    >
                                        Toggle Paid
                                    </button>

                                    <a
                                        href={`/admin/seotools/edit/${tool.id}`}
                                        className="px-3 py-1 bg-gray-800 text-white rounded"
                                    >
                                        Edit
                                    </a>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )
}