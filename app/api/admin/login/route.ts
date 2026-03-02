import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [rows]: any = await db.query(
    "SELECT * FROM admins WHERE email=?",
    [email]
  );

  if (!rows.length) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const admin = rows[0];

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: admin.id, email: admin.email });

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  return response;
}