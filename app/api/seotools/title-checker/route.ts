import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function generateAlgorithmTitles(keyword: string) {

  const modifiers = [
    "Best","Free","Top","Advanced","Ultimate",
    "Professional","Smart","Complete","Fast","Online"
  ];

  const suffix = [
    "Tool","Checker","Analyzer","Generator","Optimizer"
  ];

  const seoEnds = [
    "for SEO",
    "SEO Optimization",
    "Improve Rankings",
    "Free Online Tool",
    "SEO Tool"
  ];

  const suggestions = new Set<string>();

  for (let i = 0; i < 200; i++) {

    const m = modifiers[Math.floor(Math.random()*modifiers.length)];
    const s = suffix[Math.floor(Math.random()*suffix.length)];
    const e = seoEnds[Math.floor(Math.random()*seoEnds.length)];

    const patterns = [

      `${keyword} ${s} – ${e}`,

      `${m} ${keyword} ${s}`,

      `${m} ${keyword} ${s} ${e}`,

      `${keyword} ${s} Online`,

      `${keyword} ${s} – Free Tool`,

      `${m} ${keyword} ${s} Tool`

    ];

    const generated =
      patterns[Math.floor(Math.random()*patterns.length)];

    if(generated.length <= 60){
      suggestions.add(generated);
    }

  }

  return Array.from(suggestions);

}

async function generateAITitles(keyword:string){

  try{

    const res = await fetch("https://api.openai.com/v1/chat/completions",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },

      body:JSON.stringify({

        model:"gpt-4o-mini",

        messages:[
          {
            role:"user",
            content:`Generate 10 SEO optimized titles (max 60 characters) for: ${keyword}`
          }
        ]

      })

    });

    const json = await res.json();

    const text =
      json.choices?.[0]?.message?.content || "";

    return text
      .split("\n")
      .map((t:string)=>t.replace(/^\d+\.?\s*/,"").trim())
      .filter(Boolean);

  }catch{

    return [];

  }

}

export async function POST(req:Request){

  const {title} = await req.json();

  const clean = title
    .replace(/[^\w\s]/gi,"")
    .trim()
    .replace(/\s+/g," ");

  const keyword = titleCase(clean);

  const algorithmTitles = generateAlgorithmTitles(keyword);

  const aiTitles = await generateAITitles(keyword);

  const suggestions = [...new Set([
    ...algorithmTitles,
    ...aiTitles
  ])];

  const length = title.length;

  let status = "bad";
  let message = "";

  if(length < 30){
    message = "Title too short";
  }

  if(length >= 50 && length <= 60){
    message = "Perfect SEO title length";
    status = "good";
  }

  if(length > 60){
    message = "Title too long";
  }

  return NextResponse.json({

    length,
    status,
    message,
    suggestions

  });

}