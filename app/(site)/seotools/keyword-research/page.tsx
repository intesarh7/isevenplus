import db from "@/app/lib/db"
import Link from "next/link"
import { RowDataPacket } from "mysql2"

export const dynamic = "force-dynamic"

export default async function KeywordResearchToolsPage() {

    const [tools] = await db.query<RowDataPacket[]>(`

SELECT name,slug,description,usageCount

FROM seo_tools

WHERE isDeleted=0
AND isActive=1
AND categoryId = (
SELECT id FROM seo_tools_categories
WHERE slug='keyword-research'
LIMIT 1
)

ORDER BY usageCount DESC

`)

    return (

        <div className="max-w-6xl mx-auto py-10">

            <h1 className="text-4xl font-bold mb-4">
                Keyword Research Tools
            </h1>

            <p className="text-gray-600 max-w-2xl mb-10">

                Keyword research tools help you discover search terms your audience is using
                so you can optimize content, improve rankings, and increase organic traffic.

            </p>

            <div className="grid md:grid-cols-3 gap-6">

                {tools.map((tool: any) => (

                    <Link
                        key={tool.slug}
                        href={`/seotools/${tool.slug}`}
                        className="border rounded-xl p-5 hover:shadow-lg transition"
                    >

                        <h2 className="font-semibold mb-2">
                            {tool.name}
                        </h2>

                        <p className="text-sm text-gray-500 line-clamp-3">
                            {tool.description}
                        </p>

                    </Link>

                ))}

            </div>

        </div>

    )

}