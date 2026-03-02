import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT FIX

export const metadata = {
  title: "Manage Ads | Admin",
  robots: { index: false, follow: false },
};

export default async function AdsPage() {
  const [ads] = await db.query<RowDataPacket[]>(
    "SELECT * FROM ads ORDER BY createdAt DESC"
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ads Management</h1>

        <Link
          href="/admin/ads/new"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          + Add New Ad
        </Link>
      </div>

      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Ad Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Impression</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id} className="border-b">
                <td className="p-4 font-medium">{ad.adName}</td>
                <td className="p-4">{ad.location}</td>

                <td className="p-4">
                  {ad.isActive ? (
                    <span className="text-green-600 font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-4">{ad.impressions}</td>

                <td className="p-4 text-sm text-gray-500">
                  {new Date(ad.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 space-x-3">
                  <Link
                    href={`/admin/ads/edit/${ad.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/api/admin/ads/delete?id=${ad.id}`}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}