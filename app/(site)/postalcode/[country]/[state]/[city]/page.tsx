import db from "@/app/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import { Home, ChevronRight, MapPin } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";

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

// 🔥 SUPER NORMALIZER (IMPORTANT FIX)
function normalizeText(text: string) {
    return text
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\./g, "")
        .replace(/'/g, "")
        .replace(/\bst\b/g, "saint") // 🔥 st → saint fix
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

    const country = params.country.toUpperCase();
    const state = params.state.replace(/-/g, " ");
    const city = params.city.replace(/-/g, " ");

    let postals: any[] = [];

    // 🔥 LOAD ALL (important for matching)
    const [rows]: any = await db.query(
        `SELECT postal_code, admin1, place_name 
     FROM worldwide_postal_codes
     WHERE country_code=? 
     AND postal_code IS NOT NULL 
     AND postal_code != ''`,
        [country]
    );

    const normState = normalizeText(state);
    const normCity = normalizeText(city);

    // 🔥 MAIN FILTER (SMART MATCH)
    postals = rows.filter((r: any) => {

        const dbState = normalizeText(r.admin1 || "");
        const dbCity = normalizeText(r.place_name || "");

        return (
            (
                dbState.includes(normState) ||
                normState.includes(dbState)
            ) &&
            (
                dbCity.includes(normCity) ||
                normCity.includes(dbCity) ||
                dbCity.replace(/s$/, "") === normCity.replace(/s$/, "")
            )
        );
    });

    // 🔥 FALLBACK (ignore state)
    if (postals.length === 0) {
        postals = rows.filter((r: any) => {
            const dbCity = normalizeText(r.place_name || "");

            return (
                dbCity.includes(normCity) ||
                normCity.includes(dbCity)
            );
        });
    }

    // 🔥 UNIQUE POSTAL ONLY
    const uniquePostals = Array.from(
        new Map(postals.map((p: any) => [p.postal_code, p])).values()
    );

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

            {/* LIST */}
            <div className="flex flex-wrap gap-3">

                {uniquePostals.map((p: any) => {
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
                <div className="text-center text-gray-500 mt-6">
                    No postal codes found.
                </div>
            )}

            {/* SEO */}
            <div className="mt-12 bg-indigo-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-3">
                    About Postal Codes in {city}
                </h2>

                <p className="text-gray-700">
                    Postal codes help identify locations for accurate delivery.
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

        </div>
    );
}