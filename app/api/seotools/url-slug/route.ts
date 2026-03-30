import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const STOP_WORDS = [
  "a","an","the","is","are","was","were","in","on","at","to","for","of","and","or","with","by","from"
];

function basicSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function seoSlug(text: string) {
  let words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(word => word && !STOP_WORDS.includes(word));

  // limit words (SEO best practice)
  words = words.slice(0, 6);

  return words.join("-");
}

export async function POST(req: NextRequest) {
  try {
    const { text, mode } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input text" },
        { status: 400 }
      );
    }

    let slug;

    if (mode === "seo") {
      slug = seoSlug(text);
    } else {
      slug = basicSlug(text);
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Unable to generate slug" },
        { status: 422 }
      );
    }

    return NextResponse.json({ slug });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}