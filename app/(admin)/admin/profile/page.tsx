"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminProfileForm from "@/app/components/admin/AdminProfileForm";

export default function AdminProfilePage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchAdmins = async () => {
    const res = await fetch("/api/admin/profile");
    const data = await res.json();
    setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admin?")) return;

    await fetch(`/api/admin/profile/${id}`, {
      method: "DELETE",
    });

    fetchAdmins();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Profiles</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.name}</td>
                <td>{a.email}</td>

                <td className="flex gap-3 p-3">
                  <button
                    onClick={() => {
                      setEditData(a);
                      setOpen(true);
                    }}
                    className="text-blue-600"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      {open && (
        <AdminProfileForm
          editData={editData}
          onClose={() => setOpen(false)}
          onSuccess={fetchAdmins}
        />
      )}
    </div>
  );
}