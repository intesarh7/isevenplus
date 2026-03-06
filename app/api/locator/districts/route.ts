import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");

  const [rows]: any = await db.query(
    `SELECT DISTINCT district 
     FROM indian_pincodes 
     WHERE state = ?
     ORDER BY district ASC`,
    [state]
  );

  return NextResponse.json(rows);
}