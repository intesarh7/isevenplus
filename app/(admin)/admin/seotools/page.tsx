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

        <div className="p-4 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    SEO Tools Management
                </h1>

                <a
                    href="/admin/seotools/new"
                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto text-center"
                >
                    Add Tool
                </a>

            </div>


            <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">

                <table className="w-full border-collapse text-sm">

                    <thead className="bg-gray-100 text-gray-700">

                        <tr>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Tool</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Category</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Slug</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Status</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Type</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Daily Limit</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Monthly Limit</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Usage</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Price</th>

                            <th className="p-3 text-left font-semibold whitespace-nowrap">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {tools.map(tool => (

                            <tr
                                key={tool.id}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-3 font-medium text-gray-800 whitespace-nowrap">
                                    {tool.name}
                                </td>

                                <td className="p-3 text-gray-700 whitespace-nowrap">
                                    {tool.categoryName || "—"}
                                </td>

                                <td className="p-3 text-gray-600 whitespace-nowrap">
                                    {tool.slug}
                                </td>

                                <td className="p-3 whitespace-nowrap">

                                    <span className={`px-3 py-1 rounded-full text-white text-xs font-medium
${tool.isActive ? "bg-green-600" : "bg-red-500"}
`}>

                                        {tool.isActive ? "Active" : "Inactive"}

                                    </span>

                                </td>

                                <td className="p-3 whitespace-nowrap">

                                    <span className={`px-3 py-1 text-xs rounded-full text-white font-medium
${tool.isFree ? "bg-blue-500" : "bg-purple-600"}
`}>

                                        {tool.isFree ? "Free" : "Paid"}

                                    </span>

                                </td>

                                <td className="p-3 whitespace-nowrap text-gray-700">
                                    {tool.dailyLimit}
                                </td>

                                <td className="p-3 whitespace-nowrap text-gray-700">
                                    {tool.monthlyLimit}
                                </td>

                                <td className="p-3 whitespace-nowrap text-gray-700">
                                    {tool.usageCount}
                                </td>

                                <td className="p-3 whitespace-nowrap font-medium text-gray-800">
                                    ₹{tool.price}
                                </td>

                                <td className="p-3 whitespace-nowrap">

                                    <div className="flex flex-wrap gap-2">

                                        <button
                                            onClick={() => toggleActive(tool.id)}
                                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm transition"
                                        >
                                            Toggle Active
                                        </button>

                                        <button
                                            onClick={() => togglePaid(tool.id)}
                                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs sm:text-sm transition"
                                        >
                                            Toggle Paid
                                        </button>

                                        <a
                                            href={`/admin/seotools/edit/${tool.id}`}
                                            className="px-3 py-1 bg-gray-800 hover:bg-black text-white rounded-lg text-xs sm:text-sm transition"
                                        >
                                            Edit
                                        </a>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )
}