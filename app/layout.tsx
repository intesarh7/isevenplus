import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/* ============================================
   ✅ DEFINE BASE URL PROPERLY
============================================ */

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "iSevenPlus - Smart Online Tools & Pincode Finder",
    template: "%s | iSevenPlus",
  },
  description:
    "Find smart calculators, pincodes, and useful tools instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="JzIfzUsG3INxXqkQyVOFVOjm-Htlv49E44OMCobqkUo" />
        <meta name="msvalidate.01" content="355F9526F1FA6716B94F6FD3ADE9B3DA" />
        <meta name="google-adsense-account" content="ca-pub-5131122927046742" />

        {/* ✅ Google Analytics Script */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TF1NBTNYH0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TF1NBTNYH0');
          `}
        </Script> 
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
