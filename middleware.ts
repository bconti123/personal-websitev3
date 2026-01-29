import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const secret = req.cookies.get("admin-secret")?.value;

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
