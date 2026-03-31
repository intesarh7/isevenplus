
import Link from "next/link";
import db from "@/app/lib/db";

import { EVENTS } from "@/app/data/events";
import { ArrowRight, FileText, Sparkles, Gift, Share2, Globe, Zap, Heart, HelpCircle } from "lucide-react";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

/* ================= BASE URL ================= */
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.isevenplus.com";

/* ================= METADATA ================= */
export async function generateMetadata({ searchParams }: any) {
  const event = searchParams?.event?.trim();

  const title = event
    ? `${event} Wishes Generator | Create & Share ${event} Wishes Online`
    : "Create Festival Wishes Online | Birthday, Diwali, Eid Wish Maker";

  const description = event
    ? `Create and share beautiful ${event} wishes online.`
    : "Create and share beautiful festival wishes online.";

  const canonical = event
    ? `${baseUrl}/events?event=${encodeURIComponent(event)}`
    : `${baseUrl}/events`;

  return {
    title,
    description,
    alternates: { canonical },
  };
}

/* ================= PAGE ================= */
export default async function EventsPage() {
  const formatName = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  let events: RowDataPacket[] = [];

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
    id,
    event_slug,
    slug,
    name,
    message
  FROM event_wishes
  WHERE is_deleted = 0
  ORDER BY created_at DESC`
    );

    events = rows;
  } catch (error) {
    console.log("DB Error:", error);
  }


  return (
    <div className="max-w-6xl mx-auto p-6">



      {/* ================= HERO ================= */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          🎉 Create & Share Festival Wishes
        </h1>
        <p className="text-gray-600 mt-2">
          Create beautiful wish pages for festivals, birthdays & events — and share with your friends.
        </p>

        <Link href="/events/wish/create">
          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg mr-5 cursor-pointer">
            Create Your Wish 🚀
          </button>
        </Link>
        <Link href="/">
          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">
            Go Main Site
          </button>
        </Link>
      </div>
      {/* ================= BREADCRUMB ================= */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> / <span>Events</span>
      </nav>

      {/* ================= EVENTS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {events.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No events found
          </p>
        )}

        {events.map((event: any, index) => (
          <div
            key={index}
            className="group relative border rounded-2xl p-5 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
          >

            {/* FIXED GRADIENT */}
            <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">

              {/* ICON */}
              <div className="mb-4 inline-flex p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <FileText size={18} />
              </div>

              {/* FIXED TITLE */}
              <h2 className="font-semibold text-gray-800 capitalize">
               {formatName(event.event_slug)}
              </h2>

              {/* FIXED DESCRIPTION */}
              <p className="text-gray-500 text-sm mt-2">
                {event.total} wishes • Create & share now
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

                <div className="flex gap-2">
                  <Link href={`/events/wish/${event.slug || event.id}`}>
                    <button className="px-3 py-1 bg-gray-200 rounded-md text-xs hover:bg-gray-300 transition cursor-pointer">
                      View
                    </button>
                  </Link>
                </div>

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition text-gray-400 group-hover:text-indigo-600"
                />
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ================= SEO CONTENT ================= */}
      <div className="mt-16 space-y-10">

        {/* ================= INTRO ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🎉 Create Personalized Festival Wishes Online
          </h2>

          <p className="text-gray-600 leading-7">
            Looking for the best way to create personalized festival wishes online? Our advanced wish generator
            helps you design beautiful and unique wish pages for every occasion. Whether it’s a birthday,
            Diwali, Eid, Christmas, New Year, or any special celebration, you can instantly generate a custom
            wish page and share it with your loved ones.
          </p>

          <p className="text-gray-600 leading-7 mt-4">
            In today’s digital world, sending plain text messages is outdated. People love visually appealing
            and interactive wishes. That’s where our online wish maker comes in — it allows you to create a
            stunning wish page with your name, message, and shareable link in seconds.
          </p>
        </section>

        {/* ================= FEATURES ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            🚀 Why Use Our Wish Generator?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <Sparkles className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Instant Wish Creation</h3>
                <p className="text-gray-600 text-sm">
                  Create personalized festival wishes instantly without any technical skills.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Share2 className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Easy Sharing</h3>
                <p className="text-gray-600 text-sm">
                  Get a shareable link and send your wishes via WhatsApp, Facebook, or any platform.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Gift className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Multiple Templates</h3>
                <p className="text-gray-600 text-sm">
                  Choose from different festival templates like Diwali, Eid, Christmas, and birthdays.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Globe className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Works Everywhere</h3>
                <p className="text-gray-600 text-sm">
                  Fully responsive design that works smoothly on mobile, tablet, and desktop.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ⚡ How to Create Festival Wishes Online
          </h2>

          <div className="space-y-4 text-gray-600 leading-7">
            <p><strong>Step 1:</strong> Click on the “Create Wish” button.</p>
            <p><strong>Step 2:</strong> Select your event like birthday, Diwali, Eid, etc.</p>
            <p><strong>Step 3:</strong> Enter your name and message.</p>
            <p><strong>Step 4:</strong> Generate your wish page instantly.</p>
            <p><strong>Step 5:</strong> Share your link with friends and family.</p>
          </div>
        </section>

        {/* ================= SEO CONTENT ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🌟 Best Online Wish Maker for Every Occasion
          </h2>

          <p className="text-gray-600 leading-7">
            Our platform is one of the best online wish makers available today. You can create birthday wishes,
            festival greetings, and celebration pages in just a few clicks. With growing demand for digital
            greeting solutions, our tool ensures that your wishes stand out from the crowd.
          </p>

          <p className="text-gray-600 leading-7 mt-4">
            Keywords like <strong>festival wishes online</strong>, <strong>birthday wish generator</strong>,
            <strong>create Diwali wishes</strong>, <strong>Eid wish maker</strong>, and
            <strong>online greeting generator</strong> are highly searched — and our platform is built to
            serve all these needs efficiently.
          </p>

          <p className="text-gray-600 leading-7 mt-4">
            Whether you want to impress your friends or create viral shareable content, this tool is perfect.
            You can even use it for marketing campaigns, social engagement, and branding.
          </p>
        </section>

        {/* ================= BENEFITS ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            ❤️ Benefits of Using Digital Wishes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex gap-4">
              <Zap className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Fast & Efficient</h3>
                <p className="text-gray-600 text-sm">
                  Create and share wishes in seconds without any delay.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Emotional Connection</h3>
                <p className="text-gray-600 text-sm">
                  Personalized wishes create a stronger emotional impact.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Globe className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Global Reach</h3>
                <p className="text-gray-600 text-sm">
                  Share your wishes with anyone across the world instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Share2 className="text-indigo-600" />
              <div>
                <h3 className="font-semibold">Viral Potential</h3>
                <p className="text-gray-600 text-sm">
                  Unique wish pages increase chances of going viral on social media.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= KEYWORDS SECTION ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🔍 Popular Search Keywords
          </h2>

          <p className="text-gray-600 leading-7">
            festival wishes online, birthday wishes generator, create Diwali wishes, Eid Mubarak wishes creator,
            Christmas greetings maker, New Year wish generator, online greeting card maker, free wish creator,
            shareable wish page generator, digital greeting tool.
          </p>
        </section>

      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="mt-16">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" />
          Frequently Asked Questions (FAQs)
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-6">

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              How can I create a personalized festival wish online?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              You can easily create a personalized festival wish using our online wish generator.
              Simply click on "Create Your Wish", choose your event such as birthday, Diwali, or Eid,
              enter your name and message, and generate a beautiful shareable wish page instantly.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              Is this festival wish generator free to use?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              Yes, our online wish maker is completely free to use. You can create unlimited birthday
              wishes, festival greetings, and special occasion messages without any cost.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              Can I share my wish page with friends and family?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              Absolutely! Once your wish page is created, you will get a unique shareable link.
              You can easily share it via WhatsApp, Facebook, Instagram, or any social platform.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              Which events can I create wishes for?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              You can create wishes for multiple occasions like birthdays, Diwali, Eid, Christmas,
              New Year, anniversaries, and many other festivals using our wish generator tool.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              Do I need to sign up to create a wish?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              No signup is required. You can instantly create and share your personalized wishes
              without creating an account.
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-800">
              Is the wish page mobile-friendly?
            </h3>
            <p className="text-gray-600 mt-1 text-sm leading-6">
              Yes, all generated wish pages are fully responsive and optimized for mobile, tablet,
              and desktop devices.
            </p>
          </div>

        </div>
        <h2 className="sr-only">
          festival wishes online, birthday wish generator, free wish maker
        </h2>
      </div>

      {/* ================= SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://yourdomain.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Events",
                  item: "https://yourdomain.com/events",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How can I create a wish?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Click on Create Your Wish, choose event and generate your wish page.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, it is completely free to use.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I share my wish?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you get a shareable link.",
                  },
                },
              ],
            },
          ]),
        }}
      />

    </div>
  );
}