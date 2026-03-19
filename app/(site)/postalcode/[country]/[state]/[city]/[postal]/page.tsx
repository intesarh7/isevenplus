import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, MapPin, Navigation, Globe, LocateFixed, Mail, LinkIcon, HelpCircle, Info, MapIcon } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";
import { createSlug } from "@/app/lib/slugify";
import { generatePostalContent } from "@/app/lib/contentEngine";

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
        description: `${decoded} postal code of ${params.city}, ${params.state}, ${params.country}. Get location, map, nearby postal codes, and full details.`,
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

    const content = generatePostalContent(data);

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

    const geoSchema = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": data.place_name,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.latitude,
            "longitude": data.longitude
        }
    };

    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }} />

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
                    <h2 className="text-2xl font-bold mb-2">
                        About {data.postal_code}
                    </h2>

                    <p className="text-gray-700 mb-2">{content.intro}</p>
                    <p className="text-gray-700 mb-2">{content.geo}</p>
                    <p className="text-gray-700 mb-2">{content.usage}</p>
                    <p className="text-gray-700">{content.extra}</p>
                </div>

                {/* Location Overview */}
                {/* Location Overview */}
                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Info className="text-indigo-600" size={20} />
                        Location Overview
                    </h2>

                    <p className="text-gray-600 leading-6 text-sm">
                        {data.place_name} is a locality in {data.admin1}, {data.country_code}.
                        The postal code <strong>{data.postal_code}</strong> is used for accurate mail delivery
                        and identifying this region geographically.
                    </p>

                    <ul className="mt-4 text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2">
                            <Globe size={16} className="text-indigo-500" />
                            Country: {data.country_code}
                        </li>
                        <li className="flex items-center gap-2">
                            <Navigation size={16} className="text-indigo-500" />
                            Region: {data.admin1}
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} className="text-indigo-500" />
                            Place: {data.place_name}
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-indigo-500" />
                            Postal Code: {data.postal_code}
                        </li>
                        <li className="flex items-center gap-2">
                            <LocateFixed size={16} className="text-indigo-500" />
                            Coordinates: {data.latitude}, {data.longitude}
                        </li>
                    </ul>
                </div>

                {/* Map Section */}
                {/* Map Section */}
                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <MapIcon size={20} className="text-indigo-600" />
                        Map Location
                    </h2>

                    <iframe
                        src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=12&output=embed`}
                        className="w-full h-75 rounded-lg"
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Usage Section */}
                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Mail className="text-indigo-600" size={20} />
                        Uses of Postal Code {data.postal_code}
                    </h2>


                    <p className="text-gray-600 text-sm leading-6">
                        Postal code <strong>{data.postal_code}</strong> plays a crucial role in
                        logistics, courier services, and address identification in {data.place_name}.
                        It helps ensure accurate delivery and efficient sorting of mail.
                    </p>

                    <ul className="mt-3 text-sm text-gray-600 list-disc ml-5 space-y-1">
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-indigo-500" />
                            Mail delivery & sorting
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} className="text-indigo-500" />
                            Online shopping address verification
                        </li>
                        <li className="flex items-center gap-2">
                            <Navigation size={16} className="text-indigo-500" />
                            Courier & logistics operations
                        </li>
                        <li className="flex items-center gap-2">
                            <Globe size={16} className="text-indigo-500" />
                            Government & census mapping
                        </li>
                    </ul>
                </div>

                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-3">
                        Area Insights - {data.place_name}
                    </h2>

                    <p className="text-sm text-gray-600 leading-6">
                        {data.place_name} is located in the region of {data.admin1}, {data.country_code}.
                        This area is identified by postal code {data.postal_code} and plays an important role
                        in regional logistics and communication systems.
                    </p>

                    <p className="text-sm text-gray-600 mt-3 leading-6">
                        The region surrounding {data.place_name} includes multiple nearby postal zones
                        which are interconnected for efficient mail delivery and transportation services.
                    </p>

                    <p className="text-sm text-gray-600 mt-3 leading-6">
                        Geographic coordinates ({data.latitude}, {data.longitude}) help in identifying
                        the exact location of this postal region on global mapping systems.
                    </p>
                </div>

                {/* Explore More */}
                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <LinkIcon className="text-indigo-600" size={20} />
                        Explore More Postal Codes in {data.place_name}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {nearby.slice(0, 6).map((n: any) => (
                            <Link
                                key={n.postal_code}
                                href={`/postalcode/${params.country}/${params.state}/${params.city}/${formatPostal(n.postal_code)}`}
                                className="px-3 py-1 text-sm border rounded-lg hover:bg-indigo-50"
                            >
                                {n.postal_code}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* FAQ Section */}
                <div className="mt-6 p-6 bg-white rounded-xl border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <HelpCircle className="text-indigo-600" size={20} />
                        FAQs about {data.postal_code}
                    </h2>

                    <div className="space-y-3 text-sm text-gray-600">

                        <div>
                            <strong>What is the postal code of {data.place_name}?</strong>
                            <p>The postal code is {data.postal_code}.</p>
                        </div>

                        <div>
                            <strong>Where is {data.postal_code} located?</strong>
                            <p>
                                It is located in {data.place_name}, {data.admin1}, {data.country_code}.
                            </p>
                        </div>

                        <div>
                            <strong>What are the coordinates of this location?</strong>
                            <p>
                                Latitude: {data.latitude}, Longitude: {data.longitude}.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Schema */}
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            </div>
        </>
    );
}