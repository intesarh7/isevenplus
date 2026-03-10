import { NextResponse } from "next/server";
import db from "@/app/lib/db";

/**
 * POST - Create Tool
 * URL: /api/admin/tools/create
 */

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      name,
      slug,
      metaTitle,
      metaDescription,
      description,
      categoryId,
      isActive
    } = body;

    // required validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // duplicate slug check
    const [rows]: any = await db.query(
      `SELECT id FROM tools WHERE slug = ? LIMIT 1`,
      [slug]
    );

    if (rows && rows.length > 0) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO tools
      (
        name,
        slug,
        metaTitle,
        metaDescription,
        description,
        categoryId,
        isActive
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        metaTitle || "",
        metaDescription || "",
        description || "",
        categoryId ? Number(categoryId) : null,
        isActive ?? 1
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Tool created successfully"
    });

  } catch (error: any) {

    console.error("Create tool error:", error);

    return NextResponse.json(
      {
        error: "Failed to create tool",
        details: error.message
      },
      { status: 500 }
    );
  }
}