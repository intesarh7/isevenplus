import db from "@/app/lib/db";
import Link from "next/link";
import { RowDataPacket } from "mysql2";
import { notFound } from "next/navigation";
import PageHeader from "@/app/components/PageHeader";

function formatSlug(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
}

/* =========================================================
   🔥 METADATA
========================================================= */

export async function generateMetadata({
    params,
}: {
    params: { region: string };
}) {

    const regionName = params.region.replace(/-/g, " ").toUpperCase();

    /* Clean base URL */
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
        "https://www.isevenplus.com";

    /* Build canonical path safely */
    const canonical = `${baseUrl}/region/${params.region}/`;

    return {
        title: `${regionName} Region Pincode List - Postal Codes & Post Offices`,

        description: `Find all pincodes in the ${regionName} postal region of India. Browse district-wise post office lists, branch types and delivery status.`,

        alternates: {
            canonical,
        },
    };
}

/* =========================================================
   🔥 MAIN PAGE
========================================================= */

export default async function RegionPage({
    params,
}: {
    params: { region: string };
}) {

    const regionName = params.region.replace(/-/g, " ").toUpperCase();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    /* ================= GET DISTRICTS ================= */

    const [districts] = await db.query<RowDataPacket[]>(
        `SELECT DISTINCT district,state 
     FROM indian_pincodes
     WHERE region = ?
     ORDER BY district`,
        [regionName]
    );

    if (!districts.length) return notFound();

    const stateName = districts[0].state;

    const currentUrl = `${baseUrl}/region/${params.region}`;

    /* =========================================================
       🔥 Collection Schema
    ========================================================= */

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${regionName} Region Pincode List`,
        url: currentUrl,
        about: `Postal codes in ${regionName} region`,
    };

    /* =========================================================
       🔥 Breadcrumb Schema
    ========================================================= */

    const breadcrumbSchema = {
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
                name: "India Pincode",
                item: `${baseUrl}/india-pincode`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: `${regionName} Region`,
                item: currentUrl,
            },
        ],
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Structured Data */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <PageHeader
                items={[
                    { label: "India Pincode", href: "/india-pincode" },
                    { label: `${regionName} Region` }
                ]}
            />

            <h1 className="text-3xl font-bold mb-6">
                {regionName} Region Pincode List
            </h1>

            <p className="text-gray-600 mb-8">
                Explore all districts and cities that belong to the {regionName} postal
                region. Click a district to view detailed pincode information.
            </p>

            {/* ================= DISTRICT GRID ================= */}

            <div className="flex flex-wrap gap-3">

                {districts.map((item) => (
                    <Link
                        key={item.district}
                        href={`/city/${formatSlug(item.district)}`}
                        className="border px-4 py-2 rounded hover:bg-indigo-50 transition text-sm"
                    >
                        {item.district}
                    </Link>
                ))}

            </div>

            {/* ================= SEO CONTENT ================= */}

            <div className="mt-16 bg-white border rounded-2xl p-6 md:p-10 shadow-sm">

                <h2 className="text-2xl font-bold mb-4">
                    About {regionName} Postal Region
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    The {regionName} postal region is an important part of the Indian postal
                    network operated by India Post. Postal regions are administrative areas
                    used to organize mail delivery, sorting, and distribution across different
                    districts and cities. Each region includes multiple districts and hundreds
                    of post offices that work together to ensure efficient mail handling and
                    timely delivery of letters, parcels, and courier shipments.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    In the {regionName} region, numerous towns, villages, and urban localities
                    are served by a network of head post offices, sub post offices, and branch
                    post offices. Each post office is assigned a unique six-digit pincode
                    (Postal Index Number) that identifies the specific delivery area. These
                    pincodes help postal workers route mail correctly and prevent confusion
                    caused by locations with similar names.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    Understanding the Indian Postal System
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    The Indian postal system is one of the largest postal networks in the
                    world, with more than 150,000 post offices across the country. To manage
                    this vast infrastructure efficiently, India Post divides the country into
                    postal zones, regions, and divisions. Postal regions such as
                    {regionName} act as key administrative units that coordinate the movement
                    of mail between districts and cities.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    Within a postal region, mail is sorted and transported through a
                    hierarchical system that connects regional sorting centers, district
                    sorting hubs, and local delivery post offices. This organized structure
                    ensures that letters and packages travel quickly from the sender to the
                    recipient, even across long distances.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    Role of Pincodes in the {regionName} Region
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    Pincodes play a crucial role in the postal infrastructure of the
                    {regionName} region. Each six-digit pincode identifies a specific
                    geographic location served by a post office. When a pincode is included
                    in an address, it allows the postal system to automatically determine the
                    correct delivery route.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    The first three digits of a pincode represent the postal zone and sorting
                    district, while the last three digits correspond to the individual post
                    office responsible for delivery. This structured system allows India Post
                    to efficiently handle millions of mail items every day.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    Districts and Cities in the {regionName} Postal Region
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    The {regionName} postal region includes multiple districts and cities,
                    each with its own network of post offices. Urban districts typically have
                    a large number of post offices to serve dense populations, while rural
                    districts rely on branch post offices to connect remote villages to the
                    national postal system.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    By selecting a district from the list above, users can view detailed
                    information about all pincodes associated with that district. Each
                    district page provides a list of post offices, including their branch
                    type, delivery status, and administrative division.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    Importance of Postal Regions for Logistics and Delivery
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    Postal regions like {regionName} play a significant role in modern
                    logistics and delivery services. Courier companies, e-commerce
                    platforms, and logistics providers rely heavily on pincodes to plan
                    delivery routes and determine service availability in different areas.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    When businesses ship products to customers within the {regionName}
                    region, the pincode helps identify the nearest delivery center and
                    ensures accurate shipment routing. This system helps reduce delays,
                    improve delivery efficiency, and maintain reliable postal services.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    How to Use the {regionName} Pincode Directory
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                    This directory makes it easy to explore postal information within the
                    {regionName} region. Start by selecting a district from the list above.
                    Once you open the district page, you will see all pincodes and post
                    offices associated with that area.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    Each pincode listing includes important details such as the name of the
                    post office, the type of branch office, and the delivery status of that
                    location. This information is useful for verifying addresses, planning
                    logistics operations, and ensuring accurate mail delivery.
                </p>


                <h2 className="text-xl font-semibold mb-3">
                    Explore Pincodes in the {regionName} Region
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    The {regionName} postal region directory provides a comprehensive
                    overview of districts, cities, and post offices operating within the
                    region. Whether you are searching for a specific postal code, verifying
                    a mailing address, or exploring postal services in different districts,
                    this page offers a reliable and organized source of postal information
                    for the entire {regionName} region.
                </p>

            </div>

        </div>
    );
}