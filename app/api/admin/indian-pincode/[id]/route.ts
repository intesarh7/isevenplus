import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// ✅ Next.js 15 Route Handler (params is Promise)

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔥 IMPORTANT: await params
    const { id } = await context.params;

    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

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
        body.office_name || null,
        body.pincode || null,
        body.branch_type || null,
        body.delivery_status || null,
        body.division || null,
        body.region || null,
        body.circle || null,
        body.taluk || null,
        body.district || null,
        body.state || null,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Pincode updated successfully",
    });

  } catch (error) {
    console.error("PUT Indian Pincode Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}