import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import bcrypt from "bcryptjs";

// UPDATE
export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const { name, email, password } = await req.json();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(
        "UPDATE admins SET name=?, email=?, password=? WHERE id=?",
        [name, email, hashedPassword, id]
      );
    } else {
      await db.query(
        "UPDATE admins SET name=?, email=? WHERE id=?",
        [name, email, id]
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const { id } = params;

    await db.query("DELETE FROM admins WHERE id=?", [id]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}