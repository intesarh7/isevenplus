import { NextResponse } from "next/server"
import db from "@/app/lib/db"
import { del } from "@vercel/blob"

export async function POST(req:Request){

 const {id} = await req.json()

 const [rows]:any = await db.query(
  "SELECT icon FROM seo_tools_categories WHERE id=?",
  [id]
 )

 if(rows.length && rows[0].icon){

  await del(rows[0].icon,{
   token:process.env.BLOB_READ_WRITE_TOKEN
  })

 }

 await db.query(
 "DELETE FROM seo_tools_categories WHERE id=?",
 [id]
 )

 return NextResponse.json({success:true})
}