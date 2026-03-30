import db from "@/app/lib/db"
import { NextResponse } from "next/server"
import { RowDataPacket } from "mysql2"
export const dynamic = "force-dynamic";
export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") || ""

    if (!q) {
        return NextResponse.json([])
    }

    const [rows] = await db.query<RowDataPacket[]>(

        `SELECT 
id,
name,
slug,
description,
usageCount,
isPaid,
isFree,
price

FROM seo_tools

WHERE isDeleted=0
AND isActive=1

AND (
name LIKE ?
OR slug LIKE ?
OR description LIKE ?
)

ORDER BY usageCount DESC
LIMIT 30
`,

        [
            `%${q}%`,
            `%${q}%`,
            `%${q}%`
        ]

    )

    return NextResponse.json(rows)

}