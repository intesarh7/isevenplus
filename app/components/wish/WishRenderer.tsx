"use client"; // ✅ FIX 1 (VERY IMPORTANT)

import ThemeWrapper from "./ThemeWrapper";
import { EVENTS } from "@/app/data/events";
import * as htmlToImage from "html-to-image";
import { Download } from "lucide-react";

type EventKey = keyof typeof EVENTS;

type Props = {
  event: EventKey;
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

  const eventData = EVENTS[event];
  // ✅ safe images
  const emojis = eventData.emojis || {};

  const randomEmoji = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  // ✅ safety (pehle check karo)
  if (!eventData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        ❌ Invalid Event
      </div>
    );
  }


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

  /* ✅ ANIMATION ENGINE */
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
    <>
      <div className="flex flex-col items-center overflow-hidden relative">
        {/* 🌸 EMOJI FLOWER BORDER */}
        <div className="absolute inset-0 pointer-events-none z-20">

          {[...Array(12)].map((_, i) => (
            <span
              key={"top" + i}
              className="absolute text-lg animate-pulse"
              style={{ top: 0, left: `${i * 8}%` }}
            >
              🌸
            </span>
          ))}

          {[...Array(12)].map((_, i) => (
            <span
              key={"bottom" + i}
              className="absolute text-lg animate-pulse"
              style={{ bottom: 0, left: `${i * 8}%` }}
            >
              🌼
            </span>
          ))}

        </div>

        {/* 🌿 CORNER FLOWERS */}
        <div className="absolute -top-1 -left-1 text-2xl animate-bounce z-20">🌺</div>
        <div className="absolute -top-1 -right-1 text-2xl animate-bounce z-20">🌼</div>
        <div className="absolute -bottom-1 -left-1 text-2xl animate-bounce z-20">🌸</div>
        <div className="absolute -bottom-1 -right-1 text-2xl animate-bounce z-20">🌻</div>

        <div className="absolute inset-0 rounded-3xl p-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-80"></div>
        {/* 🎯 CARD */}
        <div id="wish-card" className="relative overflow-hidden w-full">

          <ThemeWrapper theme={theme || eventData.defaultTheme}>

            <div className="relative flex items-center justify-center">

              {/* ✨ GLOW BORDER */}
              <div className="absolute inset-0 rounded-3xl p-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 blur opacity-70"></div>

              {/* 🎨 CARD */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-12 text-center shadow-2xl overflow-hidden">

                {/* 🎉 IMAGES */}

                {/* 🎉 TOP LEFT */}
                {emojis.topLeft && (
                  <div className={`absolute top-2 left-2 text-2xl ${animationClass}`}>
                    {emojis.topLeft}
                  </div>
                )}

                {/* 🎈 TOP RIGHT */}
                {emojis.topRight && (
                  <div className={`absolute top-2 right-2 text-2xl ${animationClass}`}>
                    {emojis.topRight}
                  </div>
                )}

                {/* 🎂 BOTTOM LEFT */}
                {emojis.bottomLeft && (
                  <div className={`absolute bottom-2 left-2 text-2xl ${animationClass}`}>
                    {emojis.bottomLeft}
                  </div>
                )}

                {/* ⭐ BOTTOM RIGHT */}
                {emojis.bottomRight && (
                  <div className={`absolute bottom-2 right-2 text-2xl ${animationClass}`}>
                    {emojis.bottomRight}
                  </div>
                )}

                {/* ✨ CONTENT */}
                <div className="space-y-4 relative z-10">

                  <h1 className="text-2xl font-bold text-white drop-shadow">
                    {eventData.title}
                  </h1>

                  <p className="text-lg text-white/90">
                    🎉 {name} ki taraf se special message:
                  </p>

                  <p className="italic text-xl text-white">
                    "{message}"
                  </p>

                  <p className="text-sm text-white/70 mt-4">
                    👉 Created By - isevenplus.com
                  </p>

                </div>

              </div>

            </div>

          </ThemeWrapper>
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="absolute animate-bounce text-xl"
                style={{
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                }}
              >
                {emojis.topLeft || "✨"}
              </span>
            ))}
          </div>
        </div>

        {/* 📸 DOWNLOAD BUTTON */}
        <button
          onClick={downloadImage}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg absolute bottom-28 flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <Download size={18} />
        </button>

      </div>
    </>
  );
}