import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const [rows]: any = await db.query(
    `
    SELECT id, title, slug
    FROM blogs
    WHERE status='published'
    AND deletedAt IS NULL
    AND title LIKE ?
    ORDER BY createdAt DESC
    LIMIT 10
    `,
    [`%${q}%`]
  );

  return NextResponse.json({
    success: true,
    blogs: rows
  });

}