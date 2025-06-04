import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

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
