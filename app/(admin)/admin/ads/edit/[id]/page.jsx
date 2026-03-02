import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditAdPage({ params }) {

  // ✅ Next 15+ fix
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [rows] = await db.query(
    "SELECT * FROM ads WHERE id=? AND deletedAt IS NULL",
    [id]
  );

  const ad = rows[0];
  if (!ad) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Edit Ad
        </h1>

        <Link
          href="/admin/ads"
          className="text-indigo-600 hover:underline"
        >
          ← Back to Ads
        </Link>
      </div>

      {/* Form */}
      <form
        action="/api/admin/ads/update"
        method="POST"
        className="space-y-6 bg-white p-8 rounded-2xl shadow"
      >

        <input type="hidden" name="id" value={ad.id} />

        {/* Ad Name */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Name
          </label>
          <input
            name="adName"
            defaultValue={ad.adName}
            required
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* Location Dropdown (Fixed & Structured) */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Location
          </label>

          <select
            name="location"
            defaultValue={ad.location}
            required
            className="w-full border p-3 rounded-xl bg-white"
          >
            <option value="header_top">Header Top (Leaderboard)</option>
            <option value="after_title">After Title</option>
            <option value="tool_middle">Tool Middle</option>
            <option value="bottom_content">Bottom Content</option>
            <option value="sidebar_top">Sidebar Top</option>
            <option value="sidebar_bottom">Sidebar Bottom</option>
            <option value="mobile_sticky">Mobile Sticky</option>
            <option value="footer">Footer</option>
            <option value="default">Default Fallback</option>
          </select>
        </div>

        {/* Ad Code */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Code (HTML / AdSense)
          </label>
          <textarea
            name="adCode"
            defaultValue={ad.adCode}
            rows={6}
            required
            className="w-full border p-3 rounded-xl font-mono text-sm"
          />
        </div>

        {/* Active Toggle */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={ad.isActive}
          />
          Active
        </label>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Update Ad
          </button>

          <Link
            href="/admin/ads"
            className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

        </div>

      </form>

    </div>
  );
}