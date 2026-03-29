import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";

// ✅ slug generator
function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { event, name, message, theme } = body;

    if (!event || !name || !message) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const id = uuidv4();

    // ✅ FIX: proper slug
    let baseSlug = generateSlug(`${event} ${name}`);
    let slug = baseSlug;

    // ✅ UNIQUE slug
    let count = 1;
    while (true) {
      const [rows]: any = await pool.query(
        "SELECT id FROM event_wishes WHERE slug = ? LIMIT 1",
        [slug]
      );

      if (rows.length === 0) break;

      slug = `${baseSlug}-${count}`;
      count++;
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent = req.headers.get("user-agent") || "";

    // ✅ IMPORTANT: slug insert
    await pool.query(
      `INSERT INTO event_wishes 
      (id, event_slug, name, message, theme, ip_address, user_agent, slug) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, event, name, message, theme || null, ip, userAgent, slug]
    );

    return NextResponse.json({
      success: true,
      id,
      slug, // ✅ MUST RETURN
    });

  } catch (error) {
    console.error("Create Wish Error:", error);

    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
