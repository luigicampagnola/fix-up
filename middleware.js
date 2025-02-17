// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-region");

  console.log(`🌎 País detectado: ${country}, Región detectada: ${region}`);

  // Permitir solo tráfico de EE.UU. y Florida
  if (country === "US" && region === "FL") {
    return NextResponse.next();
  }

  return new NextResponse(
    "🚫 Acceso restringido: Solo visitantes de Florida.",
    { status: 403 }
  );
}

// Aplicar middleware a todas las rutas
export const config = {
  matcher: "/:path*",
};
