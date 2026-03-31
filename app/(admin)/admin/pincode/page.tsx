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

    const limit = 100;
    const totalPages = Math.ceil(total / limit);

    const fetchData = async () => {
        try {
            const res = await fetch(
                `/api/admin/${tab === "india" ? "indian-pincode" : "world-postal"}?page=${page}&limit=${limit}&search=${search}`
            );

            if (!res.ok) {
                console.error("API Error:", res.status);
                return;
            }

            const json = await res.json();
            setData(json.data || []);
            setTotal(json.total || 0);
            
            console.log("DATA LENGTH:", json.data?.length);
            console.log("TOTAL:", json.total);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };
    useEffect(() => {
        setPage(1); // 👈 IMPORTANT
    }, [tab]);

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

                                {/* COMMON */}
                                <th className="p-2">Postal Code</th>
                                <th className="p-2">Name</th>

                                {/* INDIA */}
                                {tab === "india" && (
                                    <>
                                        <th className="p-2">Branch Type</th>
                                        <th className="p-2">Delivery Status</th>
                                        <th className="p-2">District</th>
                                        <th className="p-2">Division</th>
                                        <th className="p-2">Region</th>
                                        <th className="p-2">Taluk</th>
                                        <th className="p-2">Circle</th>
                                        <th className="p-2">State</th>
                                    </>
                                )}

                                {/* WORLD */}
                                {tab === "world" && (
                                    <>
                                        <th className="p-2">Country</th>
                                        <th className="p-2">Admin1</th>
                                        <th className="p-2">Admin2</th>
                                        <th className="p-2">Admin3</th>
                                        <th className="p-2">Latitude</th>
                                        <th className="p-2">Longitude</th>
                                    </>
                                )}

                                <th className="p-2 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">

                                    {/* COMMON */}
                                    <td className="p-2">
                                        {item.pincode || item.postal_code}
                                    </td>

                                    <td className="p-2">
                                        {item.office_name || item.place_name}
                                    </td>

                                    {/* INDIA */}
                                    {tab === "india" && (
                                        <>
                                            <td className="p-2">{item.branch_type}</td>
                                            <td className="p-2">{item.delivery_status}</td>
                                            <td className="p-2">{item.district}</td>
                                            <td className="p-2">{item.division}</td>
                                            <td className="p-2">{item.region}</td>
                                            <td className="p-2">{item.taluk}</td>
                                            <td className="p-2">{item.circle}</td>
                                            <td className="p-2">{item.state}</td>
                                        </>
                                    )}

                                    {/* WORLD */}
                                    {tab === "world" && (
                                        <>
                                            <td className="p-2">{item.country_code}</td>
                                            <td className="p-2">{item.admin1}</td>
                                            <td className="p-2">{item.admin2}</td>
                                            <td className="p-2">{item.admin3}</td>
                                            <td className="p-2">{item.latitude}</td>
                                            <td className="p-2">{item.longitude}</td>
                                        </>
                                    )}

                                    {/* ACTION */}
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
                                                await fetch(`/api/admin/${tab === "india" ? "indian-pincode" : "world-postal"}?id=${item.id}`, {
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">

                    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
                            <h2 className="text-xl font-bold">
                                {editingItem ? "Edit Postal Code" : "Add Postal Code"}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-black text-lg">
                                ✕
                            </button>
                        </div>


                        {/* Form Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">

                            {/* INDIA FIELDS */}

                            {tab === "india" && (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Pincode</label>
                                        <input className="border p-2 rounded w-full"
                                            placeholder="Enter Pincode"
                                            defaultValue={editingItem?.pincode}
                                            id="pincode" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Office Name</label>
                                        <input className="border p-2 rounded w-full"
                                            placeholder="Enter Office Name"
                                            defaultValue={editingItem?.office_name}
                                            id="office_name" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Branch Type</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.branch_type}
                                            id="branch_type" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Delivery Status</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.delivery_status}
                                            id="delivery_status" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">District</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.district}
                                            id="district" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Division</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.division}
                                            id="division" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Region</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.region}
                                            id="region" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Taluk</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.taluk}
                                            id="taluk" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Circle</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.circle}
                                            id="circle" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">State</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.state}
                                            id="state" />
                                    </div>
                                </>
                            )}


                            {/* WORLD FIELDS */}

                            {tab === "world" && (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Postal Code</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.postal_code}
                                            id="postal_code" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Place Name</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.place_name}
                                            id="place_name" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Country Code</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.country_code}
                                            id="country_code" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Admin1 (State)</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.admin1}
                                            id="admin1" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Admin2 (District)</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.admin2}
                                            id="admin2" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Admin3</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.admin3}
                                            id="admin3" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Latitude</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.latitude}
                                            id="latitude" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold">Longitude</label>
                                        <input className="border p-2 rounded w-full"
                                            defaultValue={editingItem?.longitude}
                                            id="longitude" />
                                    </div>
                                </>
                            )}

                        </div>


                        {/* Footer Buttons */}

                        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">

                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium">
                                Cancel
                            </button>

                            <button
                                onClick={async () => {

                                    const payload: any = {};

                                    if (tab === "india") {

                                        payload.pincode = (document.getElementById("pincode") as HTMLInputElement)?.value;
                                        payload.office_name = (document.getElementById("office_name") as HTMLInputElement)?.value;
                                        payload.branch_type = (document.getElementById("branch_type") as HTMLInputElement)?.value;
                                        payload.delivery_status = (document.getElementById("delivery_status") as HTMLInputElement)?.value;
                                        payload.district = (document.getElementById("district") as HTMLInputElement)?.value;
                                        payload.division = (document.getElementById("division") as HTMLInputElement)?.value;
                                        payload.region = (document.getElementById("region") as HTMLInputElement)?.value;
                                        payload.taluk = (document.getElementById("taluk") as HTMLInputElement)?.value;
                                        payload.circle = (document.getElementById("circle") as HTMLInputElement)?.value;
                                        payload.state = (document.getElementById("state") as HTMLInputElement)?.value;

                                    } else {

                                        payload.postal_code = (document.getElementById("postal_code") as HTMLInputElement)?.value;
                                        payload.place_name = (document.getElementById("place_name") as HTMLInputElement)?.value;
                                        payload.country_code = (document.getElementById("country_code") as HTMLInputElement)?.value;
                                        payload.admin1 = (document.getElementById("admin1") as HTMLInputElement)?.value;
                                        payload.admin2 = (document.getElementById("admin2") as HTMLInputElement)?.value;
                                        payload.admin3 = (document.getElementById("admin3") as HTMLInputElement)?.value;
                                        payload.latitude = (document.getElementById("latitude") as HTMLInputElement)?.value;
                                        payload.longitude = (document.getElementById("longitude") as HTMLInputElement)?.value;

                                    }

                                    if (editingItem) {

                                        await fetch(`/api/admin/${tab === "india" ? "indian-pincode" : "world-postal"}/${editingItem.id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(payload),
                                        });

                                    } else {

                                        await fetch(`/api/admin/${tab === "india" ? "indian-pincode" : "world-postal"}`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(payload),
                                        });

                                    }

                                    setShowModal(false);
                                    fetchData();

                                }}
                                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow">
                                Save Postal Code
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </>

    );
}