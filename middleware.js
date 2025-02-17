import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.headers.get("x-vercel-ip-country") || "unknown";
  const region = req.headers.get("x-vercel-ip-region") || "unknown";

  console.log(`Country: ${country}, Region: ${region}`); // Verificar en logs

  if (country === "US" && region === "FL") {
    return NextResponse.next();
  }

  return new NextResponse("Acceso restringido: Solo visitantes de Florida.", {
    status: 403,
  });
}

// Aplica el middleware a todas las rutas
export const config = {
  matcher: "/:path*",
};
