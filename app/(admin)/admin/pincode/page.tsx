"use client";

import { useEffect, useState } from "react";

interface PostalItem {
  id: number;

  // Indian
  pincode?: string;
  office_name?: string;
  branch_type?: string;
  delivery_status?: string;
  district?: string;
  division?: string;
  region?: string;
  taluk?: string;
  circle?: string;
  state?: string;

  // World
  postal_code?: string;
  place_name?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  latitude?: number;
  longitude?: number;
}

export default function PostalAdminPage() {
    const [tab, setTab] = useState<"india" | "world">("india");
    const [data, setData] = useState<PostalItem[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const limit = 20;
    const totalPages = Math.ceil(total / limit);

    const fetchData = async () => {
        try {
            const res = await fetch(
                `/api/admin/${tab === "india" ? "indian-pincode" : "world-postal"}?page=${page}&search=${search}`
            );

            if (!res.ok) {
                console.error("API Error:", res.status);
                return;
            }

            const json = await res.json();
            setData(json.data || []);
            setTotal(json.total || 0);

        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };
    useEffect(() => {
        fetchData();
    }, [tab, page, search]);

    return (
        <>
            <div className="p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Postal Code Management
                </h1>

                <button
                    onClick={() => {
                        setEditingItem(null);
                        setShowModal(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded mb-4">
                    Add New
                </button>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setTab("india")}
                        className={`px-4 py-2 rounded ${tab === "india" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
                        Indian Postal Codes
                    </button>

                    <button
                        onClick={() => setTab("world")}
                        className={`px-4 py-2 rounded ${tab === "world" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
                        World Postal Codes
                    </button>
                </div>

                {/* Search */}
                <input
                    placeholder="Search..."
                    className="border p-2 rounded mb-4 w-full max-w-sm"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl border bg-white">
                    <table className="min-w-300 w-full text-sm text-left">

                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2">Code</th>
                                <th className="p-2">Office Name</th>
                                <th className="p-2">Branch Type</th>
                                <th className="p-2">Delivery Status</th>
                                <th className="p-2">District</th>
                                <th className="p-2">Division</th>
                                <th className="p-2">Region</th>
                                <th className="p-2">Taluk</th>
                                <th className="p-2">Circle</th>
                                <th className="p-2">State</th>
                                {tab === "world" && (
                                    <th className="p-2">Country</th>
                                )}
                                <th className="p-2 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">

                                    <td className="p-2">
                                        {item.pincode || item.postal_code}
                                    </td>

                                    <td className="p-2">
                                        {item.office_name || item.place_name}
                                    </td>

                                    <td className="p-2">
                                        {item.branch_type}
                                    </td>

                                    <td className="p-2">
                                        {item.delivery_status}
                                    </td>

                                    <td className="p-2">
                                        {item.district}
                                    </td>

                                    <td className="p-2">
                                        {item.division}
                                    </td>

                                    <td className="p-2">
                                        {item.region}
                                    </td>

                                    <td className="p-2">
                                        {item.taluk}
                                    </td>

                                    <td className="p-2">
                                        {item.circle}
                                    </td>

                                    <td className="p-2">
                                        {item.state}
                                    </td>

                                    {tab === "world" && (
                                        <td className="p-2">
                                            {item.country_code}
                                        </td>
                                    )}

                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(item);
                                                setShowModal(true);
                                            }}
                                            className="text-blue-600">
                                            Edit
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await fetch(`/api/admin/indian-pincode?id=${item.id}`, {
                                                    method: "DELETE",
                                                });
                                                fetchData();
                                            }}
                                            className="text-red-600">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>




                {/* Pagination */}
                <div className="flex items-center gap-2 mt-6 flex-wrap">

                    {/* Previous */}
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-3 py-1 rounded border ${page === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        ←
                    </button>

                    {/* Page Numbers Logic */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                            // Show only nearby pages
                            if (p === 1 || p === totalPages) return true;
                            if (p >= page - 1 && p <= page + 1) return true;
                            return false;
                        })
                        .map((p, index, arr) => (
                            <span key={p} className="flex items-center">

                                {/* Show dots */}
                                {index > 0 && p - arr[index - 1] > 1 && (
                                    <span className="px-2 text-gray-400">...</span>
                                )}

                                <button
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 rounded border ${page === p
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    {p}
                                </button>

                            </span>
                        ))}

                    {/* Next */}
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`px-3 py-1 rounded border ${page === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        →
                    </button>

                </div>

            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-xl font-semibold mb-4">
                            {editingItem ? "Edit Postal Code" : "Add Postal Code"}
                        </h2>

                        <input
                            className="border p-2 rounded w-full mb-3"
                            placeholder="Office Name"
                            defaultValue={editingItem?.office_name}
                            id="office_name"
                        />

                        <input
                            className="border p-2 rounded w-full mb-3"
                            placeholder="Pincode"
                            defaultValue={editingItem?.pincode}
                            id="pincode"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded">
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    const payload = {
                                        office_name: (document.getElementById("office_name") as HTMLInputElement).value,
                                        pincode: (document.getElementById("pincode") as HTMLInputElement).value,
                                    };

                                    if (editingItem) {
                                        await fetch(`/api/admin/indian-postal/${editingItem.id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(payload),
                                        });
                                    } else {
                                        await fetch(`/api/admin/indian-postal`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(payload),
                                        });
                                    }

                                    setShowModal(false);
                                    fetchData();
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>

    );
}