import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
export const dynamic = "force-dynamic";
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
console.log("TOKEN:", token);
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

    console.log("BLOG CREATE BODY:", body);
    console.log("ADMIN ID:", adminId);

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
      WHERE slug=? AND deletedAt IS NULL
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
       IMAGE SAFE VALUE
    ========================= */

    const image = featuredImage || "";

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
        publishedAt
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
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