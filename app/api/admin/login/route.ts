import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ✅ Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT id, email, password FROM admins WHERE email=? LIMIT 1",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const admin = rows[0];

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create JWT
    const token = signToken({
      id: admin.id,
      email: admin.email,
      role: "ADMIN",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // ✅ Production Safe Cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}