"use client";

import { useState, useEffect } from "react"; // ✅ FIX 1
import { useRouter, useSearchParams } from "next/navigation"; // ✅ FIX 2
import WishRenderer from "@/app/components/wish/WishRenderer";
import { EVENTS } from "@/app/data/events";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type EventKey = keyof typeof EVENTS;

export default function CreateWish() {
    const router = useRouter();
    const searchParams = useSearchParams(); // ✅ FIX 2

    const [shareUrl, setShareUrl] = useState("");
    const [event, setEvent] = useState<EventKey>("diwali");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [theme, setTheme] = useState("");
    const [loading, setLoading] = useState(false);
    const eventData = EVENTS[event];
    const themes = eventData.themes ?? [];
    // ✅ safe images

    /* ✅ AUTO URL UPDATE */
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("event", event);

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [event]);

    /* ✅ SUBMIT */
    const handleSubmit = async () => {
        if (!name || !message) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/events/wish/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    event: eventData.name, // ✅ yahi fix hai
                    name,
                    message,
                    theme,
                }),
            });

            const data = await res.json();

            if (data.success && data.slug) {
                // ✅ FIX 3 + FIX 4 (yaha hona chahiye tha)
                const url = `${window.location.origin}/events/wish/${data.slug}`;
                setShareUrl(url);

                router.push(`/events/wish/${data.slug}`);
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">

                <div className="max-w-6xl mx-auto space-y-8">

                    {/* HEADER */}
                    <div className="text-center relative">

                        {/* TITLE */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            🎉 Create Your Festival Wish
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Generate beautiful wishes for your friends & family instantly
                        </p>

                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-2 mb-4">

                        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600">
                            <Home size={14} />
                            Home
                        </Link>

                        <ChevronRight size={14} />

                        <Link href="/events" className="hover:text-indigo-600">
                            Events
                        </Link>

                        <ChevronRight size={14} />

                        <span className="text-gray-700 font-medium">
                            Create Wish
                        </span>

                    </div>

                    {/* FORM CARD */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border">

                        <h2 className="text-xl font-semibold mb-5 text-gray-800">
                            Fill Your Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                            {/* EVENT */}
                            <select
                                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={event}
                                onChange={(e) => {
                                    setEvent(e.target.value as EventKey);
                                    setTheme("");
                                }}
                            >
                                {Object.keys(EVENTS).map((key) => (
                                    <option key={key} value={key}>
                                        {EVENTS[key as EventKey].name}
                                    </option>
                                ))}
                            </select>

                            {/* NAME */}
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            {/* THEME */}
                            {themes.length > 0 && (
                                <select
                                    className="p-3 border rounded-xl"
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                >
                                    <option value="">Select Theme</option>

                                    {themes.map((t: string) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}

                                </select>
                            )}
                            {/* MESSAGE */}
                            <input
                                type="text"
                                placeholder="Your Message"
                                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`mt-6 w-full py-3 rounded-xl text-white font-medium transition ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
                                }`}
                        >
                            {loading ? "Generating..." : "Generate Your Wish 🚀"}
                        </button>

                    </div>

                    <div className="mt-0 mb-4 text-gray-600 text-sm leading-6 text-center">
                        <p>
                            Use our free wish generator to create beautiful festival wishes for Diwali,
                            Eid, birthdays, and special occasions. Easily customize your message,
                            choose themes, and share your personalized wish page with friends and family.
                        </p>
                    </div>
                    <h1 className="sr-only">
                        Create Festival Wishes Online - Free Wish Generator
                    </h1>

                    <div className="mt-2  text-center text-sm">
                        <Link href="/events" className="text-indigo-600 hover:underline">
                            Explore All Events
                        </Link>
                    </div>

                    {/* PREVIEW CARD */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border">

                        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                            🎨 Live Preview
                        </h2>


                        <div className="flex justify-center">
                            <WishRenderer
                                event={event}
                                name={name || "Your Name"}
                                message={message || "Your message will appear here"}
                                theme={theme}
                            />

                        </div>
                    </div>

                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Event",
                                name: `${event} Celebration`,
                                description: `Create and share ${event} wishes online`,
                                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                                eventStatus: "https://schema.org/EventScheduled",
                                organizer: {
                                    "@type": "Organization",
                                    name: "iSevenPlus",
                                    url: "https://www.isevenplus.com",
                                },
                            },
                            {
                                "@type": "CreativeWork",
                                name: `${event} Wish Generator`,
                                description: "Generate personalized wishes online",
                                creator: {
                                    "@type": "Organization",
                                    name: "iSevenPlus",
                                },
                            },
                        ],
                    }),
                }}
            />
        </>
    );
}