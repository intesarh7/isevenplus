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
    <div className="p-4 sm:p-8 mx-auto">

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Ads Management
        </h1>

        <Link
          href="/admin/ads/new"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg shadow w-full sm:w-auto text-center"
        >
          + Add New Ad
        </Link>

      </div>


      <div className="bg-white shadow-md border rounded-2xl overflow-x-auto">

        <table className="w-full text-left text-sm">

          <thead className="bg-gray-100 text-gray-700">

            <tr>

              <th className="p-4 font-semibold whitespace-nowrap">
                Ad Name
              </th>

              <th className="p-4 font-semibold whitespace-nowrap">
                Location
              </th>

              <th className="p-4 font-semibold whitespace-nowrap">
                Status
              </th>

              <th className="p-4 font-semibold whitespace-nowrap">
                Impression
              </th>

              <th className="p-4 font-semibold whitespace-nowrap">
                Created
              </th>

              <th className="p-4 font-semibold whitespace-nowrap">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {ads.map((ad) => (

              <tr
                key={ad.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium text-gray-800 whitespace-nowrap">
                  {ad.adName}
                </td>


                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {ad.location}
                </td>


                <td className="p-4 whitespace-nowrap">

                  {ad.isActive ? (

                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Active
                    </span>

                  ) : (

                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                      Inactive
                    </span>

                  )}

                </td>


                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {ad.impressions}
                </td>


                <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(ad.createdAt).toLocaleDateString()}
                </td>


                <td className="p-4 whitespace-nowrap">

                  <div className="flex flex-wrap gap-3">

                    <Link
                      href={`/admin/ads/edit/${ad.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/api/admin/ads/delete?id=${ad.id}`}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                    >
                      Delete
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}