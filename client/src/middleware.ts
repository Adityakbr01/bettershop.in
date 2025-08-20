import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



function decodeJwt(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    return decoded;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
}


export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  const protectedRoutes = ["/dashboard", "/profile", "/orders", "/home", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // ✅ Check expiry
  if (accessToken) {
    console.log("Access Token:", accessToken.value);
    const expired = isTokenExpired(accessToken.value);

    if (expired) {
      // Remove cookie if expired
      const response = NextResponse.redirect(new URL("/signin", request.url));
      response.cookies.delete("accessToken"); // 👈 delete cookie
      return response;
    }
  }

  // If accessing protected route without token → redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If accessing login/register with token → redirect to dashboard
  if (
    (request.nextUrl.pathname === "/signin" ||
      request.nextUrl.pathname === "/signup") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only on selected routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
