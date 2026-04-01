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
  Circle,
  Zap,
  ShieldCheck,
  LogIn,
  Rocket,
  Receipt,
  Clock,
  BarChart3,
  Activity,
  Users,
  Code,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import PincodeTabs from "../components/PincodeTabs";
import HomeSearch from "../components/HomeSearch";
import AnimatedCounter from "../components/AnimatedCounter";
import TrustBar from "../components/TrustBar";

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

  const [trendingStripData] = await db.query<RowDataPacket[]>(`
  SELECT name, slug 
  FROM tools 
  WHERE isActive=1 AND isDeleted=0
  ORDER BY usageCount DESC, RAND()
  LIMIT 5
`);

  return (
    <main className=" overflow-hidden">



      {/* 1️⃣ HERO */}
      <section className="relative text-center pt-5 pb-10 px-4 bg-gradient-to-b from-indigo-50 via-white to-white">

        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute -top-16 sm:-top-20 md:-top-24 left-1/2 -translate-x-1/2 bg-indigo-200 opacity-30 blur-3xl rounded-full w-62.5 h-62.5 sm:w-100 sm:h-100 md:w-125 md:h-125 lg:w-150 lg:h-150 "></div>

        {/* 🔥 TRENDING STRIP */}
        <div className="relative z-10 w-full mb-4 overflow-hidden">
          <div className="relative bg-white/70 backdrop-blur border border-indigo-100 rounded-full shadow-sm py-2 px-3 overflow-hidden">

            {/* VIEWPORT */}
            <div className="w-full overflow-hidden">

              {/* TRACK */}
              <div className="animate-marquee inline-flex items-center">

                {[...trendingStripData, ...trendingStripData].map((tool: any, index: number) => (
                  <Link
                    key={index}
                    href={`/tools/${tool.slug}`}
                    className="px-4 text-indigo-700 text-xs font-medium hover:text-indigo-900 shrink-0 flex items-center gap-2"
                  >
                    {/* 🔵 DOT ICON */}
                    <Circle size={6} className="fill-indigo-500 text-indigo-500 drop-shadow-sm animate-pulse" />

                    {/* TOOL NAME */}
                    <span>{tool.name}</span>
                  </Link>
                ))}

              </div>

            </div>

          </div>
        </div>

        {/* ⭐ TRUST LINE */}
        <TrustBar />

        {/* 🧠 HEADING */}
        <h1 className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight text-gray-900">
          All-in-One Free Calculator & SEO Tools
          <br />
          <span className="text-indigo-600">500+ Smart Tools in One Place</span>
        </h1>

        {/* 📄 SUBTEXT */}
        <p className="relative z-10 text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
          Calculate anything instantly — from finance to SEO. Save time, boost productivity, and get accurate results without signup.
        </p>
        <p className="text-xs text-indigo-600 font-medium mb-2">
          ✔ 500+ Tools • ✔ Instant Results • ✔ No Signup Required
        </p>

        {/* 🚀 CTA BUTTONS */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

          {/* 🚀 Explore Tools */}
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl font-medium shadow-lg transition-all duration-300"
          >
            <Rocket size={18} className="group-hover:translate-x-0.5 transition" />
            Explore Tools
          </Link>

          {/* 🔍 SEO Tools */}
          <Link
            href="/seotools"
            className="group inline-flex items-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-7 py-3 rounded-xl font-medium transition-all duration-300"
          >
            <Search size={18} className="group-hover:scale-110 transition" />
            Try SEO Tools
          </Link>

        </div>

        {/* 🔍 SEARCH */}
        <div className="relative z-10">
          <HomeSearch />
        </div>

        {/* 📦 PINCODE TABS */}
        <div className="relative mt-8">
          <PincodeTabs />
        </div>

      </section>


      {/* 🔥 SEO CONTENT INTRO */}
      <section className="max-w-6xl mx-auto pt-5 pb-10">
        <div className="bg-white border rounded-2xl p-6 md:p-10 shadow-sm">

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Free Online Calculator & SEO Tools for Daily Use
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            iSevenPlus is a powerful platform offering <strong>100+ free online calculators</strong> and
            <strong> advanced SEO tools</strong> designed for students, professionals, developers, and marketers.
            Whether you need to calculate EMI, GST, BMI, or analyze SEO metrics like domain authority,
            backlinks, and keyword difficulty — everything is available in one place.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Our tools are built with accuracy and speed in mind, helping you save time and make smarter
            decisions. From <strong>financial calculators</strong> to <strong>pincode search tools</strong>
            and <strong>SEO analyzers</strong>, iSevenPlus simplifies complex calculations instantly.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            No signup required, no hidden charges — just fast, reliable, and free tools available anytime, anywhere.
          </p>

        </div>
      </section>

      {/* DASHBOARD CARDS */}

      <section className="max-w-6xl mx-auto pt-5 pb-10">

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

      {/* ⚙️ HOW IT WORKS */}
      <section className="max-w-6xl mx-auto pt-5 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How iSevenPlus Tools Work
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Choose a Tool",
              desc: "Select from 100+ calculators and SEO tools based on your need.",
            },
            {
              title: "Enter Details",
              desc: "Fill in simple inputs like numbers, keywords, or URLs.",
            },
            {
              title: "Get Instant Results",
              desc: "Get fast, accurate results instantly without any signup.",
            },
          ].map((item, i) => (
            <div key={i} className="border rounded-2xl p-6 bg-white hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>


      {/* CATEGORIES */}
      {/* <section className="pb-10"> */}

        {/* HEADER */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            Popular Categories
          </h2>
        </div> */}

        {/* GRID */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat: any, index: number) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative border rounded-2xl p-5 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
            > */}

              {/* HOVER GRADIENT */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div> */}

              {/* CONTENT */}
              {/* <div className="relative z-10 flex items-start gap-4"> */}

                {/* ICON BOX */}
                {/* <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
                  <Layers className="w-5 h-5" />
                </div> */}

                {/* TEXT */}
                {/* <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-700">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    ⚡ Free • Instant • No Signup
                  </p>
                </div> */}

                {/* ARROW */}
                {/* <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />

              </div>

            </Link>
          ))}

        </div>

      </section> */}

      {/* FEATURED */}
      <section className="bg-white pb-5">
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
                className="group border rounded-xl p-4 bg-white hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between relative"
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
                <div className="flex items-center flex-start gap-1 text-xs mt-3">

                  {/* ⭐ RATING */}
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
                    <span className="text-gray-500 ml-1">
                      ({tool.ratingCount || "1k+"})
                    </span>
                  </div>

                  {/* ⚡ BADGE */}
                  <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full absolute top-1 right-1">
                    ⚡ Instant
                  </span>



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

      {/* 🎯 USE CASES */}
      <section className="max-w-6xl mx-auto pt-5 pb-10">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popular Uses of Our Tools
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl m-auto">
            Our free online calculators and SEO tools are designed to solve real-world problems —
            from finance and health tracking to SEO analysis and productivity.
          </p>
          <p className="text-xs text-indigo-600 font-medium mb-2 mt-3">
            ✔ 500+ Tools • ✔ Instant Results • ✔ No Signup Required
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">

          {/* LEFT */}
          <div className="space-y-5">

            <div className="flex items-start gap-3">
              <span className="mt-1 text-indigo-600">
                <Calculator size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Calculate EMI, loan interest & financial planning</strong> using accurate and easy-to-use tools.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-green-600">
                <Activity size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Check BMI, calorie intake & fitness tracking</strong> to maintain a healthy lifestyle.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-purple-600">
                <BarChart3 size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Analyze SEO metrics like Domain Authority, Page Authority & backlinks</strong> to improve rankings.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-blue-600">
                <Search size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Find keyword difficulty & search volume</strong> for better SEO strategy and content planning.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            <div className="flex items-start gap-3">
              <span className="mt-1 text-indigo-600">
                <MapPin size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Search Indian pincode & postal code details</strong> with accurate and updated database.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-orange-600">
                <Receipt size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Calculate GST, tax & business costs</strong> for better financial decision making.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-gray-700">
                <Clock size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Time, date & productivity calculators</strong> to manage your daily tasks efficiently.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-yellow-600">
                <Zap size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Free tools for students & professionals</strong> with instant results and no signup required.
              </p>
            </div>

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
                  <span className="absolute top-1 right-1 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    🔥 Trending
                  </span>
                )}

                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

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
              <div className="text-xs text-gray-500 flex justify-between items-center mt-2">
                <span className="text-indigo-600 font-medium">Use Now</span>
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
          <p className="text-xs text-gray-500 mb-6">
            ⭐ Trusted platform for accurate calculations & real-time tools
          </p>

          {/* SUBTEXT */}
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Find accurate pincodes and postal codes instantly across India and worldwide.
          </p>
          <p className="text-xs text-gray-500 mb-4">
            🔍 Search from 1,50,000+ Indian pincodes database
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

      {/* 👥 WHO CAN USE */}
      <section className="max-w-6xl mx-auto pt-5 pb-10">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Who Can Use iSevenPlus?
          </h2>
          <p className="text-gray-500 text-sm mt-2 mb-3">
            iSevenPlus is built for a wide range of users who need fast, accurate, and free tools
            for daily calculations, SEO analysis, and productivity.
          </p>
          <p className="text-xs text-indigo-600 font-medium mb-2">
            ✔ For Students • ✔ For Professionals • ✔ For Businesses • ✔ For SEO Experts
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-sm">

          {/* LEFT */}
          <div className="space-y-5">

            <div className="flex items-start gap-3">
              <span className="mt-1 text-indigo-600">
                <GraduationCap size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Students</strong> can use calculators for academic purposes like percentage, BMI, and basic calculations.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-green-600">
                <Briefcase size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Professionals</strong> can plan finances, calculate EMI, taxes, and manage daily productivity tasks.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-purple-600">
                <Search size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>SEO experts</strong> can analyze websites, check backlinks, domain authority, and keyword difficulty.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            <div className="flex items-start gap-3">
              <span className="mt-1 text-blue-600">
                <Code size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Developers</strong> can quickly perform calculations and use utility tools to speed up workflows.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-orange-600">
                <Building2 size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>Businesses</strong> can estimate costs, calculate GST, and optimize operations using smart tools.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 text-yellow-600">
                <Users size={18} />
              </span>
              <p className="text-gray-700 leading-relaxed">
                <strong>General users</strong> can use daily tools like age calculator, time tools, and pincode search easily.
              </p>
            </div>

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
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition"></div>

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

      <section className="text-center py-16 bg-indigo-600 text-white rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-3">
          Start Using Free Tools Today 🚀
        </h2>
        <p className="text-sm mb-6">
          No signup required • Instant results • 100% free
        </p>

        <Link
          href="/tools"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100"
        >
          Explore All Tools
        </Link>
      </section>

      {/* 📄 SEO LONG CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border rounded-2xl p-6 md:p-10">

          <h2 className="text-2xl font-bold mb-4">
            Best Free Online Calculators & SEO Tools Platform
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            iSevenPlus is one of the best platforms to access free online calculators and SEO tools
            without any limitations. Our tools are designed to provide accurate results instantly
            for a wide range of use cases including finance, health, productivity, and digital marketing.
          </p>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Whether you want to calculate EMI, analyze website SEO performance, find postal codes,
            or perform daily calculations, our platform offers everything in one place. We continuously
            update our tools to ensure accuracy, speed, and reliability.
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            Start using our free tools today and simplify your calculations with ease.
          </p>

        </div>
      </section>

    </main>
  );
}