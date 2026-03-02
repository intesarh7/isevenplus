import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import db from "@/app/lib/db";
import Link from "next/link";

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
    "SELECT slug, name, icon FROM tools WHERE isActive=1 ORDER BY usageCount DESC LIMIT 12"
  );

  // RECENTLY ADDED
  const [recent] = await db.query(
    "SELECT slug, name FROM tools WHERE isActive=1 ORDER BY createdAt DESC LIMIT 6"
  );

  let query = `
    SELECT tools.*, tool_categories.name AS categoryName
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://isevenplus.com" },
          { name: "Tools", url: "https://isevenplus.com/tools" },
          ...(category
            ? [
              {
                name:
                  (categories as any[]).find(
                    (c) => c.id === Number(category)
                  )?.name || "",
                url: `https://isevenplus.com/tools?category=${category}`,
              },
            ]
            : []),
        ]}
      />
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
        <h1 className="text-3xl font-bold mb-8">
          All Calculators & Tools
        </h1>
      </nav>


      {/* TOOL COUNT */}
      <p className="mb-6 text-gray-600 text-right">
        Showing {(tools as any[]).length} tools
      </p>

      <div className="md:flex gap-8">

        {/* ================= SIDEBAR ================= */}
        <aside className="md:w-1/4 mb-8 md:mb-0">

          <div className="sticky top-24 border p-4 rounded bg-white shadow-sm">

            <h3 className="font-semibold mb-4">Filter Tools</h3>

            <form className="flex flex-col gap-4">

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

          {/* 🔥 POPULAR TOOLS */}
          {(popular as any[]).length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-6">
                🔥 Popular Tools
              </h2>

              <div className="grid md:grid-cols-1 gap-4 mb-10">
                {(popular as any[]).map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="border p-2 rounded hover:bg-gray-50 transition"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </>
          )}

        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="md:w-3/4">

          {/* 🔥 TOOL GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {(tools as any[]).length > 0 ? (

              (tools as any[]).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="border rounded-xl p-5 hover:shadow-lg transition"
                >
                  <h2 className="font-semibold text-lg mb-2">
                    {tool.name}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    {tool.categoryName}
                  </div>
                </Link>
              ))

            ) : (

              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">

                <div className="text-5xl mb-4">🔎</div>

                {search !== "" ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      No tools found for "{search}"
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try different keywords or remove filters.
                    </p>
                  </>
                ) : category !== "" ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      No tools available in this category
                    </h3>
                    <p className="text-gray-500 mb-4">
                      This category is currently empty.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      No tools available
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Tools will appear here once added.
                    </p>
                  </>
                )}

                <a
                  href="/tools"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Reset Filters
                </a>

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}