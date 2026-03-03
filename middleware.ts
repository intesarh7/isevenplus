import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const url = nextUrl.clone();
  const host = request.headers.get("host") || "";
  const protocol =
    request.headers.get("x-forwarded-proto") === "https" ? "https" : "http";

  /* =====================================================
     1️⃣ SKIP STATIC FILES & API ROUTES
  ====================================================== */
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

/* =====================================================
   ADMIN AUTH PROTECTION
====================================================== */
if (url.pathname.startsWith("/admin")) {

  // Allow login page
  if (url.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
}
  /* =====================================================
     3️⃣ FORCE LOWERCASE (SEO IMPORTANT)
  ====================================================== */
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  /* =====================================================
     4️⃣ REMOVE TRAILING SLASH (except homepage)
  ====================================================== */
  if (
    url.pathname.length > 1 &&
    url.pathname.endsWith("/")
  ) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }


  

  return NextResponse.next();
}

/* =====================================================
   MATCH ALL ROUTES EXCEPT STATIC ASSETS
====================================================== */
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};