import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { Search, MapPin } from "lucide-react";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";

/* =========================================================
   ✅ BASE URL (Production Safe)
========================================================= */
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
/* =========================================================
   ✅ DYNAMIC SEO METADATA
========================================================= */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; type?: string };
}) {
  const query = searchParams?.q?.trim();
  const type = searchParams?.type || "india";

  const title = query
    ? `${query} ${type === "india" ? "Pincode" : "Postal Code"} Search | iSevenPlus`
    : "Indian & Worldwide Pincode Search | iSevenPlus";

  const canonical = query
    ? `${baseUrl}/pincode?q=${encodeURIComponent(query)}&type=${type}`
    : `${baseUrl}/pincode/`;

  return {
    title,
    description:
      "Search Indian pincode and worldwide postal codes instantly by city, state, or postal code.",
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
    },
  };
}

export default async function PincodePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {

  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.q?.toString().trim() ?? "";
  const type = resolvedSearchParams?.type || "india";

  let results: RowDataPacket[] = [];

  if (query) {
    const searchTerm = `%${query}%`;

    if (type === "india") {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT office_name AS officeName, 
                pincode, 
                district, 
                state 
         FROM indian_pincodes
         WHERE CAST(pincode AS CHAR) LIKE ?
         OR office_name LIKE ?
         OR district LIKE ?
         OR state LIKE ?
         ORDER BY district ASC
         LIMIT 50`,
        [searchTerm, searchTerm, searchTerm, searchTerm]
      );
      results = rows;
    } else {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT country_code AS country,
                postal_code AS postalCode,
                place_name AS placeName,
                admin1 AS state
         FROM worldwide_postal_codes
         WHERE postal_code LIKE ?
         OR place_name LIKE ?
         OR admin1 LIKE ?
         ORDER BY place_name ASC
         LIMIT 50`,
        [searchTerm, searchTerm, searchTerm]
      );
      results = rows;
    }
  }

  /* ================================
   ✅ STATE PINCODE COUNT PANEL
================================= */
  const [statesWithCount] = await db.query<RowDataPacket[]>(
    `SELECT state, COUNT(*) as total
   FROM indian_pincodes
   WHERE state IS NOT NULL
   AND TRIM(state) != ''
   GROUP BY state
   ORDER BY state ASC`
  );

  return (
    <>
      {/* ================= STRUCTURED DATA ================= */}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Pincode Search",
                item: `${baseUrl}/pincode`,
              },
            ],
          }),
        }}
      />

      {/* SearchAction Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: baseUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${baseUrl}/pincode?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* ItemList Schema if results exist */}
      {query && results.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: results.map((row: any, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name:
                  type === "india"
                    ? row.officeName
                    : row.placeName,
              })),
            }),
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col-reverse md:flex-row gap-10">

        {/* ================= LEFT STATE PANEL ================= */}
        <aside className="md:w-1/4 mt-10 md:mt-0">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">
              Browse By State
            </h3>

            <div className="space-y-2 max-h-150 overflow-y-auto pr-2">

              {statesWithCount
                .filter((s: any) => s.state && s.state.trim() !== "")
                .map((state: any, index: number) => (
                  <a
                    key={index}
                    href={`/state/${generateSlug(state.state)}`}
                    className="flex justify-between items-center text-sm border-b pb-2 hover:text-indigo-600"
                  >
                    <span>{state.state}</span>
                    <span className="text-gray-500">
                      ({state.total})
                    </span>
                  </a>
                ))}

            </div>
          </div>
        </aside>
        <div>
          {/* ================= BREADCRUMB UI ================= */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:underline">Home</a>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">
              Pincode Search
            </span>
          </nav>

          {/* HEADER */}
          <div className="text-center mb-12">
            <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Indian & Worldwide Pincode Search
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search postal codes by city, district, state or pincode instantly.
            </p>
          </div>

          {/* SEARCH FORM */}
          <form method="GET" className="bg-white p-6 rounded-2xl shadow mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                name="type"
                defaultValue={type}
                className="border p-3 rounded-xl w-full md:w-48"
              >
                <option value="india">India</option>
                <option value="world">Worldwide</option>
              </select>

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

          {/* RESULTS */}
          {query && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">
                Search Results
              </h2>

              {results.length === 0 && (
                <p className="text-gray-500">No results found.</p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {results.map((row: any, index) => (
                  <div
                    key={index}
                    className="border p-5 rounded-xl bg-gray-50 flex flex-col justify-between"
                  >
                    {type === "india" ? (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {row.officeName}
                          </h3>
                          <p><strong>Pincode:</strong> {row.pincode}</p>
                          <p><strong>District:</strong> {row.district}</p>
                          <p><strong>State:</strong> {row.state}</p>
                        </div>

                        <a
                          href={`/pincode/${row.pincode}`}
                          className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View Full Details
                        </a>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {row.placeName}
                          </h3>
                          <p><strong>Postal Code:</strong> {row.postalCode}</p>
                          <p><strong>State:</strong> {row.state}</p>
                          <p><strong>Country:</strong> {row.country}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO CONTENT SECTION */}
          <section className="mt-16 bg-indigo-50 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              About Pincode & Postal Code Search
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Our Pincode Search Tool helps you quickly find accurate postal
              information for India and worldwide locations.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Useful for courier services, e-commerce businesses, and address verification.
            </p>
          </section>

          {/* INTERNAL LINK BOOST */}
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6">
              Explore More
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <a href="/state" className="border p-4 rounded hover:shadow">
                Browse All States
              </a>
              <a href="/city" className="border p-4 rounded hover:shadow">
                Browse All Cities
              </a>
              <a href="/tools" className="border p-4 rounded hover:shadow">
                Explore Calculators
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}