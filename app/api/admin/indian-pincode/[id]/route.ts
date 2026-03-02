import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  await db.query(
    `UPDATE indian_pincodes SET
     office_name=?,
     pincode=?,
     branch_type=?,
     delivery_status=?,
     division=?,
     region=?,
     circle=?,
     taluk=?,
     district=?,
     state=?
     WHERE id=?`,
    [
      body.office_name,
      body.pincode,
      body.branch_type,
      body.delivery_status,
      body.division,
      body.region,
      body.circle,
      body.taluk,
      body.district,
      body.state,
      id,
    ]
  );

  return NextResponse.json({ success: true });
}