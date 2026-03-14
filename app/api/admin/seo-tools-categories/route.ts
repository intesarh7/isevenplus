import db from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET() {

    const [rows]: any = await db.query(

        `SELECT id,name
         FROM seo_tools_categories
         WHERE isDeleted=0
         AND isActive=1
         ORDER BY sortOrder ASC`

    )

    return NextResponse.json(rows)

}