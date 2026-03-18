"use client";

import { useEffect, useState } from "react";

export default function SEOSettingsPage() {

  const [ttl, setTTL] = useState("");

  useEffect(() => {
    fetch("/api/admin/seo-settings")
      .then(res => res.json())
      .then(data => setTTL(data.ttl));
  }, []);

  const save = async () => {
    await fetch("/api/admin/seo-settings", {
      method: "POST",
      body: JSON.stringify({ ttl }),
    });
    alert("Saved!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">SEO Settings</h1>

      <label>Cache TTL (hours)</label>
      <input
        value={ttl}
        onChange={(e) => setTTL(e.target.value)}
        className="border p-2 block mt-2"
      />

      <button
        onClick={save}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}