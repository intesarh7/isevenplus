import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";
import Breadcrumb from "@/app/components/Breadcrumb";
export const dynamic = "force-dynamic";
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

  /* Build canonical path */
  let canonicalPath = buildPincodeUrl(data);

  /* ensure starting slash */
  if (!canonicalPath.startsWith("/")) {
    canonicalPath = "/" + canonicalPath;
  }

  function formatText(text?: string): string {
    if (!text) return "";

    return text
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  }

  /* ensure trailing slash */
  canonicalPath = canonicalPath.replace(/\/?$/, "/");

  const canonical = `${baseUrl}${canonicalPath}`;

  return {
    title: `${data.pincode} PIN Code – ${formatText(data.district)}, ${formatText(data.state)}, India (Post Office, Location & Details)`,

    description: `Find complete details of ${data.pincode} PIN Code in ${formatText(data.district)}, ${formatText(data.state)}, India. Get post office name, branch type, delivery status, location, and other important information.`,

    alternates: {
      canonical,
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
   🔥 ADDITIONAL DATA QUERIES
========================================================= */

  const [samePincodeOffices] = await db.query<RowDataPacket[]>(
    `SELECT office_name FROM indian_pincodes WHERE pincode=?`,
    [pincode]
  );

  const [areasCovered] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT taluk FROM indian_pincodes 
   WHERE pincode=? AND taluk IS NOT NULL AND taluk!=''`,
    [pincode]
  );

  const [nearby] = await db.query<RowDataPacket[]>(
    `SELECT * FROM indian_pincodes 
   WHERE district=? AND pincode!=?
   LIMIT 12`,
    [data.district, pincode]
  );

  /* =========================================================
🔥 SAME PINCODE OTHER OFFICES
========================================================= */

  const [otherSamePin] = await db.query<RowDataPacket[]>(
    `SELECT office_name,district,state,pincode 
   FROM indian_pincodes 
   WHERE pincode=? 
   AND office_name!=?
   ORDER BY office_name`,
    [pincode, data.office_name]
  );


  /* =========================================================
  🔥 SIMILAR NAME POST OFFICES
  ========================================================= */

  const officeKeyword = data.office_name
    ?.replace(/post office|bo|so|ho/gi, "")
    ?.trim();

  const [similarNames] = await db.query<RowDataPacket[]>(
    `SELECT office_name,district,state,pincode
   FROM indian_pincodes
   WHERE office_name LIKE ?
   AND pincode!=?
   LIMIT 20`,
    [`%${officeKeyword}%`, pincode]
  );

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
    name: `Pincode - ${data.pincode} ${data.district}, ${data.state}, India`,
    postalCode: data.pincode,
    addressLocality: data.district,
    addressRegion: data.state,
    addressCountry: "India",
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
        name: "India Pincode",
        item: `${baseUrl}/india-pincode`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.state,
        item: `${baseUrl}/state/${formatSlug(data.state)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.district,
        item: `${baseUrl}/city/${formatSlug(data.district)}`,
      },
      {
        "@type": "ListItem",
        position: 5,
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

      <Breadcrumb
        baseUrl={baseUrl}
        state={data.state}
        district={data.district}
        pincode={data.pincode}
      />
      <h1 className="text-2xl font-bold mb-4">
        {data.pincode} Pincode - {data.district}, {data.state}, India
      </h1>
      <PincodeAutoSuggest />

      <div className="text-center mb-10 mt-5">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-4xl font-bold mb-3">
          {data.pincode} Pincode Details
        </h1>
        <p className="text-gray-600">
          {data.district}, {data.state}
        </p>
      </div>


      {/* ================= PINCODE DETAILS TABLE ================= */}

      <div className="bg-white shadow-xl rounded-3xl p-8 mb-12">

        <table className="w-full text-left border-collapse">

          <tbody className="text-gray-700">

            <tr className="border-b">
              <td className="py-2 font-semibold">Office Name</td>
              <td>{data.office_name}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Branch Type</td>
              <td>{data.branch_type}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Delivery Status</td>
              <td>{data.delivery_status}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">District</td>
              <td>{data.district}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Division</td>
              <td>{data.division}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Region</td>
              <td>{data.region}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Taluk</td>
              <td>{data.taluk}</td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-semibold">Circle</td>
              <td>{data.circle}</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">State</td>
              <td>{data.state}</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* ================= SAME PINCODE OTHER OFFICES ================= */}

      {otherSamePin.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Other ({otherSamePin.length}) Post Offices with Same PIN Code ({data.pincode}) in {data.district}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {otherSamePin.map((item: any, index: number) => {

              const url = buildPincodeUrl(item)

              return (

                <Link
                  key={index}
                  href={url}
                  className="flex justify-between items-center border rounded-xl px-4 py-3 hover:bg-indigo-50 transition"
                >

                  <div>

                    <div className="font-medium">
                      {item.office_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {item.district}, {item.state}
                    </div>

                  </div>

                  <ArrowRight size={18} />

                </Link>

              )

            })}

          </div>

        </div>

      )}

      {/* ================= SIMILAR NAME POST OFFICES ================= */}

      {similarNames.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Other ({similarNames.length}) Post Offices with Similar Name
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {similarNames.map((item: any, index: number) => {

              const url = buildPincodeUrl(item)

              return (

                <Link
                  key={index}
                  href={url}
                  className="border rounded-xl p-4 hover:bg-indigo-50 transition"
                >

                  <div className="font-semibold">
                    {item.office_name}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {item.district}, {item.state}
                  </div>

                  {/* <div className="text-indigo-600 text-sm mt-2">
                    PIN: {item.pincode}
                  </div> */}

                </Link>

              )

            })}

          </div>

        </div>

      )}

      {/* ================= POST OFFICES ================= */}

      {samePincodeOffices.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-4">
            Post Offices in {data.pincode}
          </h2>

          <div className="flex flex-wrap gap-3">

            {samePincodeOffices.map((item: any, index: number) => (
              <span key={index}
                className="border px-4 py-2 rounded text-sm bg-gray-50">
                {item.office_name}
              </span>
            ))}

          </div>

        </div>

      )}

      {/* ================= AREAS COVERED ================= */}

      {areasCovered.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-4">
            Areas Covered by {data.pincode}
          </h2>

          <div className="flex flex-wrap gap-3">

            {areasCovered.map((item: any, index: number) => (
              <span key={index}
                className="border px-4 py-2 rounded text-sm bg-gray-50">
                {item.taluk}
              </span>
            ))}

          </div>

        </div>

      )}

      {/* ================= NEARBY PINCODES ================= */}

      {nearby.length > 0 && (

        <div className="mb-12">

          <h2 className="text-2xl font-bold mb-6">
            Nearby Pincodes
          </h2>

          <div className="flex flex-wrap gap-3">

            {nearby.map((item: any) => (
              <Link
                key={item.pincode}
                href={buildPincodeUrl(item)}
                className="border px-4 py-2 rounded hover:bg-indigo-50 text-sm"
              >
                {item.pincode}
              </Link>
            ))}

          </div>

        </div>

      )}

      {/* ================= DISTRICT & STATE LINKS ================= */}

      <div className="mb-12 flex flex-wrap gap-4">

        <Link
          href={`/city/${formatSlug(data.district)}`}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          View All Pincodes in {data.district}
          <ArrowRight size={16} />
        </Link>

        <Link
          href={`/state/${formatSlug(data.state)}`}
          className="border px-6 py-3 rounded-xl hover:bg-indigo-50 flex items-center gap-2"
        >
          Explore {data.state} Pincode List
        </Link>

      </div>

      {/* ================= GOOGLE MAP ================= */}

      <div className="mb-12">

        <h2 className="text-2xl font-bold mb-4">
          Location Map
        </h2>

        <iframe
          title="pincode map"
          width="100%"
          height="350"
          className="rounded-xl border"
          loading="lazy"
          src={`https://www.google.com/maps?q=${data.district},${data.state}&output=embed`}
        ></iframe>

      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Related Pincodes in {data.district}
          </h2>

          <div className="flex flex-wrap gap-3">
            {related.map((item: any) => (
              <Link
                key={item.pincode}
                href={buildPincodeUrl(item)}
                className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
              >
                {item.pincode}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ================= FAQ ================= */}

      <div className="mb-12 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-gray-700">

          <p>
            <strong>What is the pincode of {data.district}?</strong><br />
            The pincode of {data.district} is {data.pincode}.
          </p>

          <p>
            <strong>Which district does {data.pincode} belong to?</strong><br />
            The pincode {data.pincode} belongs to {data.district} district in {data.state}.
          </p>

          <p>
            <strong>What is the delivery status of {data.pincode}?</strong><br />
            The delivery status is {data.delivery_status}.
          </p>

          <p>
            <strong>Which post office serves this pincode?</strong><br />
            The post office associated with this pincode is {data.office_name}.
          </p>

        </div>

      </div>

      {/* ================= SEO CONTENT ================= */}

      <section className="bg-indigo-50 p-8 rounded-3xl">

        <h2 className="text-2xl font-bold mb-4">
          About {data.pincode} Pincode
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The pincode {data.pincode} belongs to {data.district} district in {data.state}, India.
          This postal code is managed by the India Post department and is used to
          identify the delivery region for letters, parcels, and courier shipments.
          Each pincode in India represents a specific geographic area served by a
          particular post office.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The post office associated with this pincode is {data.office_name}.
          It falls under the {data.division} postal division and {data.region} region.
          The branch type for this office is {data.branch_type}, and the delivery
          status is currently listed as {data.delivery_status}.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Including the correct pincode in your address ensures faster mail
          delivery and accurate routing within the Indian postal network.
          This page provides detailed information about the {data.pincode}
          postal code including office details, administrative regions,
          nearby pincodes, and related postal locations.
        </p>

      </section>

    </div>
  );
}