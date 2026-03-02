import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, name, slug } = await req.json();

  await db.query(
    "UPDATE tool_categories SET name=?, slug=? WHERE id=?",
    [name, slug, id]
  );

  return NextResponse.json({ success: true });
}