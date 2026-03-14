import db from "@/app/lib/db"
import { RowDataPacket } from "mysql2"

export async function autoLink(text: string) {

  if (!text) return ""

  /* ===============================
     FETCH SEO TERMS
  ================================= */

  const [categories] = await db.query<RowDataPacket[]>(`
    SELECT name,slug
    FROM seo_tools_categories
    WHERE isDeleted=0 AND isActive=1
  `)

  const [tools] = await db.query<RowDataPacket[]>(`
    SELECT name,slug
    FROM seo_tools
    WHERE isDeleted=0 AND isActive=1
  `)

  let output = text

  /* ===============================
     CATEGORY LINKS
  ================================= */

  categories.forEach((cat: any) => {

    const regex = new RegExp(`\\b${cat.name}\\b`, "gi")

    output = output.replace(
      regex,
      `<a href="/seotools/category/${cat.slug}" class="text-indigo-600 underline">${cat.name}</a>`
    )

  })

  /* ===============================
     TOOL LINKS
  ================================= */

  tools.forEach((tool: any) => {

    const regex = new RegExp(`\\b${tool.name}\\b`, "gi")

    output = output.replace(
      regex,
      `<a href="/seotools/${tool.slug}" class="text-indigo-600 underline">${tool.name}</a>`
    )

  })

  return output

}