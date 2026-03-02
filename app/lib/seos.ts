import { Metadata } from "next";

export function generateToolSEO({
  name,
  slug,
  description,
  category,
}: {
  name: string;
  slug: string;
  description: string;
  category: string;
}): Metadata {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const title = `${name} – Free Online ${category} Tool | iSevenPlus`;
  const url = `${baseUrl}/tools/${slug}`;

  const keywords = generateKeywords(name, category);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "iSevenPlus",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


// 🔥 AUTO LONG TAIL KEYWORDS
function generateKeywords(name: string, category: string) {
  const base = name.toLowerCase();

  return [
    base,
    `free ${base}`,
    `${base} online`,
    `${base} calculator`,
    `${base} India`,
    `${base} 2025`,
    `${base} formula`,
    `how to calculate ${base}`,
    `${base} tool`,
    `best ${base}`,
    `${base} for students`,
    `${base} for business`,
    `${base} for professionals`,
    `${category} calculator`,
    `${category} tools online`,
  ];
}