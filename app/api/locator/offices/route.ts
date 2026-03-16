import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const state = searchParams.get("state");
  const district = searchParams.get("district");

  const [rows] = await db.query(
    `
    SELECT
      id,
      office_name,
      pincode,
      branch_type,
      delivery_status,
      district,
      division,
      region,
      taluk,
      circle,
      state
    FROM indian_pincodes
    WHERE state = ?
    AND district = ?
    ORDER BY office_name
    `,
    [state, district]
  );

  return NextResponse.json(rows);
}