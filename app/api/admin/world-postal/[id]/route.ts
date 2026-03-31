import db from "@/app/lib/db";
import { NextResponse } from "next/server";


// ✅ GET (FIXED - MOST IMPORTANT)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 100;
    const search = searchParams.get("search") || "";

    const offset = (page - 1) * limit;

    // ✅ IMPORTANT: ORDER FIX (country wise spread)
    const [data]: any = await db.query(`
      SELECT *
      FROM worldwide_postal_codes
      WHERE 
        country_code LIKE '%${search}%'
        OR place_name LIKE '%${search}%'
      ORDER BY country_code ASC, postal_code ASC
      LIMIT ${limit} OFFSET ${offset}
    `);

    const [[count]]: any = await db.query(`
      SELECT COUNT(*) as total
      FROM worldwide_postal_codes
      WHERE 
        country_code LIKE '%${search}%'
        OR place_name LIKE '%${search}%'
    `);

    return NextResponse.json({
      data,
      total: count.total,
      page,
      limit
    });

  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}


// ✅ UPDATE (EDIT)
export async function PUT(req: Request, { params }: any) {
  try {
    const id = params.id;
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
      `UPDATE worldwide_postal_codes SET 
        postal_code=?,
        place_name=?,
        country_code=?,
        admin1=?,
        admin2=?,
        admin3=?,
        latitude=?,
        longitude=?
      WHERE id=?`,
      [
        postal_code,
        place_name,
        country_code,
        admin1,
        admin2,
        admin3,
        latitude,
        longitude,
        id,
      ]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}


// ✅ DELETE
export async function DELETE(req: Request, { params }: any) {
  try {
    const id = params.id;

    await db.query(
      "DELETE FROM worldwide_postal_codes WHERE id=?",
      [id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}