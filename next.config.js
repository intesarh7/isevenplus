/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/sitemap-india-:page.xml",
        destination: "/sitemap-india/:page",
      },
      {
        source: "/sitemap-world-:page.xml",
        destination: "/sitemap-world-index/:page",
      },
    ];
  },
};