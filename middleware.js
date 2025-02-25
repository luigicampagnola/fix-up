import { NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

export function middleware(req) {
  const country =
    req.geo?.country || req.headers.get("x-vercel-ip-country") || "US";

  if (country === "US" || country === "SE") {
    return NextResponse.next();
  }

  return new NextResponse("🚫 You don't have access to this site.", {
    status: 403,
  });
}
