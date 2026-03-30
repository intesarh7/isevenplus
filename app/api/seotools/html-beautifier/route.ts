import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
function safeFormatHTML(html: string) {
  try {
    let formatted = "";
    let indent = 0;

    const tokens = html
      .replace(/>\s+</g, "><")
      .split(/(<[^>]+>)/g)
      .filter(Boolean);

    tokens.forEach((token) => {
      if (token.match(/^<\/.+>/)) {
        indent = Math.max(indent - 1, 0);
      }

      formatted += "  ".repeat(indent) + token.trim() + "\n";

      if (
        token.match(/^<[^\/!][^>]*>$/) &&
        !token.endsWith("/>")
      ) {
        indent++;
      }
    });

    return formatted.trim();
  } catch (err) {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const html = body?.html;

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "Invalid HTML input" },
        { status: 400 }
      );
    }

    const formatted = safeFormatHTML(html);

    if (!formatted) {
      return NextResponse.json(
        { error: "Unable to beautify HTML. Invalid or complex structure." },
        { status: 422 }
      );
    }

    return NextResponse.json({ formatted });

  } catch (err) {
    console.error("Beautifier API Error:", err);

    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}