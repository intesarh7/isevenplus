import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
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
function buildPincodeUrl(data: any) {
  const state = formatSlug(data.state);
  const district = formatSlug(data.district);
  const taluk = formatSlug(data.taluk || "");
  const office = formatSlug(data.office_name || "");
  const pincode = data.pincode;

  const parts = ["pincode", state];

  if (district) parts.push(district);
  if (taluk) parts.push(taluk);
  if (office) parts.push(office);

  parts.push(pincode);

  return "/" + parts.join("/");
}

/* =========================================================
   🔥 METADATA
========================================================= */
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const pincode = params.slug[params.slug.length - 1];

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM indian_pincodes WHERE pincode=? LIMIT 1",
    [pincode]
  );

  if (!rows.length) return {};

  const data = rows[0];

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const canonicalPath = buildPincodeUrl(data);

  return {
    title: `${data.pincode} Pincode - ${data.district}, ${data.state} | iSevenPlus`,
    description: `Complete details of ${data.pincode} pincode in ${data.district}, ${data.state}. Office name, branch type, delivery status and more.`,
    alternates: {
      canonical: baseUrl + canonicalPath,
    },
  };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */
export default async function PincodeDetail({
  params,
}: {
  params: { slug: string[] };
}) {
  const pincode = params.slug[params.slug.length - 1];

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM indian_pincodes WHERE pincode=?",
    [pincode]
  );

  if (!rows.length) return notFound();

  const data = rows[0];

  const correctPath = buildPincodeUrl(data);

  // 🔥 Redirect if URL structure is wrong
  if (!params.slug.join("/").includes(data.pincode)) {
    redirect(correctPath);
  }

  /* =========================================================
     🔥 RELATED PINCODES
  ========================================================= */
  const [related] = await db.query<RowDataPacket[]>(
    `SELECT * FROM indian_pincodes 
     WHERE district=? AND pincode!=?
     LIMIT 8`,
    [data.district, pincode]
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const currentUrl = baseUrl + correctPath;

  /* =========================================================
     🔥 JSON-LD
  ========================================================= */
  const postalSchema = {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    postalCode: data.pincode,
    addressLocality: data.district,
    addressRegion: data.state,
    addressCountry: "IN",
  };

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
        item: `${baseUrl}/state/${formatSlug(data.state)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.district,
        item: `${baseUrl}/city/${formatSlug(data.district)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.pincode,
        item: currentUrl,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />



      <div className="text-center mb-10">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-4xl font-bold mb-3">
          {data.pincode} Pincode Details
        </h1>
        <p className="text-gray-600">
          {data.district}, {data.state}
        </p>
      </div>

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
          <a href="/pincode" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-center">Search Another Pincode</a>

        </div>
        
      </div>

      

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Related Pincodes in {data.district}
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {related.map((item: any) => (
              <Link
                key={item.pincode}
                href={buildPincodeUrl(item)}
                className="border rounded-xl p-4 text-center hover:shadow-lg transition"
              >
                {item.pincode}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}