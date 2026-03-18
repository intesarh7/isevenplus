import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  const [rows]: any = await db.query(
    "SELECT setting_value FROM seo_settings WHERE setting_key='rank_cache_ttl_hours'"
  );

  return NextResponse.json({
    ttl: rows[0]?.setting_value || "6",
  });
}

export async function POST(req: Request) {
  const { ttl } = await req.json();

  await db.query(
    `UPDATE seo_settings SET setting_value=? 
     WHERE setting_key='rank_cache_ttl_hours'`,
    [ttl]
  );

  return NextResponse.json({ success: true });
}