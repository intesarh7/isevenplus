import db from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  const [rows]: any = await db.query(
    `SELECT * FROM seo_tools WHERE id=?`,
    [params.id]
  )

  return NextResponse.json(rows[0])

}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json()

  await db.query(

    `UPDATE seo_tools SET
    name=?,
    slug=?,
    categoryId=?,
    meta_title=?,
    meta_description=?,
    description=?,
    price=?,
    dailyLimit=?,
    monthlyLimit=?,
    apiProvider=?,
    apiEndpoint=?,
    isFree=?,
    isActive=?,
    updatedAt=NOW()
    WHERE id=?`,

    [
      body.name,
      body.slug,
      body.categoryId,
      body.meta_title,
      body.meta_description,
      body.description,
      body.price,
      body.dailyLimit,
      body.monthlyLimit,
      body.apiProvider,
      body.apiEndpoint,
      body.isFree,
      body.isActive,
      params.id
    ]

  )

  return NextResponse.json({ success: true })

}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json()

  // Toggle Active
  if (body.type === "active") {

    await db.query(
      `UPDATE seo_tools 
       SET isActive = IF(isActive=1,0,1) 
       WHERE id=?`,
      [params.id]
    )

  }

  // Toggle Paid / Free
  if (body.type === "paid") {

    await db.query(
      `UPDATE seo_tools 
       SET 
       isFree = IF(isFree=1,0,1),
       isPaid = IF(isPaid=1,0,1)
       WHERE id=?`,
      [params.id]
    )

  }

  return NextResponse.json({
    success: true
  })

}