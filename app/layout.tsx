import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/* ============================================
   ✅ DEFINE BASE URL PROPERLY
============================================ */

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://www.localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "iSevenPlus – Smart Online Tools & Pincode Finder",
    template: "%s | iSevenPlus",
  },
  description:
    "Find smart calculators, pincodes, and useful tools instantly.",
  verification: {
    bing: {
      "msvalidate.01": "355F9526F1FA6716B94F6FD3ADE9B3DA",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="google-site-verification" content="JzIfzUsG3INxXqkQyVOFVOjm-Htlv49E44OMCobqkUo" />
      <meta name="msvalidate.01" content="355F9526F1FA6716B94F6FD3ADE9B3DA" />
      <meta name="google-adsense-account" content="ca-pub-5131122927046742" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}