import db from "@/app/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import { Home, ChevronRight, MapPin } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";
import { redirect } from "next/navigation";
import slugifyLib from "slugify"; // ✅ ADD
import { transliterate } from "transliteration";

/* ================================
   🌍 UNIVERSAL ENGLISH CONVERTER (NEW)
================================ */
function toEnglish(text: string) {
    if (!text) return "";

    try {
        // Hindi, Arabic, etc → English
        return transliterate(text);
    } catch {
        return text;
    }
}
/* ================================
   MASTER NORMALIZER 🔥🔥🔥
================================ */
function normalizeMaster(text: string) {

    const englishText = toEnglish(text); // ✅ ADD: URL & DB same language me convert

    return englishText
        ?.toLowerCase()
        .normalize("NFD") // remove accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\./g, "")
        .replace(/'/g, "")
        .replace(/"/g, "")
        .replace(/,/g, "")
        .replace(/;/g, "")
        .replace(/-/g, " ")
        .replace(/\bst\b/g, "saint")
        .replace(/\s+/g, " ")
        .trim();
}

/* ================================
   SLUGIFY (FIXED)
================================ */
function slugify(text: string) {
    return normalizeMaster(text).replace(/\s+/g, "-");
}

/* ================================
   🎯 TITLE CASE FORMATTER (NEW)
================================ */
function formatTitle(text: string) {
    if (!text) return "";

    return text
        .toLowerCase()
        .split(" ")
        .map(word => {
            // numbers ya empty words skip
            if (!word) return word;

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

/* ================================
   🔥 UNIVERSAL SLUG (NEW FIX)
================================ */
function createSlug(text: string) {
    if (!text) return "";
    const englishText = toEnglish(text);
    return slugifyLib(englishText, {
        lower: true,
        strict: true,
        locale: "en",
        trim: true,
    });
}

/* ================================
   METADATA (SEO)
================================ */
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const country = params.country.toUpperCase();
    const rawState = params.state.replace(/-/g, " ");
    const state = formatTitle(toEnglish(rawState));

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    // ✅ FIXED canonical (clean slug)
    const cleanState = createSlug(params.state);

    const url = `${baseUrl}/postalcode/${params.country}/${cleanState}/`;

    return {
        title: `${state} Postal Codes - Cities List (${country})`,
        description: `Explore all cities in ${state}, ${country} and find their postal codes.`,
        alternates: { canonical: url },
        openGraph: {
            title: `${state} Postal Codes`,
            description: `Cities and postal codes in ${state}, ${country}.`,
            url,
            siteName: "iSevenPlus",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${state} Postal Codes`,
            description: `Browse cities and postal codes in ${state}.`,
        },
    };
}

/* ================================
   PAGE
================================ */
export default async function StatePage({ params }: any) {
    const country = params.country.toUpperCase();
    const rawState = params.state.replace(/-/g, " ");
    const state = formatTitle(toEnglish(rawState));
    const stateEnglish = toEnglish(state);
    const normState = normalizeMaster(stateEnglish); // ✅ FIX

    // ✅ CLEAN URL REDIRECT (NEW FIX)
    const cleanState = createSlug(params.state);
    if (params.state !== cleanState) {
        return redirect(`/postalcode/${params.country}/${cleanState}`);
    }

    let cities: any[] = [];

    // 🔥 Load all rows (global safe)
    const [rows]: any = await db.query(
        `SELECT DISTINCT place_name, admin1 
     FROM worldwide_postal_codes 
     WHERE country_code=? 
     AND place_name IS NOT NULL 
     AND place_name != ''`,
        [country]
    );

    /* ================================
         🔥 SMART MATCH ENGINE
      ================================= */

    cities = rows.filter((r: any) => {

        const dbState = normalizeMaster(r.admin1 || "");
        const dbCity = normalizeMaster(r.place_name || "");

        return (
            dbState.includes(normState) ||
            normState.includes(dbState) ||

            dbState.split(" ").some((word: string) => normState.includes(word)) ||

            // ✅ ADD: city based loose match
            dbCity.includes(normState)
        );
    });

    // 🔥 fallback (city-level match)
    if (cities.length === 0) {
        cities = rows.filter((r: any) => {
            const dbCity = normalizeMaster(r.place_name || "");
            return dbCity.includes(normState); // ✅ ONLY THIS
        });
    }


    /* ================================
       SCHEMA
    ================================= */
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Cities in ${state}, ${country}`,
        description: `List of cities in ${state}, ${country}`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}/${cleanState}`, // ✅ FIXED
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `What is the postal code system in ${state}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Postal codes in ${state}, ${country} help identify locations for delivery services.`
                }
            },
            {
                "@type": "Question",
                "name": "How can I find a city postal code?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can use the search bar or browse the city list above."
                }
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">

            {/* ================================
                BREADCRUMB
            ================================= */}
            <nav className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-1">

                <Link href="/" className="flex items-center gap-1 text-indigo-600 hover:underline">
                    <Home size={16} />
                    Home
                </Link>

                <ChevronRight size={16} />

                <Link href="/postalcode" className="text-indigo-600 hover:underline">
                    Worldwide Postal Codes
                </Link>

                <ChevronRight size={16} />

                <Link href={`/postalcode/${params.country}`} className="text-indigo-600 hover:underline">
                    {country}
                </Link>

                <ChevronRight size={16} />

                <span className="text-gray-900 font-semibold">
                    {state}
                </span>

            </nav>

            <div className="mb-10">
                <WorldSearch />
            </div>

            {/* ================================
                H1
            ================================= */}
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-indigo-500" />
                Cities in {state}, {country}
            </h1>

            {/* ================================
            🔥 SEO HERO STATS (NEW)
            ================================ */}
            <div className="mb-8 p-5 rounded-2xl border bg-white shadow-sm flex flex-wrap gap-6 text-sm">

                <div>
                    <p className="text-gray-500">Total Cities</p>
                    <p className="text-xl font-bold text-indigo-600">{cities.length}+</p>
                </div>

                <div>
                    <p className="text-gray-500">Region</p>
                    <p className="text-xl font-bold">{state}</p>
                </div>

                <div>
                    <p className="text-gray-500">Country</p>
                    <p className="text-xl font-bold">{country}</p>
                </div>

                <div>
                    <p className="text-gray-500">Search Coverage</p>
                    <p className="text-xl font-bold text-green-600">100%</p>
                </div>

            </div>

            {/* ================================
                INTRO
            ================================= */}
            <p className="text-gray-600 mb-8 max-w-3xl">
                Discover all cities located in {state}, {country} and explore their postal codes.
            </p>

            {/* ================================
                CITY GRID
            ================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                {cities.map((c: any) => {

                    const slug = slugify(c.place_name); // existing
                    const cleanCitySlug = createSlug(c.place_name); // ✅ NEW FIX

                    return (
                        <Link
                            key={c.place_name}
                            href={`/postalcode/${params.country}/${cleanState}/${cleanCitySlug}`} // ✅ FIXED URL
                            className="group border rounded-2xl p-4 hover:shadow-md transition bg-white"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800">
                                    {c.place_name}
                                </span>

                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition" />
                            </div>
                        </Link>
                    );
                })}

            </div>

            {/* ================================
                EMPTY STATE
            ================================= */}
            {cities.length === 0 && (
                <div className="mt-6 p-5 rounded-xl border border-yellow-300 bg-yellow-50 text-yellow-800">

                    <h3 className="font-semibold text-lg mb-1">
                        Postal Code Not Found
                    </h3>

                    <p className="text-sm">
                        We couldn't find postal codes for <b>{state}, {country}</b>.
                        This may be due to spelling differences or data availability.
                    </p>

                    <ul className="text-sm mt-3 list-disc pl-5 space-y-1">
                        <li>Try searching again using a different spelling</li>
                        <li>Search using nearby cities or districts</li>
                        <li>Use the global search box above</li>
                    </ul>

                </div>
            )}

            {/* ================================
            🔗 RELATED LINKS (NEW)
            ================================ */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-3">
                    Explore Nearby Locations
                </h2>

                <div className="flex flex-wrap gap-3">

                    <Link href={`/postalcode/${params.country}`}
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-100">
                        All States in {country}
                    </Link>

                    <Link href="/postalcode"
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-100">
                        Worldwide Postal Codes
                    </Link>

                </div>
            </div>

            {/* ================================
                ⭐ FEATURED CITIES (NEW)
                ================================ */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">
                    Popular Cities in {state}
                </h2>

                <div className="flex flex-wrap gap-3">

                    {cities.slice(0, 10).map((c: any) => {
                        const cleanCitySlug = createSlug(c.place_name);

                        return (
                            <Link
                                key={c.place_name}
                                href={`/postalcode/${params.country}/${cleanState}/${cleanCitySlug}`}
                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 text-sm"
                            >
                                {c.place_name}
                            </Link>
                        );
                    })}

                </div>
            </div>

            {/* ================================
                SEO BLOCK
            ================================= */}
            <div className="mt-12 bg-indigo-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-3">
                    About Postal Codes in {state}
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Postal codes in {state}, {country} help identify specific areas for efficient delivery.
                </p>
            </div>

            {/* ================================
            ❓ FAQ SECTION (NEW)
            ================================ */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">

                    <div className="p-4 border rounded-xl bg-white">
                        <h3 className="font-semibold">
                            What is the postal code system in {state}?
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Postal codes in {state}, {country} are used to identify locations for faster mail and delivery services.
                        </p>
                    </div>

                    <div className="p-4 border rounded-xl bg-white">
                        <h3 className="font-semibold">
                            How can I find a city postal code?
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            You can browse the city list above or use the search bar to quickly find postal codes.
                        </p>
                    </div>

                    <div className="p-4 border rounded-xl bg-white">
                        <h3 className="font-semibold">
                            Are postal codes same for all areas?
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            No, different areas and cities have unique postal codes for accurate delivery.
                        </p>
                    </div>

                </div>
            </div>

            {/* ================================
            🚀 CTA (NEW)
            ================================ */}
            <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 text-white text-center">

                <h2 className="text-2xl font-bold mb-2">
                    Find Postal Codes Instantly
                </h2>

                <p className="mb-4 text-sm">
                    Use our smart search to quickly find postal codes worldwide.
                </p>

                <Link
                    href="/postalcode"
                    className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl"
                >
                    Search Now
                </Link>

            </div>

            {/* ================================
          SCHEMA
      ================================= */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

        </div>
    );
}