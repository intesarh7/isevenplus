import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200);

    return NextResponse.json({
      words,
      characters,
      sentences,
      paragraphs,
      readingTime,
    });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}