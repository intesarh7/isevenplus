import db from "@/app/lib/db";
import Link from "next/link";
import { RowDataPacket } from "mysql2";
import { Metadata } from "next";
import { Home, ChevronRight, MapPin } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

/* ================================
   TYPES
================================ */
type PostalRow = RowDataPacket & {
    postal_code: string;
    admin1: string;
    place_name: string;
};

/* ================================
   HELPERS
================================ */
function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function formatPostal(postal: string) {
    return postal
        ?.toString()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();
}

function normalizeText(text: string) {
    return text
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\./g, "")
        .replace(/'/g, "")
        .replace(/\bst\b/g, "saint")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
}

/* ================================
   METADATA
================================ */
export async function generateMetadata({ params }: any): Promise<Metadata> {

    const country = params.country.toUpperCase();
    const state = params.state.replace(/-/g, " ");
    const city = params.city.replace(/-/g, " ");

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    const url = `${baseUrl}/postalcode/${params.country}/${params.state}/${params.city}/`;

    return {
        title: `Postal Codes in ${city}, ${state} (${country})`,
        description: `Find postal codes in ${city}, ${state}, ${country}.`,
        alternates: { canonical: url },
    };
}

/* ================================
   PAGE
================================ */
export default async function CityPage({ params }: any) {

    const cityParam = params.city;

if (/^\d[\d-]*$/.test(cityParam)) {

    const [rows]: any = await db.query(
        `SELECT postal_code, admin1, place_name 
         FROM worldwide_postal_codes 
         WHERE country_code=?`,
        [params.country.toUpperCase()]
    );

    const clean = cityParam.replace(/[-\s]/g, "").toLowerCase();

    // 🔥 GET ALL MATCHES
    const matches = rows.filter((r: any) => {
        const db = (r.postal_code || "").replace(/[-\s]/g, "").toLowerCase();

        return (
            db === clean ||               // exact
            db.startsWith(clean) ||      // 31863 matches 31863-98023
            db.includes(clean)           // fallback
        );
    });

    if (matches.length > 0) {

        // 🔥 SORT BEST MATCH FIRST
        matches.sort((a: any, b: any) => {
            const aLen = (a.postal_code || "").length;
            const bLen = (b.postal_code || "").length;
            return aLen - bLen;
        });

        const best = matches[0];

        const stateSlug = slugify(best.admin1 || params.state);
        const citySlug = slugify(best.place_name || params.state);
        const postalSlug = (best.postal_code || "")
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();

        return redirect(
            `/postalcode/${params.country}/${stateSlug}/${citySlug}/${postalSlug}`
        );
    }
}

    const country = params.country.toUpperCase();
    const state = params.state.replace(/-/g, " ");
    const city = params.city.replace(/-/g, " ");

    const normState = normalizeText(state);
    const normCity = normalizeText(city);

    /* ================================
       DB QUERY (FIXED TYPE)
    ================================= */
    const [rows] = await db.query<PostalRow[]>(
        `SELECT postal_code, admin1, place_name 
         FROM worldwide_postal_codes
         WHERE country_code=? 
         AND postal_code IS NOT NULL 
         AND postal_code != ''`,
        [country]
    );

    /* ================================
       FILTERING
    ================================= */
    let postals: PostalRow[] = [];

    postals = rows.filter((r) => {
        const dbState = normalizeText(r.admin1 || "");
        const dbCity = normalizeText(r.place_name || "");

        return (
            (dbState.includes(normState) || normState.includes(dbState)) &&
            (
                dbCity.includes(normCity) ||
                normCity.includes(dbCity) ||
                dbCity.replace(/s$/, "") === normCity.replace(/s$/, "")
            )
        );
    });

    // fallback
    if (postals.length === 0) {
        postals = rows.filter((r) => {
            const dbCity = normalizeText(r.place_name || "");
            return dbCity.includes(normCity) || normCity.includes(dbCity);
        });
    }

    /* ================================
       UNIQUE POSTALS
    ================================= */
    const uniquePostals = Array.from(
        new Map(postals.map((p) => [p.postal_code, p])).values()
    );

    /* ================================
       RELATED CITIES
    ================================= */
    const relatedCities: string[] = Array.from(
        new Set(
            rows
                .map((r) => r.place_name)
                .filter((c) => c && c.trim().length > 0)
                .filter((c) => {
                    const norm = normalizeText(c);
                    return norm.includes(normState) && norm !== normCity;
                })
        )
    ).slice(0, 10);

    /* ================================
       SCHEMA
    ================================= */
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Postal Codes in ${city}, ${state}`,
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">

            {/* BREADCRUMB */}
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

                <Link href={`/postalcode/${params.country}/${params.state}`} className="text-indigo-600 hover:underline">
                    {state}
                </Link>

                <ChevronRight size={16} />

                <span className="text-gray-900 font-semibold">
                    {city}
                </span>

            </nav>

            <div className="mb-10">
                <WorldSearch />
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-indigo-500" />
                Postal Codes in {city}, {state}, {country}
            </h1>

            {uniquePostals.length > 0 && (
                <p className="text-gray-600 mb-4">
                    Found <b>{uniquePostals.length}</b> postal codes in {city}.
                </p>
            )}

            {/* LIST */}
            <div className="flex flex-wrap gap-3">
                {uniquePostals.map((p) => {
                    const cleanPostal = formatPostal(p.postal_code);

                    return (
                        <Link
                            key={p.postal_code}
                            href={`/postalcode/${params.country}/${params.state}/${params.city}/${cleanPostal}`}
                            className="border px-3 py-2 rounded-lg hover:bg-gray-100"
                        >
                            {p.postal_code.trim()}
                        </Link>
                    );
                })}
            </div>

            {/* EMPTY */}
            {uniquePostals.length === 0 && (
                <div className="mt-6 p-5 rounded-xl border border-yellow-300 bg-yellow-50 text-yellow-800">

                    <h3 className="font-semibold text-lg mb-1">
                        Postal Code Not Found
                    </h3>

                    <p className="text-sm">
                        We couldn't find postal codes for <b>{city}, {state}</b>.
                        This may be due to spelling differences or data availability.
                    </p>

                    <ul className="text-sm mt-3 list-disc pl-5 space-y-1">
                        <li>Try searching again using a different spelling</li>
                        <li>Search using nearby cities or districts</li>
                        <li>Use the global search box above</li>
                    </ul>

                </div>
            )}

            {/* RELATED */}
            {relatedCities.length > 0 && (
                <div className="mt-14">
                    <h2 className="text-2xl font-bold mb-4">
                        Nearby Cities & Postal Codes
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {relatedCities.map((c, index) => (
                            <Link
                                key={index}
                                href={`/postalcode/${params.country}/${slugify(state)}/${slugify(c)}`}
                                className="px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm"
                            >
                                {c}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* POPULAR */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-4">
                    Popular Searches in {country}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
                    <Link href={`/postalcode/${params.country}/${params.state}`} className="hover:underline text-indigo-600">
                        {state} Postal Codes
                    </Link>

                    <Link href={`/postalcode/${params.country}`} className="hover:underline text-indigo-600">
                        All Cities in {country}
                    </Link>

                    <Link href={`/postalcode/${params.country}/${params.state}/${params.city}/`} className="hover:underline text-indigo-600">
                        {city} Zip Code List
                    </Link>

                    <Link href="/postalcode" className="hover:underline text-indigo-600">
                        Worldwide Postal Codes
                    </Link>
                </div>
            </div>

            {/* SEO */}
            <div className="mt-12 bg-indigo-50 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-3">
                    About Postal Codes in {city}, {state}
                </h2>

                <p className="text-gray-700 mb-3">
                    Postal codes in {city}, {state}, {country} are used to identify specific geographic areas
                    for efficient mail delivery, logistics, and location-based services.
                </p>

                <p className="text-gray-700 mb-3">
                    Each postal code represents a group of addresses or regions, helping courier services,
                    eCommerce platforms, and government systems accurately route shipments.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">
                    Why Postal Codes Matter?
                </h3>

                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Ensures accurate and faster delivery</li>
                    <li>Helps in location identification</li>
                    <li>Used in online shopping and logistics</li>
                    <li>Important for address verification</li>
                </ul>

            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

        </div>
    );
}