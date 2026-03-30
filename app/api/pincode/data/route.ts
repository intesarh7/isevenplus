import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export const dynamic = "force-dynamic"; // ✅ FIX

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "india";

    let results: any[] = [];

    if (query) {
      const searchTerm = `%${query}%`;

      const [rows]: any = await db.query(
        `SELECT 
          office_name AS officeName,
          pincode,
          branch_type,
          delivery_status,
          district,
          division,
          region,
          taluk,
          circle,
          state
        FROM indian_pincodes
        WHERE CAST(pincode AS CHAR) LIKE ?
        OR office_name LIKE ?
        OR district LIKE ?
        OR state LIKE ?
        ORDER BY district ASC
        LIMIT 50`,
        [searchTerm, searchTerm, searchTerm, searchTerm]
      );

      results = rows;
    }

    const [states]: any = await db.query(`
      SELECT state, COUNT(*) as total 
      FROM indian_pincodes
      WHERE state IS NOT NULL AND state != ''
      GROUP BY state
      ORDER BY state ASC
      LIMIT 50
    `);

    const [cities]: any = await db.query(`
      SELECT district, state, COUNT(*) as total
      FROM indian_pincodes
      GROUP BY district, state
      ORDER BY total DESC
      LIMIT 20
    `);

    const [posts]: any = await db.query(`
      SELECT 
        b.id, b.title, b.slug, b.featuredImage, b.createdAt
      FROM blogs b
      INNER JOIN blog_categories c ON b.categoryId = c.id
      WHERE c.slug = 'pincode'
      AND b.status = 'published'
      AND b.deletedAt IS NULL
      ORDER BY b.createdAt DESC
      LIMIT 6
    `);

    return NextResponse.json({
      results,
      states,
      cities,
      posts,
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: true, message: error.message, }, { status: 500 });
  }
}
