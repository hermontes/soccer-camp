import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

//Checks session when routing between pages
export async function middleware(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/dashboard/:path*"], // Specify the routes the middleware applies to
};
// For later: The getSessionCookie() function does not automatically reference the auth config specified in auth.ts. Therefore, you need to ensure that the configuration in getSessionCookie() matches the config defined in your auth.ts.


