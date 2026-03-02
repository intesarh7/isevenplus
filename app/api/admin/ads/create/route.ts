import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const adName = form.get("adName");
  const location = form.get("location");
  const adCode = form.get("adCode");
  const isActive = form.get("isActive") ? 1 : 0;

  await db.query(
    "INSERT INTO ads (adName, location, adCode, isActive, createdAt) VALUES (?, ?, ?, ?, NOW())",
    [adName, location, adCode, isActive]
  );

  return NextResponse.redirect(new URL("/admin/ads", req.url));
}