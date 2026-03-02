import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

/* =========================================================
   🔥 METADATA (SEO + Canonical)
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM indian_pincodes WHERE pincode=? LIMIT 1",
    [code]
  );

  if (!rows.length) return {};

  const data = rows[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: `${code} Pincode - ${data.district}, ${data.state} | iSevenPlus`,
    description: `Complete details of ${code} pincode in ${data.district}, ${data.state}. Office name, branch type, delivery status and more.`,
    alternates: {
      canonical: `${baseUrl}/pincode/${code}`,
    },
  };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */
export default async function PincodeDetail({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM indian_pincodes WHERE pincode=?",
    [code]
  );

  if (!rows.length) return notFound();

  const data = rows[0];

  /* =========================================================
     🔥 RELATED PINCODES (Same District)
  ========================================================= */
  const [related] = await db.query<RowDataPacket[]>(
    `SELECT pincode 
     FROM indian_pincodes 
     WHERE district=? AND pincode!=?
     LIMIT 8`,
    [data.district, code]
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  /* =========================================================
     🔥 JSON-LD (PostalAddress)
  ========================================================= */
  const postalSchema = {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    postalCode: data.pincode,
    addressLocality: data.district,
    addressRegion: data.state,
    addressCountry: "IN",
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
        name: data.state,
        item: `${baseUrl}/state/${data.state.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.district,
        item: `${baseUrl}/city/${data.district.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.pincode,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-4xl font-bold mb-3">
          {data.pincode} Pincode Details
        </h1>
        <p className="text-gray-600">
          {data.district}, {data.state}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-3xl p-8 mb-12">

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">

          <p><strong>Office Name:</strong> {data.office_name}</p>
          <p><strong>Branch Type:</strong> {data.branch_type}</p>
          <p><strong>Delivery Status:</strong> {data.delivery_status}</p>
          <p><strong>District:</strong> {data.district}</p>
          <p><strong>Division:</strong> {data.division}</p>
          <p><strong>Region:</strong> {data.region}</p>
          <p><strong>Taluk:</strong> {data.taluk}</p>
          <p><strong>Circle:</strong> {data.circle}</p>
          <p><strong>State:</strong> {data.state}</p>
          <p><strong>Created At:</strong> {new Date(data.created_at).toLocaleDateString()}</p>

        </div>

        {/* Internal Links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            href={`/state/${data.state.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            View All Pincodes in {data.state}
            <ArrowRight size={16} />
          </Link>

          <Link
            href={`/city/${data.district.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            View All Pincodes in {data.district}
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

      {/* Related Pincodes */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Related Pincodes in {data.district}
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {related.map((item: any) => (
              <Link
                key={item.pincode}
                href={`/pincode/${item.pincode}`}
                className="border rounded-xl p-4 text-center hover:shadow-lg transition"
              >
                {item.pincode}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 bg-indigo-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          About {data.pincode} Pincode
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The pincode {data.pincode} belongs to {data.district} district in {data.state}. 
          This post office falls under the {data.branch_type} branch type 
          and its delivery status is {data.delivery_status}.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Use this page to verify postal details, courier delivery coverage,
          and address information for this location.
        </p>
      </section>

    </div>
  );
}