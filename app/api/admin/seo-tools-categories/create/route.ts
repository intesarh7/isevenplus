import { NextResponse } from "next/server"
import db from "@/app/lib/db"
import { put } from "@vercel/blob"

export async function POST(req:Request){

 const form = await req.formData()

 const name = form.get("name")
 const slug = form.get("slug")
 const description = form.get("description")
 const sortOrder = form.get("sortOrder") || 0
 const isActive = form.get("isActive") === "true"

 const file = form.get("icon") as File

 let icon = ""

 if(file){

  const blob = await put(
   `seo-category/${Date.now()}-${file.name}`,
   file,
   {
    access:"public",
    token:process.env.BLOB_READ_WRITE_TOKEN
   }
  )

  icon = blob.url

 }

 await db.query(
 `INSERT INTO seo_tools_categories
 (name,slug,description,icon,sortOrder,isActive)
 VALUES(?,?,?,?,?,?)`,
 [name,slug,description,icon,sortOrder,isActive]
 )

 return NextResponse.json({success:true})
}