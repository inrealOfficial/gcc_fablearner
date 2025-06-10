import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const GULF_COUNTRIES = [
  "AE", // UAE
  "SA", // Saudi Arabia
  "KW", // Kuwait
  "QA", // Qatar
  "BH", // Bahrain
  "OM", // Oman
];

const REDIRECT_DOMAIN = "https://gcc.fablearner.com";

export function middleware(request: NextRequest) {
  const country =
    (request as any).geo?.country || request.headers.get("cf-ipcountry");
  const response = NextResponse.next();

  if (country && GULF_COUNTRIES.includes(country)) {
    // Preserve the path and query parameters
    const url = new URL(request.url);
    const redirectUrl = `${REDIRECT_DOMAIN}${url.pathname}${url.search}`;

    return NextResponse.redirect(redirectUrl, 301); // Permanent redirect
  }

  // Add caching headers
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp)$/)) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  } else if (request.nextUrl.pathname.match(/\.(js|css)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
