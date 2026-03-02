import db from "@/app/lib/db";
import ClientAdSlot from "./ClientAdSlot";

type AdLocation =
  | "header_top"
  | "after_title"
  | "tool_middle"
  | "bottom_content"
  | "sidebar_top"
  | "sidebar_bottom"
  | "mobile_sticky"
  | "footer"
  | "default";

interface AdSlotProps {
  location: AdLocation;
}

export default async function AdSlot({ location }: AdSlotProps) {
  const [ads]: any = await db.query(
    `SELECT id, adCode
   FROM ads
   WHERE (location = ? OR location = 'default')
   AND isActive = 1
   AND deletedAt IS NULL
   ORDER BY location = ? DESC
   LIMIT 1`,
    [location, location]
  );

  if (!ads.length) {
    return null; // 🔥 nothing rendered
  }

  return (
    <ClientAdSlot
      adId={ads[0].id}
      adCode={ads[0].adCode}
    />
  );
}