import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const { keyword, tone } = await req.json();

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://chatgpt-42.p.rapidapi.com/chat",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Generate exactly 10 SEO optimized blog titles for keyword "${keyword}" in ${tone} tone.

Rules:
- Each title on new line
- No numbering
- No explanation
- Max 60 characters
- High CTR focused

Output only titles.`,
            },
          ],
          web_access: false,
        }),
      }
    );

    const data = await response.json();
    console.log("RAPID RAW:", data);

    let titles: string[] = [];

    // ✅ SAFE PARSER
    if (data?.result) {
      const raw = data.result;

      titles = raw
        .split(/\n|\r/)
        .map((line: string) =>
          line
            .replace(/^\d+[\).\s-]*/, "")
            .replace(/["']/g, "")
            .trim()
        )
        .filter((line: string) => line.length > 10);
    }

    // ✅ FALLBACK 1 (if weird response)
    if (titles.length === 0 && data?.result) {
      titles = [data.result];
    }

    // ✅ FALLBACK 2 (ULTRA IMPORTANT)
    if (titles.length === 0) {
      titles = [
        `Best ${keyword} in 2026 – Complete Guide`,
        `Top 10 ${keyword} You Must Try Today`,
        `${keyword} Guide – Everything You Need to Know`,
        `How to Choose ${keyword} (Expert Tips)`,
        `Ultimate ${keyword} List for Beginners`,
      ];
    }

    return NextResponse.json({ titles });

  } catch (error) {
    console.error("API ERROR:", error);

    // ✅ HARD FAIL FALLBACK
    return NextResponse.json({
      titles: [
        "Best SEO Tips for 2026",
        "Top SEO Strategies You Must Try",
        "Complete SEO Guide for Beginners",
      ],
    });
  }
}