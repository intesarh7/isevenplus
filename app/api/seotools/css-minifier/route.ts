import { NextRequest, NextResponse } from "next/server";
import CleanCSS from "clean-css";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { css } = await req.json();

    if (!css || typeof css !== "string") {
      return NextResponse.json(
        { error: "Invalid CSS input" },
        { status: 400 }
      );
    }

    const originalSize = Buffer.byteLength(css, "utf8");

    const output = new CleanCSS({
      level: 2,
    }).minify(css);

    if (output.errors.length) {
      return NextResponse.json(
        { error: output.errors.join(", ") },
        { status: 422 }
      );
    }

    const minified = output.styles;
    const minifiedSize = Buffer.byteLength(minified, "utf8");

    const saved = originalSize - minifiedSize;
    const percent = ((saved / originalSize) * 100).toFixed(2);

    return NextResponse.json({
      minified,
      stats: {
        original: originalSize,
        minified: minifiedSize,
        saved,
        percent,
      },
    });

  } catch (err) {
    console.error("CSS Minifier Error:", err);

    return NextResponse.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}