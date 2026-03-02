import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();

  const id = form.get("id");
  const adName = form.get("adName");
  const location = form.get("location");
  const adCode = form.get("adCode");
  const isActive = form.get("isActive") ? 1 : 0;

  await db.query(
    `UPDATE ads
     SET adName=?,
         location=?,
         adCode=?,
         isActive=?,
         updatedAt=NOW()
     WHERE id=?`,
    [adName, location, adCode, isActive, id]
  );

  return NextResponse.redirect(new URL("/admin/ads", req.url));
}