import db from "@/app/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const [rows] = await db.query(
    "SELECT * FROM tool_categories ORDER BY id DESC"
  );

  return NextResponse.json(rows);
}