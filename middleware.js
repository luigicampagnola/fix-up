import { NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

export function middleware(req) {
  const country =
    req.geo?.country || req.headers.get("x-vercel-ip-country") || "US";
  const region =
    req.geo?.region || req.headers.get("x-vercel-ip-region") || "FL";

  console.log(`🌎 País detectado: ${country}, Región detectada: ${region}`);

  if (country === "US" && region === "FL") {
    return NextResponse.next();
  }

  return new NextResponse(
    "🚫 Acceso restringido: Solo visitantes de Florida.",
    { status: 403 }
  );
}
