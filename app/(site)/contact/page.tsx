import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.isevenplus.com"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contact Us – iSevenPlus",
  description:
    "Get in touch with iSevenPlus for support, feedback, partnership, or inquiries related to calculators, pincode search, postal code data, and SEO tools.",
  alternates: {
    canonical: `${BASE_URL}/contact/`,
  },
  openGraph: {
    title: "Contact iSevenPlus",
    description:
      "Contact iSevenPlus for support, feedback or business inquiries.",
    url: `${BASE_URL}/contact`,
    siteName: "iSevenPlus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact iSevenPlus",
    description:
      "Reach out to iSevenPlus support team.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact iSevenPlus",
            url: `${BASE_URL}/contact`,
            mainEntity: {
              "@type": "Organization",
              name: "iSevenPlus",
              url: BASE_URL,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                areaServed: "Worldwide",
                availableLanguage: ["English"],
              },
            },
          }),
        }}
      />

      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions, suggestions, or partnership inquiries?
          We’d love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Send Us a Message
          </h2>

          <form
            action="/api/contact"
            method="POST"
            className="space-y-6"
          >

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">

          <div className="bg-indigo-50 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-4">
              Support & Feedback
            </h3>
            <p className="text-gray-700 leading-relaxed">
              For support related to calculators, pincode search,
              worldwide postal codes, or SEO tools,
              please use the contact form.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-xl font-semibold mb-4">
              Business & Partnerships
            </h3>
            <p className="text-gray-700 leading-relaxed">
              For advertising, partnerships, or collaboration inquiries,
              reach out through the form and our team will respond promptly.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}