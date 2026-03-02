"use client";

export default function ToggleButton({ id, isActive }) {
  async function toggle() {
    await fetch("/api/admin/ads/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    location.reload();
  }

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded text-white ${
        isActive ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}