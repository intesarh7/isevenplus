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
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "iSevenPlus – Smart Online Tools & Pincode Finder",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}