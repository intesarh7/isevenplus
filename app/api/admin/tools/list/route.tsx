import { NextResponse } from "next/server";
import db from "@/app/lib/db";
export const dynamic = "force-dynamic";
// ✅ cache enable (IMPORTANT)
export const revalidate = 60; // 1 minute cache

export async function GET() {
  try {

    // ✅ LIMIT add karo (DB safe)
    const [rows]: any = await db.query(`
      SELECT 
        id,
        name,
        slug,
        metaTitle,
        metaDescription,
        description,
        isActive,
        categoryId,
        usageCount,
        createdAt
      FROM tools
      WHERE deletedAt IS NULL
      ORDER BY createdAt DESC
      LIMIT 50
    `);

    return NextResponse.json(rows, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate"
      }
    });

  } catch (error) {

    console.error("Tools list error:", error);

    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}
