import db from "@/app/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {

    const { slug, rating } = await req.json();
    const ratingValue = Number(rating);

    if (!slug || !ratingValue) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT rating, ratingCount FROM tools WHERE slug=?",
      [slug]
    );

    const currentRating = Number(rows[0].rating) || 0;
    const currentCount = Number(rows[0].ratingCount) || 0;

    const newCount = currentCount + 1;
    const newRating =
      (currentRating * currentCount + ratingValue) / newCount;

    await db.query(
      "UPDATE tools SET rating=?, ratingCount=? WHERE slug=?",
      [newRating.toFixed(1), newCount, slug]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}