import { NextResponse } from "next/server"
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {

    const { text } = await req.json()

    try {

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {

            method: "POST",

            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                model: "openai/gpt-4o-mini",

                messages: [
                    {
                        role: "system",
                        content: "You are an SEO expert. Return ONLY JSON array."
                    },
                    {
                        role: "user",
                        content: `
Generate 10 SEO keywords related to this text.

Return ONLY JSON array with this format:

[
{
"keyword":"keyword",
"searchVolume":1000,
"difficulty":40,
"longTailKeyword":"long tail keyword"
}
]

Text:
${text}
`
                    }
                ]

            })

        })

        const data = await res.json()

        let output = data?.choices?.[0]?.message?.content || ""


        // remove markdown
        output = output.replace(/```json/g, "").replace(/```/g, "").trim()

        // extract json array safely
        const jsonMatch = output.match(/\[[\s\S]*\]/)

        let keywords: any[] = []

        if (jsonMatch) {

            keywords = JSON.parse(jsonMatch[0])

        }

        return NextResponse.json({ keywords })

    } catch (err) {

        console.error("AI ERROR:", err)

        return NextResponse.json({ keywords: [] })

    }

}