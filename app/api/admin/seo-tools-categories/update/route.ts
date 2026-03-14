import { NextResponse } from "next/server"
import db from "@/app/lib/db"
import { put, del } from "@vercel/blob"

export async function POST(req: Request) {

  try {

    const form = await req.formData()

    const id = form.get("id")
    const name = form.get("name")
    const slug = form.get("slug")
    const description = form.get("description")
    const sortOrder = form.get("sortOrder") || 0
    const isActive = form.get("isActive") === "true"
    const oldIcon = form.get("oldIcon") as string

    const file = form.get("icon") as File | null

    let icon = oldIcon

    if (file && file.size > 0) {

      if (oldIcon) {
        await del(oldIcon, {
          token: process.env.BLOB_READ_WRITE_TOKEN
        })
      }

      const blob = await put(
        `seo-category/${Date.now()}-${file.name}`,
        file,
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN
        }
      )

      icon = blob.url
    }

    await db.query(
      `UPDATE seo_tools_categories 
       SET name=?,slug=?,description=?,icon=?,sortOrder=?,isActive=? 
       WHERE id=?`,
      [name, slug, description, icon, sortOrder, isActive ? 1 : 0, id]
    )

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json({
      success: false
    })

  }

}