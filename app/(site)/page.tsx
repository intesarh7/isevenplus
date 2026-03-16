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
  Search,
  FileText,
} from "lucide-react";
import PostOfficeLocator from "../components/PostOfficeLocator";
import PincodeAutoSuggest from "../components/PincodeAutoSuggest";
import PincodeTabs from "../components/PincodeTabs";

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
  let popularCalculators: any[] = [];
  let popularCities: any[] = [];
  let popularStates: any[] = [];
  let topPincodes: any[] = [];

  let totalTools = 0;
  let totalSeoTools = 0;
  let totalPincodes = 0;
  let totalBlogs = 0;



  try {
    /* Popular Calculators */
    const [popularCalc] = await db.query<RowDataPacket[]>(`
  SELECT name, slug 
  FROM tools
  WHERE isActive=1 AND isDeleted=0
  ORDER BY usageCount DESC
  LIMIT 8
`);
    popularCalculators = popularCalc;

    /* Popular Cities */
    const [cities] = await db.query<RowDataPacket[]>(`
  SELECT district, COUNT(*) as total
  FROM indian_pincodes
  GROUP BY district
  ORDER BY total DESC
  LIMIT 8
`);
    popularCities = cities;

    /* Popular States */
    const [states] = await db.query<RowDataPacket[]>(`
  SELECT state, COUNT(*) as total
  FROM indian_pincodes
  GROUP BY state
  ORDER BY total DESC
  LIMIT 8
`);
    popularStates = states;

    /* Top Pincodes */
    const [pincodes] = await db.query<RowDataPacket[]>(`
SELECT pincode
FROM indian_pincodes
WHERE pincode REGEXP '^[0-9]{6}$'
GROUP BY pincode
ORDER BY COUNT(*) DESC
LIMIT 8
`);
    topPincodes = pincodes;
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

  /* TOTAL TOOLS */
  const [toolCount] = await db.query<RowDataPacket[]>(`
SELECT COUNT(*) as total FROM tools WHERE isActive=1 AND isDeleted=0
`);
  totalTools = toolCount[0].total;

  /* SEO TOOLS COUNT */
  const [seoCount] = await db.query<RowDataPacket[]>(`
SELECT COUNT(*) AS total
FROM seo_tools
WHERE isActive = 1
`);

  totalSeoTools = seoCount[0]?.total || 0;

  /* PINCODES */
  const [pinCount] = await db.query<RowDataPacket[]>(`
SELECT COUNT(DISTINCT pincode) as total FROM indian_pincodes
`);
  totalPincodes = pinCount[0].total;

  /* BLOGS */
  const [blogCount] = await db.query<RowDataPacket[]>(`
SELECT COUNT(*) as total FROM blogs
`);
  totalBlogs = blogCount[0].total;

  return (
    <main className="">

      {/* 1️⃣ HERO */}
      <section className="text-center pt-10 bg-white">
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
        <section className="mx-auto p-5">
          <PincodeTabs />
      </section>
      </section>

      {/* DASHBOARD CARDS */}

      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-6">

          {/* Calculator Tools */}
          <Link
            href="/tools"
            className="group bg-orange-50 border border-orange-200 p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Calculator className="w-8 h-8 text-orange-600" />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              Calculator Tools
            </h3>

            <p className="text-2xl font-bold text-gray-900">
              {totalTools}
            </p>

            <p className="text-sm text-gray-500">
              Online calculators available
            </p>
          </Link>


          {/* SEO Tools */}
          <Link
            href="/seotools"
            className="group bg-green-50 border border-green-200 p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Search className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              SEO Tools
            </h3>

            <p className="text-2xl font-bold text-gray-900">
              {totalSeoTools}
            </p>

            <p className="text-sm text-gray-500">
              Free SEO tools available
            </p>
          </Link>


          {/* Pincode Database */}
          <Link
            href="/pincode"
            className="group bg-blue-50 border border-blue-200 p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              Pincode Database
            </h3>

            <p className="text-2xl font-bold text-gray-900">
              {totalPincodes}
            </p>

            <p className="text-sm text-gray-500">
              Indian pincodes indexed
            </p>
          </Link>


          {/* Blog Articles */}
          <Link
            href="/blogs"
            className="group bg-yellow-50 border border-yellow-200 p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Layers className="w-8 h-8 text-yellow-600" />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              Blog Articles
            </h3>

            <p className="text-2xl font-bold text-gray-900">
              {totalBlogs}
            </p>

            <p className="text-sm text-gray-500">
              Guides & tutorials
            </p>
          </Link>

        </div>

      </section>


      {/* 2️⃣ CATEGORIES */}
      <section className="max-w-6xl mx-auto py-16 px-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">
            Popular Categories
          </h2>

          <Link
            href="/categories"
            className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
          >
            View All Categories
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
              View All Tools
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
              All Trending Tools
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

      {/* POPULAR CALCULATORS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Popular Calculators
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

            {popularCalculators.map((tool: any) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="border p-4 rounded-xl hover:shadow"
              >
                {tool.name}
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

      {/* POPULAR CITY PINCODES */}
      <section className="py-16 px-6 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Popular Cities Pincode
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

            {popularCities.map((city: any) => (
              <Link
                key={city.district}
                href={`/city/${city.district.toLowerCase().replace(/\s+/g, "-")}`}
                className="border p-4 rounded-xl hover:shadow"
              >
                {city.district} Pincode
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* PINCODE BY STATE */}
      <section className="py-16 px-6 bg-white">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Pincode by State
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

            {popularStates.map((state: any) => (
              <Link
                key={state.state}
                href={`/state/${state.state.toLowerCase().replace(/\s+/g, "-")}`}
                className="border p-4 rounded-xl hover:shadow"
              >
                {state.state}
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* TOP PINCODES */}
      <section className="py-16 px-6 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Popular Pincodes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

            {topPincodes.map((pin: any) => (
              <Link
                key={pin.pincode}
                href={`/pincode/${pin.pincode}`}
                className="border p-4 rounded-xl hover:shadow"
              >
                {pin.pincode}
              </Link>
            ))}

          </div>

        </div>
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

      {/* GUIDES */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Helpful Guides
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Link href="/blogs/how-to-find-your-area-pincode-in-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              How to Find Your Area Pincode in India
            </Link>

            <Link href="/blogs/what-is-a-postal-code" className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              What is a Postal Code?
            </Link>

            <Link href="/blogs/how-post-offices-work-in-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              How Post Offices Work in India
            </Link>

          </div>

        </div>
      </section>

      {/* 7️⃣ FAQ */}
      <section className="py-20 px-6 bg-white text-center">

        <HelpCircle className="w-10 h-10 mx-auto text-indigo-600 mb-4" />

        <h2 className="text-3xl font-bold mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-8 text-left">

          <div>
            <h3 className="font-semibold text-lg">
              Are the calculators on iSevenPlus completely free to use?
            </h3>
            <p className="text-gray-600 mt-1">
              Yes, all calculators and online tools available on iSevenPlus are 100% free to use.
              You can calculate EMI, GST, income tax, BMI, working days and many other values
              without any registration or hidden charges.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Are the calculation results accurate and reliable?
            </h3>
            <p className="text-gray-600 mt-1">
              Yes. All calculators use verified mathematical formulas and standard
              financial calculation methods to provide accurate and reliable results.
              However, the results should be used for estimation purposes only.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              How can I find the pincode of a city, district or area in India?
            </h3>
            <p className="text-gray-600 mt-1">
              You can easily search for any Indian postal code using the iSevenPlus
              pincode finder tool. Simply enter the city name, district name, state,
              or postal code to view the list of post offices and delivery details.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Can I search post office details using a pincode?
            </h3>
            <p className="text-gray-600 mt-1">
              Yes. By entering a pincode on iSevenPlus, you can view the complete list
              of post offices associated with that postal code including branch type,
              delivery status, division, and region.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              What types of online calculators are available on iSevenPlus?
            </h3>
            <p className="text-gray-600 mt-1">
              iSevenPlus provides a wide range of calculators including finance
              calculators, construction calculators, health and fitness tools,
              date and time calculators, and daily utility tools to simplify
              calculations for users worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Do I need to create an account to use the tools?
            </h3>
            <p className="text-gray-600 mt-1">
              No. All tools and calculators on iSevenPlus can be used instantly
              without creating an account or signing up. The platform is designed
              to provide quick and easy calculations for everyone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Can I use iSevenPlus calculators on mobile devices?
            </h3>
            <p className="text-gray-600 mt-1">
              Yes. iSevenPlus is fully responsive and works smoothly on mobile
              phones, tablets, laptops and desktop computers so you can access
              calculators and tools from any device.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              How often is the pincode database updated?
            </h3>
            <p className="text-gray-600 mt-1">
              The postal code database on iSevenPlus is regularly updated to ensure
              accurate information about Indian post offices, pincodes, and delivery
              areas.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}