import { NextResponse } from "next/server";
import db from "@/app/lib/db";

/**
 * GET - Fetch all tools for admin panel
 * URL: /api/admin/tools/list
 */
export async function GET() {
  try {
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
    `);

    return NextResponse.json(rows);

  } catch (error) {
    console.error("Tools list error:", error);

    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}