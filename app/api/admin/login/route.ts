import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/app/lib/db";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // 🔎 Find admin
    const [rows]: any = await db.query(
      "SELECT * FROM admins WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "The email or password you entered doesn’t match our records." },
        { status: 401 }
      );
    }

    const admin = rows[0];

    // 🔐 Password check
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "The email or password you entered doesn’t match our records." },
        { status: 401 }
      );
    }

    // 🔑 Create JWT
    const token = signToken({
      id: admin.id,
      role: "ADMIN",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // 🍪 Secure Cookie (VERY IMPORTANT)
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",   // 🔥 must be "/"
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