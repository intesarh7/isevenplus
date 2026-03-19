import db from "@/app/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [catRows] = await db.query(
    "SELECT * FROM tool_categories WHERE slug=?",
    [slug]
  );

  const category = (catRows as any[])[0];
  if (!category) return notFound();

  const [tools] = await db.query(
    "SELECT * FROM tools WHERE categoryId=? AND isActive=1 ORDER BY name ASC",
    [category.id]
  );

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        {category.name} Tools
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {(tools as any[]).map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="border rounded-xl p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              {tool.icon && (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-8 h-8"
                />
              )}
              <h2 className="font-semibold text-lg">
                {tool.name}
              </h2>
            </div>

            <p className="text-sm text-gray-600">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}