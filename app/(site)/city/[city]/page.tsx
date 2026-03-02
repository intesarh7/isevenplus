import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

/* =========================================================
   🔥 HELPER: Slug → Normal Text
========================================================= */
function deslugify(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   🔥 METADATA (FIXED: await params)
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = deslugify(city);
  

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: `${cityName} Pincode List | iSevenPlus`,
    description: `Complete list of pincodes in ${cityName}. Find post office details, branch type and delivery status.`,
    alternates: {
      canonical: `${baseUrl}/city/${city}`,
    },
  };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = deslugify(city);

  /* =========================================================
     🔥 FETCH PINCODES
  ========================================================= */
 const [rows] = await db.query<RowDataPacket[]>(
  `SELECT * FROM indian_pincodes 
   WHERE TRIM(LOWER(district)) LIKE TRIM(LOWER(?)) 
   LIMIT 200`,
  [`%${cityName}%`]
);

  if (!rows.length) {
  return <div className="p-10 text-center">No pincodes found for {cityName}</div>;
}

  const stateName = rows[0].state;

  /* =========================================================
     🔥 RELATED CITIES (Same State)
  ========================================================= */
  const [relatedCities] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT district 
     FROM indian_pincodes 
     WHERE state=? AND district!=?
     LIMIT 8`,
    [stateName, cityName]
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  /* =========================================================
     🔥 SCHEMA: CollectionPage
  ========================================================= */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cityName} Pincode List`,
    url: `${baseUrl}/city/${city}`,
    about: `Pincode list of ${cityName}`,
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
        item: `${baseUrl}/state/${stateName.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
      },
    ],
  };

  console.log("CITY SLUG:", city);
console.log("CITY NAME:", cityName);
console.log("ROWS FOUND:", rows.length);

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
          Pincodes in {cityName}
        </h1>
        <p className="text-gray-600">
          {rows.length} Post Offices found in {cityName}, {stateName}
        </p>
      </div>

      {/* Pincode Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {rows.map((row) => (
          <Link
            key={row.pincode}
            href={`/pincode/${row.pincode}`}
            className="bg-white border rounded-2xl p-5 hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {row.pincode}
              </h3>
              <p className="text-sm text-gray-600">
                {row.office_name}
              </p>
            </div>

            <div className="mt-4 text-indigo-600 text-sm flex items-center gap-1">
              View Details <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* State Internal Link */}
      <div className="mb-16 text-center">
        <Link
          href={`/state/${stateName.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          View All Pincodes in {stateName}
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Related Cities */}
      {relatedCities.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Other Cities in {stateName}
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {relatedCities.map((item: any) => (
              <Link
                key={item.district}
                href={`/city/${item.district
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="border rounded-xl p-4 hover:shadow-lg transition text-center"
              >
                {item.district}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="bg-indigo-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          About {cityName} Pincode List
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This page provides a complete list of post offices and pincodes
          available in {cityName}, {stateName}. Each entry includes
          branch type, delivery status and regional information.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Use this page for address verification, courier planning,
          or postal reference in {cityName}.
        </p>
      </section>

    </div>
  );
}