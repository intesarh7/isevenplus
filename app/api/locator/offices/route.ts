import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const district = searchParams.get("district");

  const [rows]: any = await db.query(
    `SELECT office_name, pincode, district, state
     FROM indian_pincodes
     WHERE district = ?
     ORDER BY office_name ASC`,
    [district]
  );

  return NextResponse.json(rows);
}