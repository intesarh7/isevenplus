import { NextRequest, NextResponse } from "next/server";
import beautify from "js-beautify";

const { js: jsBeautify } = beautify;

function advancedMinify(code: string) {
  try {
    // Step 1: Beautify to normalize structure
    const normalized = jsBeautify(code, {
      indent_size: 0,
      preserve_newlines: false,
      max_preserve_newlines: 0,
      space_in_empty_paren: false,
    });

    // Step 2: Custom compression (safe)
    let minified = normalized
      .replace(/\/\/.*$/gm, "") // remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove multi-line comments
      .replace(/\n/g, "") // remove new lines
      .replace(/\s{2,}/g, " ") // extra spaces
      .replace(/\s*([{};,:])\s*/g, "$1") // trim around symbols
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .trim();

    return minified;
  } catch (err) {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { js } = await req.json();

    if (!js || typeof js !== "string") {
      return NextResponse.json(
        { error: "Invalid JavaScript input" },
        { status: 400 }
      );
    }

    const originalSize = Buffer.byteLength(js, "utf8");

    const minified = advancedMinify(js);

    if (!minified) {
      return NextResponse.json(
        { error: "Minification failed. Invalid or complex JS." },
        { status: 422 }
      );
    }

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
    console.error("JS Minifier Error:", err);

    return NextResponse.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}