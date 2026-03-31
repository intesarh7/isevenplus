import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM worldwide_postal_codes WHERE 1";
  const values: any[] = [];

  if (search) {
    query += " AND (LOWER(postal_code) LIKE ? OR LOWER(place_name) LIKE ?)";
values.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
  }

  query += " ORDER BY id DESC LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const [rows]: any = await db.query(query, values);

  const [[count]]: any = await db.query(
    "SELECT COUNT(*) as total FROM worldwide_postal_codes"
  );

  return NextResponse.json({
    data: rows,
    total: count.total,
    page,
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