"use client";

import ThemeWrapper from "./ThemeWrapper";
import { EVENTS } from "@/app/data/events";
import * as htmlToImage from "html-to-image";
import { Download } from "lucide-react";

type Props = {
  event: string;
  name: string;
  message: string;
  theme?: string;
};

export default function WishRenderer({
  event,
  name,
  message,
  theme,
}: Props) {

  /* ✅ NORMALIZE EVENT KEY */
  const normalizeEventKey = (val: string): keyof typeof EVENTS => {
    const key = val.toLowerCase().replace(/[^a-z]/g, "");

    const map: any = {
      teachersday: "teachers",
      mothersday: "mothers",
      fathersday: "fathers",
      independence: "independence",
      republic: "republic",
      diwali: "diwali",
      holi: "holi",
      eid: "eid",
      birthday: "birthday",
      christmas: "christmas",
      newyear: "newyear",
      valentine: "valentine",
    };

    return map[key] || "diwali"; // fallback
  };

  const safeEventKey = normalizeEventKey(event);

  const eventData = EVENTS[safeEventKey];

  /* ✅ SAFETY */
  if (!eventData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        ❌ Invalid Event
      </div>
    );
  }

  const emojis = eventData?.emojis || {};

  /* ✅ RANDOM EMOJI */
  const randomEmoji = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  /* ✅ DOWNLOAD IMAGE */
  const downloadImage = async () => {
    try {
      const node = document.getElementById("wish-card");
      if (!node) return;

      const dataUrl = await htmlToImage.toPng(node);

      const link = document.createElement("a");
      link.download = "wish.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  /* ✅ ANIMATION */
  const getAnimationClass = (type?: string) => {
    switch (type) {
      case "bounce": return "animate-bounce";
      case "pulse": return "animate-pulse";
      case "rotate": return "animate-spin";
      case "glow": return "animate-pulse";
      case "shake": return "animate-[wiggle_1s_ease-in-out_infinite]";
      default: return "";
    }
  };

  const animationClass = getAnimationClass(eventData.animation);

  return (
    <div className="flex flex-col items-center overflow-hidden relative">

      {/* 🌸 BORDER */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-lg"
            style={{ top: 0, left: `${i * 8}%` }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* 🎯 CARD */}
      <div id="wish-card" className="relative w-full">

        <ThemeWrapper theme={theme || eventData.defaultTheme}>

          <div className="relative flex items-center justify-center">

            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-12 text-center shadow-2xl">

              {/* ✅ EMOJIS */}
              {emojis?.topLeft && (
                <div className={`absolute top-2 left-2 ${animationClass}`}>
                  {emojis.topLeft}
                </div>
              )}

              {emojis?.topRight && (
                <div className={`absolute top-2 right-2 ${animationClass}`}>
                  {emojis.topRight}
                </div>
              )}

              {emojis?.bottomLeft && (
                <div className={`absolute bottom-2 left-2 ${animationClass}`}>
                  {emojis.bottomLeft}
                </div>
              )}

              {emojis?.bottomRight && (
                <div className={`absolute bottom-2 right-2 ${animationClass}`}>
                  {emojis.bottomRight}
                </div>
              )}

              {/* CONTENT */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-white">
                  {eventData.title}
                </h1>

                <p className="text-lg text-white/90">
                  🎉 {name} ki taraf se special message:
                </p>

                <p className="italic text-xl text-white">
                  "{message}"
                </p>
              </div>

            </div>

          </div>

        </ThemeWrapper>
      </div>

      {/* DOWNLOAD */}
      <button
        onClick={downloadImage}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        <Download size={18} />
      </button>

    </div>
  );
}