import db from "@/app/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM indian_pincodes WHERE 1";
  const values: any[] = [];

  if (search) {
    query += " AND (pincode LIKE ? OR office_name LIKE ?)";
    values.push(`%${search}%`, `%${search}%`);
  }

  query += " ORDER BY id DESC LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const [rows]: any = await db.query(query, values);

  const [[count]]: any = await db.query(
    "SELECT COUNT(*) as total FROM indian_pincodes"
  );



  return NextResponse.json({
    data: rows,
    total: count.total,
    page,
  });
}

// ADD NEW
export async function POST(req: Request) {
  const body = await req.json();

  const {
    office_name,
    pincode,
    branch_type,
    delivery_status,
    division,
    region,
    circle,
    taluk,
    district,
    state,
  } = body;

  await db.query(
    `INSERT INTO indian_pincodes 
    (office_name, pincode, branch_type, delivery_status,
     division, region, circle, taluk, district, state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      office_name,
      pincode,
      branch_type,
      delivery_status,
      division,
      region,
      circle,
      taluk,
      district,
      state,
    ]
  );

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await db.query("DELETE FROM indian_pincodes WHERE id=?", [id]);

  return NextResponse.json({ success: true });
}