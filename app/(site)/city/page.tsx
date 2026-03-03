import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";

export default async function StateListPage() {
  const [states] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT state 
     FROM indian_pincodes
     WHERE state IS NOT NULL
     AND TRIM(state) != ''
     ORDER BY state ASC`
  );

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Browse All States</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {states.map((item: any, index: number) => (
          <a
            key={index}
            href={`/state/${generateSlug(item.state)}`}
            className="border p-4 rounded hover:shadow"
          >
            {item.state}
          </a>
        ))}
      </div>
    </main>
  );
}