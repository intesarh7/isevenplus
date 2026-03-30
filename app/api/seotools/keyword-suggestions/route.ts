import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

function detectIntent(keyword: string) {

    const k = keyword.toLowerCase();

    if (k.includes("buy") || k.includes("price")) return "Transactional";
    if (k.includes("best") || k.includes("review")) return "Commercial";
    if (k.includes("how") || k.includes("what")) return "Informational";

    return "Navigational";
}

function randomVolume() {
    return Math.floor(Math.random() * 20000) + 200;
}

function randomCPC() {
    return Number((Math.random() * 4 + 0.2).toFixed(2));
}

function keywordDifficulty(volume: number) {

    const score = Math.min(100, Math.round(volume / 200));

    if (score < 30) return { score, label: "Easy" };
    if (score < 60) return { score, label: "Medium" };

    return { score, label: "Hard" };
}

async function googleAutocomplete(keyword: string) {

    try {

        const res = await fetch(
            `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(keyword)}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            }
        );

        const data = await res.json();

        return data?.[1] || [];

    } catch {

        return [];

    }

}

async function aiKeywords(keyword: string, limit: number) {

    if (!OPENROUTER_API_KEY) {

        return { keywords: [], questions: [] };

    }

    const prompt = `
Generate ${limit} SEO keyword suggestions for "${keyword}".

Rules:
- Only real search keywords
- Avoid alphabet patterns like "keyword a"
- Mix informational, commercial, transactional keywords

Return JSON:

{
"keywords":[...],
"questions":[...]
}
`;

    try {

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await res.json();

        const text = data?.choices?.[0]?.message?.content || "";

        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {

            return { keywords: [], questions: [] };

        }

        return JSON.parse(match[0]);

    } catch {

        return { keywords: [], questions: [] };

    }

}

function opportunityScore(volume: number, difficulty: number) {

    if (!difficulty) return 0;

    const score = Math.round(volume / difficulty);

    if (score > 200) return 100;

    return score;

}

function clusterKeyword(keyword: string) {

    const k = keyword.toLowerCase();

    if (k.includes("how")) return "Informational";
    if (k.includes("best")) return "Commercial";
    if (k.includes("buy")) return "Transactional";

    return "General";

}

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url);

        const keyword = searchParams.get("keyword") || "";
        const limit = Number(searchParams.get("limit") || 20);
        const country = searchParams.get("country") || "us";

        if (!keyword) {

            return NextResponse.json(
                { error: "Keyword required" },
                { status: 400 }
            );

        }

        const auto = await googleAutocomplete(keyword);

        const ai = await aiKeywords(keyword, limit);

        const allKeywords = [

            ...auto,
            ...(ai.keywords || [])

        ];

        const unique = [...new Set(allKeywords)].slice(0, limit);

        const suggestions = unique.map((k) => {

            const volume = randomVolume();

            const difficulty = keywordDifficulty(volume);

            const serpCompetition = Math.floor(Math.random() * 100);

            return {

                keyword: k,
                volume,
                cpc: randomCPC(),
                intent: detectIntent(k),
                cluster: clusterKeyword(k),
                difficulty: difficulty.score,
                difficultyLabel: difficulty.label,
                serpCompetition,
                opportunity: opportunityScore(volume, difficulty.score),
                country

            };

        });

        const questions = ai.questions?.length >= 10
            ? ai.questions
            : [
                `What is ${keyword}?`,
                `How to use ${keyword}?`,
                `Why is ${keyword} important?`,
                `How does ${keyword} work?`,
                `Best tools for ${keyword}?`,
                `How to improve ${keyword}?`,
                `Examples of ${keyword}?`,
                `What are benefits of ${keyword}?`,
                `How to learn ${keyword}?`,
                `Is ${keyword} good for SEO?`
            ];

        return NextResponse.json({

            keyword,
            country,
            suggestions,
            questions

        });

    } catch {

        return NextResponse.json(
            { error: "Keyword generation failed" },
            { status: 500 }
        );

    }

}