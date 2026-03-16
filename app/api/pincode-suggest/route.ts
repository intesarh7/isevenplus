import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ india: [], world: [] });
  }

  const searchTerm = `%${q}%`;

  const isPincodeSearch = /^[0-9]{3,6}$/.test(q);

  let indiaQuery = "";
  let indiaParams: any[] = [];

  /* ======================================
     🇮🇳 INDIA SMART SEARCH
  ====================================== */

  if (isPincodeSearch) {

    // PINCODE PRIORITY SEARCH

    indiaQuery = `
      SELECT
        office_name,
        pincode,
        district,
        state,
        taluk
      FROM indian_pincodes
      WHERE
        pincode LIKE ?
        OR office_name LIKE ?
        OR district LIKE ?
      ORDER BY
        CASE
          WHEN pincode LIKE ? THEN 1
          WHEN office_name LIKE ? THEN 2
          ELSE 3
        END
      LIMIT 8
    `;

    indiaParams = [
      searchTerm,
      searchTerm,
      searchTerm,
      `${q}%`,
      searchTerm
    ];

  } else {

    // TEXT PRIORITY SEARCH

    indiaQuery = `
      SELECT
        office_name,
        pincode,
        district,
        state,
        taluk
      FROM indian_pincodes
      WHERE
        office_name LIKE ?
        OR district LIKE ?
        OR state LIKE ?
        OR taluk LIKE ?
      ORDER BY
        CASE
          WHEN office_name LIKE ? THEN 1
          WHEN district LIKE ? THEN 2
          ELSE 3
        END
      LIMIT 8
    `;

    indiaParams = [
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      `${q}%`,
      `${q}%`
    ];

  }

  const [indiaRows]: any = await db.query(indiaQuery, indiaParams);

  /* ======================================
     🌍 WORLD SEARCH
  ====================================== */

  const [worldRows]: any = await db.query(

    `SELECT
        postal_code,
        place_name,
        admin1,
        admin2,
        admin3,
        country_code
     FROM worldwide_postal_codes
     WHERE country_code != 'IN'
     AND (
        postal_code LIKE ?
        OR place_name LIKE ?
        OR admin1 LIKE ?
        OR admin2 LIKE ?
        OR admin3 LIKE ?
     )
     LIMIT 8`,

    [
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm
    ]

  );

  /* ======================================
     FORMAT RESPONSE
  ====================================== */

  return NextResponse.json({

    india: indiaRows.map((row: any) => ({

      office_name: row.office_name,
      pincode: row.pincode,
      district: row.district,
      state: row.state,
      taluk: row.taluk

    })),

    world: worldRows.map((row: any) => ({

      postalCode: row.postal_code,
      placeName: row.place_name,
      state: row.admin1,
      district: row.admin2,
      country: row.country_code

    }))

  });

}