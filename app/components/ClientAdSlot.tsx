"use client";

import { useEffect, useRef } from "react";

interface Props {
  adId: number;
  adCode: string;
}

export default function ClientAdSlot({ adId, adCode }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});

            await fetch("/api/admin/ads/impression", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: adId }),
            });

            observer.disconnect();
          } catch {}
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [adId]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center"
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
}