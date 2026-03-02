import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM worldwide_postal_codes WHERE 1";
  const values: any[] = [];

  if (search) {
    query += " AND (postal_code LIKE ? OR place_name LIKE ?)";
    values.push(`%${search}%`, `%${search}%`);
  }

  query += " ORDER BY id DESC LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const [rows]: any = await db.query(query, values);

  const [[count]]: any = await db.query(
    "SELECT COUNT(*) as total FROM worldwide_postal_codes"
  );

  return NextResponse.json({
    data: rows,
    total: count.total,
    page,
  });
}