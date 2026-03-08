import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PageHeader from "@/app/components/PageHeader";

/* =========================================================
   🔥 HELPER: Slug → Normal Text
========================================================= */
function deslugify(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\s+/g, " ")
    .trim();
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
  const searchState = `%${stateName.replace(/\s+/g, "%")}%`;

  const [districtRows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT district 
    FROM indian_pincodes 
    WHERE LOWER(REPLACE(state,'&','and')) = LOWER(REPLACE(?,'&','and'))
   ORDER BY district ASC`,
    [stateName]
  );

  if (!districtRows.length) return notFound();

  /* =========================================================
     🔥 TOTAL PINCODE COUNT
  ========================================================= */
  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) as total 
   FROM indian_pincodes 
   WHERE LOWER(state)=LOWER(?)`,
    [stateName]
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
    [stateName.replace(/\s+/g, " ")]
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
      <PageHeader
        items={[
          { label: "India Pincode", href: "/india-pincode" },
          { label: stateName }
        ]}
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

          <div className="flex flex-wrap gap-3">
            {relatedStates
              .filter((item: any) => item.state && item.state.trim() !== "")
              .map((item: any) => (
                <Link
                  key={item.state}
                  href={`/state/${item.state
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
                >
                  {item.state}
                </Link>
              ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-16 bg-white border rounded-2xl p-6 md:p-10 shadow-sm">

        <h2 className="text-2xl font-bold mb-4">
          About {stateName} Pincode List
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The {stateName} pincode list provides a complete directory of postal
          codes used across all districts and cities within the state. A pincode,
          also known as a Postal Index Number, is a six-digit code used by the
          Indian postal system to accurately identify delivery locations.
          Each district in {stateName} contains multiple post offices and each
          post office is assigned a unique pincode that helps postal workers
          route letters, parcels, and courier deliveries efficiently.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This page helps users explore the district-wise pincode list of
          {stateName}. By selecting a district from the list above, you can
          quickly view detailed information about all the post offices in that
          region, including branch type, delivery status, division, and region.
          Whether you are searching for a specific postal code or verifying an
          address, this directory makes it easy to find accurate postal
          information for locations throughout {stateName}.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          What is a Pincode and Why is it Important?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A pincode is an essential part of every address in India. Introduced
          by India Post in 1972, the pincode system was created to simplify mail
          sorting and reduce errors caused by similar place names or incomplete
          addresses. The six-digit code helps postal employees identify the
          exact delivery office responsible for a specific location.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          In {stateName}, thousands of post offices serve both urban and rural
          areas. Each post office has a unique pincode that identifies its
          geographic service area. When a correct pincode is included in an
          address, it ensures faster and more accurate delivery of letters,
          parcels, and official documents.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Structure of the Indian Pincode System
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Every pincode in India contains six digits, and each digit represents
          a specific geographic classification used by India Post. The first
          digit represents the postal zone, while the second digit indicates the
          sub-zone within that region. The third digit identifies the sorting
          district responsible for processing mail.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The last three digits of the pincode correspond to the specific post
          office that delivers mail in that locality. This hierarchical system
          helps organize postal operations across the country and ensures that
          mail is delivered quickly and accurately.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          District Wise Pincode Directory of {stateName}
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The district-wise pincode directory of {stateName} allows users to
          browse postal codes by administrative regions. Each district contains
          several towns, villages, and urban areas served by multiple post
          offices. By selecting a district from the list above, you can access a
          detailed list of pincodes and post offices associated with that area.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This structure makes it easy to locate postal codes for specific
          cities, towns, or neighborhoods within {stateName}. The district pages
          provide comprehensive postal information including branch type,
          delivery status, and the regional division responsible for postal
          operations.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Uses of Pincodes in Modern Services
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Today, pincodes are used in many services beyond traditional mail
          delivery. E-commerce companies rely on pincodes to determine whether
          products can be delivered to a specific location. Courier companies
          use postal codes to calculate delivery routes, shipping costs, and
          estimated delivery times.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Banking institutions, insurance providers, and government portals
          also use pincodes as part of address verification systems. Accurate
          postal codes help these organizations provide location-based services
          more efficiently across {stateName}.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          How to Find the Correct Pincode in {stateName}
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Finding the correct pincode in {stateName} is simple using this
          directory. Start by selecting a district from the list above. Once you
          open the district page, you will see a complete list of post offices
          along with their corresponding pincodes and postal details.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Using the correct pincode helps ensure that your mail and packages are
          delivered without delay. It also prevents errors that may occur when
          different locations share similar names.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Explore Post Offices Across {stateName}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The pincode directory above provides a convenient way to explore post
          offices across all districts in {stateName}. Whether you are searching
          for a postal code for mailing purposes, verifying an address, or
          checking delivery availability, this page offers a reliable and
          organized source of postal information for the entire state.
        </p>

      </div>

    </div>
  );
}