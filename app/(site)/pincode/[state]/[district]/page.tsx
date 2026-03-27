// app/india/[state]/[district]/page.tsx

import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { MapPin, Building2 } from "lucide-react";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/* ================= SLUG HELPER ================= */
const generateSlug = (text?: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* ================= METADATA ================= */
export async function generateMetadata({ params }: any) {
  const { state, district } = params;

  const title = `${district} Pincode - ${state} (All Post Offices)`;

  return {
    title,
    description: `Find all pincodes of ${district}, ${state}. Complete list of post offices with pincode details.`,
    alternates: {
      canonical: `${baseUrl}/india/${state}/${district}`,
    },
  };
}

export default async function DistrictPage({ params }: any) {
  const { state, district } = params;

  /* ================= DATA FETCH ================= */
  const [rows] = await db.query<RowDataPacket[]>(`
    SELECT 
      office_name AS officeName,
      pincode,
      branch_type,
      delivery_status,
      division,
      region,
      taluk,
      circle
    FROM indian_pincodes
    WHERE 
      LOWER(state) = ? 
      AND LOWER(district) = ?
    ORDER BY office_name ASC
  `, [state.replace(/-/g, " "), district.replace(/-/g, " ")]);

  /* ================= GROUP BY PINCODE ================= */
  const grouped = rows.reduce((acc: any, curr: any) => {
    if (!acc[curr.pincode]) acc[curr.pincode] = [];
    acc[curr.pincode].push(curr);
    return acc;
  }, {});

  const pincodes = Object.keys(grouped);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      {/* ================= BREADCRUMB ================= */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/">Home</a> ›{" "}
        <a href="/pincode">India</a> ›{" "}
        <a href={`/state/${state}`}>{state.replace(/-/g, " ")}</a> ›{" "}
        <span className="text-gray-700 font-medium">
          {district.replace(/-/g, " ")}
        </span>
      </nav>

      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin className="text-indigo-600" />
          {district.replace(/-/g, " ")} Pincode List - {state.replace(/-/g, " ")}
        </h1>

        <p className="text-gray-600 mt-2">
          Total {pincodes.length} pincodes found in {district.replace(/-/g, " ")} district.
        </p>
      </div>

      {/* ================= PINCODE GRID ================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {pincodes.map((pin) => (
          <div key={pin} className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">

            {/* PINCODE HEADER */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-indigo-600 text-lg">
                {pin}
              </h3>

              <a
                href={`/pincode/${pin}`}
                className="text-xs text-indigo-600 hover:underline"
              >
                View →
              </a>
            </div>

            {/* OFFICES */}
            <div className="space-y-2 text-sm">

              {grouped[pin].map((office: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">

                  <Building2 size={14} className="text-gray-500" />

                  <span>
                    {office.officeName}
                  </span>

                </div>
              ))}

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}