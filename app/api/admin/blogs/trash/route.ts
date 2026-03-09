import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  const [rows]: any = await db.query(`
    SELECT *
    FROM blogs
    WHERE deletedAt IS NOT NULL
    ORDER BY deletedAt DESC
  `);

  return NextResponse.json(rows);

}