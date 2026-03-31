import WishRenderer from "@/app/components/wish/WishRenderer";
import pool from "@/app/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

/* ================= BASE URL ================= */
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

/* ================= TYPES ================= */
type Wish = {
  id: string;
  event_slug: string;
  name: string;
  message: string;
  theme?: string;
  slug: string;
};

/* ================= FETCH ================= */
async function getWish(slug: string): Promise<Wish | null> {
  const [rows]: any = await pool.query(
    "SELECT * FROM event_wishes WHERE slug = ? AND is_deleted = 0 LIMIT 1",
    [slug]
  );

  if (rows.length === 0) return null;

  return rows[0];
}

/* ================= FORMAT ================= */
const formatEvent = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ================= METADATA ================= */
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const wish = await getWish(params.slug);

  if (!wish) {
    return {
      title: "Wish Not Found",
    };
  }

  const eventName = formatEvent(wish.event_slug);

  const title = `${wish.name}'s ${eventName} Wish 🎉`;
  const description = `${wish.name} says: "${wish.message}". Create your own ${eventName} wish and share it instantly.`;

  const url = `${baseUrl}/events/wish/${wish.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "iSevenPlus",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

/* ================= PAGE ================= */
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const wish = await getWish(params.slug);

  if (!wish) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        ❌ Wish Not Found
      </div>
    );
  }

  const eventName = formatEvent(wish.event_slug);

  /* ================= SHARE ================= */
  const shareUrl = `${baseUrl}/events/wish/${wish.slug}`;

  const shareText = `🎉 ${wish.name} ne tumhare liye ek special ${eventName} wish bheja hai!

💬 "${wish.message}"

👉 Tum bhi apna wish banao aur share karo:
${shareUrl}

🇮🇳 Try Now - iSevenPlus`;

  return (
    <>
      <h1 className="sr-only">
        {wish.name} {eventName} Wish Message
      </h1>

      <WishRenderer
        event={wish.event_slug as any}
        name={wish.name}
        message={wish.message}
        theme={wish.theme}
      />

      <div className="w-full mt-8 mb-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row flex-wrap gap-3 justify-center">

          <Link href="/events/wish/create" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl">
              🎁 Create Your Own Wish
            </button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 bg-gray-700 text-white rounded-xl">
              ⬅️ Back to Home
            </button>
          </Link>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <button className="w-full px-6 py-3 bg-[#25D366] text-white rounded-xl">
              📲 Share on WhatsApp
            </button>
          </a>

        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${wish.name}'s ${eventName} Wish`,
            description: wish.message,
            url: `${baseUrl}/events/wish/${wish.slug}`,
          }),
        }}
      />
    </>
  );
}