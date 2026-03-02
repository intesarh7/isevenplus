import db from "@/app/lib/db";
import Link from "next/link";
import { RowDataPacket } from "mysql2";
import {
  Calculator,
  Star,
  TrendingUp,
  MapPin,
  Layers,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

 export const dynamic = "auto";

export const metadata = {
  title: "iSevenPlus – Free Online Calculators & Smart Tools",
  description:
    "Free online calculators, construction tools, finance tools, and worldwide pincode search.",
};

export default async function HomePage() {
  let categories: any[] = [];
  let featuredTools: any[] = [];
  let trendingTools: any[] = [];

  try {
    const [cat] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tool_categories LIMIT 6"
    );
    categories = cat;

    const [feat] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tools WHERE isActive=1 AND isDeleted=0 ORDER BY usageCount DESC LIMIT 8"
    );
    featuredTools = feat;

    const [trend] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tools WHERE isActive=1 AND isDeleted=0 ORDER BY rating DESC LIMIT 6"
    );
    trendingTools = trend;
  } catch (err) {
    console.error("Homepage DB Error:", err);
  }

  return (
    <main className="bg-gray-50">

      {/* 1️⃣ HERO */}
      <section className="text-center py-20 bg-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Smart Online Calculators & Tools
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional tools for construction, finance, daily calculations and pincode search.
        </p>
        <Link
          href="/tools"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
        >
          Explore Tools
        </Link>
      </section>

      {/* 2️⃣ CATEGORIES */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">
            Popular Categories
          </h2>

          <Link
            href="/categories"
            className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <Layers className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3️⃣ FEATURED */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold">
              Featured Tools
            </h2>

            <Link
              href="/tools"
              className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredTools.map((tool: any) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="border p-6 rounded-2xl hover:shadow-lg transition bg-gray-50"
              >
                <Calculator className="w-6 h-6 text-indigo-600 mb-3" />
                <h3 className="font-semibold mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-500">
                  ⭐ {tool.rating} ({tool.ratingCount})
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ TRENDING */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold">
              Trending Tools
            </h2>

            <Link
              href="/tools?sort=trending"
              className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trendingTools.map((tool: any) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <TrendingUp className="w-6 h-6 text-indigo-600 mb-3" />
                <h3 className="font-semibold">{tool.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ PINCODE */}
      <section className="py-16 px-6 bg-indigo-50 text-center">
        <MapPin className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
        <h2 className="text-3xl font-bold mb-4">
          Indian & Worldwide Pincode Search
        </h2>
        <Link
          href="/pincode"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Search Pincode
        </Link>
      </section>

      {/* 6️⃣ WHY */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose iSevenPlus?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Star className="w-8 h-8 mx-auto text-indigo-600 mb-4" />
            <h3 className="font-semibold">Accurate Calculations</h3>
          </div>
          <div>
            <Calculator className="w-8 h-8 mx-auto text-indigo-600 mb-4" />
            <h3 className="font-semibold">100% Free</h3>
          </div>
          <div>
            <TrendingUp className="w-8 h-8 mx-auto text-indigo-600 mb-4" />
            <h3 className="font-semibold">Fast & Responsive</h3>
          </div>
        </div>
      </section>

      {/* 7️⃣ FAQ */}
      <section className="py-16 px-6 bg-white text-center">
        <HelpCircle className="w-8 h-8 mx-auto text-indigo-600 mb-4" />
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-semibold">Are these tools free?</h3>
            <p className="text-gray-600">
              Yes, all calculators and tools on iSevenPlus are completely free.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Are calculations accurate?</h3>
            <p className="text-gray-600">
              Yes, tools use verified mathematical formulas.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}