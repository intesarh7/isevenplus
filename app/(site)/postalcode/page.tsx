import db from "@/app/lib/db";
import Link from "next/link";
import {
    Globe,
    ChevronRight,
    Home,
    MapPin,
    Search,
    Layers,
    Rocket,
    Package,
    Hash,
    ChevronDown,
    HelpCircle
} from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";
import { Metadata } from "next";
import ContinentFilterGrid from "@/app/components/ContinentFilterGrid";
export const dynamic = "force-dynamic";
/* ================================
   CACHE
================================ */
export const revalidate = 0;

/* ================================
   HELPER
================================ */
function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}


/* ================================
   🔥 SEO METADATA (FULL)
================================ */
export async function generateMetadata(): Promise<Metadata> {

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    const url = `${baseUrl}/postalcode/`;

    return {
        title: "Worldwide Postal Codes Directory - Find ZIP & Pincode Easily",
        description:
            "Search postal codes, ZIP codes, and pincodes worldwide. Find accurate location details by country, state, and city instantly.",
        keywords: [
            "postal code",
            "zip code",
            "pincode",
            "world postal codes",
            "find postal code",
            "zipcode lookup",
            "global postal directory"
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: "Worldwide Postal Codes Directory",
            description:
                "Browse and search postal codes across countries, states, and cities worldwide.",
            url,
            siteName: "iSevenPlus",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Worldwide Postal Codes Directory",
            description:
                "Find postal codes worldwide with our fast and accurate lookup tool.",
        },
    };
}

/* ================================
   PAGE
================================ */
export default async function PostalHomePage() {



    /* ================================
       FAST + PARALLEL QUERIES ⚡
    ================================= */

    const [
        [countryData],
        [placeData],
        [stateData],
        [popularData]
    ]: any = await Promise.all([


        // COUNTRIES
        db.query(`
        SELECT 
  country_code, 
  COUNT(*) as total
FROM worldwide_postal_codes
WHERE country_code IS NOT NULL
AND country_code != ''
GROUP BY country_code
ORDER BY total DESC;
    `),

        // PLACES
        db.query(`
      SELECT DISTINCT place_name, country_code
      FROM worldwide_postal_codes
      WHERE place_name != '' AND place_name IS NOT NULL
      LIMIT 20
    `),

        // STATES
        db.query(`
      SELECT DISTINCT admin1, country_code
      FROM worldwide_postal_codes
      WHERE admin1 != '' AND admin1 IS NOT NULL
      LIMIT 20
    `),

        // 🔥 POPULAR SEARCHES (LIGHT + FAST)
        db.query(`
      SELECT DISTINCT place_name, country_code
      FROM worldwide_postal_codes
      WHERE place_name != '' AND place_name IS NOT NULL
      LIMIT 10
    `)
    ]);

    //console.log("TOTAL COUNTRIES:", countryData.length);


    console.log("TOTAL:", countryData.length);
    return (
        <div className="mx-auto py-10 px-4">

            {/* BREADCRUMB */}
            <nav className="flex items-center text-sm text-gray-600 mb-4 gap-1">
                <Link href="/" className="flex items-center gap-1 text-indigo-600 hover:underline">
                    <Home size={16} />
                    Home
                </Link>
                <ChevronRight size={16} />
                <span className="text-gray-900 font-semibold">
                    Worldwide Postal Codes
                </span>
            </nav>

            {/* TITLE */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Worldwide Postal Codes Directory
                </h1>
                <p className="text-gray-600">
                    Browse postal codes by country, state, and city.
                </p>
            </div>

            <div className="mb-10">
                <WorldSearch />
            </div>

            {/* ================= CONTINENT FILTER GRID ================= */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                    Filter by Continent
                </h2>

                <ContinentFilterGrid countryData={countryData} />
            </div>

            {/* COUNTRY GRID */}
            {/*
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {countryData.map((c: any) => {

                const continent = continentMap[c.country_code] || "Other";

                return (
                <Link
                    key={c.country_code}
                    href={`/postalcode/${slugify(c.country_code)}`}
                    className="group border rounded-2xl p-4 hover:shadow-md transition bg-white"
                >
                    <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
                        <Globe size={18} className="text-indigo-500" />
                        {c.country_code}
                    </div>

                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition" />
                    </div>

                    <p className="text-xs text-indigo-600 font-medium mb-1">
                    🌍 {continent}
                    </p>

                    <p className="text-sm text-gray-500">
                    {c.total} Postal Codes
                    </p>
                </Link>
                );
            })}
            </div>
            */}



            {/* 🔥 POPULAR SEARCHES */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Search className="text-indigo-500" size={20} />
                    Popular Searches
                </h2>

                <div className="flex flex-wrap gap-3">
                    {popularData.map((p: any, i: number) => (
                        <Link
                            key={i}
                            href={`/postalcode/${slugify(p.country_code)}/${slugify(p.place_name)}`}
                            className="px-3 py-2 bg-gray-100 rounded-full text-sm hover:bg-indigo-100"
                        >
                            {p.place_name} ({p.country_code})
                        </Link>
                    ))}
                </div>
            </div>

            {/* CITIES */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="text-indigo-500" size={20} />
                    Browse by Cities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {placeData.map((p: any, i: number) => (
                        <Link
                            key={i}
                            href={`/postalcode/${slugify(p.country_code)}/${slugify(p.place_name)}`}
                            className="hover:text-indigo-600"
                        >
                            {p.place_name} ({p.country_code})
                        </Link>
                    ))}
                </div>
            </div>

            {/* STATES */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Layers className="text-indigo-500" size={20} />
                    Browse by States
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {stateData.map((s: any, i: number) => (
                        <Link
                            key={i}
                            href={`/postalcode/${slugify(s.country_code)}/${slugify(s.admin1)}`}
                            className="hover:text-indigo-600"
                        >
                            {s.admin1} ({s.country_code})
                        </Link>
                    ))}
                </div>
            </div>

            {/* 🧠 FAQ UI */}
            <section className="mb-12 mt-10">

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

        </div>
    );
}