export async function GET() {
  const sitemaps = [
    "https://www.isevenplus.com/sitemap.xml",
    "https://www.isevenplus.com/sitemap-world-index.xml",
  ];

  try {
    await Promise.all(
      sitemaps.map((sitemapUrl) =>
        fetch(
          `https://www.google.com/ping?sitemap=${encodeURIComponent(
            sitemapUrl
          )}`
        )
      )
    );

    return new Response("All sitemaps pinged successfully ✅", {
      status: 200,
    });
  } catch (error) {
    return new Response("Ping Failed ❌", { status: 500 });
  }
}