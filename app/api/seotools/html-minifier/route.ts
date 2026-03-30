import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "Invalid HTML input" },
        { status: 400 }
      );
    }

    // Basic Minification Logic
    let minified = html
      .replace(/<!--[\s\S]*?-->/g, "") // remove comments
      .replace(/\n/g, "") // remove new lines
      .replace(/\s{2,}/g, " ") // remove extra spaces
      .replace(/>\s+</g, "><") // remove space between tags
      .trim();

    if (!minified) {
      return NextResponse.json(
        { error: "Minification failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ minified });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}