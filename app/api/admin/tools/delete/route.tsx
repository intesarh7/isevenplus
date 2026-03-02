import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    // ✅ NEXT 15 FIX
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    // ✅ SOFT DELETE
    await db.query(
      `UPDATE tools 
       SET deletedAt = NOW() 
       WHERE id=?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Tool deleted successfully",
    });

  } catch (error) {
    console.error("Delete tool error:", error);

    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}