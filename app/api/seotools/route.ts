import db from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

const [rows] = await db.query(
`SELECT
id,
name,
slug,
isActive,
isFree,
isPaid,
dailyLimit,
monthlyLimit,
price,
usageCount
FROM seo_tools
WHERE isDeleted=0
ORDER BY id DESC`
)

return NextResponse.json(rows)

}