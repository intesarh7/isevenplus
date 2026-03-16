import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AdSlot from "@/app/components/AdSlot";
import Script from "next/script";
import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { Flame, Sparkles, Folder } from "lucide-react";
import SidebarCard from "../components/sidebarcard/SidebarCard";

const isProd = process.env.NODE_ENV === "production";

const BASE_URL = isProd
  ? "https://www.isevenplus.com"
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(BASE_URL),

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

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let popular: any[] = [];
  let recent: any[] = [];
  let categories: any[] = [];
  try {

    /* Popular Tools */
    const [pop] = await db.query<RowDataPacket[]>(`
    SELECT name, slug 
    FROM tools 
    WHERE isActive=1 AND isDeleted=0
    ORDER BY usageCount DESC
    LIMIT 10
  `);
    popular = pop;

    /* Recently Added Tools */
    const [rec] = await db.query<RowDataPacket[]>(`
    SELECT name, slug 
    FROM tools 
    WHERE isActive=1 AND isDeleted=0
    ORDER BY createdAt DESC
    LIMIT 10
  `);
    recent = rec;

    /* Categories */
    const [cat] = await db.query<RowDataPacket[]>(`
    SELECT name, slug 
    FROM tool_categories
    LIMIT 10
  `);
    categories = cat;

  } catch (err) {
    console.error("Sidebar DB Error:", err);
  }

  return (
    <>
      {/* ================= SEO PERFORMANCE ================= */}

      {/* Preconnect for faster ads */}
      
      {/* Adsense Global Script */}
       

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
          <aside className="md:w-1/4 hidden md:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot location="sidebar_top" />
              <SidebarCard
                title="Popular Tools"
                icon={<Flame size={18} className="text-orange-500" />}
                items={popular as any}
              />

              <SidebarCard
                title="Recently Added"
                icon={<Sparkles size={18} className="text-purple-500" />}
                items={recent as any}
              />

              <SidebarCard
                title="Categories"
                icon={<Folder size={18} className="text-blue-500" />}
                items={categories as any}
                basePath="/category"
              />
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