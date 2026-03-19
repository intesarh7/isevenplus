import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import db from "@/app/lib/db";
import { ChevronRight, Flame } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";



/* ================================
   🔥 SEO METADATA (DYNAMIC)
================================ */
export async function generateMetadata({ searchParams }: any): Promise<Metadata> {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  let title = "All Calculators & Tools - Free Online SEO & Utility Tools";
  let description =
    "Use our free online calculators and tools including SEO tools, converters, checkers, and utilities.";

  // 🔍 Search based
  if (search) {
    title = `Search "${search}" Tools - Free Calculators & Utilities`;
    description = `Find tools related to "${search}" including calculators, SEO tools, and utilities.`;
  }

  // 📂 Category based
  if (category) {
    title = `${category} Tools & Calculators - Free Online Tools`;
    description = `Explore ${category} tools and calculators for free.`;
  }

  // 📄 Pagination
  if (page > 1) {
    title += ` - Page ${page}`;
  }

  const url = `${baseUrl}/tools${
    page > 1 ? `?page=${page}` : ""
  }${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}/`;

  return {
    title,
    description,
    keywords: [
      "free tools",
      "online calculators",
      "seo tools",
      "web tools",
      "utility tools",
      "free calculator online",
      category,
      search
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "iSevenPlus",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) {

  const resolvedSearchParams = await searchParams;

  const search = resolvedSearchParams?.search?.trim() || "";
  const category = resolvedSearchParams?.category?.trim() || "";

  // 🔥 Get Categories
  const [categories] = await db.query(
    "SELECT id, name FROM tool_categories ORDER BY name ASC"
  );

  // POPULAR TOOLS
  const [popular] = await db.query(
    "SELECT slug, name, icon FROM tools WHERE isActive=1 ORDER BY usageCount DESC LIMIT 25"
  );

  // RECENTLY ADDED
  const [recent] = await db.query(
    "SELECT slug, name FROM tools WHERE isActive=1 ORDER BY createdAt DESC LIMIT 6"
  );

  let query = `
    SELECT tools.*, tools.usageCount, tool_categories.name AS categoryName
    FROM tools
    LEFT JOIN tool_categories 
    ON tools.categoryId = tool_categories.id
    WHERE tools.isActive=1
  `;

  const values: any[] = [];

  // 🔥 Search Filter
  if (search !== "") {
    query += " AND tools.name LIKE ?";
    values.push(`%${search}%`);
  }

  // 🔥 Category Filter (IMPORTANT FIX)
  if (category !== "") {
    query += " AND tools.categoryId = ?";
    values.push(Number(category)); // 👈 convert to number
  }

  //query += " ORDER BY tools.name ASC";
  query += " ORDER BY tools.createdAt DESC";

  const [tools] = await db.query(query, values);

  const groupedTools = (tools as any[]).reduce((acc: any, tool: any) => {
    const category = tool.categoryName || "Other Tools";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(tool);
    return acc;
  }, {});

  return (
    <>

    
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>

        <Link href="/tools" className="hover:underline">
          Tools
        </Link>

        {category && (
          <>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">
              {
                (categories as any[]).find(
                  (c) => c.id === Number(category)
                )?.name
              }
            </span>
          </>
        )}
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-2">
          All Calculators & Tools
        </h1>
      </nav>
      <div className="max-w-7xl mx-auto">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://www.isevenplus.com" },
            { name: "Tools", url: "https://www.isevenplus.com/tools" },
            ...(category
              ? [
                {
                  name:
                    (categories as any[]).find(
                      (c) => c.id === Number(category)
                    )?.name || "",
                  url: `https://www.isevenplus.com/tools?category=${category}`,
                },
              ]
              : []),
          ]}
        />



        {/* TOOL COUNT */}
        <p className="mb-6 text-gray-600 text-right">
          Showing {(tools as any[]).length} tools
        </p>

        <div className="w-full">


          {/* ================= MAIN CONTENT ================= */}
          <main className="w-full">

            <div className="sticky top-20 z-30 border p-4 rounded-xl bg-white shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/90 mb-5">

              <h3 className="font-semibold mb-4">Filter Tools</h3>

              <form className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search..."
                  className="border p-2 rounded"
                />

                <select
                  name="category"
                  defaultValue={category}
                  className="border p-2 rounded"
                >
                  <option value="">All Categories</option>
                  {(categories as any[]).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <button className="bg-blue-600 text-white py-2 rounded">
                  Apply Filter
                </button>

              </form>

            </div>

            {/* 🔥 CATEGORY QUICK NAV */}
            <div className="mb-6 flex flex-wrap gap-2">

              {Object.keys(groupedTools).map((cat) => {
                const slug = `cat-${cat.replace(/\s+/g, "-").toLowerCase()}`;

                return (
                  <a
                    key={cat}
                    href={`#${slug}`}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-full border bg-white hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition"
                  >
                    {cat}
                  </a>
                );
              })}

            </div>


            {/* 🔥 TOOL GRID */}
            {Object.keys(groupedTools).length > 0 ? (

              <div className="space-y-10">

                {Object.entries(groupedTools).map(([categoryName, toolsList]: any) => (

                  <div key={categoryName} id={`cat-${categoryName.replace(/\s+/g, "-").toLowerCase()}`}>

                    {/* CATEGORY HEADER */}
                    <div className="flex items-center justify-between mb-4 px-4 py-3 rounded-xl bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 shadow-sm">

                      <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        {categoryName}
                      </h2>

                      <span className="text-xs md:text-sm bg-white px-3 py-1 rounded-full border text-gray-500">
                        {toolsList.length} tools
                      </span>

                    </div>

                    {/* TOOLS GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                      {toolsList.map((tool: any) => (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.slug}`}
                          className="relative border rounded-xl p-5 hover:shadow-lg transition bg-white"
                        >

                          {/* 🔥 TRENDING BADGE */}
                          {tool.usageCount > 50 && (
                            <div className="absolute top-2 right-2 z-10">
                              <span className="flex items-center gap-1 text-xs bg-orange-500 text-white px-2 py-1 rounded-full shadow">
                                <Flame size={12} /> Trending
                              </span>
                            </div>
                          )}

                          <h3 className="font-semibold text-lg mb-2">
                            {tool.name}
                          </h3>

                          <p className="text-sm text-gray-600 line-clamp-3">
                            {tool.description}
                          </p>

                        </Link>
                      ))}

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-4">🔎</div>

                <h3 className="text-xl font-semibold mb-2">
                  No tools available
                </h3>

                <p className="text-gray-500 mb-4">
                  Tools will appear here once added.
                </p>

                <a
                  href="/tools"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Reset Filters
                </a>
              </div>

            )}

          </main>

        </div>

      </div>
    </>
  );
}