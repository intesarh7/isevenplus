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

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // check slug duplicate
    const [existing]: any = await db.query(
      `SELECT id FROM tools WHERE slug = ? LIMIT 1`,
      [slug]
    );

    if (existing.length > 0) {
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
        metaTitle,
        metaDescription,
        description,
        categoryId,
        isActive ?? 1
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Tool created successfully"
    });

  } catch (error) {

    console.error("Create tool error:", error);

    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}