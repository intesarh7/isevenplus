import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, slug } = await req.json();

  await db.query(
    "INSERT INTO tool_categories (name, slug) VALUES (?, ?)",
    [name, slug]
  );

  return NextResponse.json({ success: true });
}