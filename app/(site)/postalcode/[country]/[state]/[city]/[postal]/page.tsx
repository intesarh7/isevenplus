import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, MapPin, Navigation, Globe, LocateFixed } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";
import { createSlug } from "@/app/lib/slugify";
 
/* ================================
   HELPERS
================================ */
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

function normalizePostal(code: string) {
    return code
        ?.toLowerCase()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .trim();
}

function normalizePostalFlexible(code: string) {
    return code
        ?.toLowerCase()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .trim();
}
/* ================================
   METADATA
================================ */
export async function generateMetadata({ params }: any): Promise<Metadata> {

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    const rawPostal = params.postal;
    const decoded = decodeURIComponent(params.postal || "").trim();
    const normalized = createSlug(decoded);

    const url = `${baseUrl}/postalcode/${params.country}/${params.state}/${params.city}/${normalized}/`;

    return {
        title: `${decoded} Postal Code Details`,
        description: `Details of postal code ${decoded}`,
        alternates: { canonical: url },
    };
}

/* ================================
   PAGE
================================ */
export default async function PostalDetail({ params }: any) {

    const country = params.country?.toUpperCase();

    const rawPostal = params.postal;
    const decoded = decodeURIComponent(params.postal || "").trim();
    const normalized = createSlug(decoded);

    // 🔥 URL normalize redirect
    if (decoded !== normalized) {
        return redirect(
            `/postalcode/${params.country}/${params.state}/${params.city}/${normalized}`
        );
    }

    const normPostal = normalizePostal(decoded);
    const normState = normalizeText(params.state.replace(/-/g, " "));
    const normCity = normalizeText(params.city.replace(/-/g, " "));

    let rows: any[] = [];

    const [allRows]: any = await db.query(
        `SELECT * FROM worldwide_postal_codes 
     WHERE country_code=? 
     AND postal_code IS NOT NULL 
     AND postal_code != ''`,
        [country]
    );

    // 🔥 MAIN MATCH
    rows = allRows.filter((r: any) => {

        const dbPostal = normalizePostalFlexible(r.postal_code || "");
        const inputPostal = normalizePostalFlexible(decoded);
        const dbState = normalizeText(r.admin1 || "");
        const dbCitySlug = createSlug(r.place_name || "");
        const urlCitySlug = createSlug(params.city || "");

        return (
            dbPostal === normPostal &&
            (
                dbCitySlug === urlCitySlug ||
                dbCitySlug.includes(urlCitySlug) ||
                urlCitySlug.includes(dbCitySlug)
            )
        );
    });

    // 🔥 FALLBACK (postal only)
    if (!rows.length) {
        rows = allRows.filter((r: any) => {
            const dbPostal = normalizePostal(r.postal_code || "");
            return dbPostal === normPostal;
        });
    }

    if (!rows.length) return notFound();

    const data = rows[0];

    /* ================================
   SCHEMA (SEO JSON-LD)
================================ */

    // 🔥 Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/`
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Postal Codes",
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode`
            },
            {
                "@type": "ListItem",
                position: 3,
                name: data.country_code,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}`
            },
            {
                "@type": "ListItem",
                position: 4,
                name: data.admin1 || params.state.replace(/-/g, " "),
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}/${params.state}`
            },
            {
                "@type": "ListItem",
                position: 5,
                name: data.place_name,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}/${params.state}/${params.city}`
            },
            {
                "@type": "ListItem",
                position: 6,
                name: data.postal_code,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}/${params.state}/${params.city}/${params.postal}`
            }
        ]
    };

    // 🔥 FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What is the postal code of ${data.place_name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `The postal code of ${data.place_name} is ${data.postal_code}.`
                }
            },
            {
                "@type": "Question",
                name: `Where is postal code ${data.postal_code} located?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${data.postal_code} is located in ${data.place_name}, ${data.admin1 || params.state}, ${data.country_code}.`
                }
            },
            {
                "@type": "Question",
                name: `What is the latitude and longitude of ${data.postal_code}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Latitude: ${data.latitude}, Longitude: ${data.longitude}.`
                }
            }
        ]
    };

    /* ================================
       RELATED + NEARBY
    ================================= */
    const [related]: any = await db.query(
        `SELECT postal_code FROM worldwide_postal_codes 
     WHERE country_code=? AND postal_code != ?
     LIMIT 8`,
        [country, data.postal_code]
    );

    const [nearby]: any = await db.query(
        `SELECT postal_code FROM worldwide_postal_codes 
     WHERE country_code=? AND postal_code != ?
     LIMIT 8`,
        [country, data.postal_code]
    );

    const formatPostal = (p: string) =>
        p.trim().replace(/\s+/g, "-").toLowerCase();


    return (
        <div className="py-10 px-4">

            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center text-sm mb-6 gap-2 text-gray-600">

                {/* Home */}
                <Link
                    href="/"
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    <Home size={16} />
                    Home
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                {/* Postal Codes */}
                <Link
                    href="/postalcode"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    Worldwide Postal Codes
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                {/* Country */}
                <Link
                    href={`/postalcode/${params.country}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    {data.country_code}
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                {/* State */}
                <Link
                    href={`/postalcode/${params.country}/${params.state}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    {data.admin1 || data.place_name || params.state.replace(/-/g, " ")}
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                {/* Current */}
                <span className="flex items-center gap-1 text-gray-900 font-semibold">
                    <MapPin size={14} className="text-indigo-500" />
                    {data.postal_code}
                </span>

            </nav>

            <div className="mb-10">
                <WorldSearch />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <MapPin /> {data.postal_code} Postal Code - {data.place_name}
            </h1>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md border overflow-hidden mb-8">

                {/* Header */}
                <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                    <MapPin className="text-indigo-600" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800">
                        Postal Code Details
                    </h2>
                </div>

                {/* Table */}
                <table className="w-full text-sm">

                    <tbody className="divide-y">

                        {/* Place */}
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-600 flex items-center gap-2">
                                <MapPin size={16} className="text-indigo-500" />
                                Place
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-semibold">
                                {data.place_name}
                            </td>
                        </tr>

                        {/* State */}
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-600 flex items-center gap-2">
                                <Navigation size={16} className="text-indigo-500" />
                                State / Region
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-semibold">
                                {data.admin1}
                            </td>
                        </tr>

                        {/* Country */}
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-600 flex items-center gap-2">
                                <Globe size={16} className="text-indigo-500" />
                                Country
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-semibold">
                                {data.country_code}
                            </td>
                        </tr>

                        {/* Latitude */}
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-600 flex items-center gap-2">
                                <LocateFixed size={16} className="text-indigo-500" />
                                Latitude
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-semibold">
                                {data.latitude}
                            </td>
                        </tr>

                        {/* Longitude */}
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-600 flex items-center gap-2">
                                <LocateFixed size={16} className="text-indigo-500" />
                                Longitude
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-semibold">
                                {data.longitude}
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

            {/* Nearby */}
            <h2 className="text-xl font-bold mb-3">Nearby Postal Codes</h2>
            <div className="flex flex-wrap gap-2 mb-8">
                {nearby.map((n: any) => (
                    <Link key={n.postal_code}
                        href={`/postalcode/${params.country}/${params.state}/${params.city}/${formatPostal(n.postal_code)}`}
                        className="border px-3 py-1 rounded">
                        {n.postal_code}
                    </Link>
                ))}
            </div>

            {/* Related */}
            <h2 className="text-xl font-bold mb-3">Related Postal Codes</h2>
            <div className="flex flex-wrap gap-2 mb-8">
                {related.map((r: any) => (
                    <Link key={r.postal_code}
                        href={`/postalcode/${params.country}/${params.state}/${params.city}/${formatPostal(r.postal_code)}`}
                        className="border px-3 py-1 rounded">
                        {r.postal_code}
                    </Link>
                ))}
            </div>

            {/* Content */}
            <div className="bg-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-2">About {data.postal_code}</h2>
                <p>
                    {data.postal_code} is the postal code of {data.place_name}, located in {data.admin1}, {data.country_code}.
                    Postal codes help in efficient mail delivery and location identification.
                </p>
            </div>

            {/* Schema */}
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        </div>
    );
}