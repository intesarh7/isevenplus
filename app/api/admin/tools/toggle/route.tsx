import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    // ✅ IMPORTANT FIX
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await req.json();

    await db.query(
      `UPDATE tools SET isActive = NOT isActive WHERE id=?`,
      [id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}