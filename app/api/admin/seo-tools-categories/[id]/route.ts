import { NextResponse } from "next/server"
import db from "@/app/lib/db"

export async function GET(
 req:Request,
 {params}:{params:{id:string}}
){

 const [rows]:any = await db.query(
  "SELECT * FROM seo_tools_categories WHERE id=?",
  [params.id]
 )

 if(!rows.length){
  return NextResponse.json({success:false})
 }

 return NextResponse.json(rows[0])
}