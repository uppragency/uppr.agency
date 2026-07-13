import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Mod întreținere: activat prin variabila de mediu MAINTENANCE_MODE=true.
  // Panourile admin/dashboard/login rămân accesibile ca să poți lucra normal;
  // doar site-ul public arată pagina de mentenanță.
  const maintenanceOn = process.env.MAINTENANCE_MODE === "true";
  const isInternalPath =
    path.startsWith("/admin") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/login") ||
    path.startsWith("/api") ||
    path.startsWith("/maintenance");

  if (maintenanceOn && !isInternalPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
