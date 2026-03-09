import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      status,
      categoryId,
      metaTitle,
      metaDescription
    } = body;

    /* =========================
       Validation
    ========================= */

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    /* =========================
       Slug Duplicate Check
    ========================= */

    const [existing]: any = await db.query(
      `
      SELECT id
      FROM blogs
      WHERE slug=?
      AND id != ?
      AND deletedAt IS NULL
      `,
      [slug, id]
    );

    if (existing.length) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    /* =========================
       Publish Date Handling
    ========================= */

    let publishedAt = null;

    if (status === "published") {
      publishedAt = new Date();
    }

    /* =========================
       Update Blog
    ========================= */

    await db.query(
      `
      UPDATE blogs SET
        title=?,
        slug=?,
        excerpt=?,
        content=?,
        featuredImage=?,
        status=?,
        categoryId=?,
        metaTitle=?,
        metaDescription=?,
        publishedAt=?,
        updatedAt=NOW()
      WHERE id=?
      AND deletedAt IS NULL
      `,
      [
        title,
        slug,
        excerpt || "",
        content || "",
        featuredImage || "",
        status || "draft",
        categoryId || null,
        metaTitle || "",
        metaDescription || "",
        publishedAt,
        id
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully"
    });

  } catch (error) {

    console.error("Update blog error:", error);

    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );

  }

}