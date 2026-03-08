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

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT state 
     FROM indian_pincodes 
     WHERE LOWER(district)=LOWER(?) 
     LIMIT 1`,
    [cityName]
  );

  const stateName = rows?.[0]?.state || "";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: `${cityName} Pincode List (${stateName}) - Postal Codes & Post Offices | iSevenPlus`,
    description: `Find all pincodes in ${cityName}, ${stateName}, India. View complete list of post offices, branch types, delivery status and postal code details.`,
    alternates: {
      canonical: `${baseUrl}/city/${city}`,
    },
  };
}

function formatSlug(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
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
      <PageHeader
        items={[
          { label: "India Pincode", href: "/india-pincode" },
          { label: stateName, href: `/state/${formatSlug(stateName)}` },
          { label: cityName }
        ]}
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

          <div className="flex flex-wrap gap-3">
            {relatedCities.map((item: any) => (
              <Link
                key={item.district}
                href={`/city/${item.district
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
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
          The {cityName} pincode list provides a detailed directory of all
          postal codes and post offices located within {cityName},
          {stateName}, India. A pincode, also known as a Postal Index Number,
          is a six-digit numeric code used by India Post to identify specific
          geographic delivery areas. Each pincode corresponds to a particular
          post office that manages mail delivery for a defined locality.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          This page allows users to explore all pincodes associated with
          {cityName}. The list above includes post office names, branch types,
          delivery status, and regional postal information. Whether you are
          searching for a postal code for mailing purposes, verifying an
          address, or planning courier deliveries, this directory provides
          reliable and up-to-date postal information for the entire
          {cityName} area.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          What is a Pincode?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A pincode is an important part of the Indian addressing system.
          Introduced by India Post in 1972, the Postal Index Number system
          helps organize mail delivery across the country. Each pincode
          uniquely identifies a specific delivery region, ensuring that
          letters, parcels, and courier shipments reach the correct
          destination without delays.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          In a city like {cityName}, which may contain numerous neighborhoods,
          towns, and administrative divisions, pincodes play a crucial role in
          maintaining an efficient postal network. Each locality is assigned a
          specific pincode so that postal workers can quickly sort and route
          mail to the appropriate delivery office.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Structure of Indian Pincodes
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Indian pincodes consist of six digits, and each digit has a specific
          meaning within the postal hierarchy. The first digit represents the
          postal zone, while the second digit identifies the sub-zone within
          that region. The third digit indicates the sorting district
          responsible for processing incoming mail.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          The last three digits correspond to the individual post office that
          delivers mail within a specific locality. This systematic structure
          allows India Post to efficiently manage one of the largest postal
          networks in the world, ensuring accurate delivery even in densely
          populated cities like {cityName}.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Post Offices in {cityName}, {stateName}
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The postal network in {cityName} consists of several types of post
          offices, including Head Post Offices, Sub Post Offices, and Branch
          Post Offices. Each type of post office serves a specific function
          within the postal system and is responsible for handling mail
          delivery within its designated area.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Head Post Offices typically manage major postal operations and
          oversee multiple sub-offices. Sub Post Offices handle mail
          processing and distribution within urban areas, while Branch Post
          Offices serve smaller towns and rural communities around
          {cityName}. Each of these offices has a unique pincode that helps
          identify its service region.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Uses of Pincodes in Modern Services
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Pincodes are widely used in many modern services beyond traditional
          postal delivery. E-commerce platforms rely on postal codes to
          determine whether products can be delivered to a specific area.
          Courier companies use pincodes to calculate shipping routes,
          delivery charges, and estimated arrival times.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Banks, insurance providers, and government portals also use
          pincodes as part of address verification systems. Accurate postal
          codes help ensure that important documents, financial statements,
          and official communications reach the correct recipient within
          {cityName}.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          How to Find the Correct Pincode in {cityName}
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Finding the correct pincode in {cityName} is easy using the list
          provided above. Each entry includes the name of the post office,
          the corresponding pincode, and additional details such as branch
          type and delivery status. By selecting a pincode from the list,
          users can access more detailed information about the specific
          postal area.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Including the correct pincode in your address helps ensure that
          letters and packages are delivered quickly and accurately. It also
          prevents misrouting of mail, especially in cities where different
          areas may share similar names.
        </p>


        <h2 className="text-xl font-semibold mb-3">
          Explore More Postal Information
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The {cityName} pincode directory above provides a comprehensive
          overview of post offices operating within the city. Users can
          browse pincodes, verify addresses, and explore postal details for
          different localities across {cityName}, {stateName}. This
          information is useful for residents, businesses, logistics
          companies, and anyone who needs accurate postal data for mailing
          or delivery purposes.
        </p>

      </section>

    </div>
  );
}