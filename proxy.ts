import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.nextUrl.hostname;
  const isLocalHost =
    host === "localhost" || host === "127.0.0.1" || host === "::1";

  // Hard block admin routes outside local development hosts.
  if (!isLocalHost) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const secret = req.cookies.get("admin-secret")?.value;

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
