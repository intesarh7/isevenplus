import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://isevenplus.com"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Privacy Policy – iSevenPlus",
  description:
    "Read the Privacy Policy of iSevenPlus to understand how we collect, use, and protect your data while using our calculators, pincode finder, and SEO tools.",
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy – iSevenPlus",
    description:
      "Learn how iSevenPlus protects your privacy while using our calculators, postal code search and SEO tools.",
    url: `${BASE_URL}/privacy-policy`,
    siteName: "iSevenPlus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy – iSevenPlus",
    description:
      "Understand how your data is handled on iSevenPlus.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "iSevenPlus",
            url: BASE_URL,
          }),
        }}
      />

      <header className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          Last Updated: {new Date().getFullYear()}
        </p>
      </header>

      <section className="space-y-10 text-gray-700 leading-relaxed">

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            1. Introduction
          </h2>
          <p>
            Welcome to iSevenPlus. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, and safeguard your information
            when you use our calculators, Indian pincode finder, worldwide postal code search,
            and SEO tools.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            2. Information We Collect
          </h2>
          <p>
            iSevenPlus does not require account registration to use most tools.
            However, we may collect:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Anonymous usage data for analytics</li>
            <li>Device and browser information</li>
            <li>Cookies for performance and ad optimization</li>
            <li>Information submitted via contact forms</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            3. How We Use Information
          </h2>
          <p>
            We use collected information to:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Improve tool accuracy and performance</li>
            <li>Analyze user behavior for better experience</li>
            <li>Optimize ads and monetization performance</li>
            <li>Enhance security and prevent misuse</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            4. Cookies Policy
          </h2>
          <p>
            iSevenPlus uses cookies to improve performance, analyze traffic,
            and deliver relevant advertisements. You can disable cookies in
            your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            5. Third-Party Services
          </h2>
          <p>
            We may use third-party services such as analytics providers and advertising
            partners (including Google AdSense). These services may collect information
            in accordance with their own privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            6. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect
            your information. However, no digital transmission or storage
            system can guarantee 100% security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            7. Children's Privacy
          </h2>
          <p>
            Our services are not directed toward children under 13.
            We do not knowingly collect personal data from children.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically.
            Changes will be reflected with an updated date at the top of this page.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy,
            please contact us through our Contact page.
          </p>
        </div>

      </section>

    </main>
  );
}