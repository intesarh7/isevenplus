import db from "@/app/lib/db";
import { NextResponse } from "next/server";

function slugify(text:string){
  return text.toLowerCase().replace(/\s+/g,"-");
}

export async function POST(req:Request){

  const {name} = await req.json();

  const slug = slugify(name);

  await db.query(`
    INSERT INTO blog_categories (name,slug)
    VALUES (?,?)
  `,[name,slug]);

  return NextResponse.json({success:true});

}