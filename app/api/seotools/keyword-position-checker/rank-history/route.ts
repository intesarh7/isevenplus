import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  const { domain, keyword } = await req.json();

  const [rows]: any = await db.query(
    `SELECT position, updatedAt 
     FROM keyword_rank_cache 
     WHERE domain=? AND keyword=? 
     ORDER BY updatedAt ASC`,
    [domain, keyword]
  );

  return NextResponse.json({ history: rows });
}