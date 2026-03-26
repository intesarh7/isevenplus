"use client";

import { useState } from "react";

export default function AdminProfileForm({ editData, onClose, onSuccess }: any) {
  const [name, setName] = useState(editData?.name || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const method = editData ? "PUT" : "POST";
    const url = editData
      ? `/api/admin/profile/${editData.id}`
      : "/api/admin/profile";

    await fetch(url, {
      method,
      body: JSON.stringify({ name, email, password }),
    });

    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {editData ? "Edit Admin" : "Add Admin"}
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password (optional in edit)"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}