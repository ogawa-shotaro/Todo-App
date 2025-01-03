import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
  matcher: ["/todos/:path*", "/users/:path*"],
};
