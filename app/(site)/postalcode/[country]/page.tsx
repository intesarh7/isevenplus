import db from "@/app/lib/db";
import Link from "next/link";
import { Metadata } from "next";
import { Home, ChevronRight, Globe } from "lucide-react";
import WorldSearch from "@/app/components/WorldSearch";

/* ================================
   HELPERS
================================ */
function slugify(text: string) {
    return text
        ?.toString()
        .toLowerCase()
        .normalize("NFD") // 🔥 accents remove karega properly
        .replace(/[\u0300-\u036f]/g, "") // ä → a
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

// 🔥 FIX: normalize (handles Kärnten → krnten)
function normalizeText(text: string) {
    return text
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
}

/* ================================
   METADATA (SEO)
================================ */
export async function generateMetadata({ params }: any): Promise<Metadata> {

    const country = params.country.toUpperCase();

    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    const url = `${baseUrl}/postalcode/${params.country}/`;

    return {
        title: `${country} Postal Codes List - States & Regions`,
        description: `Browse all states and regions postal codes in ${country}.`,
        alternates: { canonical: url },

        openGraph: {
            title: `${country} Postal Codes List`,
            description: `Complete list of states and regions postal codes in ${country}.`,
            url,
            siteName: "iSevenPlus",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: `${country} Postal Codes`,
            description: `Explore postal codes across ${country}.`,
        },
    };
}

/* ================================
   PAGE
================================ */
export default async function CountryPage({ params }: any) {

    const country = params.country.toUpperCase();

    let states: any[] = [];

    // 🔥 GET ALL DATA (fix for accents + global compatibility)
    const [rows]: any = await db.query(
        `SELECT DISTINCT admin1, place_name 
     FROM worldwide_postal_codes 
     WHERE country_code=?`,
        [country]
    );

    // 🔥 filter valid states
    states = rows
        .filter((r: any) => r.admin1 && r.admin1.trim() !== "")
        .reduce((acc: any[], curr: any) => {
            const exists = acc.find(
                (a) => normalizeText(a.admin1) === normalizeText(curr.admin1)
            );
            if (!exists) acc.push(curr);
            return acc;
        }, []);

    // 🔥 fallback (UAE / no-state countries)
    if (states.length === 0) {
        states = rows
            .filter((r: any) => r.place_name && r.place_name.trim() !== "")
            .map((r: any) => ({ admin1: r.place_name }));
    }

    /* ================================
       SCHEMA
    ================================= */
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${country} Postal Codes`,
        description: `States and regions in ${country}`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/postalcode/${params.country}`,
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

                <span className="text-gray-900 font-semibold">
                    {country}
                </span>

            </nav>

            <div className="mb-10">
                <WorldSearch />
            </div>

            {/* ================================
          H1
      ================================= */}
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Globe className="text-indigo-500" />
                {country} Postal Codes by State / Region
            </h1>

            {/* ================================
          INTRO
      ================================= */}
            <p className="text-gray-600 mb-8 max-w-3xl">
                Explore all states and regions in {country} to find postal codes.
            </p>

            {/* ================================
          STATES GRID
      ================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                {states.map((s: any) => {
                    const slug = slugify(s.admin1);

                    return (
                        <Link
                            key={s.admin1}
                            href={`/postalcode/${params.country}/${slug}`}
                            className="group border rounded-2xl p-4 hover:shadow-md transition bg-white"
                        >
                            <div className="flex items-center justify-between">

                                <span className="font-semibold text-gray-800">
                                    {s.admin1}
                                </span>

                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition" />

                            </div>
                        </Link>
                    );
                })}

            </div>

            {/* EMPTY STATE */}
            {states.length === 0 && (
                <div className="text-center text-gray-500 mt-6">
                    No regions found for this country.
                </div>
            )}

            {/* ================================
          SEO BLOCK
      ================================= */}
            <div className="mt-12 bg-indigo-50 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-3">
                    About Postal Codes in {country}
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Postal codes help identify specific geographic locations for efficient delivery.
                </p>

            </div>

            {/* ================================
          SCHEMA
      ================================= */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

        </div>
    );
}