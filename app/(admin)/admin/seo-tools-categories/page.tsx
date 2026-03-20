import db from "@/app/lib/db";
export const dynamic = "force-dynamic";

export default async function SeoToolsCategoryPage() {

  const [rows]: any = await db.query(
    "SELECT * FROM seo_tools_categories WHERE isDeleted=0 ORDER BY sortOrder ASC"
  );

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          SEO Tools Categories
        </h1>

        <a
          href="/admin/seo-tools-categories/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </a>

      </div>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Icon</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Sort</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {rows.map((cat: any) => (

            <tr key={cat.id} className="border-t">

              <td className="p-2">
                {cat.icon && (
                  <img
                    src={cat.icon}
                    className="w-10 h-10"
                  />
                )}
              </td>

              <td>{cat.name}</td>

              <td>{cat.slug}</td>

              <td>{cat.sortOrder}</td>

              <td>
                {cat.isActive ? "Active" : "Disabled"}
              </td>

              <td className="space-x-2">

                <a
                  href={`/admin/seo-tools-categories/edit/${cat.id}`}
                  className="text-blue-600"
                >
                  Edit
                </a>

                <button
                  className="text-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}