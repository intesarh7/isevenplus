import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {

  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("FILE NAME:", file.name);

    const filename =
      Date.now() + "-" + file.name.replace(/\s+/g, "-");

    const blob = await put(filename, file, {
      access: "public",
    });

    console.log("BLOB URL:", blob.url);

    return NextResponse.json({
      success: true,
      url: blob.url,
    });

  } catch (error: any) {

    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: "Upload failed",
        details: error.message
      },
      { status: 500 }
    );

  }

}