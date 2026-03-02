import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await db.query(
    "DELETE FROM tool_categories WHERE id=?",
    [id]
  );

  return NextResponse.json({ success: true });
}