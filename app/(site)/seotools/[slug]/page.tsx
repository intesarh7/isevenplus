import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { seoToolComponents } from "@/app/components/seotools";
import { autoLink } from "@/app/lib/seoAutoLinks";

export const dynamic = "force-dynamic";

/* ===============================
   METADATA
================================ */
export async function generateMetadata({ params }: any) {

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT name,meta_title,meta_description 
     FROM seo_tools 
     WHERE slug=? AND isDeleted=0 LIMIT 1`,
    [params.slug]
  );

  if (!rows.length) return {};

  const tool = rows[0];

  return {
    title: tool.meta_title || tool.name + " | iSevenPlus SEO Tool",
    description:
      tool.meta_description ||
      `Use the ${tool.name} tool to analyze and optimize your website SEO.`,
    alternates: {
      canonical: `https://www.isevenplus.com/seotools/${params.slug}/`,
    },
  };
}

/* ===============================
   PAGE
================================ */
export default async function SeoToolPage({
  params,
}: {
  params: { slug: string };
}) {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  /* ===============================
     TOOL DATA
  ================================= */

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT 
t.*,
c.name as categoryName,
c.slug as categorySlug

FROM seo_tools t

LEFT JOIN seo_tools_categories c
ON t.categoryId = c.id

WHERE t.slug=? 
AND t.isDeleted=0 
LIMIT 1`,
    [params.slug]
  );

  if (!rows.length) return notFound();

  const tool = rows[0];

  /* ===============================
     UPDATE USAGE COUNT
  ================================= */

  await db.query(
    `UPDATE seo_tools 
     SET usageCount = usageCount + 1 
     WHERE id=?`,
    [tool.id]
  );

  /* ===============================
     RELATED TOOLS
  ================================= */

  const [relatedTools] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
FROM seo_tools
WHERE categoryId=? 
AND id!=?
AND isDeleted=0
AND isActive=1
ORDER BY usageCount DESC
LIMIT 6`,
    [tool.categoryId, tool.id]
  );

  /* ===============================
     MOST USED
  ================================= */

  const [mostUsed] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
     FROM seo_tools
     WHERE isDeleted=0
     ORDER BY usageCount DESC
     LIMIT 6`
  );

  /* ===============================
     LATEST
  ================================= */

  const [latest] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
     FROM seo_tools
     WHERE isDeleted=0
     ORDER BY createdAt DESC
     LIMIT 6`
  );

  /* ===============================
     FEATURED
  ================================= */

  const [featured] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
     FROM seo_tools
     WHERE isDeleted=0 AND isFeatured=1
     LIMIT 6`
  );

  /* ===============================
     PAID
  ================================= */

  const [paid] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
     FROM seo_tools
     WHERE isDeleted=0 AND isPaid=1
     LIMIT 6`
  );

  /* ===============================
     FREE
  ================================= */

  const [free] = await db.query<RowDataPacket[]>(
    `SELECT name,slug 
     FROM seo_tools
     WHERE isDeleted=0 AND isPaid=0
     LIMIT 6`
  );

  const [relatedCategories] = await db.query<RowDataPacket[]>(

    `SELECT DISTINCT c.name,c.slug
FROM seo_tools_categories c
LEFT JOIN seo_tools t ON t.categoryId = c.id
WHERE c.id != ?
AND c.isDeleted=0
AND c.isActive=1
LIMIT 6`,

    [tool.categoryId]

  )

  const [exploreTools] = await db.query<RowDataPacket[]>(

    `SELECT name,slug
FROM seo_tools
WHERE isDeleted=0
AND isActive=1
ORDER BY usageCount DESC
LIMIT 10`

  )

  /* ===============================
     LOAD TOOL COMPONENT
  ================================= */

  const ToolComponent = seoToolComponents[tool.slug];

  /* ===============================
     SCHEMA
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
        name: tool.categoryName,
        item: `${baseUrl}/seotools/category/${tool.categorySlug}`
      },

      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `${baseUrl}/seotools/${tool.slug}`
      }

    ]
  }

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "SEOApplication",
    operatingSystem: "All",
    url: `${baseUrl}/seotools/${tool.slug}`,
    isAccessibleForFree: tool.isPaid ? false : true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "128"
    }
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: relatedTools.map((t: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${baseUrl}/seotools/${t.slug}`
    }))
  }

  return (


    <div className="max-w-6xl mx-auto py-10">

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* BREADCRUMB */}

      <nav className="text-sm text-gray-600 mb-6">

        <Link href="/">Home</Link> ›{" "}

        <Link href="/seotools">
          SEO Tools
        </Link> ›{" "}

        <Link href={`/seotools/category/${tool.categorySlug}`}>
          {tool.categoryName}
        </Link> ›{" "}

        <span className="font-semibold">
          {tool.name}
        </span>

      </nav>

      {/* HEADER */}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>

        {tool.description && (
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: await autoLink(tool.description)
            }}
          />
        )}
      </div>

      {/* TOOL */}

      <div className="bg-white rounded-2xl shadow p-4 mb-12">
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <p className="text-center text-gray-500">
            Tool component not found.
          </p>
        )}
      </div>

      {/* TOOL INFO */}

      <div className="text-center text-sm text-gray-400 mb-10">
        Used {tool.usageCount} times
      </div>

      {/* TOOL LIST SECTIONS */}

      <div className="mt-16 mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Explore More SEO Tool Categories
        </h2>

        {relatedCategories && relatedCategories.length > 0 ? (

          <div className="flex flex-wrap gap-3">

            {relatedCategories.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/seotools/category/${cat.slug}`}
                className="border px-3 py-2 rounded hover:bg-gray-100 text-sm"
              >
                {cat.name}
              </Link>
            ))}

          </div>

        ) : (

          <div className="border border-dashed rounded-lg p-6 text-center text-gray-500 bg-gray-50">

            <p className="mb-2 font-medium">
              More SEO tool categories are coming soon.
            </p>

            <p className="text-sm">
              In the meantime, explore our complete collection of{" "}
              <Link
                href="/seotools"
                className="text-indigo-600 underline"
              >
                SEO tools
              </Link>{" "}
              to improve your website performance.
            </p>

          </div>

        )}

      </div>

      <Section title="Related SEO Tools" tools={relatedTools} />
      <Section title="Most Used SEO Tools" tools={mostUsed} />
      <Section title="Latest SEO Tools" tools={latest} />
      <Section title="Featured SEO Tools" tools={featured} />
      <Section title="Free SEO Tools" tools={free} />
      <Section title="Paid SEO Tools" tools={paid} />
      <Section title="Explore More SEO Tools" tools={exploreTools} />

      <div className="mt-10 text-center text-sm text-gray-600">

        Explore more powerful tools in the{" "}
        <Link
          href={`/seotools/category/${tool.categorySlug}`}
          className="text-indigo-600 underline"
        >
          {tool.categoryName}
        </Link>{" "}
        category.

      </div>

    </div>
  );
}

/* ===============================
   TOOL LIST COMPONENT
================================ */

function Section({ title, tools }: any) {

  if (!tools.length) return null;

  return (
    <div className="mb-12">

      <h2 className="text-2xl font-bold mb-4">{title}</h2>


      <div className="flex flex-wrap gap-3">

        {tools.map((tool: any) => (
          <Link
            key={tool.slug}
            href={`/seotools/${tool.slug}`}
            className="border px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
          >

            {tool.name}
            {tool.usageCount > 10 && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded mr-2">
                🔥
              </span>
            )}
          </Link>
        ))}

      </div>

    </div>
  );
}