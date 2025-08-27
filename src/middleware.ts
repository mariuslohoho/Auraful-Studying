import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (auth routes)
     * - error (error pages)
     * - auth (Supabase OAuth callbacks, etc.)
     * - image extensions (svg, png, jpg, jpeg, gif, webp)
     * - the root path "/"
     */
    "/((?!_next/static|_next/image|favicon.ico|login|error|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
