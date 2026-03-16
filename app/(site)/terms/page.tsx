import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.isevenplus.com"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Terms & Conditions – iSevenPlus",
  description:
    "Read the Terms & Conditions of iSevenPlus governing the use of our online calculators, Indian pincode finder, worldwide postal code search and SEO tools.",
  alternates: {
    canonical: `${BASE_URL}/terms-and-conditions/`,
  },
  openGraph: {
    title: "Terms & Conditions – iSevenPlus",
    description:
      "Understand the rules and guidelines for using iSevenPlus calculators, postal code finder and SEO tools.",
    url: `${BASE_URL}/terms-and-conditions`,
    siteName: "iSevenPlus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions – iSevenPlus",
    description:
      "Official terms governing the use of iSevenPlus tools and services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <header className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-600">
          Last Updated: {new Date().getFullYear()}
        </p>
      </header>

      <section className="space-y-10 text-gray-700 leading-relaxed">

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using iSevenPlus, you agree to comply with these
            Terms & Conditions. If you do not agree, please discontinue use
            of our calculators, pincode search tools, and SEO services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            2. Use of Our Services
          </h2>
          <p>
            iSevenPlus provides online calculators, Indian pincode search,
            worldwide postal code lookup, and SEO tools for informational purposes.
            Users agree not to misuse the platform, attempt unauthorized access,
            or disrupt service functionality.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            3. Accuracy of Information
          </h2>
          <p>
            While we strive for accuracy, iSevenPlus does not guarantee that
            all calculations or postal data are error-free. Users are advised
            to verify critical financial or business decisions independently.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            4. Intellectual Property
          </h2>
          <p>
            All content, design, code, branding, and tools on iSevenPlus
            are the intellectual property of iSevenPlus. Unauthorized copying,
            redistribution, or reproduction is strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            5. Third-Party Links & Ads
          </h2>
          <p>
            Our platform may display advertisements and third-party links,
            including Google AdSense. We are not responsible for the content
            or policies of external websites.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            iSevenPlus shall not be held liable for any direct or indirect
            damages resulting from the use or inability to use our services.
            All tools are provided "as is" without warranties of any kind.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            7. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate access to our
            services without prior notice if users violate these terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            8. Changes to Terms
          </h2>
          <p>
            iSevenPlus may update these Terms & Conditions at any time.
            Continued use of the platform after updates indicates acceptance
            of the revised terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            9. Governing Law
          </h2>
          <p>
            These Terms & Conditions shall be governed in accordance with
            applicable laws. Any disputes shall be subject to local jurisdiction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            10. Contact Information
          </h2>
          <p>
            For any questions regarding these Terms & Conditions,
            please visit our Contact page.
          </p>
        </div>

      </section>

    </main>
  );
}