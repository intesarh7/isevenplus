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
  Sparkles,
  Wrench,
  Building2,
  CalculatorIcon,
  ChevronDown,
} from "lucide-react";
import PincodeTabs from "../components/PincodeTabs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Free Online Calculators & SEO Tools - Fast, Accurate & Easy (2026)",
  description:
    "Use 100+ free calculators for SEO, finance, delivery & more. Fast results, no signup required. 100% free platform.",
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
  LIMIT 20
`);
    popularCalculators = popularCalc;

    /* Popular Cities */
    const [cities] = await db.query<RowDataPacket[]>(`
  SELECT district, COUNT(*) as total
  FROM indian_pincodes
  GROUP BY district
  ORDER BY total DESC
  LIMIT 20
`);
    popularCities = cities;

    /* Popular States */
    const [states] = await db.query<RowDataPacket[]>(`
  SELECT state, COUNT(*) as total
  FROM indian_pincodes
  GROUP BY state
  ORDER BY total DESC
  LIMIT 20
`);
    popularStates = states;

    /* Top Pincodes */
    const [pincodes] = await db.query<RowDataPacket[]>(`
SELECT pincode
FROM indian_pincodes
WHERE pincode REGEXP '^[0-9]{6}$'
GROUP BY pincode
ORDER BY COUNT(*) DESC
LIMIT 20
`);
    topPincodes = pincodes;
    const [cat] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tool_categories LIMIT 30"
    );
    categories = cat;

    const [feat] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tools WHERE isActive=1 AND isDeleted=0 ORDER BY usageCount DESC LIMIT 12"
    );
    featuredTools = feat;

    const [trend] = await db.query<RowDataPacket[]>(
      "SELECT * FROM tools WHERE isActive=1 AND isDeleted=0 ORDER BY rating DESC LIMIT 12"
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Free Online Calculators & SEO Tools (2026)<br></br> 100+ Smart Tools in One Place
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          100% free tools - Save time and boost productivity with powerful calculators, SEO tools & smart utilities — all in one place.
        </p>
        <Link
          href="/tools"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
        >
          Explore Tools
        </Link>
        <section className="mx-auto">
          <PincodeTabs />
        </section>
      </section>

      {/* DASHBOARD CARDS */}

      <section className="max-w-6xl mx-auto py-12">

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


      {/* CATEGORIES */}
      <section className="pb-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            Popular Categories
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {categories.map((cat: any, index: number) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative border rounded-2xl p-5 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
            >

              {/* HOVER GRADIENT */}
              <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

              {/* CONTENT */}
              <div className="relative z-10 flex items-start gap-4">

                {/* ICON BOX */}
                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
                  <Layers className="w-5 h-5" />
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-700">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Explore tools & calculators
                  </p>
                </div>

                {/* ARROW */}
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />

              </div>

            </Link>
          ))}

        </div>

      </section>

      {/* FEATURED */}
      <section className="bg-white pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">

            {featuredTools.map((tool: any, index: number) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
              >

                {/* ICON + NAME */}
                <div className="flex items-center gap-2 mb-2">
                  <Calculator
                    size={16}
                    className="text-indigo-500 group-hover:scale-110 transition"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 line-clamp-2">
                    {tool.name}
                  </span>
                </div>

                {/* ⭐ RATING SECTION */}
                <div className="flex items-center justify-start gap-2.5 text-xs mt-2">

                  {/* ⭐ STARS */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${i < Math.round(tool.rating || 4)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>

                  {/* COUNT */}
                  <div className="text-gray-400">
                    ({tool.ratingCount || "1k+"})
                  </div>

                  {/* ARROW */}
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400"
                  />

                </div>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="pb-16">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={22} />
              Trending Tools
            </h2>

            <Link
              href="/tools"
              className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
            >
              All Trending Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {trendingTools.map((tool: any, index: number) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group relative border rounded-2xl p-5 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
              >

                {/* 🔥 TRENDING BADGE */}
                {index < 3 && (
                  <span className="absolute top-3 right-3 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    🔥 Trending
                  </span>
                )}

                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

                {/* CONTENT */}
                <div className="relative z-10 flex items-start gap-4">

                  {/* ICON BOX */}
                  <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
                    <TrendingUp className="w-5 h-5" />
                  </div>

                  {/* TEXT */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-700 line-clamp-2">
                      {tool.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Fast • Accurate • Free
                    </p>
                  </div>

                  {/* ARROW */}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* POPULAR CALCULATORS */}
      <section className="pb-16">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <CalculatorIcon size={18} className="text-indigo-600" />
            Popular Calculators
          </h2>

          <Link
            href="/tools"
            className="text-sm text-indigo-600 flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">

          {popularCalculators.map((tool: any, index: number) => (
            <Link
              key={index}
              href={`/tools/${tool.slug}`}
              className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
            >

              {/* ICON + NAME */}
              <div className="flex items-center gap-2 mb-2">
                <CalculatorIcon
                  size={16}
                  className="text-indigo-500 group-hover:scale-110 transition"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                  {tool.name}
                </span>
              </div>

              {/* OPTIONAL TAG */}
              <div className="text-xs text-gray-500 flex justify-between items-center">
                <span>Calculator</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
              </div>

            </Link>
          ))}

        </div>

      </section>

      {/* PINCODE */}
      <section className="pb-20 pt-16 px-4 bg-linear-to-b from-indigo-50 via-white to-white text-center relative overflow-hidden">

        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 `w-100 h-100 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-2xl mx-auto">

          {/* ICON */}
          <div className="flex justify-center mb-5 animate-bounce">
            <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
              <MapPin className="w-8 h-8" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Indian & Worldwide <span className="text-indigo-600">Pincode Search</span>
          </h2>

          {/* SUBTEXT */}
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Find accurate pincodes and postal codes instantly across India and worldwide.
          </p>

          {/* BUTTON */}
          <Link
            href="/pincode"
            className="group inline-flex items-center justify-center px-7 py-3 rounded-xl 
  border border-indigo-600 bg-indigo-600 text-white font-medium 
  transition-all duration-300 
  hover:bg-white hover:text-indigo-600 hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              Search Pincode Instantly
            </span>
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>

        </div>

      </section>

      {/* POPULAR CITY PINCODES */}
      <section className="pb-16">

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MapPin size={18} className="text-indigo-600" />
              Popular Cities Pincode
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">

            {popularCities.map((city: any, index: number) => {

              const citySlug = city.district
                ?.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");

              return (
                <Link
                  key={index}
                  href={`/city/${citySlug}`}
                  className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
                >

                  {/* ICON + NAME */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin
                      size={16}
                      className="text-indigo-500 group-hover:scale-110 transition"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {city.district} Pincode
                    </span>
                  </div>

                  {/* COUNT */}
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>{city.total} pincodes</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* PINCODE BY STATE */}
      <section className="pb-16 bg-white">

        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MapPin size={18} className="text-indigo-600" />
              Pincode by State
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">

            {popularStates.map((state: any, index: number) => {

              const stateSlug = state.state
                ?.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");

              return (
                <Link
                  key={index}
                  href={`/state/${stateSlug}`}
                  className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
                >

                  {/* ICON + NAME */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin
                      size={16}
                      className="text-indigo-500 group-hover:scale-110 transition"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                      {state.state || "Unknown State"}
                    </span>
                  </div>

                  {/* COUNT (optional agar hai to) */}
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>
                      {state.total ? `${state.total} pincodes` : "View Details"}
                    </span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* TOP PINCODES */}
      <section className="pb-16">

        <div className="">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-5">
            Popular Pincodes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {topPincodes.map((pin: any, index: number) => {

              const cleanPin = pin.pincode?.toString().trim();

              return (
                <Link
                  key={index}
                  href={`/pincode/${cleanPin}`}
                  className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between"
                >

                  {/* ICON + PINCODE */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin
                      size={16}
                      className="text-indigo-500 group-hover:scale-110 transition"
                    />
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700">
                      {cleanPin}
                    </span>
                  </div>

                  {/* LABEL / EXTRA INFO */}
                  <div className="text-xs text-gray-500 flex justify-between items-center">
                    <span>Pincode</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* WHY */}
      <section className="pb-20 px-4 bg-linear-to-b from-white to-gray-50">

        <div className="max-w-6xl mx-auto text-center">

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-indigo-600">iSevenPlus?</span>
          </h2>

          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-sm md:text-base">
            Powerful tools, accurate results, and lightning-fast performance — all in one place.
          </p>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {[
              {
                icon: Star,
                text: "Accurate Calculations",
                color: "text-indigo-600 bg-indigo-100",
              },
              {
                icon: Calculator,
                text: "100% Free",
                color: "text-blue-600 bg-blue-100",
              },
              {
                icon: TrendingUp,
                text: "Fast & Responsive",
                color: "text-green-600 bg-green-100",
              },
              {
                icon: Search,
                text: "Free Pincode Search",
                color: "text-emerald-600 bg-emerald-100",
              },
              {
                icon: Sparkles,
                text: "Free SEO Tools",
                color: "text-purple-600 bg-purple-100",
              },
              {
                icon: Wrench,
                text: "All Tools Free",
                color: "text-orange-600 bg-orange-100",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group border rounded-2xl p-6 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 text-left"
                >

                  {/* ICON */}
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${item.color} group-hover:scale-110 transition`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* TEXT */}
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700">
                    {item.text}
                  </h3>

                  {/* SUBTEXT */}
                  <p className="text-xs text-gray-500 mt-1">
                    Reliable & optimized for best performance
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* GUIDES */}
      <section className="pb-20 mt-12">

        <div className="">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg flex items-center justify-center gap-2">
              Helpful Guides
            </h2>

            <Link
              href="/blogs"
              className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {[
              {
                title: "How to Find Your Area Pincode in India",
                href: "/blogs/how-to-find-your-area-pincode-in-india",
              },
              {
                title: "What is a Postal Code?",
                href: "/blogs/what-is-a-postal-code",
              },
              {
                title: "How Post Offices Work in India",
                href: "/blogs/how-post-offices-work-in-india",
              },
            ].map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="group relative border rounded-2xl p-5 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
              >

                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col justify-between h-full">

                  {/* ICON */}
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition w-fit">
                    <FileText size={18} />
                  </div>

                  {/* TITLE */}
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 line-clamp-2">
                    {guide.title}
                  </h3>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                    <span>Read Guide</span>
                    <ArrowRight className="group-hover:translate-x-1 transition text-gray-400 group-hover:text-indigo-600" size={16} />
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="pt-0">

        <div className="">

          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <HelpCircle className="w-6 h-6" />
              </div>
            </div>

            <h2 className="font-bold text-lg flex items-center justify-center gap-2">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 mt-2 text-sm">
              Everything you need to know about iSevenPlus tools & features
            </p>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-4">

            {/* 1 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                Are the calculators on iSevenPlus completely free to use?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Yes, all calculators and online tools available on iSevenPlus are 100% free to use.
                You can calculate EMI, GST, income tax, BMI, working days and many other values
                without any registration or hidden charges.
              </p>
            </details>

            {/* 2 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                Are the calculation results accurate and reliable?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Yes. All calculators use verified mathematical formulas and standard
                financial calculation methods to provide accurate and reliable results.
                However, the results should be used for estimation purposes only.
              </p>
            </details>

            {/* 3 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                How can I find the pincode of a city, district or area in India?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                You can easily search for any Indian postal code using the iSevenPlus
                pincode finder tool. Simply enter the city name, district name, state,
                or postal code to view the list of post offices and delivery details.
              </p>
            </details>

            {/* 4 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                Can I search post office details using a pincode?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Yes. By entering a pincode on iSevenPlus, you can view the complete list
                of post offices associated with that postal code including branch type,
                delivery status, division, and region.
              </p>
            </details>

            {/* 5 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                What types of online calculators are available on iSevenPlus?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                iSevenPlus provides a wide range of calculators including finance
                calculators, construction calculators, health and fitness tools,
                date and time calculators, and daily utility tools to simplify
                calculations for users worldwide.
              </p>
            </details>

            {/* 6 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                Do I need to create an account to use the tools?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                No. All tools and calculators on iSevenPlus can be used instantly
                without creating an account or signing up. The platform is designed
                to provide quick and easy calculations for everyone.
              </p>
            </details>

            {/* 7 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                Can I use iSevenPlus calculators on mobile devices?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Yes. iSevenPlus is fully responsive and works smoothly on mobile
                phones, tablets, laptops and desktop computers so you can access
                calculators and tools from any device.
              </p>
            </details>

            {/* 8 */}
            <details className="group border rounded-2xl p-5 bg-white hover:shadow-md transition">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                How often is the pincode database updated?
                <ChevronDown className="group-open:rotate-180 transition" size={18} />
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                The postal code database on iSevenPlus is regularly updated to ensure
                accurate information about Indian post offices, pincodes, and delivery
                areas.
              </p>
            </details>

          </div>

        </div>

      </section>

    </main>
  );
}