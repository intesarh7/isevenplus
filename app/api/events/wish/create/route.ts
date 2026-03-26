import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { event, name, message, theme } = body;

    // ✅ Validation
    if (!event || !name || !message) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const id = uuidv4();

    // ✅ Get IP & User Agent
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent = req.headers.get("user-agent") || "";

    // ✅ Insert Query
    await pool.query(
      `INSERT INTO event_wishes 
      (id, event_slug, name, message, theme, ip_address, user_agent) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, event, name, message, theme || null, ip, userAgent]
    );

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error("Create Wish Error:", error);

    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}