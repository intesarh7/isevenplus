import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT COUNT(DISTINCT sessionId) as total
      FROM active_users
      WHERE lastActive >= NOW() - INTERVAL 2 MINUTE
    `);

    return NextResponse.json({ total: rows[0].total });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}