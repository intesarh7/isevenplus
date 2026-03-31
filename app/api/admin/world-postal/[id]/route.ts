import db from "@/app/lib/db";
import { NextResponse } from "next/server";

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