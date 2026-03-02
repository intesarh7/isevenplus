import type { Metadata } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://isevenplus.com"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "About Us – iSevenPlus | Smart Calculators, Pincode & SEO Tools",
  description:
    "Learn about iSevenPlus – a powerful platform offering smart online calculators, Indian pincode search, worldwide postal codes lookup, and professional SEO tools.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About iSevenPlus – Smart Tools & Pincode Finder",
    description:
      "Discover iSevenPlus – your trusted source for calculators, Indian pincodes, world postal codes and SEO tools.",
    url: `${BASE_URL}/about`,
    siteName: "iSevenPlus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About iSevenPlus",
    description:
      "Smart online calculators, pincode finder and SEO tools platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "iSevenPlus",
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            sameAs: [],
          }),
        }}
      />

      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About iSevenPlus
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          iSevenPlus is a smart online platform providing advanced calculators,
          Indian pincode search, worldwide postal code lookup, and powerful SEO tools —
          all in one place.
        </p>
      </div>

      {/* Section 1 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to simplify everyday calculations and data searches.
          Whether you need financial planning tools, educational calculators,
          health calculators, marketing calculators, or location-based postal information —
          iSevenPlus helps you get instant and accurate results.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We focus on speed, accuracy, user experience, and SEO-friendly structure,
          ensuring users find exactly what they need quickly.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Smart Online Calculators
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We provide hundreds of professional calculators including finance,
              EMI, SIP, GST, income tax, health calculators, education tools,
              marketing ROI calculators, eCommerce profit calculators, and more.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Indian Pincode Search
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Instantly search Indian pincodes by district, state, or office name.
              Perfect for courier services, eCommerce businesses, and address verification.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Worldwide Postal Codes
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Access global postal code data including country codes, state
              details, and city information to support international shipping
              and business operations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Professional SEO Tools
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our SEO tools help bloggers, marketers, and businesses analyze,
              optimize, and improve their search engine rankings effectively.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-16 bg-indigo-50 p-10 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6">
          Why Choose iSevenPlus?
        </h2>

        <ul className="space-y-4 text-gray-700 leading-relaxed list-disc list-inside">
          <li>Fast and accurate calculation engine</li>
          <li>Mobile-friendly and responsive design</li>
          <li>SEO optimized structure</li>
          <li>Secure and reliable platform</li>
          <li>Regular updates and new tools addition</li>
        </ul>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Empowering Smarter Decisions
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          iSevenPlus continues to grow with new tools, improved data accuracy,
          and enhanced user experience. Our goal is to become a complete
          digital utility hub for users worldwide.
        </p>
      </section>

    </main>
  );
}