// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-region");

  // Permitir solo visitantes de Florida, USA
  if (country === "US" && region === "FL") {
    return NextResponse.next();
  }

  // Bloquear el acceso para el resto
  return new NextResponse("Acceso restringido: Solo visitantes de Florida.", {
    status: 403,
  });
}

// Aplicar middleware a todas las rutas
export const config = {
  matcher: "/:path*",
};
