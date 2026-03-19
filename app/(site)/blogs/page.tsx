import db from "@/app/lib/db";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


/* ================================
   SEO METADATA (DYNAMIC)
================================ */
export async function generateMetadata({ searchParams }: any): Promise<Metadata> {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.isevenplus.com";

  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  let title = "Blog - Latest Articles, Guides & Tips";
  let description = "Read latest blogs, guides, SEO tips, and tutorials.";

  if (search) {
    title = `Search results for "${search}" - Blog`;
    description = `Explore blog results for "${search}".`;
  }

  if (page > 1) {
    title += ` - Page ${page}`;
  }

  const url = `${baseUrl}/blogs${page > 1 ? `?page=${page}` : ""}${search ? `&search=${search}` : ""}/`;

  return {
    title,
    description,
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


export default async function BlogPage({ searchParams }: any) {
  const page = Number(searchParams.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  const search = searchParams.search || "";

  const [blogs]: any = await db.query(
    `
SELECT 
blogs.id,
blogs.title,
blogs.slug,
blogs.excerpt,
blogs.featuredImage,
blogs.createdAt,
blog_categories.name AS categoryName
FROM blogs
LEFT JOIN blog_categories
ON blogs.categoryId = blog_categories.id
WHERE blogs.status='published'
AND blogs.deletedAt IS NULL
AND blogs.title LIKE ?
ORDER BY blogs.createdAt DESC
LIMIT ? OFFSET ?
`,
    [`%${search}%`, limit, offset]
  );

  const [[count]]: any = await db.query(
    `
    SELECT COUNT(*) as total
    FROM blogs
    WHERE status='published'
    AND deletedAt IS NULL
    AND title LIKE ?
`,
    [`%${search}%`]
  );

  const totalPages = Math.ceil(count.total / limit);

  return (

    <div className="max-w-6xl mx-auto py-10">
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">
          Latest Blog Articles
        </h1>

        <p className="text-gray-600 max-w-2xl">
          Explore helpful guides, tutorials and tools to make everyday tasks easier.
        </p>

      </div>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">

        <p className="text-sm text-gray-500">
          {count.total} Articles
        </p>

        <form>

          <input
            name="search"
            defaultValue={search}
            placeholder="Search blog..."
            className="border rounded-lg px-4 py-2 text-sm w-60"
          />

        </form>

      </div>
      <h1 className="text-3xl font-bold mb-8">
        Blog
      </h1>


      {/* Featured Blog */}

      {blogs[0] && (

        <Link
          href={`/blogs/${blogs[0].slug}`}
          className="block mb-12 rounded-xl overflow-hidden border hover:shadow-xl transition"
        >

          <Image
            src={blogs[0].featuredImage}
            alt={blogs.title}
            width={500}
            height={300}
            className="w-full h-80 object-cover object-top"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 line-clamp-2">
              {blogs[0].title}
            </h2>
            <span className="text-xs text-indigo-600 font-medium">
              {blogs.categoryName}
            </span>
            <p className="text-gray-600 line-clamp-3">
              {blogs[0].excerpt}
            </p>
            <span className="inline-block mt-4 text-indigo-600 font-medium">
              Read Full Article →
            </span>
          </div>
        </Link>

      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {blogs.map((blog: any) => (

          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group border rounded-xl overflow-hidden bg-white hover:shadow-xl transition"
          >

            <img
              src={blog.featuredImage}
              className="w-full h-48 object-cover object-top group-hover:scale-105 transition"
            />

            <div className="p-5">

              {/* Date */}

              <p className="text-xs text-gray-400 mb-2">

                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}

              </p>
              <span className="text-xs text-indigo-600 font-medium">
                {blogs[0].categoryName}
              </span>

              {/* Title */}

              <h2 className="font-semibold text-lg line-clamp-1 group-hover:text-indigo-600">

                {blog.title}

              </h2>

              {/* Excerpt */}

              <p className="text-gray-500 text-sm mt-2 line-clamp-4">

                {blog.excerpt}

              </p>

              {/* Read More */}

              <span className="inline-block mt-4 text-indigo-600 text-sm font-medium">

                Read Article →

              </span>

            </div>

          </Link>

        ))}

      </div>

      <div className="flex justify-center mt-12 gap-2 flex-wrap">
        {page > 1 && (
          <Link
            href={`?page=${page - 1}&search=${search}`}
            className="px-4 py-2 border rounded"
          >
            Prev
          </Link>
        )}
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <Link
              key={p}
              href={`?page=${p}&search=${search}`}
              className={`px-4 py-2 border rounded ${p === page ? "bg-indigo-600 text-white" : ""
                }`}
            >
              {p}
            </Link>
          )
        })}
        {page < totalPages && (
          <Link
            href={`?page=${page + 1}&search=${search}`}
            className="px-4 py-2 border rounded"
          >
            Next
          </Link>
        )}
      </div>

    </div>
  );
}