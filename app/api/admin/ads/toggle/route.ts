import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await db.query(
    `UPDATE ads
     SET isActive = NOT isActive,
         updatedAt = NOW()
     WHERE id=?`,
    [id]
  );

  return NextResponse.json({ success: true });
}