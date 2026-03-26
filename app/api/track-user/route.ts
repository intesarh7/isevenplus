import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  try {
    await db.query(
      `
      INSERT INTO active_users (sessionId)
      VALUES (?)
      ON DUPLICATE KEY UPDATE lastActive = NOW()
      `,
      [sessionId]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}