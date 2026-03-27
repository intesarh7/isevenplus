import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import SeoToolSearch from "@/app/components/SeoToolSearch";

export const dynamic = "force-dynamic";

/* ===============================
   PAGE
================================ */



export async function generateMetadata({ params }: any) {

    const [rows] = await db.query<RowDataPacket[]>(

        `SELECT name,description
     FROM seo_tools_categories
     WHERE slug=? LIMIT 1`,

        [params.slug]

    );

    if (!rows.length) return {};

    const category = rows[0];

    return {

        title: `${category.name} Tools | Free SEO Tools`,

        description:
            category.description ||
            `Explore powerful ${category.name} tools to improve your website SEO and performance.`,

        alternates: {
            canonical: `https://www.isevenplus.com/seotools/category/${params.slug}/`,
        },

    };

}

export default async function SeoToolsCategoryPage({
    params,
}: {
    params: { slug: string };
}) {


    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

    /* ===============================
       CATEGORY
    ================================= */

    const [catRows] = await db.query<RowDataPacket[]>(

        `SELECT id,name,description
     FROM seo_tools_categories
     WHERE slug=? AND isDeleted=0
     LIMIT 1`,

        [params.slug]

    );

    if (!catRows.length) return notFound();

    const category = catRows[0];

    /* ===============================
       TOOLS
    ================================= */

    const [tools] = await db.query<RowDataPacket[]>(

        `SELECT name,slug,description,isPaid,price,usageCount
     FROM seo_tools
     WHERE categoryId=? 
     AND isDeleted=0 
     AND isActive=1
     ORDER BY usageCount DESC`,

        [category.id]

    );

    const [featured] = await db.query<RowDataPacket[]>(

        `SELECT name,slug
    FROM seo_tools
    WHERE categoryId=? 
    AND isFeatured=1
    AND isDeleted=0
    LIMIT 6`,

        [category.id]

    );

    const [popular] = await db.query<RowDataPacket[]>(

        `SELECT name,slug
    FROM seo_tools
    WHERE categoryId=? 
    AND isDeleted=0
    ORDER BY usageCount DESC
    LIMIT 6`,

        [category.id]

    );

    const [latest] = await db.query<RowDataPacket[]>(

        `SELECT name,slug
    FROM seo_tools
    WHERE categoryId=? 
    AND isDeleted=0
    ORDER BY createdAt DESC
    LIMIT 6`,

        [category.id]

    );

    const [relatedCategories] = await db.query<RowDataPacket[]>(

        `SELECT name,slug
FROM seo_tools_categories
WHERE id!=?
AND isDeleted=0
LIMIT 6`,

        [category.id]

    );

    /* ===============================
       BREADCRUMB SCHEMA
    ================================= */

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [

            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl
            },

            {
                "@type": "ListItem",
                position: 2,
                name: "SEO Tools",
                item: `${baseUrl}/seotools`
            },

            {
                "@type": "ListItem",
                position: 3,
                name: category.name,
                item: `${baseUrl}/seotools/category/${params.slug}`
            }

        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What are ${category.name} tools?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${category.name} tools help analyze and improve website SEO performance including keywords, technical SEO, and optimization.`
                }
            },
            {
                "@type": "Question",
                name: "Are these SEO tools free?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Many SEO tools are free while some advanced tools may require premium access."
                }
            }
        ]
    };

    const listSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: tools.map((tool: any, index: number) => ({

            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${baseUrl}/seotools/${tool.slug}`

        }))
    };
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(listSchema),
        }}
    />

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            {/* BREADCRUMB */}

            <nav className="text-sm text-gray-600 mb-6">

                <Link href="/">Home</Link> ›{" "}

                <Link href="/seotools">
                    SEO Tools
                </Link> ›{" "}

                <span className="font-semibold">
                    {category.name}
                </span>

            </nav>


            {/* HEADER */}

            <div className="text-center mb-10">

                <h1 className="text-4xl font-bold mb-4">
                    {category.name}
                </h1>

                {category.description && (

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {category.description}
                    </p>

                )}
                {/* CATEGORY INTRO */}

                <div className="mt-5 mb-10">

                    <p className="mb-4">
                        {category.name} tools help website owners, SEO professionals, and marketers analyze
                        and optimize their websites for better search engine rankings. These tools provide
                        valuable insights into website performance, keyword usage, meta tags, technical SEO
                        issues, and overall optimization opportunities.
                    </p>

                    <p className="mb-4">
                        Using the tools in this category, you can easily audit your website, identify SEO
                        errors, and improve your content strategy. Whether you want to analyze keyword density,
                        generate XML sitemaps, check backlinks, or optimize metadata, these tools make the
                        process simple and effective.
                    </p>

                    <p>
                        Our collection of {category.name} tools is designed to help beginners and professionals
                        alike improve their SEO workflow. All tools are easy to use, require no installation,
                        and provide fast results to help you optimize your website efficiently.
                    </p>

                </div>

            </div>

            <div className="max-w-2xl mx-auto mb-10">
                <SeoToolSearch />
            </div>



            {/* TOOL GRID */}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">

                {tools.map((tool: any) => {

                    const isPaid = tool.isPaid == 1;

                    const Card = (

                        <div className={`border rounded-2xl p-6 bg-white transition
                            ${isPaid ? "opacity-80 cursor-not-allowed" : "hover:shadow-lg"}
                            `}>
                            {tool.usageCount > 1000 && (

                                <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded mb-2 inline-block">
                                    🔥 Popular
                                </span>

                            )}

                            <h2 className="text-lg font-semibold mb-2">
                                {tool.name}
                            </h2>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                {tool.description}
                            </p>

                            {isPaid ? (

                                <span className="text-red-600 text-sm">
                                    🔒 Upgrade Required
                                </span>

                            ) : (

                                <span className="text-indigo-600 text-sm">
                                    Open Tool →
                                </span>

                            )}

                        </div>

                    );

                    return isPaid ? (

                        <div key={tool.slug}>
                            {Card}
                        </div>

                    ) : (

                        <Link
                            key={tool.slug}
                            href={`/seotools/${tool.slug}`}
                        >
                            {Card}
                        </Link>

                    );

                })}

            </div>

            <Section title="Featured Tools" tools={featured} />
            <Section title="Most Used Tools" tools={popular} />
            <Section title="Latest Tools" tools={latest} />

            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-6">
                    Explore More SEO Tool Categories
                </h2>

                <div className="flex flex-wrap gap-3">

                    {relatedCategories.map((cat: any) => (

                        <Link
                            key={cat.slug}
                            href={`/seotools/category/${cat.slug}`}
                            className="border px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
                        >
                            {cat.name}
                        </Link>

                    ))}

                </div>

            </div>

            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-6">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-2">
                            What are {category.name} tools?
                        </h3>

                        <p className="text-gray-600 text-sm">
                            {category.name} tools are designed to help analyze and improve different aspects
                            of website SEO performance such as keyword optimization, technical SEO checks,
                            and search engine visibility.
                        </p>

                    </div>

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-2">
                            Are these SEO tools free?
                        </h3>

                        <p className="text-gray-600 text-sm">
                            Many tools in this category are free to use, while some advanced tools may require
                            a premium upgrade for additional features.
                        </p>

                    </div>

                    <div className="border rounded-lg p-4">

                        <h3 className="font-semibold mb-2">
                            Do I need technical knowledge to use these tools?
                        </h3>

                        <p className="text-gray-600 text-sm">
                            No. These SEO tools are designed to be beginner-friendly and can be used by
                            website owners, bloggers, and marketers without technical expertise.
                        </p>

                    </div>

                </div>

            </div>



        </div>

    );

}
/* ===============================
   TOOL LIST SECTION
================================ */

function Section({ title, tools }: any) {

    if (!tools || tools.length === 0) return null;

    return (

        <div className="mb-12">

            <h2 className="text-2xl font-bold mb-4">
                {title}
            </h2>

            <div className="flex flex-wrap gap-3">

                {tools.map((tool: any) => (

                    <Link
                        key={tool.slug}
                        href={`/seotools/${tool.slug}`}
                        className="border px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                    >
                        {tool.name}
                    </Link>

                ))}

            </div>

        </div>

    );

}