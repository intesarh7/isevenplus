import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();
  const id = form.get("id");

  await db.query(
    "UPDATE ads SET deletedAt = NOW() WHERE id=?",
    [id]
  );

  return NextResponse.redirect(new URL("/admin/ads", req.url));
}