import { NextRequest, NextResponse } from "next/server";
import beautify from "js-beautify";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const { css: cssBeautify } = beautify;

export async function POST(req: NextRequest) {
  try {
    const { css } = await req.json();

    if (!css || typeof css !== "string") {
      return NextResponse.json(
        { error: "Invalid CSS input" },
        { status: 400 }
      );
    }

    let formatted;

    try {
      formatted = cssBeautify(css, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 2,
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or unparsable CSS code" },
        { status: 422 }
      );
    }

    if (!formatted) {
      return NextResponse.json(
        { error: "Beautification failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ formatted });

  } catch (err) {
    console.error("CSS Beautifier Error:", err);

    return NextResponse.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}