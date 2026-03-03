import db from "@/app/lib/db";
import { RowDataPacket } from "mysql2";

export default async function CityListPage() {
  const [cities] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT district 
     FROM indian_pincodes
     WHERE district IS NOT NULL
     AND TRIM(district) != ''
     ORDER BY district ASC`
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
      <h1 className="text-3xl font-bold mb-8">Browse All Cities</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cities.map((item: any, index: number) => (
          <a
            key={index}
            href={`/city/${generateSlug(item.district)}`}
            className="border p-4 rounded hover:shadow"
          >
            {item.district}
          </a>
        ))}
      </div>
    </main>
  );
}