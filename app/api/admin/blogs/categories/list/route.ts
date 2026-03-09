import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(){

  const [rows]: any = await db.query(`
    SELECT id,name,slug
    FROM blog_categories
    ORDER BY createdAt DESC
  `);

  return NextResponse.json(rows);

}