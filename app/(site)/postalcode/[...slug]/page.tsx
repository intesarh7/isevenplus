import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { MapPin, ArrowRight, Search, ChevronRight, Home } from "lucide-react";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";

/* =========================================================
   HELPER
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
   BUILD SEO URL
========================================================= */
function buildPostalUrl(data: any) {

  const country = formatSlug(data.country_code);
  const state = formatSlug(data.admin1 || "");
  const city = formatSlug(data.place_name || "");

  const postal = data.postal_code.split(" ")[0];

  const parts = ["postalcode", country];

  if (state) parts.push(state);
  if (city) parts.push(city);

  parts.push(postal);

  return "/" + parts.join("/");
}

/* =========================================================
   METADATA
========================================================= */
export async function generateMetadata({ params }: { params: { slug: string[] } }) {

  const postal = params.slug[params.slug.length - 1];
  const cleanCode = decodeURIComponent(postal).trim();

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes
     WHERE postal_code LIKE CONCAT(?, '%')
     LIMIT 1`,
    [cleanCode]
  );

  if (!rows.length) return {};

  const data = rows[0];

  const firstPostal = data.postal_code.split(" ")[0];

  if (cleanCode !== firstPostal) {
    redirect(buildPostalUrl(data));
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  return {
    title: `${data.postal_code} Postal Code - ${data.place_name}, ${data.country_code}`,
    description: `Complete details of postal code ${data.postal_code} in ${data.place_name}, ${data.country_code}.`,
    alternates: {
      canonical: baseUrl + buildPostalUrl(data),
    },
  };
}

/* =========================================================
   MAIN PAGE
========================================================= */
export default async function WorldDetail({
  params,
  searchParams
}: {
  params: { slug: string[] }
  searchParams?: { q?: string }
}) {



  const query = searchParams?.q?.toString() ?? "";

  const postal = params.slug[params.slug.length - 1];
  const cleanCode = decodeURIComponent(postal).trim();

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes
     WHERE postal_code LIKE ?
     LIMIT 1`,
    [`${cleanCode}%`]
  );

  if (!rows.length) return notFound();

  const data = rows[0];

  const firstPostal = data.postal_code.split(" ")[0];

  if (cleanCode !== firstPostal) {
    redirect(buildPostalUrl(data));
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const currentUrl = baseUrl + buildPostalUrl(data);

  /* RELATED POSTAL */
  const [related] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes
     WHERE country_code=? 
     AND postal_code NOT LIKE ?
     LIMIT 12`,
    [data.country_code, `${cleanCode}%`]
  );

  /* NEARBY */
  const [nearby] = await db.query<RowDataPacket[]>(
    `SELECT * FROM worldwide_postal_codes
     WHERE admin1=? 
     AND postal_code NOT LIKE ?
     LIMIT 10`,
    [data.admin1, `${cleanCode}%`]
  );




  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-1">

        <Link
          href="/"
          className="flex items-center gap-1 text-indigo-600 hover:underline"
        >
          <Home size={16} />
          Home
        </Link>

        <ChevronRight size={16} />

        <Link
          href="/pincode?type=world"
          className="text-indigo-600 hover:underline"
        >
          World Postal Codes
        </Link>

        <ChevronRight size={16} />

        <Link
          href={`/country/${formatSlug(data.country_code)}`}
          className="text-indigo-600 hover:underline"
        >
          {data.country_code}
        </Link>

        {data.admin1 && (
          <>
            <ChevronRight size={16} />

            <Link
              href={`/world-state/${formatSlug(data.admin1)}`}
              className="text-indigo-600 hover:underline"
            >
              {data.admin1}
            </Link>
          </>
        )}

        <ChevronRight size={16} />

        <Link
          href={`/world-city/${formatSlug(data.place_name)}`}
          className="text-indigo-600 hover:underline"
        >
          {data.place_name}
        </Link>

        <ChevronRight size={16} />

        <span className="text-gray-900 font-semibold">
          {firstPostal}
        </span>

      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        {firstPostal} Postal Code - {data.place_name}, {data.country_code}
      </h1>

      {/* Search */}
      <form method="GET" className="bg-white p-6 rounded-2xl shadow mb-10">
        <div className="flex flex-col md:flex-row gap-4">


          <PincodeAutoSuggest defaultValue={query} />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </form>

      {/* DETAILS */}
      <div className="bg-white shadow rounded-2xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {firstPostal} Postal Code Details
        </h2>

        <table className="w-full text-left">
          <tbody className="divide-y">

            <tr>
              <td className="py-2 font-semibold">Place</td>
              <td>{data.place_name}</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">State / Region</td>
              <td>{data.admin1}</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Country</td>
              <td>{data.country_code}</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Latitude</td>
              <td>{data.latitude}</td>
            </tr>

            <tr>
              <td className="py-2 font-semibold">Longitude</td>
              <td>{data.longitude}</td>
            </tr>

          </tbody>
        </table>

      </div>

      {/* AREAS COVERED */}
      <div className="mb-10">

        <h2 className="text-xl font-bold mb-4">
          Areas Covered by {firstPostal}
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="border px-3 py-1 rounded-lg">{data.place_name}</span>
          {data.admin1 && (
            <span className="border px-3 py-1 rounded-lg">{data.admin1}</span>
          )}
        </div>

      </div>

      {/* NEARBY */}
      {nearby.length > 0 && (
        <div className="mb-10">

          <h2 className="text-xl font-bold mb-4">
            Nearby Postal Codes
          </h2>

          <div className="flex flex-wrap gap-3">

            {nearby.map((n: any) => (

              <Link
                key={n.postal_code}
                href={buildPostalUrl(n)}
                className="border px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                {n.postal_code.split(" ")[0]}
              </Link>

            ))}

          </div>

        </div>
      )}

      {/* MAP */}
      <div className="mb-12">

        <h2 className="text-xl font-bold mb-4">
          Location Map
        </h2>

        <iframe
          width="100%"
          height="350"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=13&output=embed`}
          className="rounded-xl border"
        />

      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mb-12">

          <h2 className="text-xl font-bold mb-4">
            Related Postal Codes in {data.country_code}
          </h2>

          <div className="flex flex-wrap gap-3">

            {related.map((item: any) => (

              <Link
                key={item.postal_code}
                href={buildPostalUrl(item)}
                className="border px-3 py-1 rounded-lg hover:bg-gray-100"
              >
                {item.postal_code.split(" ")[0]}
              </Link>

            ))}

          </div>

        </div>
      )}

      {/* FAQ */}
      <div className="mb-12">

        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-gray-700">

          <p>
            <strong>What is the postal code of {data.place_name}?</strong><br />
            The postal code of {data.place_name} is {firstPostal}.
          </p>

          <p>
            <strong>Which country does {firstPostal} belong to?</strong><br />
            This postal code belongs to {data.country_code}.
          </p>

          <p>
            <strong>Where is {firstPostal} located?</strong><br />
            It is located in {data.place_name}, {data.admin1}.
          </p>

        </div>

      </div>

      {/* ABOUT */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          About {firstPostal} Postal Code
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The postal code {firstPostal} belongs to {data.place_name}, {data.admin1} in {data.country_code}.
          Postal codes are used worldwide to identify specific delivery areas for mail,
          courier services, and logistics operations.
        </p>

      </div>

    </div>
  );
}