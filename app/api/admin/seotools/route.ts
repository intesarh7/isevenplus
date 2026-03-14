import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    const [rows] = await db.query(
        `SELECT 
        t.*,
        c.name as categoryName
        FROM seo_tools t
        LEFT JOIN seo_tools_categories c
        ON t.categoryId = c.id
        ORDER BY t.id DESC`
    )

    return NextResponse.json(rows)

}

export async function POST(req: Request) {

    const body = await req.json();

    await db.query(

        `INSERT INTO seo_tools
(name,slug,description,meta_title,meta_description,price,isFree,isPaid,isActive,dailyLimit,monthlyLimit,createdAt)

VALUES(?,?,?,?,?,?,?,?,?,?,?,NOW())`,

        [
            body.name,
            body.slug,
            body.description,
            body.meta_title,
            body.meta_description,
            body.price,
            body.isFree,
            body.isPaid,
            body.isActive,
            body.dailyLimit,
            body.monthlyLimit
        ]

    )

    return NextResponse.json({
        success: true
    })

}