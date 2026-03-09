import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

/* =========================
   Utility Functions
========================= */

function readingTime(html: string = "") {

  const text = html.replace(/<[^>]+>/g, "");

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  return Math.ceil(words / 200) || 1;
}

function generateTOC(html: string = "") {

  if (!html) return [];

  const regex = /<h2.*?>(.*?)<\/h2>/g;

  const matches = [...html.matchAll(regex)];

  return matches.map((m, i) => ({
    id: `section-${i + 1}`,
    title: m[1].replace(/<[^>]+>/g, "")
  }));
}

function extractFAQs(html: string = "") {

  if (!html) return [];

  const regex = /<div class="faq-item">([\s\S]*?)<\/div>/g;

  const matches = [...html.matchAll(regex)];

  const faqs: any[] = [];

  matches.forEach((m) => {

    const q = m[1]?.match(/<h3>(.*?)<\/h3>/)?.[1];
    const a = m[1]?.match(/<p>(.*?)<\/p>/)?.[1];

    if (q && a) {
      faqs.push({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a
        }
      });
    }

  });

  return faqs;
}

/* =========================
   SEO Metadata
========================= */

export async function generateMetadata({ params }: any) {

  const [rows]: any = await db.query(
    `
    SELECT title, slug, metaTitle, metaDescription, featuredImage
    FROM blogs
    WHERE slug=?
    AND status='published'
    AND deletedAt IS NULL
    `,
    [params.slug]
  );

  if (!rows.length) return {};

  const blog = rows[0] || null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || "";

  const url = `${baseUrl}/blog/${blog.slug}`;

  const image = blog.featuredImage
    ? `${baseUrl}${blog.featuredImage}`
    : `${baseUrl}/default-blog.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "iSevenPlus",
      images: [{ url: image, width: 1200, height: 630 }],
      type: "article"
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

function addHeadingAnchors(html: string) {

  let index = 0;

  return html.replace(
    /<h2(.*?)>(.*?)<\/h2>/g,
    (match, attrs, title) => {

      index++;

      const id = `section-${index}`;

      return `<h2 id="${id}" ${attrs}>${title}</h2>`;
    }
  );

}

/* =========================
   Blog Page
========================= */

export default async function BlogDetail({ params }: { params: { slug: string } }) {

  const slug = params?.slug;

  if (!slug) {
    return notFound();
  }

  const [rows]: any = await db.query(
`
SELECT 
blogs.*,
admins.name AS authorName,
blog_categories.name AS categoryName
FROM blogs
LEFT JOIN admins
ON blogs.adminId = admins.id
LEFT JOIN blog_categories
ON blogs.categoryId = blog_categories.id
WHERE blogs.slug=?
AND blogs.status='published'
AND blogs.deletedAt IS NULL
`,
[slug]
);
  if (!rows.length) return notFound();

  const blog = rows[0];
console.log("BLOG DATA:", blog);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

  const blogUrl = `${baseUrl}/blog/${blog.slug}`;

  const image = blog.featuredImage
    ? `${baseUrl}${blog.featuredImage}`
    : `${baseUrl}/default-blog.jpg`;

const content = blog.content || "";

const processedContent = addHeadingAnchors(content);
const readTime = readingTime(content);

  const toc = generateTOC(processedContent);

  const faqItems = extractFAQs(content);

  const faqSchema = faqItems.length
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems
    }
    : null;

  /* =========================
     Related Posts
  ========================= */

  const [related]: any = await db.query(
    `
SELECT title, slug
FROM blogs
WHERE status='published'
AND deletedAt IS NULL
AND slug != ?
ORDER BY createdAt DESC
LIMIT 4
`,
    [blog.slug]
  );

  /* =========================
     Article Schema
  ========================= */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription,
    image: image,
    author: {
      "@type": "Person",
      name: blog.authorName || "iSevenPlus"
    },
    publisher: {
      "@type": "Organization",
      name: "iSevenPlus",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`
      }
    },
    mainEntityOfPage: blogUrl,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt
  };

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
        name: "Blog",
        item: `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: blogUrl
      }
    ]
  };


if (!blog) {
  return <div>No Blog Found</div>;
}
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">

      {/* JSON-LD Schema */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
          
        />
      )}

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span className="mx-2">/</span>

        <Link href="/blogs" className="hover:text-indigo-600">Blog</Link>
        <span className="mx-2">/</span>

        <span className="text-gray-700">{blog.title}</span>
      </nav>

      {blog.categoryName && (
        <span className="inline-block mb-3 px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
          {blog.categoryName}
        </span>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight mb-4">
        {blog.title}
      </h1>

      {/* Meta */}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">

        <span>
          Published on{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </span>

        <span>•</span>
        <span>{readTime} min read</span>
        <span>
          Updated {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </span>
        <span>•</span>
        <span>by {blog.authorName || "iSevenPlus"}</span>
      </div>

      {/* Featured Image */}

      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full rounded-xl mb-10 shadow h-96 object-cover object-top"
          loading="lazy"
        />
      )}
      <div className="flex gap-3 mb-10">

        <a
          href={`https://twitter.com/intent/tweet?url=${blogUrl}`}
          target="_blank"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Twitter
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Facebook
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=${blogUrl}`}
          target="_blank"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          WhatsApp
        </a>

      </div>

      {/* Table of Contents */}

      {toc.length > 0 && (
        <div className="bg-gray-50 border p-6 rounded-xl mb-10">

          <h2 className="font-semibold mb-3">
            Table of Contents
          </h2>

          <ul className="space-y-2 text-sm">
            {toc.map((t: any) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Content */}

      <div
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: processedContent || "" }}
      />

      <div className="mt-16 border rounded-xl p-6 bg-gray-50">

        <h3 className="font-semibold text-lg mb-2">
          About the Author
        </h3>

        <p className="text-gray-600">
          Written by <strong>{blog.authorName || "iSevenPlus Team"}</strong>.
          We publish helpful guides, tools, and tutorials to make online tasks easier.
        </p>

      </div>

      <div className="mt-12 bg-indigo-50 border border-indigo-100 p-6 rounded-xl">

        <h3 className="text-lg font-semibold mb-2">
          Get More Useful Guides
        </h3>

        <p className="text-gray-600 mb-4">
          Bookmark iSevenPlus for more helpful tools and tutorials.
        </p>

        <Link
          href="/tools"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Explore Tools
        </Link>

      </div>

      {/* Related Posts */}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Related Posts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r: any) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="block border rounded-lg p-4 hover:shadow"
              >
                <h3 className="font-semibold">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex justify-between text-sm">

        <Link
          href="/blogs"
          className="text-indigo-600 hover:underline"
        >
          ← Back to Blog
        </Link>

        <Link
          href="/tools"
          className="text-indigo-600 hover:underline"
        >
          Explore Tools →
        </Link>

      </div>

    </article>
  );
}