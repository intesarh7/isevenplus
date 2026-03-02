import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ india: [], world: [] });
  }

  const searchTerm = `%${q}%`;

  // 🇮🇳 INDIA QUERY
  const [indiaRows]: any = await db.query(
    `SELECT DISTINCT 
        pincode, 
        district, 
        state 
     FROM indian_pincodes
     WHERE pincode LIKE ?
     OR district LIKE ?
     OR state LIKE ?
     LIMIT 5`,
    [searchTerm, searchTerm, searchTerm]
  );

  // 🌍 WORLD QUERY
  const [worldRows]: any = await db.query(
  `SELECT DISTINCT 
      postal_code,
      place_name,
      admin1,
      country_code
   FROM worldwide_postal_codes
   WHERE country_code != 'IN'
   AND (
        postal_code LIKE ?
        OR place_name LIKE ?
        OR admin1 LIKE ?
   )
   LIMIT 5`,
  [searchTerm, searchTerm, searchTerm]
);

  return NextResponse.json({
    india: indiaRows,
    world: worldRows.map((row: any) => ({
      postalCode: row.postal_code,
      placeName: row.place_name,
      state: row.admin1,
      country: row.country_code,
    })),
  });
}