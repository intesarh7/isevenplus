import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: Request) {

  try {

    const data = await req.formData();
    const file: any = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-");

    // ROOT uploads folder (not inside public)
    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );

  }

}