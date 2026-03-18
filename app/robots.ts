const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
  "https://www.isevenplus.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
  };
}