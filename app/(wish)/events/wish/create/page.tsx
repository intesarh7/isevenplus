import CreateWishClient from "./CreateWishClient";

/* ================= BASE URL ================= */
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/* ================= METADATA ================= */
export async function generateMetadata({ searchParams }: any) {
  const event = searchParams?.event?.toString()?.toLowerCase();

  const formattedEvent = event
    ? event.charAt(0).toUpperCase() + event.slice(1)
    : null;

  const title = formattedEvent
    ? `Create ${formattedEvent} Wishes Online | Free ${formattedEvent} Wish Generator`
    : "Create Festival Wishes Online | Birthday, Diwali, Eid Wish Maker";

  const description = formattedEvent
    ? `Create and share beautiful ${formattedEvent} wishes online. Generate personalized ${formattedEvent} greeting pages instantly with a shareable link.`
    : "Create personalized festival wishes online for Diwali, Eid, Birthday & more.";

  const canonical = formattedEvent
    ? `${baseUrl}/events/wish/create?event=${event}`
    : `${baseUrl}/events/wish/create`;

  return {
    title,
    description,
    keywords: [
      "festival wishes",
      "wish generator",
      formattedEvent ? `${formattedEvent} wishes` : "",
    ],
    alternates: { canonical },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "iSevenPlus",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
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
export default function Page() {
  return <CreateWishClient />;
}