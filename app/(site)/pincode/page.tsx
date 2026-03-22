// ⚠️ SAME IMPORTS (NO CHANGE)
import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { Search, MapPin, Globe, TrendingUp, Navigation, Package, Building2, ArrowRight, ChevronDown, HelpCircle, FileText, Hash, Rocket, Mic } from "lucide-react";
import PincodeAutoSuggest from "@/app/components/PincodeAutoSuggest";
import Image from "next/image";
export const dynamic = "force-dynamic";
/* ================= BASE URL ================= */
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



/* ================= METADATA ================= */
export async function generateMetadata({ searchParams }: any) {
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
    alternates: { canonical },
  };
}

export default async function PincodePage({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.toString().trim() ?? "";
  const type = resolvedSearchParams?.type || "india";

  let results: RowDataPacket[] = [];

  if (query) {
    const searchTerm = `%${query}%`;

    if (type === "india") {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT 
      office_name AS officeName,
      pincode,
      branch_type,
      delivery_status,
      district,
      division,
      region,
      taluk,
      circle,
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
        `SELECT country_code AS country, postal_code AS postalCode,
         place_name AS placeName, admin1 AS state
         FROM worldwide_postal_codes
         WHERE postal_code LIKE ?
         OR place_name LIKE ?
         OR admin1 LIKE ?
         LIMIT 50`,
        [searchTerm, searchTerm, searchTerm]
      );
      results = rows;
    }
  }

  /* ================= STATES ================= */
  const [statesWithCount] = await db.query<RowDataPacket[]>(
    `SELECT state, COUNT(*) as total 
   FROM indian_pincodes
   WHERE state IS NOT NULL 
   AND state != ''
   GROUP BY state 
   ORDER BY state ASC`
  );

  /* ================= POPULAR SEARCHES ================= */
  const [popularCities] = await db.query<RowDataPacket[]>(`
  SELECT 
    district, 
    state, 
    COUNT(*) as total
  FROM indian_pincodes
  WHERE 
    district IS NOT NULL AND district != ''
    AND state IS NOT NULL AND state != ''
  GROUP BY district, state
  ORDER BY total DESC
  LIMIT 20
`);

  /* ================= PINCODE BLOG POSTS ================= */
  const [pincodePosts] = await db.query<RowDataPacket[]>(`
  SELECT 
    b.id, 
    b.title, 
    b.slug, 
    b.featuredImage,
    b.createdAt
  FROM blogs b
  INNER JOIN blog_categories c ON b.categoryId = c.id
  WHERE c.slug = 'pincode'
  AND b.status = 'published'
  AND b.deletedAt IS NULL
  ORDER BY b.createdAt DESC
  LIMIT 6
`);


  return (
    <>
      {/* ================= STRUCTURED DATA ================= */}

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a pincode?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A pincode is a 6-digit postal code used in India for identifying delivery areas.",
                },
              },
              {
                "@type": "Question",
                name: "How to find pincode?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can search using city, district, or area name in our search box.",
                },
              },
            ],
          }),
        }}
      />

      <main className="mx-auto px-4 py-12 flex flex-col-reverse md:flex-row gap-10">

        <div>

          {/* HEADER */}
          <div className="text-center mb-12">
            <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Indian & Worldwide Pincode Search
            </h1>

            {/* 🔥 STATS BLOCK */}
            <div className="flex justify-center gap-6 text-sm text-gray-600 flex-wrap">

              <div className="flex items-center gap-2">
                <Package size={16} className="text-indigo-600" />
                <span>1.5M+ Pincodes</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe size={16} className="text-green-600" />
                <span>190+ Countries</span>
              </div>

              <div className="flex items-center gap-2">
                <Search size={16} className="text-purple-600" />
                <span>10K+ Daily Searches</span>
              </div>

            </div>
          </div>

          {/* SEARCH */}
          <form method="GET" className="bg-white p-6 rounded-2xl shadow mb-10">
            <div className="flex flex-col md:flex-row gap-4">

              {/* 🌍 COUNTRY SELECTOR UPGRADE */}
              <select name="type" defaultValue={type} className="border p-3 rounded-xl">
                <option value="india">🇮🇳 India</option>
                <option value="world">🌍 Worldwide</option>
              </select>

              <PincodeAutoSuggest defaultValue={query} />

              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                <Search size={18} /> Search
              </button>



            </div>
          </form>

          {/* 🔥 TRENDING SEARCHES */}
          <section className="mb-10">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={18} /> Popular Searches
            </h2>

            <div className="flex flex-wrap gap-3">
              {popularCities.map((city: any, index: number) => {

                const stateSlug = generateSlug(city.state);
                const districtSlug = generateSlug(city.district);

                return (
                  <a
                    key={index}
                    href={`/pincode/${stateSlug}/${districtSlug}`}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-indigo-100 transition"
                  >
                    {city.district} Pincode
                  </a>
                );
              })}
            </div>
          </section>

          {/* RESULTS TABLE VIEW */}
          {query && results.length > 0 && (
            <div className="mb-10">

              <h2 className="font-bold text-lg flex items-center gap-2">
                <MapPin size={18} className="text-indigo-600" />
                Pincode Details
              </h2>

              {/* DESKTOP TABLE */}
              <div className="hidden md:block max-h-125 overflow-y-auto">
                <table className="w-full text-sm border rounded-xl overflow-hidden ">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-3 text-left">Post Office</th>
                      <th className="p-3 text-left">Pincode</th>
                      <th className="p-3 text-left">Branch Type</th>
                      <th className="p-3 text-left">Delivery</th>
                      <th className="p-3 text-left">District</th>
                      <th className="p-3 text-left">Division</th>
                      <th className="p-3 text-left">Region</th>
                      <th className="p-3 text-left">Taluk</th>
                      <th className="p-3 text-left">Circle</th>
                      <th className="p-3 text-left">State</th>

                    </tr>
                  </thead>

                  <tbody>
                    {results.map((r: any, i: number) => (
                      <tr key={i} className="border-b hover:bg-gray-50 transition">

                        {/* 1 */}
                        <td className="p-3 font-medium">{r.officeName}</td>

                        {/* 2 */}
                        <td className="p-3 font-semibold text-indigo-600">
                          {r.pincode}
                        </td>

                        {/* 3 */}
                        <td className="p-3">
                          {r.branch_type || "-"}
                        </td>

                        {/* 4 */}
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 text-xs whitespace-nowrap rounded-full ${r.delivery_status === "Delivery"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                              }`}
                          >
                            {r.delivery_status || "N/A"}
                          </span>
                        </td>

                        {/* 5 */}
                        <td className="p-3">{r.district || "-"}</td>

                        {/* 6 */}
                        <td className="p-3">{r.division || "-"}</td>

                        {/* 7 */}
                        <td className="p-3">{r.region || "-"}</td>

                        {/* 8 */}
                        <td className="p-3">{r.taluk || "-"}</td>

                        {/* 9 */}
                        <td className="p-3">{r.circle || "-"}</td>

                        {/* 10 */}
                        <td className="p-3">{r.state || "-"}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="grid gap-4 md:hidden">
                {results.map((r: any, i: number) => (
                  <div key={i} className="border rounded-xl p-4 shadow-sm bg-gray-50">

                    <h3 className="font-semibold text-lg mb-2">
                      {r.officeName}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-sm">

                      <p><strong>Pincode:</strong> <span className="text-indigo-600">{r.pincode}</span></p>
                      <p><strong>Type:</strong> {r.branch_type || "-"}</p>

                      <p><strong>District:</strong> {r.district}</p>
                      <p><strong>State:</strong> {r.state}</p>

                      <p><strong>Division:</strong> {r.division || "-"}</p>
                      <p><strong>Region:</strong> {r.region || "-"}</p>

                      <p><strong>Taluk:</strong> {r.taluk || "-"}</p>
                      <p><strong>Circle:</strong> {r.circle || "-"}</p>

                      <p className="col-span-2">
                        <strong>Delivery:</strong>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${r.delivery_status === "Delivery"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                          }`}>
                          {r.delivery_status || "N/A"}
                        </span>
                      </p>

                    </div>

                    <a
                      href={`/pincode/${r.pincode}`}
                      className="mt-4 inline-block w-full text-center bg-indigo-600 text-white py-2 rounded-lg text-sm"
                    >
                      View Full Details
                    </a>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 📍 NEARBY PINCODES */}
          {results.length > 0 && (
            <div className="mb-12">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MapPin size={18} className="text-indigo-600" />
                  Nearby Areas
                </h3>

                <span className="text-xs text-gray-500">
                  Based on your search
                </span>
              </div>

              {/* CHIP STYLE GRID */}
              <div className="flex flex-wrap gap-3">

                {results.slice(0, 8).map((r: any, i: number) => (
                  <a
                    key={i}
                    href={`/pincode/${r.pincode}`}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-indigo-50 hover:border-indigo-300 transition shadow-sm"
                  >
                    {/* ICON */}
                    <MapPin size={14} className="text-indigo-500" />


                    {/* TEXT */}
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {r.officeName}
                    </span>

                    {/* PINCODE BADGE */}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 group-hover:bg-indigo-100">
                      {r.pincode}
                    </span>
                  </a>
                ))}

              </div>

            </div>
          )}

          {/* 📊 DISTRICT / CITY LINKS */}
          <section className="mb-12">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Building2 size={18} className="text-indigo-600" />
                Browse by Popular Cities
              </h2>

              <a
                href="/city"
                className="text-sm text-indigo-600 flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={14} />
              </a>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

              {popularCities.map((city: any, index: number) => (
                <a
                  key={index}
                  href={`/city/${generateSlug(city.district)}`}
                  className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
                >

                  {/* ICON + NAME */}
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} className="text-indigo-500 group-hover:scale-110 transition" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {city.district}
                    </span>
                  </div>

                  {/* COUNT */}
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>{city.total} pincodes</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                  </div>

                </a>
              ))}

            </div>

          </section>

          {/* 📊 Browse by Popular States */}
          <div className="mb-10">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Building2 size={18} className="text-indigo-600" />
                Browse by Popular States
              </h3>

              <a
                href="/state"
                className="text-xs text-indigo-600 hover:underline"
              >
                View All →
              </a>
            </div>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-h-125 overflow-y-auto pr-2">

              {statesWithCount.map((state: any, i: number) => (
                <a
                  key={i}
                  href={`/state/${generateSlug(state.state)}`}
                  className="group border rounded-xl p-3 bg-gray-50 hover:bg-white hover:shadow-md hover:border-indigo-300 transition"
                >

                  {/* TOP ROW */}
                  <div className="flex items-center gap-2 mb-1">
                    <Building2
                      size={14}
                      className="text-indigo-500 group-hover:scale-110 transition"
                    />
                    <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600">
                      {state.state}
                    </span>
                  </div>

                  {/* COUNT */}
                  <div className="text-xs text-gray-500">
                    {state.total} pincodes
                  </div>

                </a>
              ))}

            </div>

          </div>

          {/* 🧠 FAQ UI */}
          <section className="mb-12">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="text-indigo-600" size={20} />
              <h2 className="text-xl md:text-2xl font-bold">
                Frequently Asked Questions (Pincode & Postal Code)
              </h2>
            </div>

            {/* FAQ LIST */}
            <div className="space-y-4">

              {[
                {
                  q: "What is a Pincode in India?",
                  a: "A Pincode (Postal Index Number) is a 6-digit code used by India Post to identify specific geographic regions for efficient mail delivery."
                },
                {
                  q: "How can I find the pincode of my area?",
                  a: "You can easily find your area pincode by entering your city, district, or locality name in the search box above."
                },
                {
                  q: "What do the 6 digits of a pincode represent?",
                  a: "The first digit represents the region, the second the sub-region, the third the sorting district, and the last three digits identify the specific post office."
                },
                {
                  q: "Is ZIP code same as Pincode?",
                  a: "Yes, ZIP code is used in countries like the USA, while Pincode is the term used in India. Both serve the same purpose of identifying locations."
                },
                {
                  q: "Can two areas have the same pincode?",
                  a: "Yes, multiple nearby areas or localities can share the same pincode if they are served by the same post office."
                },
                {
                  q: "How accurate is this pincode search tool?",
                  a: "Our tool uses updated official postal data to provide accurate and reliable pincode information across India and worldwide."
                },
                {
                  q: "Why is pincode important for online delivery?",
                  a: "Pincode helps courier and e-commerce companies identify delivery locations accurately and ensure faster shipping."
                },
                {
                  q: "Can I search international postal codes here?",
                  a: "Yes, you can switch to 'Worldwide' search to find postal codes of countries like USA, UK, Canada, and more."
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group border rounded-xl p-4 hover:shadow-sm transition"
                >
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-800">
                    {faq.q}
                    <ChevronDown
                      size={18}
                      className="text-gray-500 group-open:rotate-180 transition"
                    />
                  </summary>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}

            </div>

          </section>

          {/* 🔗 STATIC SEO PAGES */}
          <section className="mb-14">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                Explore More & Guides
              </h2>

              <a
                href="/blog"
                className="text-sm text-indigo-600 flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={14} />
              </a>
            </div>


            {/* 🧠 BLOG POSTS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

              {pincodePosts.map((post: any, i: number) => (
                <a
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="group relative rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >

                  {/* IMAGE */}
                  {post.featuredImage && (
                    <div className="relative w-full h-36 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* GRADIENT OVERLAY */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col justify-between h-32">

                    {/* TITLE */}
                    <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
                      {post.title}
                    </h4>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-4">

                      {/* DATE */}
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>

                      {/* ARROW ICON */}
                      <div className="flex items-center gap-1 text-gray-400 group-hover:text-indigo-600 transition">
                        <span className="text-xs opacity-0 group-hover:opacity-100 transition">
                          Read
                        </span>
                        <ArrowRight
                          size={16}
                          className="transform group-hover:translate-x-1 transition"
                        />
                      </div>

                    </div>

                  </div>

                  {/* HOVER BORDER EFFECT */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500 transition pointer-events-none"></div>

                </a>
              ))}

            </div>

          </section>

          <section className="bg-white rounded-2xl shadow p-3 md:p-4 mt-5">

            <h2 className="text-1xl md:text-2xl font-bold mb-6 flex items-center gap-2">
              <Hash className="text-indigo-600" size={22} />
              Complete Guide to Pincode System in India & Worldwide Postal Codes
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              The Pincode system in India, also known as the Postal Index Number system, is a 6-digit code used by India Post to identify specific geographic regions and streamline the mail delivery process. Introduced in 1972, the pincode system plays a crucial role in ensuring accurate and fast delivery of letters, parcels, and online orders across the country. Whether you are searching for a pincode of a city, district, or a specific post office, understanding how the system works can help you find accurate results quickly.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              In addition to India, many countries use postal codes (also called ZIP codes, postcode, or area codes) to organize and manage their postal services. Our pincode search tool allows you to find Indian pincodes as well as worldwide postal codes instantly using city names, districts, or area keywords.
            </p>

            {/* SECTION 1 */}
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Hash size={18} className="text-indigo-500" />
              How the 6-Digit Indian Pincode Works
            </h3>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Each digit in an Indian pincode has a specific meaning:
            </p>

            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>First Digit:</strong> Represents the geographical region (India is divided into 9 regions).</li>
              <li><strong>Second Digit:</strong> Indicates the sub-region or postal circle.</li>
              <li><strong>Third Digit:</strong> Identifies the sorting district.</li>
              <li><strong>Last Three Digits:</strong> Represent the specific post office within that district.</li>
            </ul>

            <p className="text-gray-700 mb-6 leading-relaxed">
              For example, in the pincode <strong>226005</strong>, the first digit represents the region, while the remaining digits narrow down the exact delivery location. This structured system helps postal workers and logistics companies deliver packages efficiently without confusion.
            </p>

            {/* SECTION 2 */}
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Package size={18} className="text-green-500" />
              Why Pincode is Important for Delivery & E-commerce
            </h3>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Pincode plays a critical role in modern logistics and e-commerce platforms such as Amazon, Flipkart, and courier services. It ensures that products reach the correct destination quickly and reduces delivery errors. Many online platforms also use pincode validation to check service availability, delivery charges, and estimated delivery time.
            </p>

            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Accurate address identification</li>
              <li>Faster delivery processing</li>
              <li>Reduced shipping errors</li>
              <li>Service availability check</li>
            </ul>

            {/* SECTION 3 */}
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Globe size={18} className="text-blue-500" />
              Difference Between Pincode, ZIP Code, and Postal Code
            </h3>

            <p className="text-gray-700 mb-6 leading-relaxed">
              While India uses the term "Pincode", other countries use different names for similar systems:
            </p>

            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>ZIP Code:</strong> Used in the United States</li>
              <li><strong>Postal Code:</strong> Used globally in many countries</li>
              <li><strong>Postcode:</strong> Common in the UK and Europe</li>
            </ul>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Despite the different names, all these systems serve the same purpose: identifying locations for efficient mail and package delivery.
            </p>

            {/* SECTION 4 */}
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Search size={18} className="text-purple-500" />
              How to Find Pincode of Any Area
            </h3>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Finding a pincode is simple using our search tool. You can search by:
            </p>

            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>City name (e.g., Delhi, Mumbai, Lucknow)</li>
              <li>District name</li>
              <li>Post office name</li>
              <li>Direct pincode number</li>
            </ul>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our system instantly provides accurate results including post office details, district, state, and delivery status. This makes it ideal for both personal and professional use.
            </p>

            {/* SECTION 5 */}
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Rocket size={18} className="text-indigo-600" />
              Benefits of Using Our Pincode Finder Tool
            </h3>


            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Fast and accurate pincode lookup</li>
              <li>Supports Indian and worldwide postal codes</li>
              <li>Useful for e-commerce, logistics, and address verification</li>
              <li>Mobile-friendly and easy-to-use interface</li>
              <li>Regularly updated postal database</li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              Whether you are a student, business owner, courier service provider, or online shopper, our pincode search tool helps you find accurate postal information quickly and efficiently. Start searching now and get the exact pincode or postal code for any location within seconds.
            </p>

          </section>

          <section className="mt-5 bg-white p-6 rounded-2xl shadow">

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Mic size={18} className="text-indigo-600" />
              Voice Search Friendly Queries
            </h2>

            <div className="flex flex-wrap gap-3 text-sm">

              {[
                "What is the pincode of Delhi?",
                "Find postal code of Mumbai",
                "What is my area pincode?",
                "How to check pincode online?",
                "Nearest post office pincode",
                "Pincode of Lucknow",
                "ZIP code vs Pincode difference"
              ].map((q, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-2 rounded-full hover:bg-indigo-100 transition"
                >
                  {q}
                </span>
              ))}

            </div>

          </section>

        </div>
      </main>
    </>
  );
}