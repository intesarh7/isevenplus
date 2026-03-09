import { NextResponse } from "next/server";
import db from "@/app/lib/db";

/**
 * POST - Update Tool
 * URL: /api/admin/tools/update
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      slug,
      metaTitle,
      metaDescription,
      description,
      categoryId,
      isActive
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    await db.query(
      `
      UPDATE tools SET
        name = ?,
        slug = ?,
        metaTitle = ?,
        metaDescription = ?,
        description = ?,
        categoryId = ?,
        isActive = ?
      WHERE id = ? AND deletedAt IS NULL
      `,
      [
        name,
        slug,
        metaTitle,
        metaDescription,
        description,
        categoryId,
        isActive,
        id
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Tool updated successfully"
    });

  } catch (error) {
    console.error("Update tool error:", error);

    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}