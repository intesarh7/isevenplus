import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { keyword } = await req.json();

    if (!keyword) {

      return NextResponse.json({ outline: [] });

    }

    const outline = [

      `Introduction to ${keyword}`,
      `What is ${keyword}?`,
      `Benefits of ${keyword}`,
      `How ${keyword} Works`,
      `Best Strategies for ${keyword}`,
      `Common Mistakes in ${keyword}`,
      `Tools for ${keyword}`,
      `Future of ${keyword}`,
      `Conclusion`

    ];

    return NextResponse.json({ outline });

  } catch {

    return NextResponse.json({ outline: [] });

  }

}