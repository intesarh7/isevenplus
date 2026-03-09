import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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

    const filename = Date.now() + "-" + file.name;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`
    });

  } catch (error) {

    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );

  }

}