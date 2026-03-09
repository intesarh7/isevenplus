import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {

  try {

    /* =========================
       AUTH CHECK
    ========================= */

    const cookieStore = cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let user: any;

    try {
      user = verifyToken(token);
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const adminId = user.id;

    /* =========================
       REQUEST BODY
    ========================= */

    const body = await req.json();

    const {
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
       VALIDATION
    ========================= */

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    /* =========================
       SLUG DUPLICATE CHECK
    ========================= */

    const [existing]: any = await db.query(
      `
      SELECT id
      FROM blogs
      WHERE slug=? 
      AND deletedAt IS NULL
      `,
      [slug]
    );

    if (existing.length) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    /* =========================
       IMAGE VALUE (Blob URL)
    ========================= */

    const image = featuredImage || null;

    /* =========================
       INSERT BLOG
    ========================= */

    const [result]: any = await db.query(
      `
      INSERT INTO blogs
      (
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        status,
        categoryId,
        metaTitle,
        metaDescription,
        adminId,
        publishedAt,
        createdAt
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())
      `,
      [
        title,
        slug,
        excerpt || "",
        content || "",
        image,
        status || "draft",
        categoryId || null,
        metaTitle || "",
        metaDescription || "",
        adminId,
        status === "published" ? new Date() : null
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId
    });

  } catch (error) {

    console.error("Create blog error:", error);

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );

  }

}