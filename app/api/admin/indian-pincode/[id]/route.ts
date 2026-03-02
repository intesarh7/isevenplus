import db from "@/app/lib/db";
import { NextResponse } from "next/server";

// ✅ Correct Params Type (NO Promise here)
interface RouteContext {
  params: {
    id: string;
  };
}

// ✅ PUT - Update Indian Pincode
export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    const body = await req.json();

    // ✅ Basic validation
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