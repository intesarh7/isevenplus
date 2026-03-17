import db from "@/app/lib/db";
import Link from "next/link";
import SeoToolSearch from "@/app/components/SeoToolSearch"
import { RowDataPacket } from "mysql2";
import { CheckCircle, Crown, Flame } from "lucide-react";

export const dynamic = "force-dynamic";

/* ===============================
   METADATA
================================ */

export const metadata = {
  title: "Free SEO Tools – Keyword, Meta, Sitemap & More | iSevenPlus",
  description:
    "Use 50+ powerful free SEO tools like Meta Tag Analyzer, Keyword Density Checker, XML Sitemap Generator, Robots.txt Generator and more to improve your website ranking.",
};



/* ===============================
   PAGE
================================ */

export default async function SeoToolsPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {


  /* ===============================
   CATEGORIES WITH TOOLS
================================ */

  const [categories] = await db.query<RowDataPacket[]>(`

    SELECT 
    c.id as categoryId,
    c.name as categoryName,
    c.slug as categorySlug,
    t.id,
    t.name,
    t.slug,
    t.description,
    t.isPaid,
    t.isFree,
    t.price,
    t.usageCount

    FROM seo_tools_categories c

    LEFT JOIN seo_tools t
    ON t.categoryId = c.id
    AND t.isDeleted = 0
    AND t.isActive = 1

    WHERE c.isDeleted = 0
    AND c.isActive = 1

    ORDER BY c.sortOrder ASC,
    t.usageCount DESC

  `)

  const categoryMap: any = {}

  categories.forEach((row: any) => {

    if (!categoryMap[row.categoryId]) {

      categoryMap[row.categoryId] = {
        id: row.categoryId,
        name: row.categoryName,
        slug: row.categorySlug,
        tools: []
      }

    }

    if (row.id) {
      categoryMap[row.categoryId].tools.push(row)
    }

  })

  const categoryList = Object.values(categoryMap)


  /* ===============================
     MOST USED
  ================================= */

  const [popular] = await db.query<RowDataPacket[]>(

    `SELECT name,slug
     FROM seo_tools
     WHERE isDeleted=0 AND isActive=1
     ORDER BY usageCount DESC
     LIMIT 8`

  );

  /* ===============================
     LATEST
  ================================= */

  const [latest] = await db.query<RowDataPacket[]>(

    `SELECT name,slug
     FROM seo_tools
     WHERE isDeleted=0 AND isActive=1
     ORDER BY createdAt DESC
     LIMIT 8`

  );

  /* ===============================
     FREE TOOLS
  ================================= */

  const [free] = await db.query<RowDataPacket[]>(

    `SELECT name,slug
     FROM seo_tools
     WHERE isDeleted=0 AND isActive=1 AND isPaid=0
     LIMIT 8`

  );

  /* ===============================
     PAID TOOLS
  ================================= */

  const [paid] = await db.query<RowDataPacket[]>(

    `SELECT name,slug
     FROM seo_tools
     WHERE isDeleted=0 AND isActive=1 AND isPaid=1
     LIMIT 8`

  );
const allTools = categoryList.flatMap((c: any) => c.tools);
  /* ===============================
     SCHEMA
  ================================= */

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SEO Tools",
    description:
      "Free SEO tools for keyword research, meta tag analysis and website optimization.",
    itemListElement: [

      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.isevenplus.com"
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "SEO Tools",
        item: "https://www.isevenplus.com/seotools"
      }

    ]
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* BREADCRUMB */}

      <div className="text-sm text-gray-600 mb-4">
        <Link href="/">Home</Link> › SEO Tools
      </div>


      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold mb-4">
          SEO Tools
        </h1>

        <p className="text-gray-600 mx-auto">
          Improve your website ranking using powerful SEO tools.
          Analyze keywords, meta tags, backlinks, sitemap and technical SEO easily.
        </p>

      </div>


      {/* SEARCH */}

      <div className="mb-5 mx-auto">
       <SeoToolSearch tools={allTools} />
      </div>

      {/* 🔥 CATEGORY QUICK NAV */}
      <div className="sticky top-20 z-30 backdrop-blur mb-5 flex flex-wrap gap-2">

        {categoryList.map((cat: any) => (
          <a
            key={cat.id}
            href={`#cat-${cat.slug}`}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-full border bg-white hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition whitespace-nowrap"
          >
            {cat.name}
          </a>
        ))}

      </div>


      {/* TOOL GRID */}

      {/* CATEGORY WISE TOOLS */}
      {
        categoryList.map((cat: any) => (

          <div key={cat.id} id={`cat-${cat.slug}`} className="mb-8 scroll-mt-28">

            <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm">

              <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                {cat.name}
              </h2>

              <span className="text-xs md:text-sm bg-white px-3 py-1 rounded-full border text-gray-500">
                {cat.tools.length} tools
              </span>

            </div>

            {cat.tools.length === 0 ? (

              <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50">

                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Tools Coming Soon
                </div>

                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  We are currently working on adding powerful tools to this category.
                  Stay tuned — new SEO tools will be available here soon.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

                {cat.tools.map((tool: any) => {

                  const isPaid = tool.isPaid == 1;

                  const Card = (

                    <div className={`relative border rounded-2xl p-5 pt-10 bg-white transition overflow-hidden
                      ${isPaid ? "opacity-80 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-1"}
                    `}>

                      {/* 🔥 LEFT BADGE (Trending) */}
                      {tool.usageCount > 50 && (
                        <div className="absolute top-3 left-3">
                          <span className="flex items-center gap-1 text-[11px] font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            <Flame size={12} className="text-orange-500" />
                            Trending
                          </span>
                        </div>
                      )}

                      {/* 💰 RIGHT BADGE (Free/Paid) */}
                      <div className="absolute top-3 right-3">
                        {isPaid ? (
                          <span className="flex items-center gap-1 text-[11px] font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            <Crown size={12} className="text-purple-500" />
                            Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-medium bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            <CheckCircle size={12} className="text-green-500" />
                            Free
                          </span>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="mt-1">

                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                          {tool.name}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {tool.description}
                        </p>

                        <span className="text-indigo-600 text-sm font-medium">
                          Open Tool →
                        </span>

                      </div>

                    </div>

                  );

                  return isPaid ? (
                    <div key={tool.id}>{Card}</div>
                  ) : (
                    <Link key={tool.id} href={`/seotools/${tool.slug}`}>
                      {Card}
                    </Link>
                  );

                })}

              </div>

            )}

          </div>

        ))
      }

      {/* MOST USED */}

      <Section title="Most Used SEO Tools" tools={popular} />

      {/* LATEST */}

      <Section title="Latest SEO Tools" tools={latest} />

      {/* FREE */}

      <Section title="Free SEO Tools" tools={free} />

      {/* PAID */}

      <Section title="Paid SEO Tools" tools={paid} />



    </div>

  );

}


/* ===============================
   TOOL LIST SECTION
================================ */

function Section({ title, tools }: any) {

  if (!tools.length) return null;

  return (

    <div className="mb-14">

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