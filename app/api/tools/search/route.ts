import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    let query = `
      SELECT name, slug, usageCount 
      FROM tools 
      WHERE isActive=1 AND isDeleted=0
    `;

    if (q) {
      query += ` AND name LIKE '%${q}%'`;
    }

    query += ` ORDER BY usageCount DESC LIMIT 10`;

    const [tools] = await db.query<RowDataPacket[]>(query);

    return NextResponse.json(tools);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}