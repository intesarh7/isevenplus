import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

/* =========================================================
   🔥 HELPER
========================================================= */
function formatSlug(text: string) {
  return text
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* =========================================================
   🔥 BUILD SEO URL
========================================================= */
function buildPostalUrl(data: any) {
  const country = formatSlug(data.country_code);
  const state = formatSlug(data.admin1 || "");
  const city = formatSlug(data.place_name || "");
  const postal = data.postal_code.replace(/\s+/g, "");

  const parts = ["postalcode", country];

  if (state) parts.push(state);
  if (city) parts.push(city);

  parts.push(postal);

  return "/" + parts.join("/");
}

/* =========================================================
   🔥 METADATA (SEO Optimized)
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const postal = params.slug[params.slug.length - 1];
  const cleanCode = decodeURIComponent(postal).trim();

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes 
     WHERE REPLACE(postal_code, ' ', '') = REPLACE(?, ' ', '')
     LIMIT 1`,
    [cleanCode]
  );

  if (!rows.length) return {};

  const data = rows[0];
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://isevenplus.com";

  const canonicalPath = buildPostalUrl(data);

  return {
    title: `${data.postal_code} Postal Code - ${data.place_name}, ${data.country_code} | iSevenPlus`,
    description: `Complete details of postal code ${data.postal_code} in ${data.place_name}, ${data.country_code}. View coordinates and regional information.`,
    alternates: {
      canonical: baseUrl + canonicalPath,
    },
  };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */
export default async function WorldDetail({
  params,
}: {
  params: { slug: string[] };
}) {
  const postal = params.slug[params.slug.length - 1];
  const cleanCode = decodeURIComponent(postal).trim();

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes 
     WHERE REPLACE(postal_code, ' ', '') = REPLACE(?, ' ', '')
     LIMIT 1`,
    [cleanCode]
  );

  if (!rows.length) return notFound();

  const data = rows[0];
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://isevenplus.com";

  const currentUrl = baseUrl + buildPostalUrl(data);

  /* =========================================================
     🔥 RELATED POSTAL CODES
  ========================================================= */
  const [related] = await db.query<RowDataPacket[]>(
    `SELECT * 
     FROM worldwide_postal_codes 
     WHERE country_code=? 
     AND REPLACE(postal_code, ' ', '') != REPLACE(?, ' ', '')
     LIMIT 6`,
    [data.country_code, cleanCode]
  );

  /* =========================================================
     🔥 JSON-LD PostalAddress
  ========================================================= */
  const postalSchema = {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    postalCode: data.postal_code,
    addressLocality: data.place_name,
    addressRegion: data.admin1,
    addressCountry: data.country_code,
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
        name: "World Postal Codes",
        item: `${baseUrl}/pincode?type=world`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.postal_code,
        item: currentUrl,
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
      <div className="text-center mb-12">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-4xl font-bold mb-3">
          {data.postal_code} Postal Code Details
        </h1>
        <p className="text-gray-600">
          {data.place_name}, {data.admin1 && `${data.admin1},`}{" "}
          {data.country_code}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-3xl p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <p><strong>Place:</strong> {data.place_name}</p>
          <p><strong>State/Region:</strong> {data.admin1 || "N/A"}</p>
          <p><strong>Country:</strong> {data.country_code}</p>
          <p><strong>Latitude:</strong> {data.latitude}</p>
          <p><strong>Longitude:</strong> {data.longitude}</p>
        </div>

        <div className="mt-8">
          <a
            href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            View on Google Maps
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Related Postal Codes */}
      {related.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Other Postal Codes in {data.country_code}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {related.map((item: any) => (
              <Link
                key={item.postal_code}
                href={buildPostalUrl(item)}
                className="border rounded-xl p-4 hover:shadow-lg transition text-center"
              >
                {item.postal_code}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <section className="bg-indigo-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          About {data.postal_code} Postal Code
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The postal code {data.postal_code} belongs to {data.place_name} in {data.country_code}.
          This location lies at latitude {data.latitude} and longitude {data.longitude}.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Use this information for international shipping, courier services,
          address verification and global logistics planning.
        </p>
      </section>

    </div>
  );
}