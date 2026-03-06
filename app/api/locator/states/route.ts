import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows]: any = await db.query(`
  SELECT DISTINCT state
  FROM indian_pincodes
  WHERE state IS NOT NULL
  AND TRIM(state) != ''
  ORDER BY state ASC
`);

  return NextResponse.json(rows);
}