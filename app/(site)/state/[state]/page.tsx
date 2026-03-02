import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

/* =========================================================
   🔥 HELPER: Slug → Normal Text
========================================================= */
function deslugify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\s+/g, " ").trim();
}

/* =========================================================
   🔥 METADATA (SEO Optimized)
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateName = deslugify(state);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: `${stateName} Pincode List & District Wise Post Offices | iSevenPlus`,
    description: `Explore complete district-wise pincode list of ${stateName}. Find post office details, delivery status and branch type.`,
    alternates: {
      canonical: `${baseUrl}/state/${state}`,
    },
  };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */
export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateName = deslugify(state);

  /* =========================================================
     🔥 FETCH DISTRICTS
  ========================================================= */
  const [districtRows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT district 
     FROM indian_pincodes 
     WHERE LOWER(state) LIKE LOWER(?) 
     ORDER BY district ASC`,
    [`%${stateName}%`]
  );

  if (!districtRows.length) return notFound();

  /* =========================================================
     🔥 TOTAL PINCODE COUNT
  ========================================================= */
  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) as total 
     FROM indian_pincodes 
     WHERE LOWER(state) LIKE LOWER(?)`,
    [`%${stateName}%`]
  );

  const totalPincodes = countRows[0]?.total || 0;

  /* =========================================================
     🔥 RELATED STATES
  ========================================================= */
  const [relatedStates] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT state 
   FROM indian_pincodes 
   WHERE state IS NOT NULL
   AND state != ''
   AND LOWER(state) != LOWER(?)
   ORDER BY state ASC
   LIMIT 8`,
    [stateName]
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  /* =========================================================
     🔥 SCHEMA: CollectionPage
  ========================================================= */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${stateName} Pincode List`,
    url: `${baseUrl}/state/${state}`,
    about: `District wise pincode list of ${stateName}`,
  };

  /* =========================================================
     🔥 Breadcrumb Schema
  ========================================================= */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: stateName,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-12">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-4xl font-bold mb-3">
          {stateName} Pincode List
        </h1>
        <p className="text-gray-600">
          {districtRows.length} Districts • {totalPincodes} Post Offices
        </p>
      </div>

      {/* District Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {districtRows.map((row) => (
          <Link
            key={row.district}
            href={`/city/${row.district
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="bg-white border rounded-2xl p-5 hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {row.district}
              </h3>
              <p className="text-sm text-gray-600">
                View all pincodes in {row.district}
              </p>
            </div>

            <div className="mt-4 text-indigo-600 text-sm flex items-center gap-1">
              Explore <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Related States */}
      {relatedStates.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Other States
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {relatedStates
              .filter((item: any) => item.state && item.state.trim() !== "")
              .map((item: any) => (
                <Link
                  key={item.state}
                  href={`/state/${item.state
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="border rounded-xl p-4 hover:shadow-lg transition text-center"
                >
                  {item.state}
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="bg-indigo-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          About {stateName} Pincode List
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This page provides a complete district-wise list of pincodes
          available in {stateName}. Each district contains multiple
          post offices with detailed information including branch type,
          delivery status and region.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Use this page for address verification, logistics planning,
          courier services and location-based searches across {stateName}.
        </p>
      </section>

    </div>
  );
}