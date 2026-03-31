import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit")) || 100;
  const search = searchParams.get("search") || "";

  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM worldwide_postal_codes
    WHERE 1
  `;

  const values: any[] = [];

  if (search) {
    query += `
      AND (
        LOWER(postal_code) LIKE ?
        OR LOWER(place_name) LIKE ?
        OR LOWER(country_code) LIKE ?
      )
    `;
    values.push(
      `%${search.toLowerCase()}%`,
      `%${search.toLowerCase()}%`,
      `%${search.toLowerCase()}%`
    );
  }

  // ✅ IMPORTANT FIX
  query += ` ORDER BY country_code ASC, postal_code ASC LIMIT ? OFFSET ?`;
  values.push(limit, offset);

  const [rows]: any = await db.query(query, values);

  const [[count]]: any = await db.query(`
    SELECT COUNT(*) as total
    FROM worldwide_postal_codes
  `);

  return NextResponse.json({
    data: rows,
    total: count.total,
    page,
    limit
  });
}

// ✅ CREATE (ADD NEW)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      postal_code,
      place_name,
      country_code,
      admin1,
      admin2,
      admin3,
      latitude,
      longitude,
    } = body;

    await db.query(
      `INSERT INTO worldwide_postal_codes 
      (postal_code, place_name, country_code, admin1, admin2, admin3, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        postal_code,
        place_name,
        country_code,
        admin1,
        admin2,
        admin3,
        latitude,
        longitude,
      ]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}