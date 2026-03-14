import db from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
req:Request,
{params}:{params:{id:string}}
){

const body = await req.json()

if(body.type==="active"){

await db.query(
`UPDATE seo_tools
SET isActive = IF(isActive=1,0,1)
WHERE id=?`,
[params.id]
)

}

if(body.type==="paid"){

await db.query(
`UPDATE seo_tools
SET isFree = IF(isFree=1,0,1),
isPaid = IF(isPaid=1,0,1)
WHERE id=?`,
[params.id]
)

}

return NextResponse.json({success:true})

}