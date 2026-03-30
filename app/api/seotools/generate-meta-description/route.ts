import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
/* =========================
   CLEAN AI OUTPUT
========================= */

function cleanMetaDescription(text: string) {

  if (!text) return "";

  text = text.trim();

  // remove quotes
  text = text.replace(/^["']|["']$/g, "");

  // remove AI explanation lines
  text = text.replace(/^(here.*?:)/i, "");
  text = text.replace(/^(meta description:)/i, "");

  text = text.trim();

  return text;

}


/* =========================
   ENFORCE LENGTH
========================= */

function enforceLength(text: string) {

  if (!text) return "";

  text = text.trim();

  // if too long cut at word boundary
  if (text.length > 160) {

    text = text.substring(0, 160);

    const lastSpace = text.lastIndexOf(" ");

    if (lastSpace > 120) {
      text = text.substring(0, lastSpace);
    }

  }

  // if too short expand slightly
  if (text.length < 120) {

    const filler =
      " Boost visibility, improve click-through rates, and optimize your search performance.";

    text = text + filler;

    if (text.length > 160) {

      text = text.substring(0, 160);

      const lastSpace = text.lastIndexOf(" ");

      if (lastSpace > 120) {
        text = text.substring(0, lastSpace);
      }

    }

  }

  return text;

}



export async function POST(req: Request) {

  try {

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text required" },
        { status: 400 }
      );
    }


    /* =========================
       PROMPT
    ========================= */

    const prompt = `
Write ONLY an SEO meta description.

Requirements:
- Length must be between 120 and 160 characters
- No explanation
- No quotes
- No labels
- Only the meta description text

Content:
${text}
`;


    /* =========================
       OPENROUTER REQUEST
    ========================= */

    console.log("Calling OpenRouter AI...");

    const routerRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const routerData = await routerRes.json();

    console.log("OpenRouter status:", routerRes.status);
    console.log("OpenRouter response:", routerData);


    if (routerData?.choices?.length) {

      let result = routerData.choices[0].message.content;

      result = cleanMetaDescription(result);

      result = enforceLength(result);

      return NextResponse.json({
        result,
        provider: "openrouter",
        length: result.length
      });

    }


    return NextResponse.json({
      result: "AI generation failed."
    });


  } catch (error) {

    console.error("Server error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }

}