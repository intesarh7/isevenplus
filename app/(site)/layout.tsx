import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AdSlot from "@/app/components/AdSlot";
import Script from "next/script";

const isProd = process.env.NODE_ENV === "production";

const BASE_URL = isProd
  ? "https://isevenplus.com"
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  alternates: {
    canonical: "/",
  },

  title: {
    default: "iSevenPlus - Smart Online Tools & Pincode Finder",
    template: "%s | iSevenPlus",
  },

  description:
    "Find Indian pincodes, world postal codes, smart calculators and SEO tools on iSevenPlus.",

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "iSevenPlus",
    title: "iSevenPlus - Smart Online Tools & Pincode Finder",
    description:
      "Find Indian pincodes, world postal codes, smart calculators and SEO tools.",
  },

  twitter: {
    card: "summary_large_image",
    title: "iSevenPlus - Smart Online Tools & Pincode Finder",
    description:
      "Find Indian pincodes, world postal codes and online tools.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ================= SEO PERFORMANCE ================= */}

      {/* Preconnect for faster ads */}
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      <link rel="preconnect" href="https://googleads.g.doubleclick.net" />

      {/* Adsense Global Script */}
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
        crossOrigin="anonymous"
      />

      {/* Organization Schema */}
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "iSevenPlus",
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
          }),
        }}
      />

      {/* ================= HEADER ================= */}

      <Navbar />

      {/* Header Top Ad (Leaderboard) */}
      <div className="container mx-auto px-4 py-3 mt-8">
        <AdSlot location="header_top" />
      </div>

      {/* ================= MAIN ================= */}

      <main className="min-h-screen w-full">
        <div className="container mx-auto px-4 md:flex gap-8">

          {/* Main Content */}
          <div className="md:w-3/3">
            {children}

            {/* Bottom Content Ad */}

            <AdSlot location="bottom_content" />

          </div>

          {/* Sidebar Ads (Desktop Only) */}
          <aside className="md:w-1/4 hidden md:block border">
            <div className="sticky top-24 space-y-6">
              <AdSlot location="sidebar_top" />
              <AdSlot location="sidebar_bottom" />
            </div>
          </aside>

        </div>
      </main>
      
        <AdSlot location="footer" />
      {/* ================= MOBILE STICKY AD ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
        <AdSlot location="mobile_sticky" />
      </div>

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}